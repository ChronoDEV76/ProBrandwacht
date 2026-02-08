#!/usr/bin/env node
/**
 * ProBrandwacht Sanity Guard (copy + logic)
 * - Scant tekstuele signalen (zoals copy-guard)
 * - Doet logica-checks per page/route: "als X, dan moet Y"
 * - Houdt frontstage zuiver (geen bureau/werkgever/matching/prijssturing)
 */

import fs from "fs";
import path from "path";

const ROOT = process.argv.includes("--root")
  ? path.resolve(process.argv[process.argv.indexOf("--root") + 1])
  : process.cwd();

const CONFIG_PATH = process.argv.includes("--config")
  ? path.resolve(process.argv[process.argv.indexOf("--config") + 1])
  : path.join(ROOT, "scripts", "qa", "probrandwacht-sanity-guard.config.json");

function die(msg) {
  console.error(msg);
  process.exit(2);
}

if (!fs.existsSync(CONFIG_PATH)) {
  die(`Config not found: ${CONFIG_PATH}`);
}

const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

const TONE_PROFILE_PATH = path.join(ROOT, "scripts", "tone", "probrandwacht-tone.json");

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phraseToPatternString(phrase) {
  const escaped = escapeRegex(phrase).replace(/\s+/g, "\\s+");
  const startsWord = /^[A-Za-z0-9]/.test(phrase);
  const endsWord = /[A-Za-z0-9]$/.test(phrase);
  return startsWord && endsWord ? `\\b${escaped}\\b` : escaped;
}

function loadToneProfile() {
  if (!fs.existsSync(TONE_PROFILE_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(TONE_PROFILE_PATH, "utf8"));
  } catch {
    return null;
  }
}

function appendToneRules(cfgObj, tone) {
  if (!tone) return;
  const disallowed = tone.disallowed_language ?? {};
  const avoidVoice = tone.preferred_voice?.avoid ?? [];
  const forbiddenPromises = tone.guarantees_and_promises?.forbidden ?? [];
  const closingAvoid = tone.closing_guidance?.avoid ?? [];

  const toPatterns = (arr) =>
    (Array.isArray(arr) ? arr : []).map((p) => phraseToPatternString(p));

  const pushRule = (id, level, message, phrases) => {
    if (!phrases?.length) return;
    cfgObj.patternRules = cfgObj.patternRules ?? [];
    cfgObj.patternRules.push({
      id,
      level,
      message,
      patterns: phrases
    });
  };

  pushRule(
    "TONE_ACTIVIST",
    "HIGH",
    "Activistische taal ondermijnt neutraliteit.",
    toPatterns(disallowed.activist_terms)
  );
  pushRule(
    "TONE_ACCUSATORY",
    "HIGH",
    "Aanvallende/accusatoire taal ondermijnt het kader.",
    toPatterns(disallowed.accusatory_terms)
  );
  pushRule(
    "TONE_COLLECTIVE",
    "HIGH",
    "Collectieve framing is niet toegestaan.",
    toPatterns(disallowed.collective_identity)
  );
  pushRule(
    "TONE_EMOTIONAL",
    "HIGH",
    "Emotioneel geladen taal is niet toegestaan.",
    toPatterns(disallowed.emotional_charge)
  );
  pushRule(
    "TONE_VOICE_AVOID",
    "MEDIUM",
    "Belerende of collectieve formulering vermijden.",
    toPatterns(avoidVoice)
  );
  pushRule(
    "TONE_GUARANTEES",
    "HIGH",
    "Garantie-/zekerheidstaal is niet toegestaan.",
    toPatterns(forbiddenPromises)
  );
  pushRule(
    "TONE_CLOSING_AVOID",
    "MEDIUM",
    "Activerende afsluiting vermijden.",
    toPatterns(closingAvoid)
  );
}

appendToneRules(cfg, loadToneProfile());

const INCLUDE_DIRS = cfg.includeDirs ?? ["app/(site)", "components", "lib", "content"];
const FRONTSTAGE_ONLY_DIRS = cfg.frontstageOnlyDirs ?? ["app/(site)"];
const EXTENSIONS = cfg.extensions ?? [".tsx", ".mdx", ".md", ".json"];
const MAX_FILE_SIZE = cfg.maxFileSizeBytes ?? 2 * 1024 * 1024;

const affirmationSignals = (cfg.affirmationSignals ?? []).map(s => s.toLowerCase());
const patternRules = cfg.patternRules ?? [];
const logicRules = cfg.logicRules ?? [];

const BLOG_DIR = path.join(ROOT, "content", "blog");

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath, files);
    } else {
      const ext = path.extname(entry);
      if (EXTENSIONS.includes(ext) && stat.size <= MAX_FILE_SIZE) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

function getWindow(content, index, size = 80) {
  const start = Math.max(0, index - size);
  const end = Math.min(content.length, index + size);
  return content.slice(start, end);
}

function normalizeSpaces(s) {
  return s.replace(/\s+/g, " ").trim();
}

function severityRank(level) {
  if (level === "HIGH") return 3;
  if (level === "MEDIUM") return 2;
  if (level === "INFO") return 1;
  return 0;
}

function fileCategory(absFile) {
  const rel = path.relative(ROOT, absFile);
  const isBlog = absFile.startsWith(`${BLOG_DIR}${path.sep}`);
  const isFrontstage = FRONTSTAGE_ONLY_DIRS.some(d => rel.startsWith(d + path.sep) || rel === d);
  if (isBlog) return "BLOG";
  if (isFrontstage) return "FRONTSTAGE";
  return "OTHER";
}

function routeKey(absFile) {
  // Groepeer per page.tsx / mdx file; route = best-effort
  const rel = path.relative(ROOT, absFile).replace(/\\/g, "/");
  if (rel.includes("app/(site)/")) {
    // app/(site)/foo/bar/page.tsx -> /foo/bar
    const cut = rel.split("app/(site)/")[1];
    const parts = cut.split("/");
    // drop last filename
    parts.pop();
    const route = "/" + parts.filter(Boolean).join("/");
    return route === "/" ? "/" : route.replace(/\/+/g, "/");
  }
  if (rel.startsWith("content/blog/")) {
    return "/blog/" + rel.replace("content/blog/", "").replace(/\.mdx?$/, "");
  }
  return rel;
}

function hasAffirmation(contentLower) {
  // minimaal een kern-afbakening is genoeg (config stuurt dit)
  return affirmationSignals.some(sig => contentLower.includes(sig));
}

function headingExists(content, heading) {
  const h = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`^\\s{0,3}#{1,6}\\s+${h}\\s*$`, "mi");
  return re.test(content);
}

const findings = [];
let suppressed = 0;

// Map route -> aggregated info for logic checks
const routeInfo = new Map();

function addFinding({ level, rule, file, match, message, context, category }) {
  findings.push({ level, rule, file, match, message, context, category });
}

for (const relDir of INCLUDE_DIRS) {
  const absDir = path.join(ROOT, relDir);
  const files = walk(absDir);

  for (const absFile of files) {
    const relFile = path.relative(ROOT, absFile);
    const content = fs.readFileSync(absFile, "utf8");
    const contentLower = content.toLowerCase();

    const category = fileCategory(absFile);
    const rKey = routeKey(absFile);

    if (!routeInfo.has(rKey)) {
      routeInfo.set(rKey, {
        category,
        files: new Set(),
        hasAffirmation: false,
        triggers: [],
        contentLower: "" // we only keep a small slice for OOM safety
      });
    }

    const ri = routeInfo.get(rKey);
    ri.files.add(relFile);
    ri.hasAffirmation = ri.hasAffirmation || hasAffirmation(contentLower);
    // keep a bounded sample (avoid huge concatenations)
    if (ri.contentLower.length < 200_000) {
      ri.contentLower += "\n" + contentLower.slice(0, 50_000);
    }

    // === Pattern rules (like copy-guard) ===
    for (const rule of patternRules) {
      for (const pat of rule.patterns ?? []) {
        const re = new RegExp(pat, "i");
        const m = content.match(re);
        if (!m) continue;

        const idx = m.index ?? 0;
        const win = getWindow(content, idx, 80);

        // allow-if logic (nearby disclaimer terms)
        if (rule.allowIfNear?.length) {
          const winLower = win.toLowerCase();
          const ok = rule.allowIfNear.some(s => winLower.includes(String(s).toLowerCase()));
          if (ok) {
            suppressed += 1;
            continue;
          }
        }

        addFinding({
          level: rule.level ?? "MEDIUM",
          rule: rule.id,
          file: relFile,
          match: m[0],
          message: rule.message ?? "",
          context: normalizeSpaces(content.slice(Math.max(0, idx - 80), idx + 80)),
          category
        });
      }
    }

    // collect triggers for logic rules (we evaluate after scan)
    for (const lr of logicRules) {
      const applies =
        lr.appliesTo === "FRONTSTAGE" ? category === "FRONTSTAGE" :
        lr.appliesTo === "BLOG" ? category === "BLOG" :
        true;

      if (!applies) continue;

      if (Array.isArray(lr.excludePaths) && lr.excludePaths.some((p) => relFile.startsWith(p))) {
        continue;
      }

      const triggers = lr.triggerAny ?? [];
      for (const t of triggers) {
        const re = new RegExp(t, "i");
        const m = content.match(re);
        if (m) {
          const idx = m.index ?? 0;
          ri.triggers.push({
            logicRuleId: lr.id,
            match: m[0],
            file: relFile,
            context: normalizeSpaces(content.slice(Math.max(0, idx - 80), idx + 80))
          });
          // do not break; keep some evidence
        }
      }

      // blog heading requirements (checked per file too)
      if (category === "BLOG" && lr.requireAllHeadings?.length) {
        for (const h of lr.requireAllHeadings) {
          if (!headingExists(content, h)) {
            addFinding({
              level: lr.level ?? "MEDIUM",
              rule: lr.id,
              file: relFile,
              match: `missing heading: ${h}`,
              message: lr.message ?? "Missing required headings",
              context: `Required heading not found: "${h}"`,
              category
            });
          }
        }
      }
    }
  }
}

// === Evaluate logic rules per route ===
for (const lr of logicRules) {
  for (const [rKey, ri] of routeInfo.entries()) {
    const applies =
      lr.appliesTo === "FRONTSTAGE" ? ri.category === "FRONTSTAGE" :
      lr.appliesTo === "BLOG" ? ri.category === "BLOG" :
      true;

    if (!applies) continue;

    const routeTriggers = (ri.triggers ?? []).filter(t => t.logicRuleId === lr.id);
    if (!routeTriggers.length) continue;

    // requireAny (route-level)
    if (lr.requireAny?.length) {
      const ok = lr.requireAny.some(s => ri.contentLower.includes(String(s).toLowerCase()));
      if (!ok) {
        // pick best evidence snippet
        const ev = routeTriggers[0];
        addFinding({
          level: lr.level ?? "HIGH",
          rule: lr.id,
          file: Array.from(ri.files)[0] ?? rKey,
          match: ev.match,
          message: lr.message ?? "",
          context: `Route ${rKey}: trigger "${ev.match}" maar geen afbakening gevonden. Voorbeeld: ${ev.context}`,
          category: ri.category
        });
      }
    }

    // no explicit requirements: still flag as finding if the rule is basically "forbidden when triggered"
    if ((!lr.requireAny || lr.requireAny.length === 0) && (!lr.requireAllHeadings || lr.requireAllHeadings.length === 0)) {
      const ev = routeTriggers[0];
      addFinding({
        level: lr.level ?? "MEDIUM",
        rule: lr.id,
        file: ev.file,
        match: ev.match,
        message: lr.message ?? "",
        context: `Route ${rKey}: ${ev.context}`,
        category: ri.category
      });
    }
  }
}

// === Output (same style as copy-guard) ===
const counts = {
  HIGH: findings.filter(f => f.level === "HIGH").length,
  MEDIUM: findings.filter(f => f.level === "MEDIUM").length,
  INFO: findings.filter(f => f.level === "INFO").length
};

console.log("=== ProBrandwacht Sanity Guard (copy + logic) ===");
console.log("Root:", ROOT);
console.log("Config:", CONFIG_PATH);
console.log(
  `Findings: ${findings.length} (HIGH ${counts.HIGH}, MEDIUM ${counts.MEDIUM}, INFO ${counts.INFO})`
);
console.log(`Suppressed by allowlist: ${suppressed}\n`);

const summary = {
  FRONTSTAGE: { HIGH: 0, MEDIUM: 0, INFO: 0 },
  BLOG: { HIGH: 0, MEDIUM: 0, INFO: 0 },
  OTHER: { HIGH: 0, MEDIUM: 0, INFO: 0 }
};

for (const f of findings) {
  if (summary[f.category]?.[f.level] !== undefined) summary[f.category][f.level] += 1;
}

console.log("Policy summary");
console.log(
  `  Frontstage: HIGH ${summary.FRONTSTAGE.HIGH}, MEDIUM ${summary.FRONTSTAGE.MEDIUM}, INFO ${summary.FRONTSTAGE.INFO}`
);
console.log(
  `  Blogs:      HIGH ${summary.BLOG.HIGH}, MEDIUM ${summary.BLOG.MEDIUM}, INFO ${summary.BLOG.INFO}`
);
console.log(
  `  Other:      HIGH ${summary.OTHER.HIGH}, MEDIUM ${summary.OTHER.MEDIUM}, INFO ${summary.OTHER.INFO}`
);
console.log("");

function sortFindings(a, b) {
  const r = severityRank(b.level) - severityRank(a.level);
  if (r !== 0) return r;
  if (a.rule !== b.rule) return a.rule.localeCompare(b.rule);
  return a.file.localeCompare(b.file);
}

for (const f of findings.sort(sortFindings)) {
  console.log(`[${f.level}] ${f.rule}`);
  console.log(`  File: ${f.file}`);
  console.log(`  Match: ${f.match}`);
  console.log(`  Note: ${f.message}`);
  console.log(`  Context: ${f.context}\n`);
}

process.exit(counts.HIGH > 0 ? 2 : counts.MEDIUM > 0 ? 1 : 0);
