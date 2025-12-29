#!/usr/bin/env ts-node

import fs from "node:fs";
import path from "node:path";

// ---------------- CLI parsing ----------------

const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

if (!argv.url) {
  console.error("❌ Gebruik: --url=https://www.probrandwacht.nl");
  process.exit(1);
}

const BASE = String(argv.url).replace(/\/$/, "");

// Als paths niet is opgegeven → standaard set
const pathsArg =
  typeof argv.paths === "string"
    ? argv.paths
    : "/,/blog,/opdrachtgevers,/probrandwacht-direct-spoed";

const PATHS: string[] = pathsArg
  .split(",")
  .map((p) => p.trim())
  .filter((p) => p.length > 0);

// JSON-vlag voor toekomst (nu alleen voor rapport op schijf)
const JSON_OUT = String(argv.json ?? "0") === "1";

// ---------------- Tone rules ----------------

// Hardere / gevoelige termen die we willen verzachten
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
  // "verplicht" bewust niet als hard woord; wordt vaak feitelijk gebruikt
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
};

// Positieve TOV-signalen
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
  "zelfstandige brandwacht",
  "zelfstandige brandwachten",
];

const WRONG_TERM = /\bzelfstandig brandwacht\b/i;
const DUPLICATE_PATTERN = /\b([a-z\u00c0-\u017f]+)(\s+\1){1,}\b/gi;

// ---------------- Types ----------------

type PageIssue = {
  url: string;
  found: string;
  suggestion: string;
};

type PageResult = {
  url: string;
  ok: boolean;
  issues: PageIssue[];
  positives: string[];
};

type ScanReport = {
  base: string;
  scannedAt: string;
  pages: PageResult[];
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

function scanTone(text: string, url: string): PageResult {
  const lower = text.toLowerCase();
  const issues: PageIssue[] = [];
  const positives = new Set<string>();

  for (const word of HARD_WORDS) {
    const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
    if (pattern.test(lower)) {
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

  if (WRONG_TERM.test(lower)) {
    issues.push({
      url,
      found: "zelfstandig brandwacht",
      suggestion: "gebruik 'zelfstandige brandwacht'",
    });
  }

  let match: RegExpExecArray | null;
  while ((match = DUPLICATE_PATTERN.exec(lower)) !== null) {
    issues.push({
      url,
      found: `herhaling: ${match[0]}`,
      suggestion: "verwijder dubbele woorden",
    });
  }

  const ok = issues.length === 0 && positives.size > 0;

  return {
    url,
    ok,
    issues,
    positives: Array.from(positives).sort(),
  };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---------------- Main ----------------

async function main() {
  console.log(`🔎 Tone-of-Voice scan op live site: ${BASE}`);
  console.log(`🌐 Pagina's: ${PATHS.join(", ")}`);
  console.log("");

  const results: PageResult[] = [];
  const errors: { url: string; error: string }[] = [];

  for (const p of PATHS) {
    const full = `${BASE}${p}`;
    console.log(`📄 ${full}`);

    try {
      const res = await fetch(full, {
        headers: {
          "User-Agent": "Mozilla/5.0 (ProBrandwacht-TOV-Scanner)",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const html = await res.text();
      const plain = stripHtml(html);
      const pageResult = scanTone(plain, full);
      results.push(pageResult);

      if (pageResult.ok) {
        console.log("   ✅ OK (neutraal + positieve TOV)");
      } else {
        console.log("   ❌ Issues gevonden:");
        for (const issue of pageResult.issues) {
          console.log(
            `      - '${issue.found}' → voorstel: ${issue.suggestion}`
          );
        }
      }

      console.log(
        `   ⭐ Positieve signalen: ${
          pageResult.positives.join(", ") || "—"
        }\n`
      );
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      console.log(`   💥 Fout: ${msg}\n`);
      errors.push({ url: full, error: msg });
    }

    // Kleine pauze om 429/rate limiting te voorkomen
    await sleep(500);
  }

  const report: ScanReport = {
    base: BASE,
    scannedAt: new Date().toISOString(),
    pages: results,
  };

  const outDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outFile = path.join(outDir, "tone-live-report.json");
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2), "utf8");

  if (JSON_OUT) {
    console.log(JSON.stringify(report, null, 2));
  }

  console.log(`📝 JSON rapport opgeslagen: ${outFile}`);

  const hasIssues = results.some((r) => !r.ok);
  const hasErrors = errors.length > 0;

  if (hasErrors) {
    console.log("\n⚠️ Pagina's met laadfouten:");
    for (const e of errors) {
      console.log(` - ${e.url}: ${e.error}`);
    }
  }

  if (hasIssues || hasErrors) {
    console.log(
      "\n❌ Tone-of-Voice scan: er zijn pagina’s met issues of fouten. Zie rapport voor details."
    );
    process.exit(1);
  } else {
    console.log("\n✅ Alle pagina’s voldoen aan de gewenste Tone-of-Voice.");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
