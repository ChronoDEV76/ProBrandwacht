#!/usr/bin/env node
/**
 * content-consistency.v2.mjs
 *
 * Doel:
 * - Bewaakt “structurele” consistentie zonder copy fragiel te maken.
 * - Geen harde garanties/claims afdwingen; wel: aanwezigheid van nuance-woorden op kernpagina’s.
 * - Links/CTA’s checken op intentie (anyOf) i.p.v. exacte string.
 * - Forbidden economische claims (platformfee/10% etc.) met regex.
 *
 * Gebruik:
 *   node scripts/content/content-consistency.v2.mjs
 *   node scripts/content/content-consistency.v2.mjs --root=.
 *   node scripts/content/content-consistency.v2.mjs --strict
 *   node scripts/content/content-consistency.v2.mjs --json=reports/content-consistency.json
 *
 * Exit codes:
 * - 0 = OK (of alleen WARN in non-strict)
 * - 1 = FAIL
 */

import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const out = {
    root: process.cwd(),
    strict: false,
    json: null,
    quiet: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;

    if (a.includes("=")) {
      const [k, v] = a.slice(2).split("=");
      out[k] = v ?? true;
      continue;
    }

    const key = a.slice(2);
    if (key === "strict") out.strict = true;
    else if (key === "quiet") out.quiet = true;
    else {
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const ROOT = path.resolve(String(args.root || process.cwd()));
const STRICT = !!args.strict;

const ICON = {
  ok: "✅",
  warn: "⚠️",
  fail: "❌",
  info: "ℹ️",
};

function rel(p) {
  return path.relative(ROOT, p).replaceAll("\\", "/");
}

function exists(fileRel) {
  return fs.existsSync(path.join(ROOT, fileRel));
}

function read(fileRel) {
  return fs.readFileSync(path.join(ROOT, fileRel), "utf8");
}

function ensureDir(dirAbs) {
  fs.mkdirSync(dirAbs, { recursive: true });
}

function listFilesUnder(dirRel, exts = [".ts", ".tsx", ".mdx", ".md", ".mjs", ".js"]) {
  const dirAbs = path.join(ROOT, dirRel);
  if (!fs.existsSync(dirAbs)) return [];
  const out = [];

  const walk = (curAbs) => {
    const items = fs.readdirSync(curAbs, { withFileTypes: true });
    for (const it of items) {
      const p = path.join(curAbs, it.name);
      if (it.isDirectory()) walk(p);
      else if (exts.includes(path.extname(it.name))) out.push(p);
    }
  };

  walk(dirAbs);
  return out.map((p) => rel(p));
}

function normalizeText(s) {
  return String(s || "")
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ");
}

function findLineNumber(hay, idx) {
  // 1-indexed
  let line = 1;
  for (let i = 0; i < idx && i < hay.length; i++) {
    if (hay[i] === "\n") line++;
  }
  return line;
}

function firstMatchLine(text, reOrNeedle) {
  if (typeof reOrNeedle === "string") {
    const idx = text.indexOf(reOrNeedle);
    if (idx === -1) return null;
    return findLineNumber(text, idx);
  }
  const m = reOrNeedle.exec(text);
  if (!m || m.index == null) return null;
  return findLineNumber(text, m.index);
}

function hasAnyOf(textLower, anyOf) {
  return anyOf.some((n) => textLower.includes(String(n).toLowerCase()));
}

function matchAnyRegex(text, regexList) {
  const hits = [];
  for (const re of regexList) {
    re.lastIndex = 0;
    if (re.test(text)) hits.push(re);
  }
  return hits;
}

// ------------------------------
// Rules (v2)
// ------------------------------

// 1) Core “files should exist” – structure guard only
const MUST_EXIST = [
  "app/(site)/page.tsx",
  "app/(site)/opdrachtgevers/page.tsx",
  "app/(site)/voor-brandwachten/page.tsx",
  "app/(site)/belangen/page.tsx",
  "app/(site)/over-ons/page.tsx",
];

// 2) Intent / navigation checks – anyOf instead of exact strings
// (je wil niet dat een kleine URL/CTA wijziging je pipeline breekt)
const MUST_CONTAIN_INTENT = [
  {
    file: "app/(site)/page.tsx",
    label: "Homepage moet verwijzen naar 2 kanten van het platform",
    anyOfAll: [
      ["/opdrachtgevers"],
      ["/voor-brandwachten", "/brandwachten"],
    ],
  },
  {
    file: "app/(site)/opdrachtgevers/page.tsx",
    label: "Opdrachtgevers pagina moet CTA of aanmelding bevatten",
    anyOfAll: [
      ["/opdrachtgevers/aanmelden", "aanmelden", "contact"],
    ],
  },
  {
    file: "app/(site)/voor-brandwachten/page.tsx",
    label: "Voor-brandwachten pagina moet CTA of aanmelding bevatten",
    anyOfAll: [
      ["/zzp/aanmelden", "/brandwachten/aanmelden", "aanmelden"],
    ],
  },
];

// 3) Nuance guard – verwacht minstens 1 nuance term op kernpagina’s
// (geen garanties; wél “in de regel”, “indicatief”, “contextafhankelijk”…)
const NUANCE_TERMS = [
  "indicatief",
  "contextafhankelijk",
  "in de regel",
  "afhankelijk van",
  "geen garantie",
  "soms",
  "meestal",
  "in de meeste gevallen",
];

const MUST_HAVE_NUANCE = [
  "app/(site)/page.tsx",
  "app/(site)/opdrachtgevers/page.tsx",
  "app/(site)/voor-brandwachten/page.tsx",
  "app/(site)/over-ons/page.tsx",
];

// 4) Economic claims in copy (regex)
// - HARD: numbers/percentages -> warn (or fail in strict)
// - SOFT: "platformfee" -> info (or ignore)
const ECONOMIC_HARD = [
  /\b10%\b/,
  /\b90%\b/,
  /\bplatformfee\s*van\s*10%\b/i,
  /\bprofessionals?\s+houden\s+90%\b/i,
  /\bvaste\s+marge\b/i,
  /\bwij\s+houden\s+.*\b(%)\b/i,
];

const ECONOMIC_SOFT = [/\bplatformfee\b/i];

// 5) Optional: “dangerous absolutes” warning (niet fail) – als extra vangnet.
// Let op: Tone Guard doet dit al; hier blijft het licht.
const ABSOLUTE_WARNING = [
  /\b(altijd|nooit|100%|gegarandeerd|zeker weten|binnen\s+enkele\s+minuten)\b/gi,
];

// Where to scan (lightweight)
const SCAN_DIRS = [
  "app/(site)",
  "components",
  "content/blog",
  "lib",
  "docs",
];

const IGNORE_FILE_RE = /\.(backup|bak)\.(ts|tsx|mdx|md|js|mjs)$/i;

// ------------------------------
// Runner
// ------------------------------
const report = {
  tool: "content-consistency.v2",
  root: ROOT,
  strict: STRICT,
  scannedAt: new Date().toISOString(),
  summary: { ok: 0, warn: 0, fail: 0, info: 0 },
  checks: [],
  notes: [],
};

function addCheck(level, code, message, meta = {}) {
  report.checks.push({ level, code, message, ...meta });
  report.summary[level]++;

  if (!args.quiet) {
    const icon = ICON[level] ?? ICON.info;
    const loc = meta?.file ? ` (${meta.file}${meta.line ? ":" + meta.line : ""})` : "";
    console.log(`${icon} [${level.toUpperCase()}] ${code}: ${message}${loc}`);
  }
}

function header(title) {
  if (!args.quiet) {
    console.log("\n" + "—".repeat(90));
    console.log(title);
    console.log("—".repeat(90));
  }
}

header("🔎 Content Consistency v2 — structure + intent + nuance (non-fragile)");

// 1) Must exist
for (const f of MUST_EXIST) {
  if (!exists(f)) addCheck("fail", "MISSING_FILE", `Bestand ontbreekt`, { file: f });
  else addCheck("ok", "FOUND_FILE", `Bestand gevonden`, { file: f });
}

// 2) Must contain intent
for (const rule of MUST_CONTAIN_INTENT) {
  if (!exists(rule.file)) continue;
  const txt = normalizeText(read(rule.file));
  const lower = txt.toLowerCase();

  let ok = true;
  for (const anyOf of rule.anyOfAll) {
    if (!hasAnyOf(lower, anyOf)) {
      ok = false;
      addCheck(
        "fail",
        "INTENT_MISSING",
        rule.label || "Intent ontbreekt",
        { file: rule.file, expectedAnyOf: anyOf }
      );
    }
  }
  if (ok) addCheck("ok", "INTENT_OK", rule.label || "Intent OK", { file: rule.file });
}

// 3) Must have nuance (WARN in non-strict, FAIL in strict)
for (const f of MUST_HAVE_NUANCE) {
  if (!exists(f)) continue;
  const txt = normalizeText(read(f));
  const lower = txt.toLowerCase();

  if (!hasAnyOf(lower, NUANCE_TERMS)) {
    const lvl = STRICT ? "fail" : "warn";
    addCheck(
      lvl,
      "NUANCE_MISSING",
      `Geen nuance-term gevonden (verwacht één van: ${NUANCE_TERMS.slice(0, 6).join(", ")}...)`,
      { file: f }
    );
  } else {
    addCheck("ok", "NUANCE_OK", "Nuance-term aanwezig", { file: f });
  }
}

// 4) Scan for forbidden economic claims (WARN in non-strict, FAIL in strict)
// Only scan content-ish areas (dirs)
header("📂 Scan directories (forbidden claims + light absolute warnings)");
const files = [];
for (const d of SCAN_DIRS) {
  files.push(...listFilesUnder(d));
}
const uniqFiles = [...new Set(files)].filter((f) => !IGNORE_FILE_RE.test(f));

for (const f of uniqFiles) {
  if (!exists(f)) continue;
  const txt = normalizeText(read(f));

  // Economic claims
  const hardHits = matchAnyRegex(txt, ECONOMIC_HARD);
  if (hardHits.length) {
    const lvl = STRICT ? "fail" : "warn";
    const first = hardHits[0];
    const line = firstMatchLine(txt, new RegExp(first.source, first.flags)) ?? undefined;
    addCheck(
      lvl,
      "ECONOMIC_HARD",
      `Economische claim met harde cijfers gevonden (${hardHits
        .map((h) => h.toString())
        .join(", ")})`,
      { file: f, line }
    );
  }

  const softHits = matchAnyRegex(txt, ECONOMIC_SOFT);
  if (softHits.length) {
    const first = softHits[0];
    const line = firstMatchLine(txt, new RegExp(first.source, first.flags)) ?? undefined;
    addCheck(
      "info",
      "ECONOMIC_SOFT",
      `Economische term gevonden (${softHits.map((h) => h.toString()).join(", ")})`,
      { file: f, line }
    );
  }

  // Light absolute warning (optional)
  for (const re of ABSOLUTE_WARNING) {
    re.lastIndex = 0;
    const m = re.exec(txt);
    if (m) {
      const line = m.index != null ? findLineNumber(txt, m.index) : undefined;
      addCheck(
        "warn",
        "ABSOLUTE_LANGUAGE",
        `Mogelijk te absolute term gevonden (“${m[0]}”)`,
        { file: f, line }
      );
      break;
    }
  }
}

// 5) Output JSON
const jsonOut = args.json
  ? path.resolve(ROOT, String(args.json))
  : path.resolve(ROOT, "reports", "content-consistency.json");

ensureDir(path.dirname(jsonOut));
fs.writeFileSync(jsonOut, JSON.stringify(report, null, 2), "utf8");

header("📊 Summary");
if (!args.quiet) {
  console.log(`OK:   ${report.summary.ok}`);
  console.log(`WARN: ${report.summary.warn}`);
  console.log(`FAIL: ${report.summary.fail}`);
  console.log(`INFO: ${report.summary.info}`);
  console.log(`\n📝 JSON report: ${rel(jsonOut)}`);
}

// Exit logic:
// - strict: any FAIL => exit 1
// - non-strict: allow WARN, but FAIL still exits 1 (missing files/intent are fails)
const shouldFail = report.summary.fail > 0;
process.exit(shouldFail ? 1 : 0);
