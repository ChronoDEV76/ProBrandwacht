// scripts/strip-calculator.mjs
// Usage:
//   node scripts/strip-calculator.mjs --dry
//   node scripts/strip-calculator.mjs
//
// Doel:
// - Verwijder calculator-componenten van city/blog/brandwacht-inhuren pagina’s
// - Injecteer 1 CTA-blok naar /#bereken
//
// Let op: maakt .bak backup bij schrijven (tenzij --dry).

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry");

// Componenten & imports die we willen strippen
const COMPONENTS = [
  { name: "LeadCalculator", importHint: "lead-calculator" },
  { name: "CostCalculator", importHint: "cost-calculator" },
  { name: "FeeVergelijk", importHint: "fee" },
  { name: "TariefTabel", importHint: "tarief" },
];

// Waar zoeken we?
function targetFiles() {
  const out = [];
  const candidates = [
    path.join(ROOT, "app", "brandwacht-inhuren"),
    path.join(ROOT, "app", "steden"),
    path.join(ROOT, "app", "blog"),
    path.join(ROOT, "content", "blog"),
  ];
  const PAGE_NAMES = new Set(["page.tsx", "page.jsx", "page.ts", "page.js", "page.mdx"]);

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (PAGE_NAMES.has(ent.name)) out.push(full);
    }
  }

  candidates.forEach(walk);
  return out;
}

function stripImports(src) {
  // verwijder import-regels die onze componenten/paths bevatten
  const lines = src.split("\n");
  const keep = [];
  let removed = 0;

  for (const line of lines) {
    const lineLower = line.toLowerCase();
    const matchesComp =
      COMPONENTS.some(c => line.includes(c.name)) ||
      COMPONENTS.some(c => lineLower.includes(c.importHint)) ||
      lineLower.includes("@/components/cost-calculator") ||
      lineLower.includes("@/components/lead-calculator");

    if (matchesComp && /^\s*import\s+/.test(line)) {
      removed++;
      continue;
    }
    keep.push(line);
  }
  return { code: keep.join("\n"), removed };
}

function jsxStripAndInjectCTA(src) {
  let code = src;
  let totalReplacements = 0;
  let injected = false;

  const CTA = `
{/* Calculator vervangen door CTA naar funnel */}
<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <h3 className="text-lg font-semibold">Snel weten wat je écht waard bent?</h3>
  <p className="mt-1 text-sm text-slate-700">Bereken het in 30 sec en ontvang je persoonlijke PDF per mail.</p>
  <a href="/#bereken" className="mt-3 inline-flex items-center rounded-md bg-brand-700 px-4 py-2 text-white hover:bg-brand-600">
    Naar de calculator
  </a>
</section>`.trim();

  for (const { name } of COMPONENTS) {
    // match <Name .../>  én  <Name ...> ... </Name>
    const re = new RegExp(
      `<${name}(\\s[^>]*)?\\/\\>|<${name}(\\s[^>]*)?>[\\s\\S]*?<\\/${name}>`,
      "g"
    );

    if (re.test(code)) {
      code = code.replace(re, () => {
        totalReplacements++;
        if (!injected) {
          injected = true;
          return `\n${CTA}\n`;
        }
        // na eerste keer: volledig verwijderen (geen extra CTA's)
        return `\n`;
      });
    }
  }

  return { code, totalReplacements, injected };
}

function saveWithBackup(file, content) {
  const bak = `${file}.bak`;
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, fs.readFileSync(file, "utf8"), "utf8");
  fs.writeFileSync(file, content, "utf8");
}

async function run() {
  const files = targetFiles();
  if (!files.length) {
    console.log("ℹ️  Geen target page.tsx bestanden gevonden in app/(brandwacht-inhuren|steden|blog) of content/blog.");
    process.exit(0);
  }

  let touched = 0;
  for (const file of files) {
    const before = fs.readFileSync(file, "utf8");

    const { code: noImports, removed: importsRemoved } = stripImports(before);
    const { code: after, totalReplacements, injected } = jsxStripAndInjectCTA(noImports);

    if (importsRemoved === 0 && totalReplacements === 0) {
      console.log(`— ${file}: geen calculator gevonden (overgeslagen)`);
      continue;
    }

    console.log(
      `✓ ${file}: imports−${importsRemoved}, replaced components−${totalReplacements}, CTA injected=${injected}`
    );

    if (!DRY_RUN) {
      saveWithBackup(file, after);
    }
    touched++;
  }

  if (touched === 0) {
    console.log("ℹ️  Niets aangepast.");
  } else if (DRY_RUN) {
    console.log(`\n(DRY) ${touched} bestand(en) zouden aangepast worden. Run zonder --dry om te schrijven.`);
  } else {
    console.log(`\n${touched} bestand(en) aangepast. Backups: *.bak`);
    console.log("Tip: draai daarna `npm run format`.");
  }
}

run().catch(err => {
  console.error("Script-fout:", err);
  process.exit(1);
});

