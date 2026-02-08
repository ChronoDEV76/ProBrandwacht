#!/usr/bin/env node
/**
 * ProBrandwacht Copy Guard
 * Bewaakt frontstage positionering:
 * - marktanalyse
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
const BLOG_DIR = path.join(ROOT, "content", "blog");

const TONE_PROFILE_PATH = path.join(ROOT, "scripts", "tone", "probrandwacht-tone.json");

/* =======================
   RULESETS
======================= */

const RULES = [
  {
    id: "ROLE_SHIFT",
    level: "HIGH",
    message: "Oplossing-/platformtaal: ProBrandwacht mag analyseren, niet oplossen.",
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

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phraseToRegex(phrase) {
  const escaped = escapeRegex(phrase).replace(/\s+/g, "\\s+");
  const startsWord = /^[A-Za-z0-9]/.test(phrase);
  const endsWord = /[A-Za-z0-9]$/.test(phrase);
  const wrapped = startsWord && endsWord ? `\\b${escaped}\\b` : escaped;
  return new RegExp(wrapped, "i");
}

function loadToneProfile() {
  if (!fs.existsSync(TONE_PROFILE_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(TONE_PROFILE_PATH, "utf8"));
  } catch {
    return null;
  }
}

function buildToneRules(tone) {
  if (!tone) return [];
  const rules = [];
  const disallowed = tone.disallowed_language ?? {};

  if (Array.isArray(disallowed.activist_terms)) {
    rules.push({
      id: "TONE_ACTIVIST",
      level: "HIGH",
      message: "Activistische taal ondermijnt neutraliteit.",
      patterns: disallowed.activist_terms.map(phraseToRegex)
    });
  }

  if (Array.isArray(disallowed.accusatory_terms)) {
    rules.push({
      id: "TONE_ACCUSATORY",
      level: "HIGH",
      message: "Aanvallende/accusatoire taal ondermijnt het kader.",
      patterns: disallowed.accusatory_terms.map(phraseToRegex)
    });
  }

  if (Array.isArray(disallowed.collective_identity)) {
    rules.push({
      id: "TONE_COLLECTIVE",
      level: "HIGH",
      message: "Collectieve framing is niet toegestaan.",
      patterns: disallowed.collective_identity.map(phraseToRegex)
    });
  }

  if (Array.isArray(disallowed.emotional_charge)) {
    rules.push({
      id: "TONE_EMOTIONAL",
      level: "HIGH",
      message: "Emotioneel geladen taal is niet toegestaan.",
      patterns: disallowed.emotional_charge.map(phraseToRegex)
    });
  }

  const avoidVoice = tone.preferred_voice?.avoid;
  if (Array.isArray(avoidVoice)) {
    rules.push({
      id: "TONE_VOICE_AVOID",
      level: "MEDIUM",
      message: "Belerende of collectieve formulering vermijden.",
      patterns: avoidVoice.map(phraseToRegex)
    });
  }

  const forbidden = tone.guarantees_and_promises?.forbidden;
  if (Array.isArray(forbidden)) {
    rules.push({
      id: "TONE_GUARANTEES",
      level: "HIGH",
      message: "Garantie-/zekerheidstaal is niet toegestaan.",
      patterns: forbidden.map(phraseToRegex)
    });
  }

  const closingAvoid = tone.closing_guidance?.avoid;
  if (Array.isArray(closingAvoid)) {
    rules.push({
      id: "TONE_CLOSING_AVOID",
      level: "MEDIUM",
      message: "Activerende afsluiting vermijden.",
      patterns: closingAvoid.map(phraseToRegex)
    });
  }

  return rules.filter((r) => r.patterns?.length);
}

const toneProfile = loadToneProfile();
RULES.push(...buildToneRules(toneProfile));

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
let suppressed = 0;

const STRONG_GUARANTEE = /\b(garandeer|gegarandeerd|garantie|100%|altijd)\b/i;
const ADVICE_LANGUAGE = /\b(advies|aanbevolen|zet\s+in\s+op)\b/i;

function getWindow(content, index, size = 50) {
  const start = Math.max(0, index - size);
  const end = Math.min(content.length, index + size);
  return content.slice(start, end);
}

for (const relDir of INCLUDE_DIRS) {
  const absDir = path.join(ROOT, relDir);
  const files = walk(absDir);

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const isBlog = file.startsWith(`${BLOG_DIR}${path.sep}`);

    for (const rule of RULES) {
      for (const pattern of rule.patterns) {
        const re = pattern.re ?? pattern;
        let level = pattern.level ?? rule.level;
        const allowIf = pattern.allowIf;
        const match = content.match(re);
        if (match) {
          const index = match.index || 0;
          const window = getWindow(content, index, 50);

          if (allowIf) {
            if (allowIf.test(window)) {
              suppressed += 1;
              continue;
            }
          }

          if (isBlog) {
            if (rule.id === "PRICE_SIGNALS") {
              level = "INFO";
              if (/\bpercentage\b/i.test(match[0])) {
                suppressed += 1;
                continue;
              }
              if (/\btarieven?\b/i.test(match[0]) && !ADVICE_LANGUAGE.test(window)) {
                suppressed += 1;
                continue;
              }
            }

            if (rule.id === "GUARANTEE_LANGUAGE" && /\bzekerheid\b/i.test(match[0])) {
              level = STRONG_GUARANTEE.test(window) ? "HIGH" : "INFO";
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
            message: rule.message,
            category: isBlog ? "BLOG" : "FRONTSTAGE"
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
  MEDIUM: findings.filter(f => f.level === "MEDIUM").length,
  INFO: findings.filter(f => f.level === "INFO").length
};

console.log("=== ProBrandwacht Copy Guard ===");
console.log("Root:", ROOT);
console.log(
  `Findings: ${findings.length} (HIGH ${counts.HIGH}, MEDIUM ${counts.MEDIUM}, INFO ${counts.INFO})`
);
console.log(`Suppressed by allowlist: ${suppressed}\n`);

const summary = {
  FRONTSTAGE: { HIGH: 0, MEDIUM: 0, INFO: 0 },
  BLOG: { HIGH: 0, MEDIUM: 0, INFO: 0 }
};

for (const f of findings) {
  if (summary[f.category]?.[f.level] !== undefined) {
    summary[f.category][f.level] += 1;
  }
}

console.log("Policy summary");
console.log(
  `  Frontstage pages: HIGH ${summary.FRONTSTAGE.HIGH}, MEDIUM ${summary.FRONTSTAGE.MEDIUM}, INFO ${summary.FRONTSTAGE.INFO}`
);
console.log(
  `  Blogs: HIGH ${summary.BLOG.HIGH}, MEDIUM ${summary.BLOG.MEDIUM}, INFO ${summary.BLOG.INFO} (MEDIUM as FYI)`
);
console.log("");

for (const f of findings) {
  console.log(`[${f.level}] ${f.rule}`);
  console.log(`  File: ${f.file}`);
  console.log(`  Match: ${f.match}`);
  console.log(`  Note: ${f.message}`);
  console.log(`  Context: ${f.context}\n`);
}

process.exit(counts.HIGH > 0 ? 2 : counts.MEDIUM > 0 ? 1 : 0);
