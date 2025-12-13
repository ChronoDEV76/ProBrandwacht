#!/usr/bin/env ts-node

// Auto Tone Rewriter — ProBrandwacht (SITE ONLY)
// Scant alleen app/(site), components en content op .ts, .tsx, .md, .mdx
// Past rewrite-regels toe en schrijft rapport naar reports/tone-rewrite-report.json

import fs from "node:fs";
import path from "node:path";

type RewriteRule = {
  pattern: RegExp;
  replace: string | ((...args: any[]) => string);
  category: string;
  description: string;
};

const TARGET_DIRS: string[] = ["app/(site)", "components", "content"];
const EXTENSIONS = [".ts", ".tsx", ".md", ".mdx"];

const REPORT_FILE = path.join(
  process.cwd(),
  "reports",
  "tone-rewrite-report.json"
);

// ------- REWRITE RULES -------

// Bureau / controle-taal neutraliseren
const bureauRules: RewriteRule[] = [
  {
    pattern: /\bbemiddeling\b/gi,
    replace: "directe platform-match",
    category: "bureau",
    description: "Neutraliseert het woord 'bemiddeling'.",
  },
  {
    pattern: /\bbemiddelen\b/gi,
    replace: "verbinden via het platform",
    category: "bureau",
    description: "Neutraliseert klassieke bureau-taal.",
  },
  {
    pattern: /\bontzorgen\b/gi,
    replace: "ondersteunen op jouw voorwaarden",
    category: "bureau",
    description: "Maakt de taal zelfstandiger en minder bureau-achtig.",
  },
  {
    pattern: /\bwij plannen je in\b/gi,
    replace: "jij kiest zelf wanneer je werkt",
    category: "bureau",
    description: "Geeft autonomie terug aan de zzp’er.",
  },
  {
    pattern: /\bdetacheringsbureau\b/gi,
    replace: "klassieke capaciteitsleverancier",
    category: "bureau",
    description: "Neutraliseert het woord 'detacheringsbureau'.",
  },
  {
    pattern: /\bbureaumodel\b/gi,
    replace: "klassieke ketenconstructie",
    category: "bureau",
    description: "Vervangt 'bureaumodel' door neutralere term.",
  },
  {
    pattern: /\bbureaumodel\b/gi,
    replace: "klassieke ketenconstructie",
    category: "bureau",
    description: "Vervangt 'bureaumodel' door neutralere, beschrijvende taal.",
  },
];

// Conflict-taal verzachten
const conflictRules: RewriteRule[] = [
  {
    pattern: /\bstrijd\b/gi,
    replace: "ontwikkeling in de sector",
    category: "conflict",
    description: "Verzacht strijdtaal.",
  },
  {
    pattern: /\bvechten\b/gi,
    replace: "werken aan verbetering",
    category: "conflict",
    description: "Vervangt agressieve framing.",
  },
  {
    pattern: /\bmisstand\b/gi,
    replace: "knelpunt",
    category: "conflict",
    description: "Maakt het beschrijvend in plaats van verwijtend.",
  },
];

// Zwakke woorden verstevigen
const weakRules: RewriteRule[] = [
  {
    pattern: /\bhandig\b/gi,
    replace: "praktisch toepasbaar",
    category: "weak",
    description: "Maakt het professioneler.",
  },
  {
    pattern: /\bhelpen\b/gi,
    replace: "ondersteunen met expertise",
    category: "weak",
    description: "Geeft meer autoriteit.",
  },
];

// Pro-ZZP / vakbond-upgrades + copyfixes
const upgradeRules: RewriteRule[] = [
  {
    pattern: /\bzelfstandig(?:e)?\s+brandwacht(en)?\b/gi,
    replace: (_m, plural: string | undefined) =>
      `zelfstandige brandwacht${plural ?? ""}`,
    category: "upgrade",
    description: "Uniformeert naar 'zelfstandige brandwacht'.",
  },
  {
    pattern: /\bbrandwacht(en)?\b/gi,
    replace: (_m, plural: string | undefined) =>
      `zelfstandige brandwacht${plural ?? ""}`,
    category: "upgrade",
    description: "Benadrukt de zzp-identiteit.",
  },
  {
    pattern: /\bopdrachtgever\b/gi,
    replace: "opdrachtgever in transparante samenwerking",
    category: "upgrade",
    description: "Versterkt brug-/samenwerkingstaal.",
  },
];

const RULES: RewriteRule[] = [...bureauRules, ...conflictRules, ...weakRules, ...upgradeRules];

const DUPLICATE_PATTERN = /\b([a-z\u00c0-\u017f]+)(\s+\1){1,}\b/gi;

// ------- FILE SCANNING -------

function scanDir(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...scanDir(full));
    } else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      files.push(full);
    }
  }

  return files;
}

function applyRules(content: string) {
  let updated = content;
  const applied: {
    rulePattern: string;
    replace: string;
    category: string;
    description: string;
  }[] = [];

  for (const rule of RULES) {
    if (rule.pattern.test(updated)) {
      updated = updated.replace(rule.pattern, rule.replace as any);
      applied.push({
        rulePattern: rule.pattern.toString(),
        replace: typeof rule.replace === "string" ? rule.replace : "[function]",
        category: rule.category,
        description: rule.description,
      });
    }
  }

  // Verwijder dubbele of driedubbele woorden die kunnen ontstaan na vervanging
  let deduped = updated;
  let match;
  while ((match = DUPLICATE_PATTERN.exec(deduped)) !== null) {
    const single = match[1];
    deduped = deduped.replace(match[0], single);
  }

  return { updated: deduped, applied };
}

// ------- MAIN -------

async function main() {
  console.log("🚀 Auto Tone Rewriter — ProBrandwacht (site copy)");

  const allFiles = TARGET_DIRS.flatMap((dir) => scanDir(dir));
  console.log(`📂 Gescande bestanden: ${allFiles.length}`);

  const report: any[] = [];

  for (const file of allFiles) {
    const original = fs.readFileSync(file, "utf8");
    const { updated, applied } = applyRules(original);

    if (applied.length > 0) {
      fs.writeFileSync(file, updated, "utf8");
      console.log(`✏️ ${file} — ${applied.length} aanpassingen`);
      report.push({
        file,
        changes: applied,
      });
    }
  }

  fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), "utf8");

  console.log("\n📄 Rapport opgeslagen in:", REPORT_FILE);
  console.log("✨ Klaar — tone of voice geüpdatet naar pro-ZZP/platform/vakbond-stijl.");
}

main().catch((err) => {
  console.error("❌ Fout in toneRewriter:", err);
  process.exit(1);
});
