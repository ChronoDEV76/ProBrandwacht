#!/usr/bin/env node
// ProBrandwacht Blog Guard (OOM-proof)
// - Scant alleen content/blog/**/*.mdx
// - Checkt frontmatter keys + verplichte secties
// - Checkt toon/positionering (geen oplossing/garantie/aanval)
// - Output in dezelfde stijl als probrandwacht-copy-guard.mjs

import fs from "fs";
import path from "path";

const ROOT = process.argv.includes("--root")
  ? path.resolve(process.argv[process.argv.indexOf("--root") + 1])
  : process.cwd();

const CONFIG_PATH = process.argv.includes("--config")
  ? path.resolve(ROOT, process.argv[process.argv.indexOf("--config") + 1])
  : path.join(ROOT, "scripts", "blog", "blog-guard.config.json");

function loadConfig(p) {
  if (!fs.existsSync(p)) {
    throw new Error(`Config not found: ${p}`);
  }
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const config = loadConfig(CONFIG_PATH);

const MAX_FILE_SIZE = config.maxFileSizeBytes ?? 2 * 1024 * 1024;
const EXTENSIONS = config.extensions ?? [".mdx"];
const INCLUDE_DIRS = config.include ?? ["content/blog"];

const BLOG_DIR = path.join(ROOT, "content", "blog");

/* =======================
   HELPERS
======================= */

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

function getWindow(content, index, size = 60) {
  const start = Math.max(0, index - size);
  const end = Math.min(content.length, index + size);
  return content.slice(start, end);
}

function compactSnippet(content, index, radius = 80) {
  return content
    .slice(Math.max(0, index - radius), index + radius)
    .replace(/\s+/g, " ")
    .trim();
}

function stripFrontmatter(raw) {
  if (!raw.startsWith("---")) return { frontmatterRaw: "", body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { frontmatterRaw: "", body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + "\n---".length).trimStart();
  return { frontmatterRaw: fm, body };
}

// Minimal YAML-ish parser: key: value (strings), supports quoted strings.
// (Goed genoeg voor title/date/canonical/pillar checks)
function parseFrontmatter(frontmatterRaw) {
  const obj = {};
  if (!frontmatterRaw) return obj;

  const lines = frontmatterRaw.split("\n");
  for (const line of lines) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2] ?? "";
    val = val.trim();

    // remove surrounding quotes
    if (
      (val.startsWith("'") && val.endsWith("'")) ||
      (val.startsWith('"') && val.endsWith('"'))
    ) {
      val = val.slice(1, -1);
    }
    obj[key] = val;
  }
  return obj;
}

function hasHeading(body, headingText) {
  // Accept H2 or H3: ## Heading or ### Heading
  const re = new RegExp(`^#{2,3}\\s+${escapeRegExp(headingText)}\\b`, "im");
  return re.test(body);
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* =======================
   RULES (from config)
======================= */

function normalizeRulePatterns(rule) {
  const out = [];
  for (const p of rule.patterns ?? []) {
    if (typeof p === "string") out.push({ re: new RegExp(p, "i") });
    else {
      const re = new RegExp(p.re, "i");
      const allowIf = p.allowIf ? new RegExp(p.allowIf, "i") : null;
      out.push({ re, allowIf, level: p.level });
    }
  }
  return out;
}

const RUNTIME_RULES = (config.rules ?? []).map((r) => ({
  ...r,
  _patterns: normalizeRulePatterns(r)
}));

/* =======================
   SCAN
======================= */

const findings = [];
let suppressed = 0;

const requiredKeys = config.requiredFrontmatterKeys ?? [];
const requiredSections = config.requiredSections ?? [];
const relatedLinkRe = config.requiredRelatedLinkPattern
  ? new RegExp(config.requiredRelatedLinkPattern, "i")
  : /\[[^\]]+\]\(\/blog\/[\w\-\/]+\)/i;

function pushFinding({ level, rule, file, match, message, context }) {
  findings.push({
    level,
    rule,
    file,
    match,
    message,
    context
  });
}

for (const relDir of INCLUDE_DIRS) {
  const absDir = path.join(ROOT, relDir);
  const files = walk(absDir);

  for (const file of files) {
    // extra hard guard: only blog dir
    if (!file.startsWith(`${BLOG_DIR}${path.sep}`)) continue;

    const raw = fs.readFileSync(file, "utf8");
    const { frontmatterRaw, body } = stripFrontmatter(raw);
    const fm = parseFrontmatter(frontmatterRaw);

    // 1) Required frontmatter keys
    const missingKeys = requiredKeys.filter((k) => !fm[k] || !String(fm[k]).trim());
    if (missingKeys.length) {
      pushFinding({
        level: "HIGH",
        rule: "MISSING_FRONTMATTER_KEYS",
        file: path.relative(ROOT, file),
        match: missingKeys.join(", "),
        message:
          (config.rules ?? []).find((r) => r.id === "MISSING_FRONTMATTER_KEYS")?.message ??
          "Missing required frontmatter keys.",
        context: `Frontmatter keys missing: ${missingKeys.join(", ")}`
      });
    }

    // 2) Required sections (H2/H3)
    const missingSections = requiredSections.filter((s) => !hasHeading(body, s));
    if (missingSections.length) {
      pushFinding({
        level: "HIGH",
        rule: "MISSING_REQUIRED_SECTIONS",
        file: path.relative(ROOT, file),
        match: missingSections.join(", "),
        message:
          (config.rules ?? []).find((r) => r.id === "MISSING_REQUIRED_SECTIONS")?.message ??
          "Missing required sections.",
        context: `Missing sections: ${missingSections.join(", ")}`
      });
    }

    // 3) Related links present (only if "Gerelateerd" exists)
    const hasGerelateerd = hasHeading(body, "Gerelateerd");
    if (hasGerelateerd) {
      // crude slice: from "Gerelateerd" heading to next heading or EOF
      const idx = body.search(/^#{2,3}\s+Gerelateerd\b/im);
      let block = body;
      if (idx >= 0) {
        const after = body.slice(idx);
        const next = after.slice(1).search(/^#{2,3}\s+/m);
        block = next >= 0 ? after.slice(0, next + 1) : after;
      }
      if (!relatedLinkRe.test(block)) {
        pushFinding({
          level: "MEDIUM",
          rule: "MISSING_RELATED_LINKS",
          file: path.relative(ROOT, file),
          match: "no /blog/ links",
          message:
            (config.rules ?? []).find((r) => r.id === "MISSING_RELATED_LINKS")?.message ??
            "Missing related links.",
          context: "Gerelateerd section found, but no internal /blog/... links detected."
        });
      }
    }

    // 4) Pattern rules (solution/guarantee/attack/price signals)
    for (const rule of RUNTIME_RULES) {
      if (!rule._patterns?.length) continue;
      if (["MISSING_FRONTMATTER_KEYS", "MISSING_REQUIRED_SECTIONS", "MISSING_RELATED_LINKS"].includes(rule.id)) {
        continue;
      }

      for (const pat of rule._patterns) {
        const m = body.match(pat.re);
        if (!m) continue;

        const idx = m.index ?? 0;
        const window = getWindow(body, idx, 80);

        if (pat.allowIf && pat.allowIf.test(window)) {
          suppressed += 1;
          continue;
        }

        const level = pat.level ?? rule.level ?? "MEDIUM";
        pushFinding({
          level,
          rule: rule.id,
          file: path.relative(ROOT, file),
          match: m[0],
          message: rule.message ?? "",
          context: compactSnippet(body, idx, 90)
        });
      }
    }
  }
}

/* =======================
   OUTPUT
======================= */

const counts = {
  HIGH: findings.filter((f) => f.level === "HIGH").length,
  MEDIUM: findings.filter((f) => f.level === "MEDIUM").length,
  INFO: findings.filter((f) => f.level === "INFO").length
};

console.log("=== ProBrandwacht Blog Guard (OOM-proof) ===");
console.log("Root:", ROOT);
console.log("Config:", CONFIG_PATH);
console.log(`Include roots: ${INCLUDE_DIRS.join(", ")}`);
console.log(`Max file size: ${Math.round(MAX_FILE_SIZE / (1024 * 1024) * 10) / 10} MB`);
console.log(
  `Findings: ${findings.length} (HIGH ${counts.HIGH}, MEDIUM ${counts.MEDIUM}, INFO ${counts.INFO})`
);
console.log(`Suppressed by allowlist: ${suppressed}\n`);

for (const f of findings) {
  console.log(`[${f.level}] ${f.rule}`);
  console.log(`  File: ${f.file}`);
  console.log(`  Match: ${f.match}`);
  console.log(`  Note: ${f.message}`);
  console.log(`  Context: ${f.context}\n`);
}

process.exit(counts.HIGH > 0 ? 2 : counts.MEDIUM > 0 ? 1 : 0);
