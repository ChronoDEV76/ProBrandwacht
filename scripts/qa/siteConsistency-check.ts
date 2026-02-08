#!/usr/bin/env ts-node

/**
 * Kleine site-consistency check voor ProBrandwacht
 *
 * Doet 2 dingen:
 *  1) Layout-consistentie:
 *     - <main className="min-h-screen bg-slate-950 text-slate-50">
 *  2) Simpele tone-of-voice check:
 *     - flagt harde/ongewenste termen
 *     - telt positieve signalen (eerlijke, zelfstandige brandwacht, samenwerking, dba-proof)
 *
 * Gebruik:
 *   npx ts-node scripts/qa/siteConsistency-check.ts
 */

import fs from "node:fs";
import path from "node:path";

type PageReport = {
  file: string;
  hasMainLayout: boolean;
  badWords: string[];
  positiveSignals: string[];
};

const ROOT = process.cwd();
const SITE_DIR = path.join(ROOT, "app", "(site)");

const PAGE_FILENAME = "page.tsx";

// woorden die we liever niet terugzien in copy / toon
const BAD_WORDS = [
  "uitbuiting",
  "misbruik",
  "kapotmaken",
  "strijd",
  "vechten",
  "schaamteloos",
  "slachtoffer",
  "uitzendbureau",
  "uitzendconstructie",
  "payroll",
  "detacheringsbureau",
  "bureaumodel",
  "tussenpersoon",
  "commerciële marge",
];

// woorden die passen bij jouw pro-ZZP / analyse / brugtoon
const POSITIVE_WORDS = [
  "eerlijke",
  "eerlijk",
  "dba-proof",
  "samenwerking",
  "samen werken",
  "zelfstandige brandwacht",
  "zelfstandige brandwacht",
  "eerlijke afspraken",
  "heldere afspraken",
  "duidelijk",
  "controleerbaar",
  "goedgekeurd",
  "gezamenlijk",
  "samen verantwoordelijk",
  "helder",
  "toetsbaar",
];

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.name === PAGE_FILENAME) {
      out.push(full);
    }
  }

  return out;
}

function analyzePage(file: string): PageReport {
  const content = fs.readFileSync(file, "utf8");

  const hasMainLayout =
    /<main[^>]*className=["'][^"']*min-h-screen[^"']*text-slate-50[^"']*["']/.test(content) &&
    /<main[^>]*className=["'][^"']*(bg-slate-950|bg-gradient-to-b[^"']*from-slate-950)[^"']*["']/.test(
      content
    );
  const hasMainLayoutViaComponent = /<BrandwachtInhurenCityPage\b/.test(content) || /<ClientPage\b/.test(content);
  const hasMainLayoutResolved = hasMainLayout || hasMainLayoutViaComponent;

  const lower = content.toLowerCase();

  const badWordsFound = BAD_WORDS.filter((w) => lower.includes(w.toLowerCase()));
  const positivesFound = POSITIVE_WORDS.filter((w) =>
    lower.includes(w.toLowerCase())
  );

  return {
    file: path.relative(ROOT, file),
    hasMainLayout: hasMainLayoutResolved,
    badWords: badWordsFound,
    positiveSignals: positivesFound,
  };
}

function printReport(reports: PageReport[]) {
  console.log("🔎 ProBrandwacht site consistency check");
  console.log(`📂 Gevonden pagina's in app/(site): ${reports.length}\n`);

  let layoutIssues = 0;
  let toneIssues = 0;

  for (const r of reports) {
    const icon =
      !r.hasMainLayout || r.badWords.length > 0 ? "⚠️" : "✅";

    console.log(`${icon} ${r.file}`);

    if (!r.hasMainLayout) {
      layoutIssues++;
      console.log(
        "   - Layout: geen <main> gevonden met `min-h-screen text-slate-50` en dark background"
      );
    } else {
      console.log("   - Layout: ok (main met dark layout gevonden)");
    }

    if (r.badWords.length) {
      toneIssues++;
      console.log(
        `   - Tone-of-voice: ongewenste termen: ${r.badWords
          .map((w) => `'${w}'`)
          .join(", ")}`
      );
    } else {
      console.log("   - Tone-of-voice: geen harde termen gevonden");
    }

    if (r.positiveSignals.length) {
      console.log(
        `   - Positieve signalen: ${r.positiveSignals.join(", ")}`
      );
    }

    console.log("");
  }

  console.log("📊 Samenvatting");
  console.log(
    `   Layout-issues: ${layoutIssues} / ${reports.length} pagina's`
  );
  console.log(
    `   Tone-issues:   ${toneIssues} / ${reports.length} pagina's`
  );

  if (!layoutIssues && !toneIssues) {
    console.log("\n✅ Alle pagina's zijn consistent qua layout en basis-tone.");
  } else {
    console.log(
      "\nℹ️ Pas de gemelde pagina's aan en draai het script opnieuw voor een schone run."
    );
  }
}

function main() {
  if (!fs.existsSync(SITE_DIR)) {
    console.error("❌ app/(site) bestaat niet. Klopt je projectstructuur?");
    process.exit(1);
  }

  const pages = walk(SITE_DIR);
  if (!pages.length) {
    console.error(
      "⚠️ Geen page.tsx bestanden gevonden onder app/(site). Niets te controleren."
    );
    process.exit(0);
  }

  const reports = pages.map(analyzePage);
  printReport(reports);
}

main();
