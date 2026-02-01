#!/usr/bin/env node
/**
 * scripts/blog/vr-blog-guard.mjs
 *
 * Run:
 *   node scripts/blog/vr-blog-guard.mjs --root . --config scripts/blog/vr-blog-guard.config.json
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ANSI = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  cyan: "\x1b[36m"
};

function argValue(flag, def = null) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return def;
  return process.argv[idx + 1] ?? def;
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function rel(root, file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function clampSnippet(s, max = 140) {
  const oneLine = String(s).replace(/\s+/g, " ").trim();
  if (oneLine.length <= max) return oneLine;
  return oneLine.slice(0, max - 1) + "…";
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findHeadingLines(body) {
  // returns array: { level: 1..6, text, idx }
  const lines = body.split("\n");
  const headings = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s+(.*)\s*$/);
    if (m) headings.push({ level: m[1].length, text: m[2].trim(), idx: i + 1 });
  }
  return headings;
}

function parseFrontmatter(raw) {
  // minimal YAML-ish parser for common cases
  // returns { frontmatter: {}, body: "" }
  const fm = {};
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!m) return { frontmatter: null, body: raw };

  const fmText = m[1];
  const body = m[2];

  // naive: handle key: 'value' / "value" / value, plus arrays and tags list
  const lines = fmText.split("\n");
  let currentKey = null;
  for (const line of lines) {
    if (!line.trim()) continue;

    // list item (yaml "- foo")
    const li = line.match(/^\s*-\s+(.*)\s*$/);
    if (li && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(li[1].trim().replace(/^['"]|['"]$/g, ""));
      continue;
    }

    const kv = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)\s*$/);
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2].trim();

    currentKey = key;

    if (val === "" || val === "|"
      || val === ">"
      || val === ">-"
      || val === "|-") {
      // multi-line values: we won’t reconstruct perfectly here; keep marker
      fm[key] = val;
      continue;
    }

    // strip quotes
    val = val.replace(/^['"]|['"]$/g, "");

    // simple arrays: [a, b]
    if (val.startsWith("[") && val.endsWith("]")) {
      const inner = val.slice(1, -1).trim();
      fm[key] = inner
        ? inner.split(",").map((x) => x.trim().replace(/^['"]|['"]$/g, ""))
        : [];
      continue;
    }

    fm[key] = val;
  }

  return { frontmatter: fm, body };
}

function containsAny(text, needles) {
  const t = text.toLowerCase();
  for (const n of needles) {
    if (t.includes(String(n).toLowerCase())) return n;
  }
  return null;
}

function countWhitelistHits(text, whitelist) {
  const t = text;
  let hits = 0;
  for (const w of whitelist) {
    const re = new RegExp(`\\b${escapeRegex(w)}\\b`, "i");
    if (re.test(t)) hits++;
  }
  return hits;
}

function scanFile({ root, file, cfg }) {
  const out = [];
  const stat = fs.statSync(file);
  if (stat.size > cfg.scan.maxFileSizeBytes) {
    out.push({
      severity: "LOW",
      code: "SKIPPED_TOO_LARGE",
      file: rel(root, file),
      line: 1,
      match: `${Math.round(stat.size / 1024)} KB`,
      note: `Bestand groter dan limiet (${Math.round(cfg.scan.maxFileSizeBytes / 1024)} KB).`,
      context: ""
    });
    return out;
  }

  const raw = fs.readFileSync(file, "utf8");
  const { frontmatter, body } = parseFrontmatter(raw);

  // Frontmatter required
  if (!frontmatter) {
    out.push({
      severity: "HIGH",
      code: "MISSING_FRONTMATTER",
      file: rel(root, file),
      line: 1,
      match: "---",
      note: "Frontmatter ontbreekt (--- ... ---).",
      context: clampSnippet(raw.slice(0, 200))
    });
    return out;
  }

  for (const k of cfg.requiredFrontmatterKeys) {
    if (frontmatter[k] == null || String(frontmatter[k]).trim() === "") {
      out.push({
        severity: "HIGH",
        code: "MISSING_FRONTMATTER_KEY",
        file: rel(root, file),
        line: 1,
        match: k,
        note: `Frontmatter mist sleutel: ${k}`,
        context: ""
      });
    }
  }

  // Canonical should match slug
  if (frontmatter.slug && frontmatter.canonical) {
    const want = `/blog/${String(frontmatter.slug).trim().replace(/^\/+/, "")}`;
    const got = String(frontmatter.canonical).trim();
    if (got !== want) {
      out.push({
        severity: "MEDIUM",
        code: "CANONICAL_MISMATCH",
        file: rel(root, file),
        line: 1,
        match: `canonical=${got}`,
        note: `Canonical wijkt af van slug. Verwacht: ${want}`,
        context: ""
      });
    }
  }

  // SERP title length / avoid words
  if (frontmatter.title) {
    const title = String(frontmatter.title);
    if (title.length < cfg.serp.titleMin || title.length > cfg.serp.titleMax) {
      out.push({
        severity: "MEDIUM",
        code: "SERP_TITLE_LENGTH",
        file: rel(root, file),
        line: 1,
        match: `${title.length} chars`,
        note: `Title lengte buiten range (${cfg.serp.titleMin}-${cfg.serp.titleMax}).`,
        context: title
      });
    }
    const bad = containsAny(title, cfg.serp.avoidWordsInTitle);
    if (bad) {
      out.push({
        severity: "HIGH",
        code: "TITLE_FORBIDDEN_TERM",
        file: rel(root, file),
        line: 1,
        match: bad,
        note: "Title bevat term die frontstage/VR-frictie kan geven.",
        context: title
      });
    }
    const hasIntent = containsAny(title.toLowerCase(), cfg.serp.preferIntentWords);
    if (!hasIntent) {
      out.push({
        severity: "LOW",
        code: "SERP_INTENT_WEAK",
        file: rel(root, file),
        line: 1,
        match: "geen intent-woord",
        note: "Title is vrij abstract; overweeg ‘wat/wanneer/hoe/checklist/kader’.",
        context: title
      });
    }
  }

  // SERP description length
  if (frontmatter.description) {
    const d = String(frontmatter.description);
    if (d.length < cfg.serp.descriptionMin || d.length > cfg.serp.descriptionMax) {
      out.push({
        severity: "LOW",
        code: "SERP_DESCRIPTION_LENGTH",
        file: rel(root, file),
        line: 1,
        match: `${d.length} chars`,
        note: `Description lengte buiten range (${cfg.serp.descriptionMin}-${cfg.serp.descriptionMax}).`,
        context: d
      });
    }
  }

  // Required sections via headings
  const headings = findHeadingLines(body);
  const headingTexts = headings.map((h) => h.text.toLowerCase());

  for (const section of cfg.requiredSections) {
    const ok = headingTexts.some((t) => t.includes(section.toLowerCase()));
    if (!ok) {
      out.push({
        severity: "HIGH",
        code: "MISSING_REQUIRED_SECTION",
        file: rel(root, file),
        line: 1,
        match: section,
        note: `Mist verplichte sectie: ${section}`,
        context: ""
      });
    }
  }

  // Central component presence (so je niet elke blog vol plakt met dezelfde tekst)
  const compName = cfg.components?.centralKaderComponent;
  if (compName) {
    const has = new RegExp(`<\\s*${escapeRegex(compName)}\\b`, "i").test(body);
    if (!has) {
      out.push({
        severity: "MEDIUM",
        code: "MISSING_CENTRAL_KADER_COMPONENT",
        file: rel(root, file),
        line: 1,
        match: compName,
        note: `Gebruik centrale component voor ‘kader/afbakening’ om herhaling te voorkomen: <${compName} … />`,
        context: ""
      });
    } else {
      // validate variants
      const allowed = cfg.components.allowedVariants || [];
      const variantRe = new RegExp(`<\\s*${escapeRegex(compName)}[^>]*variant\\s*=\\s*["']([^"']+)["'][^>]*\\/?>`, "gi");
      let m;
      while ((m = variantRe.exec(body))) {
        const v = m[1];
        if (allowed.length && !allowed.includes(v)) {
          out.push({
            severity: "LOW",
            code: "UNKNOWN_COMPONENT_VARIANT",
            file: rel(root, file),
            line: 1,
            match: `variant=\"${v}\"`,
            note: `Onbekende variant. Toegestaan: ${allowed.join(", ")}`,
            context: clampSnippet(m[0])
          });
        }
      }
    }
  }

  // Tone checks: solution/guarantee, attack, price signals
  const bodyLower = body.toLowerCase();

  for (const phrase of cfg.tone.vrRiskPhrases) {
    if (bodyLower.includes(String(phrase).toLowerCase())) {
      out.push({
        severity: "HIGH",
        code: "VR_RISK_PHRASE",
        file: rel(root, file),
        line: 1,
        match: phrase,
        note: "Te oplossend/garantie-taal. VR/toezichthouder frictie.",
        context: clampSnippet(extractContext(body, phrase))
      });
    }
  }

  for (const phrase of cfg.tone.attackLanguage) {
    if (bodyLower.includes(String(phrase).toLowerCase())) {
      out.push({
        severity: "HIGH",
        code: "ATTACK_LANGUAGE",
        file: rel(root, file),
        line: 1,
        match: phrase,
        note: "Aanval-/beschuldigende taal richting marktpartijen. Houd het beschrijvend/neutraler.",
        context: clampSnippet(extractContext(body, phrase))
      });
    }
  }

  // Price signals: allow if “markers” also present nearby (rough heuristic)
  const priceSignals = cfg.tone.priceSignals || [];
  const markers = cfg.tone.allowedPriceContextMarkers || [];

  for (const sig of priceSignals) {
    const sigLower = String(sig).toLowerCase();
    if (sigLower === "%") {
      if (body.includes("%")) {
        const okMarker = containsAny(bodyLower, markers);
        out.push({
          severity: okMarker ? "LOW" : "MEDIUM",
          code: "PRICE_SIGNAL",
          file: rel(root, file),
          line: 1,
          match: "%",
          note: okMarker
            ? "Prijs/percentage-context: lijkt beschrijvend (markers aanwezig)."
            : "Prijs/percentage-taal zonder duidelijke context/bronmarker.",
          context: "%"
        });
      }
      continue;
    }

    if (sigLower === "€") {
      if (body.includes("€")) {
        const okMarker = containsAny(bodyLower, markers);
        out.push({
          severity: okMarker ? "LOW" : "MEDIUM",
          code: "PRICE_SIGNAL",
          file: rel(root, file),
          line: 1,
          match: "€",
          note: okMarker
            ? "Bedragen lijken bron-/contextgeduid (markers aanwezig)."
            : "Bedragen zonder duidelijke bron-/contextduiding.",
          context: "€"
        });
      }
      continue;
    }

    if (bodyLower.includes(sigLower)) {
      const okMarker = containsAny(bodyLower, markers);
      out.push({
        severity: okMarker ? "LOW" : "MEDIUM",
        code: "PRICE_SIGNAL",
        file: rel(root, file),
        line: 1,
        match: sig,
        note: okMarker
          ? "Prijs-/verdienmodeltaal lijkt beschrijvend (markers aanwezig)."
          : "Prijs-/verdienmodeltaal: zet expliciet ‘context/indicatief/bron’ erbij of herformuleer.",
        context: clampSnippet(extractContext(body, sig))
      });
    }
  }

  // VR whitelist density: if too low -> tone might be “opinion essay” ipv kader
  const hits = countWhitelistHits(body, cfg.tone.vrWhitelist || []);
  if (hits < 2) {
    out.push({
      severity: "LOW",
      code: "VR_TONE_THIN",
      file: rel(root, file),
      line: 1,
      match: `${hits} whitelist hits`,
      note: "Weinig VR/Bbl-ankerwoorden. Overweeg 1–2 neutrale kader-termen (risicobeoordeling, vergunningvoorschrift, beheersmaatregel).",
      context: ""
    });
  }

  return out;
}

function extractContext(text, match, radius = 90) {
  const i = text.toLowerCase().indexOf(String(match).toLowerCase());
  if (i === -1) return "";
  const start = Math.max(0, i - radius);
  const end = Math.min(text.length, i + String(match).length + radius);
  return text.slice(start, end);
}

function walkFiles(rootDir, cfg) {
  const results = [];
  const includeAbs = (cfg.scan.include || []).map((p) => path.join(rootDir, p));
  const exDirs = new Set((cfg.scan.excludeDirs || []).map((x) => x.toLowerCase()));

  const exts = new Set((cfg.scan.extensions || []).map((e) => e.toLowerCase()));

  function walk(dir) {
    const base = path.basename(dir).toLowerCase();
    if (exDirs.has(base)) return;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const ent of entries) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(p);
      } else if (ent.isFile()) {
        const ext = path.extname(ent.name).toLowerCase();
        if (!exts.has(ext)) continue;
        results.push(p);
      }
    }
  }

  for (const inc of includeAbs) {
    if (isDir(inc)) walk(inc);
  }

  return results;
}

function main() {
  const root = path.resolve(argValue("--root", "."));
  const configPath = path.resolve(argValue("--config", "scripts/blog/vr-blog-guard.config.json"));

  if (!isFile(configPath)) {
    console.error(`${ANSI.red}Config not found:${ANSI.reset} ${configPath}`);
    process.exit(1);
  }

  const cfg = readJson(configPath);

  console.log(`=== ProBrandwacht VR Blog Guard ===`);
  console.log(`Root: ${root}`);
  console.log(`Config: ${configPath}`);
  console.log(`Scan: ${cfg.scan.include.join(", ")}  (${cfg.scan.extensions.join(", ")})`);
  console.log(`Max file size: ${Math.round(cfg.scan.maxFileSizeBytes / 1024)} KB\n`);

  const files = walkFiles(root, cfg);
  let findings = [];

  for (const file of files) {
    findings = findings.concat(scanFile({ root, file, cfg }));
  }

  // Sort by severity
  const weight = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  findings.sort((a, b) => (weight[b.severity] ?? 0) - (weight[a.severity] ?? 0));

  const high = findings.filter((x) => x.severity === "HIGH").length;
  const med = findings.filter((x) => x.severity === "MEDIUM").length;
  const low = findings.filter((x) => x.severity === "LOW").length;

  console.log(`Files scanned: ${files.length}`);
  console.log(`Findings: ${findings.length} (HIGH ${high}, MEDIUM ${med}, LOW ${low})\n`);

  if (!findings.length) {
    console.log(`${ANSI.green}✔️ Geen issues gevonden.${ANSI.reset}`);
    process.exit(0);
  }

  for (const f of findings) {
    const color =
      f.severity === "HIGH" ? ANSI.red :
      f.severity === "MEDIUM" ? ANSI.yellow :
      ANSI.cyan;

    console.log(`[${color}${f.severity}${ANSI.reset}] ${f.code}`);
    console.log(`  File: ${f.file}${f.line ? `:${f.line}` : ""}`);
    console.log(`  Match: ${f.match}`);
    console.log(`  Note: ${f.note}`);
    if (f.context) console.log(`  Context: ${f.context}`);
    console.log("");
  }

  // Exit code: fail on HIGH by default
  process.exit(high > 0 ? 2 : 0);
}

main();
