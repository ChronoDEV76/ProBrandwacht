#!/usr/bin/env ts-node

import fs from "node:fs";
import path from "node:path";

// ---------------- CLI parsing ----------------
//
// Voorbeeld gebruik:
//   npx ts-node scripts/tone/toneCheck-competitors.ts --urls=https://site1.nl/,https://site2.nl/zzp
//

const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

if (!argv.urls) {
  console.error(
    "❌ Gebruik: --urls=https://site1.nl/,https://site2.nl/pagina ..."
  );
  process.exit(1);
}

const URLS: string[] = String(argv.urls)
  .split(",")
  .map((u) => u.trim())
  .filter((u) => u.length > 0);

const JSON_OUT = String(argv.json ?? "0") === "1";

// ---------------- Tone rules (zelfde als jouw site) ----------------

const HARD_WORDS: string[] = [
  "kapotmaken",
  "uitbuiting",
  "profiteren",
  "bureaus profiteren",
  "misbruik",
  "onderbetaald",
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
  "commerciële marge",
  "inzetten",
  "aansturen",
  "geplande uren",
  "onderbrengen",
  "wij bepalen",
  "verplicht",
];

const SUGGESTIONS: Record<string, string> = {
  oneerlijk: "niet eerlijk / uit balans",
  profiteren: "risico’s doorschuiven / margeverschil",
  "bureaus profiteren": "bureaumodel schuift risico’s door",
  misbruik: "scheefgroei / onevenwicht",
  onderbetaald: "niet kostendekkend",
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
  "commerciële marge": "organisatie-opslag / bemiddelingsfee",
  inzetten: "samenwerken / inschakelen op eigen voorwaarden",
  aansturen: "coördineren / begeleiden",
  "geplande uren": "geplande inzet / gewenste uren",
  onderbrengen: "samen organiseren / aansluiten bij opdracht",
  "wij bepalen": "samen kiezen / jullie kiezen",
  verplicht: "afgesproken / gewenst",
};

const POSITIVE_KEYWORDS: string[] = [
  "eerlijke",
  "kostendekkend",
  "balans",
  "duurzaam model",
  "verantwoordelijkheid",
  "bron",
  "cbs",
  "statline",
  "cao",
  "zelfstandigheid",
  "dba-proof",
  "dbaproof",
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
];

// ---------------- Types ----------------

type PageIssue = {
  url: string;
  found: string;
  suggestion: string;
};

type PageStats = {
  url: string;
  ok: boolean;
  issues: PageIssue[];
  positives: string[];
  words: number;
  hardWordCount: number;
  toneScore: number; // 0–100
};

type ScanReport = {
  scannedAt: string;
  pages: PageStats[];
};

// ---------------- Helpers ----------------

function stripHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function analyseTone(text: string, url: string): PageStats {
  const lower = text.toLowerCase();
  const words = (text.match(/\S+/g) || []).length;

  const issues: PageIssue[] = [];
  const positives = new Set<string>();
  let hardCount = 0;

  for (const word of HARD_WORDS) {
    const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
    const matches = lower.match(pattern);
    if (matches) {
      hardCount += matches.length;
      issues.push({
        url,
        found: word,
        suggestion: SUGGESTIONS[word] ?? "neutraler / systeemtaal gebruiken",
      });
    }
  }

  for (const kw of POSITIVE_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) {
      positives.add(kw);
    }
  }

  // Simpele score: hoe meer harde woorden per 1000 woorden, hoe lager.
  const density = words > 0 ? hardCount / words : 0;
  // penalty maximaal 100
  const penalty = Math.min(100, Math.round(density * 100000));
  const toneScore = Math.max(0, 100 - penalty);

  const ok = hardCount === 0 && positives.size > 0;

  return {
    url,
    ok,
    issues,
    positives: Array.from(positives).sort(),
    words,
    hardWordCount: hardCount,
    toneScore,
  };
}

// ---------------- Main ----------------

async function main() {
  console.log("🔎 Tone-of-Voice scan voor concurrenten");
  console.log(`🌐 URLs: ${URLS.join(", ")}`);
  console.log("");

  const pages: PageStats[] = [];
  const errors: { url: string; error: string }[] = [];

  for (const url of URLS) {
    console.log(`📄 ${url}`);

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (ProBrandwacht-Competitor-TOV-Scanner; +https://www.probrandwacht.nl)",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const html = await res.text();
      const plain = stripHtml(html);
      const pageStats = analyseTone(plain, url);
      pages.push(pageStats);

      console.log(
        `   📊 ToneScore: ${pageStats.toneScore}/100 | woorden: ${pageStats.words} | harde woorden: ${pageStats.hardWordCount}`
      );

      if (pageStats.issues.length > 0) {
        console.log("   ❌ Harde termen:");
        for (const issue of pageStats.issues) {
          console.log(
            `      - '${issue.found}' → voorstel: ${issue.suggestion}`
          );
        }
      } else {
        console.log("   ✅ Geen harde termen gevonden.");
      }

      console.log(
        `   ⭐ Positieve signalen: ${
          pageStats.positives.join(", ") || "—"
        }\n`
      );
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      console.log(`   💥 Fout: ${msg}\n`);
      errors.push({ url, error: msg });
    }

    // Kleine pauze om rate limiting te beperken
    await sleep(500);
  }

  const report: ScanReport = {
    scannedAt: new Date().toISOString(),
    pages,
  };

  const outDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outFile = path.join(outDir, "tone-competitors-report.json");
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2), "utf8");

  if (JSON_OUT) {
    console.log(JSON.stringify(report, null, 2));
  }

  console.log(`📝 JSON rapport opgeslagen: ${outFile}`);

  if (errors.length > 0) {
    console.log("\n⚠️ Pagina's met laadfouten:");
    for (const e of errors) {
      console.log(` - ${e.url}: ${e.error}`);
    }
  }

  console.log("\n✅ Scan voltooid. Gebruik de ToneScore en issues om te vergelijken met ProBrandwacht.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
