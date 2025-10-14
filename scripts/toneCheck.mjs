#!/usr/bin/env node
/**
 * Tone of Voice checker (JS/ESM)
 * - Scant .ts/.tsx/.md/.mdx op "harde" woorden en doet herformulatievoorstellen
 * - Telt positieve TOV-signalen (transparantie, balans, bronnen)
 * - Rapporteert KPI's + Tone Score (0–100)
 *
 * CLI:
 *   --root=<dir>               (default: ".")
 *   --exts=.ts,.tsx,.md,.mdx   (default)
 *   --ignore=dir1,dir2         (default: node_modules,.next,build,dist,.git)
 *   --exitOnIssues=1           (default: 1)
 *   --json=1                   (default: 0)
 */

import fs from "node:fs";
import path from "node:path";

// CLI setup
const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

const ROOT = typeof argv.root === "string" ? path.resolve(argv.root) : process.cwd();
const EXTS = (argv.exts || ".ts,.tsx,.md,.mdx").split(",").map((s) => s.trim());
const IGNORE_DIRS = new Set(
  (argv.ignore || "node_modules,.next,build,dist,.git,docs").split(",").map((s) => s.trim())
);
const EXIT_ON_ISSUES = String(argv.exitOnIssues ?? "1") === "1";
const JSON_OUT = String(argv.json ?? "0") === "1";
const ALLOW_WORDS = new Set(["schijnzelfstandigheid"]);
const TLDR_DOUBLE_WARN = true;

// Tone rules (afgestemd op docs/TONE_OF_VOICE.md)
const HARD_WORDS = [
  "kapotmaken",
  "uitbuiting",
  "profiteren",
  "oneerlijk",
  "strijd",
  "vechten",
  "schaamteloos",
  "slachtoffer",
  "uitzendconstructie",
  "payroll",
  "tussenpersoon",
  "schijnzelfstandigheid",
  "verloning",
  "detacheerder",
  "uitzendbureau",
  "tussenpartij",
  "uitzendmodel",
  "recruiter",
  "commercieel marge",
];

const SUGGESTIONS = {
  oneerlijk: "niet transparant / uit balans",
  profiteren: "risico’s doorschuiven / margeverschil",
  strijd: "verandering / verbetering",
  vechten: "werken aan / streven naar",
  kapotmaken: "verzwakken / onder druk zetten",
  uitbuiting: "structurele scheefgroei",
  schaamteloos: "onwenselijk / niet passend",
  slachtoffer: "benadeelde partij / nadeel",
  uitzendconstructie: "bemiddelingsmodel / externe keten",
  payroll: "verloningsmodel / tussencontract",
  tussenpersoon: "intermediair / ketenpartij",
  schijnzelfstandigheid: "onduidelijke contractvorm / hybride constructie",
  verloning: "doorbetaling / administratieve afhandeling",
  detacheerder: "intermediair / specialistisch bureau",
  uitzendbureau: "arbeidsbemiddelaar / ketenpartner",
  tussenpartij: "intermediair",
  uitzendmodel: "klassiek bemiddelingsmodel",
  recruiter: "bemiddelaar / intermediair",
  "commercieel marge": "organisatie-opslag / bemiddelingsfee",
};

// Positieve signalen (goed voor TOV-score)
const POSITIVE_KEYWORDS = [
  "transparantie",
  "kostendekkend",
  "balans",
  "duurzaam model",
  "verantwoordelijkheid",
  "bron",
  "cbs",
  "statline",
  "cao",
];

const CONTENT_EXTS = new Set([".md", ".mdx"]);
const CODE_PENALTY_MULTIPLIER = 0.5; // code telt half

// Helpers
function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (EXTS.includes(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function scanFile(file) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const issues = [];
  const positives = new Set();
  let words = 0;

  lines.forEach((raw, idx) => {
    const line = raw.toLowerCase();
    words += (raw.match(/\S+/g) || []).length;

    HARD_WORDS.forEach((word) => {
      if (ALLOW_WORDS.has(word)) return;
      const pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (pattern.test(line)) {
        const suggestion = SUGGESTIONS[word] ?? "(herformuleer richting systeemtaal)";
        issues.push({
          file,
          line: idx + 1,
          found: word,
          suggestion,
          preview: raw.trim().slice(0, 160),
          ext: path.extname(file),
        });
      }
    });

    POSITIVE_KEYWORDS.forEach((kw) => {
      if (line.includes(kw)) positives.add(kw);
    });
  });

  if (TLDR_DOUBLE_WARN && path.extname(file) === '.mdx') {
    const hasTag = /<Tldr[\s>]/i.test(text)
    const hasFrontmatter = /^---[\s\S]*?\btldr\s*:\s*.+?[\r\n]/m.test(text)
    if (hasTag && hasFrontmatter) {
      issues.push({
        file,
        line: 1,
        found: 'TLDR_DUPLICATE',
        suggestion: 'Verwijder <Tldr> uit de body of gebruik alleen frontmatter tldr; houd één bron aan.',
        preview: 'MDX bevat zowel frontmatter `tldr:` als een `<Tldr>`-component.',
        ext: '.mdx',
      })
    }
  }

  return { issues, positives: [...positives], words };
}

function formatIssues(issues) {
  return issues
    .map(
      (it) =>
        `• ${it.file}:${it.line} — '${it.found}' → voorstel: ${it.suggestion}\n  ↳ ${it.preview}`
    )
    .join("\n");
}

// Main
console.log(`🔍 Tone check gestart — root: ${ROOT}`);
const files = walk(ROOT);
let allIssues = [];
let allWords = 0;
const seenPositives = new Set();

for (const file of files) {
  const { issues, positives, words } = scanFile(file);
  allIssues = allIssues.concat(issues);
  allWords += words;
  positives.forEach((p) => seenPositives.add(p));
}

const totalFiles = files.length;
const totalIssues = allIssues.length;
const issuesInContent = allIssues.filter((i) => CONTENT_EXTS.has(i.ext)).length;
const issuesInCode = totalIssues - issuesInContent;
const weightedIssues = issuesInContent + issuesInCode * CODE_PENALTY_MULTIPLIER;
const wordsPerIssue = totalIssues > 0 ? Math.round(allWords / totalIssues) : null;
const wordsPerWeightedIssue = weightedIssues > 0 ? Math.round(allWords / weightedIssues) : null;
const penalty = Math.min(100, Math.round((weightedIssues / Math.max(1, allWords)) * 100000));
const toneScore = Math.max(0, 100 - penalty);

const report = {
  root: ROOT,
  filesScanned: totalFiles,
  wordsScanned: allWords,
  issues: {
    total: totalIssues,
    inContent: issuesInContent,
    inCode: issuesInCode,
    weighted: weightedIssues,
    wordsPerIssue,
    wordsPerWeightedIssue,
  },
  positives: {
    uniqueSignals: [...seenPositives].sort(),
    count: seenPositives.size,
  },
  toneScore,
  findings: allIssues.map(({ file, line, found, suggestion, preview }) => ({
    file,
    line,
    found,
    suggestion,
    preview,
  })),
};

// Output
if (JSON_OUT) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`📄 Files: ${report.filesScanned}   🔤 Words: ${report.wordsScanned}
⚠️ Issues: ${report.issues.total} (content: ${report.issues.inContent}, code: ${report.issues.inCode})
📊 Dichtheid: ${report.issues.wordsPerIssue ?? "∞"} woorden/issue
✅ Positieve signalen (${report.positives.count}): ${report.positives.uniqueSignals.join(", ") || "—"}
🏁 Tone Score: ${report.toneScore}/100`);

  if (allIssues.length) {
    console.log("\nDetails:\n" + formatIssues(allIssues));
    console.log("\n🧭 Tip: herformuleer volgens docs/TONE_OF_VOICE.md.");
  } else {
    console.log("\n✅ Geen toonafwijkingen gevonden. Je copy is netjes in balans!");
  }
}

if (EXIT_ON_ISSUES && allIssues.length > 0) process.exitCode = 1;
