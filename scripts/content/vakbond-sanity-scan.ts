// scripts/content/vakbond-sanity-scan.ts
//
// Run locally:
//   npx ts-node scripts/content/vakbond-sanity-scan.ts --base http://localhost:3000
//
// Strict mode (CI / pre-push):
//   npx ts-node scripts/content/vakbond-sanity-scan.ts --base http://localhost:3000 --strict
//
// Custom paths:
//   npx ts-node scripts/content/vakbond-sanity-scan.ts --base https://www.probrandwacht.nl --paths /,/opdrachtgevers,/blog
//

import fs from "node:fs";
import path from "node:path";

type PageResult = {
  url: string;
  bad: string[];
  good: string[];
  ok: boolean;
  status?: number;
};

type PageError = {
  url: string;
  error: string;
  status?: number;
};

type Args = {
  base: string;
  strict: boolean;
  paths: string[] | null;
};

function parseArgs(argv: string[]): Args {
  const out: Args = {
    base: "http://localhost:3000",
    strict: false,
    paths: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];

    if (a === "--base") out.base = argv[++i] ?? out.base;
    if (a.startsWith("--base=")) out.base = a.split("=").slice(1).join("=");

    if (a === "--strict") out.strict = true;

    if (a === "--paths") {
      const raw = argv[++i];
      if (raw) out.paths = raw.split(",").map((s) => s.trim()).filter(Boolean);
    }
    if (a.startsWith("--paths=")) {
      const raw = a.split("=").slice(1).join("=");
      out.paths = raw.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  return out;
}

function safeBase(b: string): string {
  return String(b || "").replace(/\/+$/, "");
}

function localhostFallbackBase(base: string): string | null {
  if (!/^https?:\/\/localhost(?::\d+)?/i.test(base)) return null;
  return base.replace("://localhost", "://127.0.0.1");
}

function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Belangrijk:
 * - "bureau" NIET als probleemterm (jij wilt het kunnen noemen).
 * - Focus op termen die "we sturen/regelen/garanderen" impliceren.
 */
// LET OP: match alleen "werkgarantie" als het niet duidelijk ontkend wordt.
const BAD_TERMS = [
  /\buitzendbureau\b/i,
  /\bdetacheringsbureau\b/i,
  /\bwij garanderen\b/i,
  /\bgegarandeerd\b/i,
  /\baltijd meer\b/i,
  /\b100%\b.*\bzeker\b/i,
  /\bnooit\b.*\brisico\b/i,
  /\bwij regelen alles\b/i,

  // "werkgarantie" = alleen problematisch als het positief/claimend gebruikt wordt
  /\bwerkgarantie\b/i,
];

const NEGATION_WINDOW = 32; // chars terugkijken
const NEGATION_RE = /\b(geen|zonder|nimmer)\b/i;

function isNegated(text: string, index: number) {
  const start = Math.max(0, index - NEGATION_WINDOW);
  const chunk = text.slice(start, index);
  return NEGATION_RE.test(chunk);
}

function countBadHits(text: string) {
  const hits: string[] = [];

  for (const re of BAD_TERMS) {
    const rx = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    let m: RegExpExecArray | null;
    while ((m = rx.exec(text)) !== null) {
      const idx = m.index ?? 0;

      // Special case: werkgarantie in negatie-context => niet tellen
      if (re.source.includes("werkgarantie") && isNegated(text, idx)) continue;

      hits.push(re.toString());
      break; // 1 hit per regex is genoeg
    }
  }

  return hits;
}

const authorityIndicators: RegExp[] = [
  /eerlijke/i,
  /eerlijk\b/i,
  /zelfstandigheid/i,
  /dba-proof/i,
  /dbaproof/i,
  /dba-bewust/i,
  /professioneel netwerk/i,
  /kennisinitiatief/i,
  /vakmanschap/i,
  /autonomie/i,
  /onafhankelijk/i,
  /contextafhankelijk/i,
  /indicatief/i,
  /geen garantie/i,
];

async function fetchText(url: string): Promise<{ ok: boolean; status: number; text: string }> {
  const res = await fetch(url, { redirect: "follow" });
  const status = res.status;

  const html = await res.text().catch(() => "");

  if (!res.ok) {
    return { ok: false, status, text: "" };
  }

  // HTML -> tekst
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return { ok: true, status, text };
}

function scanText(text: string, url: string, status?: number): PageResult {
  const bad = countBadHits(text);

  const good: string[] = [];
  for (const pattern of authorityIndicators) {
    if (pattern.test(text)) good.push(pattern.toString());
  }

  // ok = geen probleem-termen (good mag leeg zijn; sommige pagina's zijn kort/technisch)
  const ok = bad.length === 0;

  return { url, bad, good, ok, status };
}

function defaultPaths(): string[] {
  return ["/", "/voor-brandwachten", "/opdrachtgevers", "/blog"];
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const base = safeBase(args.base);
  const fallbackBase = localhostFallbackBase(base);
  const strict = !!args.strict;

  const paths = uniq(args.paths?.length ? args.paths : defaultPaths());

  console.log(`🔎 Vakbond-sanity scan voor base URL: ${base}`);
  console.log(`Strict: ${strict ? "YES" : "NO"}\n`);

  const results: PageResult[] = [];
  const errors: PageError[] = [];

  let hardFail = false;

  for (const p of paths) {
    const url = new URL(p, base).toString();
    console.log(`📄 ${url}`);

    try {
      let { ok, status, text } = await fetchText(url);

      if (!ok && fallbackBase) {
        const fallbackUrl = new URL(p, fallbackBase).toString();
        ({ ok, status, text } = await fetchText(fallbackUrl));
      }

      if (!ok) {
        const msg = `HTTP ${status} for ${url}`;
        console.log(`   💥 Fout bij laden: ${msg}\n`);
        errors.push({ url, error: msg, status });

        // Non-strict: laadfouten = WARN (geen fail)
        if (strict) hardFail = true;
        continue;
      }

      const r = scanText(text, url, status);
      results.push(r);

      if (r.bad.length === 0) {
        console.log("   ✅ Geen probleem-termen gevonden.");
      } else {
        console.log("   ❌ Probleem-termen:");
        for (const b of r.bad) console.log("      -", b);
        if (strict) hardFail = true;
      }

      if (r.good.length === 0) {
        console.log("   ℹ️ Geen autoriteits-/nuance-termen gevonden (ok).");
      } else {
        console.log("   ✅ Autoriteits-/nuance-termen:");
        for (const g of r.good) console.log("      +", g);
      }

      console.log("");
    } catch (err: any) {
      const msg = String(err?.message || err);
      console.log(`   💥 Fout bij laden: ${msg}\n`);
      errors.push({ url, error: msg });

      if (strict) hardFail = true;
    }
  }

  console.log("📊 Samenvatting:");
  for (const r of results) {
    const status = r.ok ? "OK" : "CHECK";
    console.log(` - [${status}] ${r.url} | bad: ${r.bad.length}, good: ${r.good.length}`);
  }

  if (errors.length > 0) {
    console.log("\n⚠️ Pagina's met laadfouten:");
    for (const e of errors) console.log(` - ${e.url}: ${e.error}`);
  }

  const report = {
    baseUrl: base,
    strict,
    scannedAt: new Date().toISOString(),
    paths,
    pages: results,
    errors,
  };

  const outDir = path.join(process.cwd(), "reports");
  const outFile = path.join(outDir, "vakbond-sanity-report.json");

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2), "utf8");

  console.log(`\n📝 JSON-rapport opgeslagen in: ${outFile}`);

  // Exit:
  // - strict: fail bij issues of loadErrors
  // - non-strict: altijd OK (exit 0) zodat je niet blokkeert op 404's/wording
  const hasBadTerms = results.some((r) => r.bad.length > 0);
  const hasLoadErrors = errors.length > 0;

  if (strict && (hardFail || hasBadTerms || hasLoadErrors)) {
    console.log("\n❌ Vakbond-sanity scan: STRICT mode faalt (issues of laadfouten).");
    process.exit(2);
  }

  if (!strict && (hasBadTerms || hasLoadErrors)) {
    console.log("\n⚠️ Vakbond-sanity scan: issues/laadfouten gevonden (non-strict: waarschuwing).");
    process.exit(0);
  }

  console.log("\n✅ Vakbond-sanity scan: alle pagina's zien er goed uit.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(2);
});
