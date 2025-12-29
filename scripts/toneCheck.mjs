#!/usr/bin/env node
/**
 * Tone-of-Voice checker (live website mode)
 * Scant live URLs ipv lokale bestanden.
 *
 * CLI:
 *   --url=https://www.probrandwacht.nl (optioneel; valt terug op TONECHECK_URL | NEXT_PUBLIC_SITE_URL | http://localhost:3000)
 *   --paths=/,/over-ons
 *   --json=1
 */

import fs from "node:fs";
import path from "node:path";

// CLI PARSER
const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

const BASE = (
  argv.url ||
  process.env.TONECHECK_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");
const PATHS = (argv.paths || "/,/blog,/opdrachtgevers,/probrandwacht-direct-spoed")
  .split(",")
  .map((p) => p.trim());
const JSON_OUT = String(argv.json ?? "0") === "1";

// Tone-of-Voice regels
const HARD_WORDS = [
  "kapotmaken",
  "uitbuiting",
  "profiteren",
  "misbruik",
  "oneerlijk",
  "uitzendbureau",
  "detacheerder",
  "wij bepalen",
  "inzetten",
  "aansturen",
  "geplande uren"
];

const SUGGESTIONS = {
  oneerlijk: "niet eerlijk / uit balans",
  profiteren: "margeverschil / ketenbelang",
  misbruik: "scheefgroei",
  inzetten: "samenwerken / inschakelen op eigen voorwaarden",
  aansturen: "coördineren / begeleiden",
  "zelfstandig brandwacht": "gebruik 'zelfstandige brandwacht'",
};

const POSITIVE_KEYWORDS = [
  "eerlijke",
  "zelfstandigheid",
  "dba-proof",
  "autonomie",
  "onafhankelijk",
  "eerlijke tarieven",
  "vakmanschap",
  "helder",
  "heldere afspraken",
  "toetsbaar",
  "toetsbare afspraken",
  "duidelijk",
  "controleerbaar",
  "goedgekeurd",
  "gezamenlijk",
  "samen verantwoordelijk",
  "zelfstandige brandwacht",
  "zelfstandige brandwachten"
];

const DUPLICATE_PATTERN = /\b([a-z\u00c0-\u017f]+)(\s+\1){1,}\b/gi;

// HTML → plain text
function stripHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function scanUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();
  const text = stripHtml(html).toLowerCase();

  const issues = [];
  const positives = new Set();

  HARD_WORDS.forEach((word) => {
    const pattern = new RegExp(`\\b${word}\\b`, "i");
    if (pattern.test(text)) {
      issues.push({
        url,
        found: word,
        suggestion: SUGGESTIONS[word] || "neutraler formuleren",
      });
    }
  });

  // Flag verkeerd gespelde term
  if (/\bzelfstandig brandwacht\b/.test(text)) {
    issues.push({
      url,
      found: "zelfstandig brandwacht",
      suggestion: SUGGESTIONS["zelfstandig brandwacht"],
    });
  }

  // Detecteer dubbele of driedubbele woorden
  const dupes = new Set();
  let match;
  while ((match = DUPLICATE_PATTERN.exec(text)) !== null) {
    dupes.add(match[0]);
  }
  dupes.forEach((d) =>
    issues.push({
      url,
      found: `herhaling: ${d}`,
      suggestion: "verwijder dubbele woorden",
    })
  );

  POSITIVE_KEYWORDS.forEach((kw) => {
    if (text.includes(kw)) positives.add(kw);
  });

  const ok = issues.length === 0 && positives.size > 0;

  return {
    url,
    ok,
    issues,
    positives: [...positives],
  };
}

async function main() {
  console.log(`🔎 Tone-of-Voice scan op live site: ${BASE}`);
  console.log(`🌐 Pagina's: ${PATHS.join(", ")}`);
  console.log("");

  const results = [];

  for (const p of PATHS) {
    const full = `${BASE}${p}`;
    try {
      const r = await scanUrl(full);
      results.push(r);

      console.log(`📄 ${full}`);
      if (r.ok) {
        console.log("   ✅ OK (neutraal + positieve TOV)");
      } else {
        console.log("   ❌ Issues gevonden:");
        r.issues.forEach((i) =>
          console.log(`      - ${i.found} → ${i.suggestion}`)
        );
      }
      console.log(`   ⭐ Positieve signalen: ${r.positives.join(", ") || "—"}`);
      console.log("");
    } catch (err) {
      console.log(`📄 ${full}`);
      console.log(`   💥 Fout: ${err.message}`);
      console.log("");
    }
  }

  const report = {
    base: BASE,
    scannedAt: new Date().toISOString(),
    pages: results,
  };

  // JSON-bestand opslaan
  const outDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const outFile = path.join(outDir, "tone-live-report.json");
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
  console.log(`📝 JSON rapport opgeslagen: ${outFile}`);

  // Exit code voor CI
  if (results.some((r) => !r.ok)) {
    console.log("❌ Eén of meer pagina’s bevatten TOV-issues.");
    process.exit(1);
  } else {
    console.log("✅ Alle pagina’s voldoen aan de gewenste Tone-of-Voice.");
  }
}

main();
