#!/usr/bin/env node
/**
 * ProBrandwacht Copy Guard
 * Bewaakt frontstage positionering:
 * - marktduiding
 * - geen oplossingen / beloftes
 * - geen prijssturing
 * - geen vakbondstaal
 */

import fs from "fs";
import path from "path";

const ROOT = process.argv.includes("--root")
  ? path.resolve(process.argv[process.argv.indexOf("--root") + 1])
  : process.cwd();

const INCLUDE_DIRS = [
  "app/(site)",
  "content",
  "components"
];

const EXTENSIONS = [".tsx", ".mdx", ".md", ".json"];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

/* =======================
   RULESETS
======================= */

const RULES = [
  {
    id: "ROLE_SHIFT",
    level: "HIGH",
    message: "Oplossing-/platformtaal: ProBrandwacht mag duiden, niet oplossen.",
    patterns: [
      /\bwij\s+(regelen|leveren|lossen|bieden|zorgen)\b/i,
      /\bvia\s+ons\b/i,
      /\bboek(en)?\s+via\b/i,
      /\bons\s+platform\b/i
    ]
  },
  {
    id: "GUARANTEE_LANGUAGE",
    level: "HIGH",
    message: "Beloftes/garanties ondermijnen frontstage-neutraliteit (maar 'geen garantie' is OK).",
    patterns: [
      { re: /\bgarantie\b/i, allowIf: /\bgeen\s+garantie\b/i },
      { re: /\bgegarandeerd\b/i },
      { re: /\bzekerheid\b/i, level: "MEDIUM" },
      { re: /\bcompliance[-\s]?oplossing\b/i },
      { re: /\bDBA[-\s]?proof\b/i }
    ]
  },
  {
    id: "PRICE_SIGNALS",
    level: "MEDIUM",
    message: "Prijs-/verdienmodeltaal: alleen beschrijvend, niet sturend.",
    patterns: [
      /\buurtarief\b/i,
      /\btarieven?\b/i,
      /\bfee\b/i,
      /\bmarge\b/i,
      /\bpercentage\b/i,
      /\bcalculator\b/i,
      /\bbereken(en)?\b/i,
      /€\s?\d+/
    ]
  },
  {
    id: "UNION_FRAMING",
    level: "MEDIUM",
    message: "Vakbond-/activistische framing: blijf beschrijvend, niet strijdend.",
    patterns: [
      /\bopkomen\s+voor\b/i,
      /\bbeschermen\b/i,
      /\bstrijd\b/i,
      /\bafdwingen\b/i,
      /\bcollectief\b/i,
      /\bbelangenbehartiging\b/i
    ]
  }
];

/* =======================
   FILE WALKER
======================= */

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath, files);
    } else if (
      EXTENSIONS.includes(path.extname(entry)) &&
      stat.size <= MAX_FILE_SIZE
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

/* =======================
   SCAN
======================= */

const findings = [];

for (const relDir of INCLUDE_DIRS) {
  const absDir = path.join(ROOT, relDir);
  const files = walk(absDir);

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");

    for (const rule of RULES) {
      for (const pattern of rule.patterns) {
        const re = pattern.re ?? pattern;
        const level = pattern.level ?? rule.level;
        const allowIf = pattern.allowIf;
        const match = content.match(re);
        if (match) {
          const index = match.index || 0;
          if (allowIf) {
            const windowStart = Math.max(0, index - 50);
            const windowEnd = Math.min(content.length, index + 50);
            const window = content.slice(windowStart, windowEnd);
            if (allowIf.test(window)) {
              continue;
            }
          }
          const snippet = content
            .slice(Math.max(0, index - 60), index + 60)
            .replace(/\s+/g, " ");

          findings.push({
            level,
            rule: rule.id,
            file: path.relative(ROOT, file),
            match: match[0],
            context: snippet,
            message: rule.message
          });
        }
      }
    }
  }
}

/* =======================
   OUTPUT
======================= */

const counts = {
  HIGH: findings.filter(f => f.level === "HIGH").length,
  MEDIUM: findings.filter(f => f.level === "MEDIUM").length
};

console.log("=== ProBrandwacht Copy Guard ===");
console.log("Root:", ROOT);
console.log(`Findings: ${findings.length} (HIGH ${counts.HIGH}, MEDIUM ${counts.MEDIUM})\n`);

for (const f of findings) {
  console.log(`[${f.level}] ${f.rule}`);
  console.log(`  File: ${f.file}`);
  console.log(`  Match: ${f.match}`);
  console.log(`  Note: ${f.message}`);
  console.log(`  Context: ${f.context}\n`);
}

process.exit(counts.HIGH > 0 ? 2 : counts.MEDIUM > 0 ? 1 : 0);
