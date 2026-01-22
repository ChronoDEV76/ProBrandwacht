#!/usr/bin/env node
/**
 * legal-sanity-check.mjs
 * ProBrandwacht Legal Sanity Check (ESM/.mjs)
 *
 * Usage:
 *   node legal-sanity-check.mjs --root .
 *   node legal-sanity-check.mjs --root . --json
 *   node legal-sanity-check.mjs --root . --config legal-sanity.config.json
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const DEFAULT_CONFIG = {
  includeExt: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".mdx", ".txt", ".json"],
  excludeDirs: ["node_modules", ".next", "dist", "build", ".git", "out", "coverage"],
  excludePaths: [],

  termsPageHints: ["voorwaarden", "terms"],
  privacyPageHints: ["privacy", "privacystatement", "privacypolicy"],

  rules: [
    {
      id: "TARIFF_NUMBERS",
      severity: "HIGH",
      description:
        "Potential tariff publication: euro amounts and rate patterns (risk: tariefsturing / onbedoelde prijscommunicatie).",
      patterns: [
        /€\s?\d{1,3}([.,]\d{3})*([.,]\d{2})?/g,
        /\bEUR\s?\d{1,3}([.,]\d{3})*([.,]\d{2})?\b/gi,
        /\b(uurtarief|uurprijs|dagprijs|etmaalprijs)\b.{0,30}\d+/gi,
        /\b\d+\s?(per|\/)\s?(uur|u|dag|etmaal)\b/gi
      ],
      allowlist: []
    },
    {
      id: "MINIMUM_OR_COLLECTIVE",
      severity: "HIGH",
      description: "Collective/minimum pricing language (risk: mededinging/kartel).",
      patterns: [
        /\bminimum\s?tarief\b/gi,
        /\bminimumprijs\b/gi,
        /\bcollectief\b.{0,40}\b(tarief|prijs|uurtarief|dagprijs)\b/gi,
        /\bpetitie\b/gi,
        /\bachterban\b/gi,
        /\btekenen\b.{0,30}\b(tarief|tarieven|prijs|prijzen)\b/gi,
        /\buniform\b.{0,30}\b(tarief|tarieven|prijs|prijzen)\b/gi
      ],
      allowlist: []
    },
    {
      id: "DBA_GUARANTEE",
      severity: "HIGH",
      description: "Guarantees like 'DBA-proof' / 'juridisch veilig' (risk: schijnzekerheid).",
      patterns: [
        /\bDBA[-\s]?proof\b/gi,
        /\bDBA[-\s]?proef\b/gi,
        /\bjuridisch\s+veilig\b/gi,
        /\b100%\s+compliant\b/gi,
        /\bgarande(e|er)t\b.{0,25}\b(DBA|compliance|wettelijk)\b/gi,
        /\bcompliance\s+garantie\b/gi
      ],
      allowlist: []
    },
    {
      id: "EMPLOYER_LANGUAGE",
      severity: "MEDIUM",
      description: "Employer-like language (risk: werkgever-/gezagsassociatie).",
      patterns: [
        /\brooster(s)?\b/gi,
        /\binzetten\b/gi,
        /\bbeschikbaar\s+stellen\b/gi,
        /\baansturen\b/gi,
        /\bverplichten\b/gi,
        /\bwerknemer(s)?\b/gi,
        /\bdetachering\b/gi,
        /\buitzend\b/gi,
        /\bwerkgever\b/gi
      ],
      // Allow disclaimers that explicitly deny employer role:
      allowlist: [
        // expliciete ontkenningen
        /geen werkgever/gi,
        /niet.*werkgever/gi,
        /geen .*uitzendbureau/gi,
        /geen .*contractpartij/gi,
        // “niet aansturen” (afbakening/waarschuwing)
        /niet.*aanstur(en|ing)/gi,
        /professionals.*niet.*aanstur(en|ing)/gi,
        /niet.*als personeel/gi,
        // tone-of-voice pagina (optioneel)
        /avoidWords/gi,
        /vermijd( |-)woorden/gi,
        // aanvullende expliciete afbakening
        /geen bureau/gi,
        /geen matching-engine/gi,
        /geen.*aansturen/gi,
        /niet.*aansturen/gi,
        /geen.*inzetten/gi,
        /niet.*inzetten/gi,
        /geen.*werknemer/gi,
        /geen.*detachering/gi,
        /geen.*uitzend/gi,
        /snel inzetten kan/gi
      ]
    },
    {
      id: "PLATFORM_ROLE_CLARITY",
      severity: "LOW",
      description:
        "Repo-wide reminder: ensure core role disclaimers exist (not a fail; reminder if missing).",
      patterns: [
        /\bgeen werkgever\b/gi,
        /\bgeen uitzendbureau\b/gi,
        /\bgeen contractpartij\b/gi,
        /\btarieven? worden.*zelf\b/gi,
        /\bfeitelijke uitvoering\b/gi
      ],
      mode: "presence"
    }
  ],

  acceptanceCheck: {
    enabled: true,
    formFileHints: ["form", "intake", "aanmeld", "signup", "contact", "request"],
    mustContainAny: [
      "Ik ga akkoord",
      "algemene voorwaarden",
      "privacyverklaring",
      "required",
      "aria-required"
    ]
  },

  governingLawCheck: {
    enabled: true,
    mustContainAny: [
      "Nederlands recht",
      "bevoegde rechter",
      "toepasselijk recht",
      "geschillen",
      "forumkeuze"
    ]
  }
};

function parseArgs(argv) {
  const args = { root: process.cwd(), config: null, json: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--root") args.root = path.resolve(argv[++i]);
    else if (a === "--config") args.config = path.resolve(argv[++i]);
    else if (a === "--json") args.json = true;
  }
  return args;
}

function deepMerge(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) return b; // user overrides arrays
  if (typeof a === "object" && a && typeof b === "object" && b) {
    const out = { ...a };
    for (const k of Object.keys(b)) out[k] = deepMerge(a?.[k], b[k]);
    return out;
  }
  return b === undefined ? a : b;
}

function loadConfig(configPath) {
  if (!configPath) return DEFAULT_CONFIG;
  const raw = fs.readFileSync(configPath, "utf8");
  const userCfg = JSON.parse(raw);
  return deepMerge(DEFAULT_CONFIG, userCfg);
}

function shouldExcludeDir(dirName, config) {
  return config.excludeDirs.includes(dirName);
}

function shouldExcludePath(filePath, config) {
  const excluded = config.excludePaths || [];
  if (excluded.length === 0) return false;
  const normalized = filePath.split(path.sep).join("/");
  return excluded.some((entry) => normalized.includes(entry));
}

function hasAllowedExt(filePath, config) {
  return config.includeExt.includes(path.extname(filePath).toLowerCase());
}

function walk(dir, config, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (shouldExcludeDir(e.name, config)) continue;
      walk(full, config, files);
    } else if (e.isFile()) {
      if (hasAllowedExt(full, config) && !shouldExcludePath(full, config)) {
        files.push(full);
      }
    }
  }
  return files;
}

function getLineCol(text, index) {
  const upTo = text.slice(0, index);
  const lines = upTo.split("\n");
  return { line: lines.length, col: lines[lines.length - 1].length + 1 };
}

function applyAllowlist(text, allowlist) {
  if (!allowlist || allowlist.length === 0) return false;
  return allowlist.some((re) => re.test(text));
}

function scanFile(filePath, config) {
  const text = fs.readFileSync(filePath, "utf8");
  const findings = [];

  for (const rule of config.rules) {
    if (rule.mode === "presence") continue;

    for (const pat of rule.patterns) {
      // Ensure global regex resets per file scan
      pat.lastIndex = 0;
      let m;
      while ((m = pat.exec(text)) !== null) {
        const snippet = text.slice(Math.max(0, m.index - 50), Math.min(text.length, m.index + 80));
        if (applyAllowlist(snippet, rule.allowlist)) continue;

        const pos = getLineCol(text, m.index);
        findings.push({
          ruleId: rule.id,
          severity: rule.severity,
          description: rule.description,
          file: filePath,
          line: pos.line,
          col: pos.col,
          match: m[0],
          context: snippet.replace(/\s+/g, " ").trim()
        });
      }
    }
  }

  return findings;
}

function repoPresenceCheck(allTextByFile, config) {
  const rule = config.rules.find((r) => r.id === "PLATFORM_ROLE_CLARITY");
  if (!rule) return [];
  const combined = Object.values(allTextByFile).join("\n");

  const hits = rule.patterns.map((pat) => ({ pattern: pat.toString(), present: pat.test(combined) }));
  const missing = hits.filter((h) => !h.present);

  if (missing.length === hits.length) {
    return [{
      ruleId: rule.id,
      severity: rule.severity,
      description:
        "No platform role-clarifying phrases found anywhere. Add core disclaimers on key pages.",
      file: "(repo)",
      line: 0,
      col: 0,
      match: "(none)",
      context: "Missing all recommended role-clarifying phrases.",
      details: hits
    }];
  }
  if (missing.length > 0) {
    return [{
      ruleId: rule.id,
      severity: rule.severity,
      description:
        "Some recommended role-clarifying phrases not found repo-wide (reminder).",
      file: "(repo)",
      line: 0,
      col: 0,
      match: "(partial)",
      context: "Some recommended phrases are missing.",
      details: hits
    }];
  }
  return [];
}

function findCandidateFiles(files, hints) {
  const lowerHints = hints.map((h) => h.toLowerCase());
  return files.filter((f) => lowerHints.some((h) => f.toLowerCase().includes(h)));
}

function heuristicAcceptanceCheck(files, allTextByFile, config) {
  if (!config.acceptanceCheck?.enabled) return [];
  const candidates = findCandidateFiles(files, config.acceptanceCheck.formFileHints);
  if (candidates.length === 0) return [];

  const must = config.acceptanceCheck.mustContainAny.map((s) => s.toLowerCase());
  const flagged = [];

  for (const f of candidates) {
    const t = (allTextByFile[f] || "").toLowerCase();
    const looksLikeForm = t.includes("<form") || t.includes("onsubmit") || t.includes("handlesubmit");
    const hasAny = must.some((s) => t.includes(s));
    if (looksLikeForm && !hasAny) {
      flagged.push({
        ruleId: "TERMS_ACCEPTANCE",
        severity: "MEDIUM",
        description:
          "Form-like file may be missing explicit acceptance checkbox for Terms/Privacy (heuristic).",
        file: f,
        line: 0,
        col: 0,
        match: "(heuristic)",
        context:
          "Add a required checkbox: 'Ik ga akkoord met de algemene voorwaarden en privacyverklaring'."
      });
    }
  }
  return flagged;
}

function heuristicGoverningLawCheck(files, allTextByFile, config) {
  if (!config.governingLawCheck?.enabled) return [];

  const termsCandidates = findCandidateFiles(files, config.termsPageHints);
  if (termsCandidates.length === 0) {
    return [{
      ruleId: "GOVERNING_LAW",
      severity: "LOW",
      description:
        "No terms/voorwaarden file found by hints. Configure termsPageHints or verify governing law clause exists.",
      file: "(repo)",
      line: 0,
      col: 0,
      match: "(missing terms page)",
      context:
        "Set termsPageHints in config to match your terms page file path/name."
    }];
  }

  const must = config.governingLawCheck.mustContainAny.map((s) => s.toLowerCase());
  const anyOk = termsCandidates.some((f) => must.some((s) => (allTextByFile[f] || "").toLowerCase().includes(s)));

  if (!anyOk) {
    return [{
      ruleId: "GOVERNING_LAW",
      severity: "MEDIUM",
      description: "Terms/voorwaarden content may be missing governing law/forum clause (heuristic).",
      file: termsCandidates[0],
      line: 0,
      col: 0,
      match: "(heuristic)",
      context:
        "Add: 'Op het gebruik van ProBrandwacht en deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.'"
    }];
  }
  return [];
}

function severityRank(sev) {
  return { HIGH: 3, MEDIUM: 2, LOW: 1 }[sev] || 0;
}

function main() {
  const args = parseArgs(process.argv);
  const config = loadConfig(args.config);

  const files = walk(args.root, config);
  const allTextByFile = {};
  for (const f of files) {
    try {
      allTextByFile[f] = fs.readFileSync(f, "utf8");
    } catch {
      allTextByFile[f] = "";
    }
  }

  let findings = [];
  for (const f of files) {
    findings = findings.concat(scanFile(f, config));
  }

  findings = findings
    .concat(repoPresenceCheck(allTextByFile, config))
    .concat(heuristicAcceptanceCheck(files, allTextByFile, config))
    .concat(heuristicGoverningLawCheck(files, allTextByFile, config));

  findings.sort((a, b) => severityRank(b.severity) - severityRank(a.severity));

  const summary = findings.reduce(
    (acc, f) => {
      acc.total++;
      acc[f.severity] = (acc[f.severity] || 0) + 1;
      return acc;
    },
    { total: 0, HIGH: 0, MEDIUM: 0, LOW: 0 }
  );

  if (args.json) {
    console.log(JSON.stringify({ summary, findings }, null, 2));
    process.exit(summary.HIGH > 0 ? 2 : summary.MEDIUM > 0 ? 1 : 0);
  }

  console.log("=== ProBrandwacht Legal Sanity Check (mjs) ===");
  console.log(`Root: ${args.root}`);
  console.log(`Files scanned: ${files.length}`);
  console.log(`Findings: ${summary.total} (HIGH ${summary.HIGH}, MEDIUM ${summary.MEDIUM}, LOW ${summary.LOW})\n`);

  for (const f of findings) {
    const loc = f.line ? `:${f.line}:${f.col}` : "";
    console.log(`[${f.severity}] ${f.ruleId} - ${f.description}`);
    console.log(`  File: ${f.file}${loc}`);
    console.log(`  Match: ${String(f.match).slice(0, 140)}`);
    console.log(`  Context: ${f.context}`);
    if (f.details) console.log(`  Details: ${JSON.stringify(f.details)}`);
    console.log("");
  }

  console.log("Exit codes: 0=ok, 1=medium findings, 2=high findings");
  process.exit(summary.HIGH > 0 ? 2 : summary.MEDIUM > 0 ? 1 : 0);
}

main();
