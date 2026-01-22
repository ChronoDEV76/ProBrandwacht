#!/usr/bin/env node
/**
 * Copy audit for /app (Next.js)
 * Requirements:
 * 1) Ethos/waarden (app-wide): safety-leading + honesty/traceable language
 * 2) Warn (per-file) for stigmatizing/excluding language about "type brandwacht"
 * 3) Require (app-wide) at least one inclusive-intent sentence:
 *    "iedereen mag inschrijven/aanmelden zolang intenties kloppen/passen"
 * 4) Warn (per-file) for strategically risky positioning tone:
 *    - moral superiority ("wij zijn de enige")
 *    - attacks on bureaus/market/clients
 *    - society/politics rants
 *
 * Output:
 * - CLI report
 * - Optional JSON report (--json)
 * - Includes evidence: first match + counts for each required signal
 *
 * Run:
 *   node scripts/qa/copy-audit-app.mjs
 *   node scripts/qa/copy-audit-app.mjs --json copy-audit.json
 *   node scripts/qa/copy-audit-app.mjs --root . --app app
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const SEV_ORDER = { ERROR: 0, WARN: 1, INFO: 2 };

function parseArgs(argv) {
  const args = {
    root: ".",
    app: "app",
    json: null,
    includeExt: [".ts", ".tsx", ".js", ".jsx", ".md", ".mdx", ".json", ".txt", ".html"],
    excludeDirs: ["node_modules", ".next", "dist", "build", ".git"],
    maxExcerpt: 240,
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = argv[i + 1];

    if (a === "--root" && next) args.root = next, i++;
    else if (a === "--app" && next) args.app = next, i++;
    else if (a === "--json" && next) args.json = next, i++;
    else if (a === "--ext" && next) args.includeExt = next.split(",").map((s) => s.trim()), i++;
    else if (a === "--exclude" && next) args.excludeDirs = next.split(",").map((s) => s.trim()), i++;
    else if (a === "--help") {
      console.log(`
Usage:
  node scripts/qa/copy-audit-app.mjs [--root .] [--app app] [--json out.json]
Options:
  --ext .ts,.tsx,.mdx     Comma-separated extensions to scan
  --exclude node_modules,.next,dist,build,.git
`);
      process.exit(0);
    }
  }
  return args;
}

function walkFiles(dir, options, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (options.excludeDirs.includes(e.name)) continue;
      walkFiles(full, options, out);
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase();
      if (options.includeExt.includes(ext)) out.push(full);
    }
  }
  return out;
}

function readText(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return fs.readFileSync(file).toString();
  }
}

function findRegexLines(text, regex) {
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const lineText = lines[i];
    if (regex.test(lineText)) {
      hits.push({ line: i + 1, excerpt: lineText.trim() });
    }
    if (regex.global) regex.lastIndex = 0;
  }
  return hits;
}

function anyMatch(text, patterns) {
  return patterns.some((p) => new RegExp(p, "i").test(text));
}

function makeFinding({ severity, ruleId, file, line, excerpt, message }) {
  return { severity, ruleId, file, line, excerpt, message };
}

/**
 * Evidence helpers:
 * - firstMatchContext: locate the first line in the app files that matches any pattern
 * - countMatchesInText: count lines matching any pattern in the concatenated app text
 */
function firstMatchContext(allFiles, patterns, options) {
  const compiled = patterns.map((p) => new RegExp(p, "i"));
  for (const file of allFiles) {
    const text = readText(file);
    const lines = text.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (compiled.some((rx) => rx.test(line))) {
        return {
          file,
          line: i + 1,
          excerpt: line.trim().slice(0, options.maxExcerpt),
        };
      }
    }
  }
  return null;
}

function countMatchesInText(text, patterns) {
  const compiled = patterns.map((p) => new RegExp(p, "i"));
  const lines = text.split(/\r?\n/);
  let count = 0;
  for (const line of lines) {
    if (compiled.some((rx) => rx.test(line))) count++;
  }
  return count;
}

/**
 * Criteria:
 * - ETHOS: safety leading AND honesty/traceable language must be present somewhere in /app
 * - INCLUSION/INTENT: must have at least one inclusive sentence (app-wide)
 * - STIGMA: warn if language stigmatizes "types" or generalizes/insults brandwachten
 * - POSITIONING TONE: warn if copy creates unnecessary enemies (bureaus/clients/society rant)
 */

// --- Ethos signals (app-wide) ---
const ETHOS_SIGNALS = {
  safety_leading: {
    patterns: [
      "veiligheid\\s+(is|blijft)\\s+leidend",
      "veiligheid\\s+staat\\s+voorop",
    ],
    errorMessage:
      "Ethos mist expliciete keuze: ‘veiligheid is/blijft leidend’ of ‘veiligheid staat voorop’ in /app.",
    fixHint:
      "Voeg 1 duidelijke zin toe (bijv. in hero/mission): ‘Veiligheid blijft leidend.’",
  },
  honesty_traceable: {
    patterns: [
      "eerlijk",
      "transparan", // transparant/transparantie
      "toetsbaar",
      "bewijs",
      "uitlegbaar",
    ],
    errorMessage:
      "Ethos mist expliciete taal over eerlijkheid/toetsbaarheid (eerlijk/transparant/toetsbaar/bewijs/uitlegbaar) in /app.",
    fixHint:
      "Voeg 1 duidelijke zin toe (bijv.): ‘We werken eerlijk en toetsbaar: afspraken en uitvoering die uitlegbaar zijn.’",
  },
};

// --- Required inclusivity+intent sentence (app-wide) ---
const INCLUSION_INTENT = {
  patterns: [
    // "iedereen" + (inschrijven|aanmelden) + intentie(s) + (kloppen|passen)
    "iedereen\\s+.*\\b(inschrijven|aanmelden)\\b.*\\bintenties?\\b.*\\b(kloppen|passen)\\b",
    // variant order
    "iedereen\\s+.*\\bintenties?\\b.*\\b(kloppen|passen)\\b.*\\b(inschrijven|aanmelden)\\b",
  ],
  errorMessage:
    "Ontbreekt: minimaal één inclusieve intentiezin (‘iedereen mag inschrijven/aanmelden zolang intenties kloppen/passen’) in /app.",
  fixHint:
    "Voeg 1 zin toe op een zichtbare plek: ‘Iedereen mag zich inschrijven — zolang je intenties kloppen met onze manier van werken.’",
};

// --- Stigma/exclusion warnings (per-file) ---
const STIGMA_RULES = [
  {
    id: "STIGMA.TYPE_LABELING",
    severity: "WARN",
    pattern:
      "\\b(type|soort)\\s+brandwacht(en)?\\b.*\\b(slecht|lui|dom|waardeloos|onbetrouwbaar|prutser)\\b",
    message:
      "Vermijd stigmatiserende labels over ‘types brandwachten’. Richt op gedrag/criteria, niet op personen.",
  },
  {
    id: "STIGMA.GENERALIZATION",
    severity: "WARN",
    pattern: "\\b(altijd|nooit|allemaal|elke|iedere)\\s+brandwacht(en)?\\b",
    message:
      "Pas op met generalisaties over brandwachten (‘altijd/nooit/allemaal’). Kan stigmatiserend overkomen.",
  },
  {
    id: "STIGMA.INSULTS",
    severity: "WARN",
    pattern: "\\b(waardeloos|onnozel|dom|lui|prutser|sukkel)\\b",
    message:
      "Let op negatieve labels/insults. Houd het bij feitelijk gedrag en criteria.",
  },
  {
    id: "STIGMA.EXCLUDING_GROUPS",
    severity: "WARN",
    pattern:
      "\\b(geen\\s+plek\\s+voor|niet\\s+welkom|wij\\s+willen\\s+geen)\\b.*\\b(brandwacht|brandwachten)\\b",
    message:
      "Wees voorzichtig met uitsluitende formuleringen. Beter: ‘Iedereen mag inschrijven; we selecteren op intentie en gedrag.’",
  },
];

// --- Strategisch riskante tone (per-file) ---
const POSITIONING_RULES = [
  {
    id: "POS.MORAL_SUPERIORITY",
    severity: "WARN",
    pattern:
      "\\b(wij\\s+zijn\\s+(de\\s+enige|de\\s+eerste)|als\\s+enige|niemand\\s+anders)\\b",
    message:
      "Pas op met ‘wij zijn de enige/de eerste’-claims. Dat roept weerstand op. Beter: laat verschil blijken uit werkwijze/criteria.",
  },
  {
    id: "POS.ATTACK_BUREAUS_MARKT",
    severity: "WARN",
    pattern:
      "(\\b(bureaus?|bureau's)\\b.*\\b(verpest|verkloot|fraude|rot|waardeloos|oneerlijk|bedrog|maffia)\\b)|" +
      "(\\b(verpest|verkloot)\\b.*\\bmarkt\\b)",
    message:
      "Vermijd aanvallende taal richting bureaus/markt (‘markt verpest’, ‘bedrog’, etc.). Hou focus op ‘zo werken wij’ i.p.v. ‘zij doen het fout’.",
  },
  {
    id: "POS.ATTACK_CLIENTS",
    severity: "WARN",
    pattern:
      "\\b(opdrachtgever(s)?|klanten)\\b.*\\b(snappen\\s+het\\s+niet|willen\\s+niet|geven\\s+niets\\s+om|boeit\\s+niet)\\b",
    message:
      "Vermijd beschuldigende taal richting opdrachtgevers/klanten. Formuleer neutraler (beschrijf situatie, niet schuld).",
  },
  {
    id: "POS.SOCIETY_RANT",
    severity: "WARN",
    pattern:
      "\\b(maatschappij|politiek|straatcultuur)\\b.*\\b(list\\s+en\\s+bedrog|bedrog|hypocriet|verrot|harder\\s+wordt)\\b",
    message:
      "Let op maatschappij/politiek/straatcultuur-rants in websitecopy. Kan onnodig afstoten. Houd de site professioneel en oplossingsgericht.",
  },
  {
    id: "POS.PAPER_SAFETY_TONE",
    severity: "WARN",
    pattern:
      "\\b(papieren\\s+must|afvink|compliance\\s+onzin|alleen\\s+voor\\s+papier)\\b",
    message:
      "‘Papieren must/afvink’ kan kloppen, maar klinkt snel denigrerend. Overweeg neutraler: ‘veiligheid wordt soms administratief ingestoken; wij brengen toetsbaarheid en uitvoering terug’.",
  },
];

function auditApp({ rootDir, appDir, options }) {
  const appPath = path.resolve(rootDir, appDir);
  if (!fs.existsSync(appPath)) throw new Error(`App directory not found: ${appPath}`);

  const files = walkFiles(appPath, options);
  const findings = [];

  // Build one big text blob for app-wide checks
  let allText = "";
  for (const f of files) allText += "\n" + readText(f);

  // Evidence and counts for required signals
  const matchEvidence = {};
  const matchCounts = {};

  // 1) Ethos checks (app-wide)
  const signals = {};
  for (const [key, cfg] of Object.entries(ETHOS_SIGNALS)) {
    const ok = anyMatch(allText, cfg.patterns);
    signals[key] = ok;

    matchCounts[key] = countMatchesInText(allText, cfg.patterns);
    const ctx = firstMatchContext(files, cfg.patterns, options);
    matchEvidence[key] = ctx
      ? {
          file: path.relative(path.resolve(rootDir), ctx.file),
          line: ctx.line,
          excerpt: ctx.excerpt,
        }
      : null;

    if (!ok) {
      findings.push(
        makeFinding({
          severity: "ERROR",
          ruleId: `ETHOS.${key.toUpperCase()}`,
          file: "(app-wide)",
          line: 0,
          excerpt: "",
          message: `${cfg.errorMessage} Fix: ${cfg.fixHint}`,
        })
      );
    }
  }

  // 2) Inclusion/intent required (app-wide)
  const inclusionOk = anyMatch(allText, INCLUSION_INTENT.patterns);
  signals.inclusion_intent_sentence = inclusionOk;

  matchCounts.inclusion_intent_sentence = countMatchesInText(allText, INCLUSION_INTENT.patterns);
  const ictx = firstMatchContext(files, INCLUSION_INTENT.patterns, options);
  matchEvidence.inclusion_intent_sentence = ictx
    ? {
        file: path.relative(path.resolve(rootDir), ictx.file),
        line: ictx.line,
        excerpt: ictx.excerpt,
      }
    : null;

  if (!inclusionOk) {
    findings.push(
      makeFinding({
        severity: "ERROR",
        ruleId: "REQ.INCLUSION_INTENT",
        file: "(app-wide)",
        line: 0,
        excerpt: "",
        message: `${INCLUSION_INTENT.errorMessage} Fix: ${INCLUSION_INTENT.fixHint}`,
      })
    );
  }

  // 3) Per-file scans (stigma + positioning tone)
  for (const f of files) {
    const rel = path.relative(path.resolve(rootDir), f);
    const text = readText(f);

    for (const rule of STIGMA_RULES) {
      const rx = new RegExp(rule.pattern, "i");
      const hits = findRegexLines(text, rx);
      for (const h of hits) {
        findings.push(
          makeFinding({
            severity: rule.severity,
            ruleId: rule.id,
            file: rel,
            line: h.line,
            excerpt: h.excerpt.slice(0, options.maxExcerpt),
            message: rule.message,
          })
        );
      }
    }

    for (const rule of POSITIONING_RULES) {
      const rx = new RegExp(rule.pattern, "i");
      const hits = findRegexLines(text, rx);
      for (const h of hits) {
        findings.push(
          makeFinding({
            severity: rule.severity,
            ruleId: rule.id,
            file: rel,
            line: h.line,
            excerpt: h.excerpt.slice(0, options.maxExcerpt),
            message: rule.message,
          })
        );
      }
    }
  }

  // Sort findings
  findings.sort((a, b) => {
    const sa = SEV_ORDER[a.severity] ?? 9;
    const sb = SEV_ORDER[b.severity] ?? 9;
    if (sa !== sb) return sa - sb;
    if (a.file !== b.file) return a.file.localeCompare(b.file);
    return (a.line ?? 0) - (b.line ?? 0);
  });

  // A tiny "coverage" sanity check: how many files contain any natural-language-like tokens
  // (This is not a policy check; it just helps detect "scanned mostly code, little copy".)
  const textishRx = /\b(veiligheid|eerlijk|toetsbaar|brandwacht|opdrachtgever|inschrijven|aanmelden|intentie)\b/i;
  let filesWithTextish = 0;
  for (const f of files) {
    const t = readText(f);
    if (textishRx.test(t)) filesWithTextish++;
  }

  const summary = {
    appPath,
    filesScanned: files.length,
    filesWithTextish, // sanity metric
    errors: findings.filter((f) => f.severity === "ERROR").length,
    warnings: findings.filter((f) => f.severity === "WARN").length,
    info: findings.filter((f) => f.severity === "INFO").length,
    signals,
    matchCounts,
    matchEvidence,
  };

  return { summary, findings };
}

function printReport({ summary, findings }) {
  console.log("\n=== COPY AUDIT (/app) ===");
  console.log(`Path: ${summary.appPath}`);
  console.log(`Files scanned: ${summary.filesScanned}`);
  console.log(`Files with text-ish tokens: ${summary.filesWithTextish}`);
  console.log(`ERROR: ${summary.errors} | WARN: ${summary.warnings} | INFO: ${summary.info}\n`);

  console.log("Signals:");
  for (const [k, v] of Object.entries(summary.signals)) {
    console.log(` - ${k}: ${v ? "OK" : "MISSING"}`);
  }

  console.log("\nSignal evidence (first hit + count):");
  for (const [k, v] of Object.entries(summary.signals)) {
    const cnt = summary.matchCounts?.[k] ?? 0;
    const ev = summary.matchEvidence?.[k];

    if (v && ev) {
      console.log(` - ${k}: ${cnt} hit(s) @ ${ev.file}:${ev.line}`);
      console.log(`   > ${ev.excerpt}`);
    } else if (v && !ev) {
      console.log(` - ${k}: ${cnt} hit(s) (no evidence line found)`);
    } else {
      console.log(` - ${k}: ${cnt} hit(s)`);
    }
  }

  if (!findings.length) {
    console.log("\nNo findings. ✅");
    return;
  }

  let currentFile = null;
  for (const f of findings) {
    if (f.file !== currentFile) {
      currentFile = f.file;
      console.log(`\n--- ${currentFile} ---`);
    }
    const loc = f.line ? `line ${f.line}` : "";
    console.log(`[${f.severity}] ${f.ruleId} ${loc}`.trim());
    if (f.excerpt) console.log(`  > ${f.excerpt}`);
    console.log(`  ${f.message}`);
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const rootDir = path.resolve(process.cwd(), args.root);

  const result = auditApp({
    rootDir,
    appDir: args.app,
    options: {
      includeExt: args.includeExt.map((e) => e.toLowerCase()),
      excludeDirs: args.excludeDirs,
      maxExcerpt: args.maxExcerpt,
    },
  });

  printReport(result);

  if (args.json) {
    fs.writeFileSync(args.json, JSON.stringify(result, null, 2), "utf8");
    console.log(`\nWrote JSON report to: ${args.json}`);
  }

  // Exit codes for CI/launch gate:
  // - 0: OK
  // - 2: has ERROR findings
  if (result.summary.errors > 0) process.exit(2);
  process.exit(0);
}

main().catch((e) => {
  console.error("Fatal:", e?.message ?? e);
  process.exit(1);
});
