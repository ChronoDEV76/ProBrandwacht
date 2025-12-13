// scripts/vakbond-sanity-scan.ts
//
// Run locally with e.g.:
//   npx ts-node scripts/vakbond-sanity-scan.ts http://localhost:3000
//
// Or against live:
//   npx ts-node scripts/vakbond-sanity-scan.ts https://www.probrandwacht.nl

import fs from "node:fs";
import path from "node:path";

type ProblemRule = {
  pattern: RegExp;
  ignoreIfContains?: string[]; // tekst-fragmenten waardoor dit geen probleem is
};

type PageResult = {
  url: string;
  bad: string[];
  good: string[];
  ok: boolean;
};

type PageError = {
  url: string;
  error: string;
};

const problematicRules: ProblemRule[] = [
  {
    // "exclusiviteit" is verdacht, behalve als het duidelijk negatief wordt gebruikt
    pattern: /exclusiviteit/i,
    ignoreIfContains: [
      "geen exclusiviteit",
      "zonder exclusiviteit",
      "geen verplichtingen of exclusiviteit",
      "zonder verplichtingen of exclusiviteit",
    ],
  },
  {
    // "bureau" is verdacht, behalve als je juist aangeeft dat je GEEN bureau bent
    pattern: /\bbureau\b/i,
    ignoreIfContains: [
      "zonder tussenbureau",
      "geen bureau",
      "zonder detacheringsbureau",
      "geen tussenbureau",
    ],
  },
  {
    pattern: /wij zetten je in/i,
  },
  {
    pattern: /wij zetten jou in/i,
  },
  {
    pattern: /wij plannen je in/i,
  },
  {
    pattern: /wij plannen jou in/i,
  },
  {
    pattern: /wij plannen/i,
  },
  {
    pattern: /wordt ingepland/i,
  },
  {
    pattern: /uurtarief wordt bepaald/i,
  },
  {
    pattern: /exclusief voor ons/i,
  },
  {
    pattern: /verboden relatiebeding/i,
  },
  {
    pattern: /relatiebeding/i,
  },
  {
    pattern: /\b(detacheringsbureau|uitzendbureau)\b/i,
  },
];

const authorityIndicators: RegExp[] = [
  /transparantie/i,
  /zelfstandigheid/i,
  /dba-proof/i,
  /dbaproof/i,
  /professioneel netwerk/i,
  /kennisplatform/i,
  /vakmanschap/i,
  /autonomie/i,
  /onafhankelijk/i,
  /eerlijke tarieven/i,
];

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const html = await res.text();

  // HTML strippen → pure tekst
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scanText(text: string, url: string): PageResult {
  const lowerText = text.toLowerCase();

  const bad: string[] = [];
  for (const rule of problematicRules) {
    if (!rule.pattern.test(text)) continue;

    if (rule.ignoreIfContains && rule.ignoreIfContains.length > 0) {
      const hasSafeContext = rule.ignoreIfContains.some((safe) =>
        lowerText.includes(safe.toLowerCase())
      );
      if (hasSafeContext) {
        continue; // veilige context → niet als probleem tellen
      }
    }

    bad.push(rule.pattern.toString());
  }

  const good: string[] = [];
  for (const pattern of authorityIndicators) {
    if (pattern.test(text)) {
      good.push(pattern.toString());
    }
  }

  // "ok" = geen probleem-termen én wel minstens 1 goede autoriteits-term
  const ok = bad.length === 0 && good.length > 0;

  return { url, bad, good, ok };
}

async function scanPage(url: string): Promise<PageResult> {
  const text = await fetchText(url);
  return scanText(text, url);
}

async function main() {
  const base = process.argv[2] ?? "http://localhost:3000";

  // 👉 PAS DIT AAN op jouw routes
  const paths = [
    "/",
    "/probrandwacht-direct-spoed",
    "/opdrachtgevers",
    "/blog",
  ];

  console.log(`🔎 Vakbond-sanity scan voor base URL: ${base}\n`);

  const results: PageResult[] = [];
  const errors: PageError[] = [];

  for (const p of paths) {
    const url = `${base.replace(/\/+$/, "")}${p}`;
    console.log(`📄 ${url}`);

    try {
      const result = await scanPage(url);
      results.push(result);

      if (result.bad.length === 0) {
        console.log("   ✅ Geen probleem-termen gevonden.");
      } else {
        console.log("   ❌ Probleem-termen:");
        for (const b of result.bad) {
          console.log("      -", b);
        }
      }

      if (result.good.length === 0) {
        console.log("   ⚠️ Geen autoriteits-/vakbond-termen gevonden.");
      } else {
        console.log("   ✅ Autoriteits-/vakbond-termen:");
        for (const g of result.good) {
          console.log("      +", g);
        }
      }
    } catch (err: any) {
      console.log(`   💥 Fout bij laden: ${err.message}`);
      errors.push({ url, error: err.message });
    }

    console.log("");
  }

  console.log("📊 Samenvatting:");
  for (const r of results) {
    const status = r.ok ? "OK" : "CHECK";
    console.log(
      ` - [${status}] ${r.url} | bad: ${r.bad.length}, good: ${r.good.length}`
    );
  }

  if (errors.length > 0) {
    console.log("\n⚠️ Pagina's met laadfouten:");
    for (const e of errors) {
      console.log(` - ${e.url}: ${e.error}`);
    }
  }

  // JSON rapport wegschrijven
  const report = {
    baseUrl: base,
    scannedAt: new Date().toISOString(),
    pages: results,
    errors,
  };

  const outDir = path.join(process.cwd(), "reports");
  const outFile = path.join(outDir, "vakbond-sanity-report.json");

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outFile, JSON.stringify(report, null, 2), "utf8");

  console.log(`\n📝 JSON-rapport opgeslagen in: ${outFile}`);

  // CI: faal als er issues zijn
  const hasIssues = results.some((r) => !r.ok) || errors.length > 0;
  if (hasIssues) {
    console.log(
      "\n❌ Vakbond-sanity scan: er zijn pagina's met problemen of laadfouten. Zie rapport voor details."
    );
    process.exit(1);
  } else {
    console.log("\n✅ Vakbond-sanity scan: alle pagina's zien er goed uit.");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

