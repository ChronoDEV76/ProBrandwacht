#!/usr/bin/env ts-node

/**
 * 🛡️ Tone Guard — ProBrandwacht / ProSafetyMatch
 *
 * Doel (check-before-upload):
 * - Scan alleen de LIVE app content (HTML -> tekst) op opgegeven routes.
 * - Flag copy-risico’s:
 *   1) Dubbele woorden / herhaalde frasen ("zelfstandig zelfstandig zelfstandig", etc.)
 *   2) Toekomst-features / roadmap leakage (E2E chat, logging, spoed, addendum, etc.)
 *   3) Bureau-/control-taal ("wij regelen", "ontzorgen", "bemiddelen") die niet klopt met positionering
 *   4) Schreeuwerige marketing (optioneel mild)
 *
 * Output:
 * - Kort, alleen issues (default)
 * - JSON report in /reports/tone-guard.json
 *
 * CLI:
 *   npx ts-node scripts/tone-guard.ts --url=http://localhost:3000 --paths=/,/opdrachtgevers,/voor-brandwachten,/belangen
 * Options:
 *   --onlyIssues=true|false   (default true)
 *   --verbose=true|false      (default false)
 *   --json=true|false         (default true)
 *   --maxSnippets=3           (default 3)
 *   --failOn404=true|false    (default false)
 */

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import https from "node:https";
import { URL } from "node:url";

type Severity = "INFO" | "WARN" | "BLOCK";
type IssueType = "DUPLICATE" | "REPEAT_PHRASE" | "ROADMAP_LEAK" | "BUREAU_TONE" | "SHOUTY";

type Issue = {
  severity: Severity;
  type: IssueType;
  label: string;
  count: number;
  snippets: string[];
  suggestion?: string;
};

type PageReport = {
  path: string;
  url: string;
  status: number;
  words: number;
  issues: Issue[];
  summary: {
    blocks: number;
    warns: number;
    infos: number;
  };
};

function parseArgs(argv: string[]) {
  const args: Record<string, string | boolean> = {};
  for (const part of argv.slice(2)) {
    if (!part.startsWith("--")) continue;
    const [k, v] = part.replace(/^--/, "").split("=");
    args[k] = v === undefined ? true : v;
  }

  const url = String(args.url || "http://localhost:3000").replace(/\/$/, "");
  const paths = String(args.paths || "/")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const onlyIssues = !(args.onlyIssues === "false" || args.onlyIssues === false);
  const verbose = Boolean(args.verbose === "true" || args.verbose === true);
  const json = !(args.json === "false" || args.json === false);
  const maxSnippets = Number(args.maxSnippets ?? 3) || 3;
  const failOn404 = Boolean(args.failOn404 === "true" || args.failOn404 === true);

  return { url, paths, onlyIssues, verbose, json, maxSnippets, failOn404 };
}

function fetchUrl(u: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const target = new URL(u);
    const lib = target.protocol === "https:" ? https : http;

    const req = lib.get(
      u,
      {
        headers: {
          "User-Agent": "ProBrandwacht-ToneGuard/1.0",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
        },
      },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode || 0, body: data }));
      }
    );

    req.on("error", reject);
  });
}

/** simpele HTML → text; genoeg voor tone checks */
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(p|div|li|h1|h2|h3|h4|br|section|article|header|footer|main)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text: string): number {
  const parts = text.split(/\s+/).filter(Boolean);
  return parts.length;
}

function collectSnippets(text: string, re: RegExp, maxSnippets: number): string[] {
  const snippets: string[] = [];
  re.lastIndex = 0;

  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const start = Math.max(0, m.index - 70);
    const end = Math.min(text.length, m.index + m[0].length + 70);
    const snippet = text.slice(start, end).replace(/\s+/g, " ").trim();
    snippets.push(snippet);
    if (snippets.length >= maxSnippets) break;
  }
  return snippets;
}

function mkIssue(params: Issue): Issue {
  return {
    severity: params.severity,
    type: params.type,
    label: params.label,
    count: params.count,
    snippets: params.snippets,
    suggestion: params.suggestion,
  };
}

/** 1) dubbele woorden: "x x" of "zelfstandig zelfstandig zelfstandig" */
function findDuplicateWords(text: string, maxSnippets: number): Issue[] {
  const issues: Issue[] = [];

  // 2x hetzelfde woord achter elkaar
  const reDouble = /\b([a-zà-ÿ]+)\s+\1\b/gi;
  const hits2: Record<string, number> = {};
  reDouble.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = reDouble.exec(text)) !== null) {
    const w = m[1].toLowerCase();
    hits2[w] = (hits2[w] || 0) + 1;
  }

  // 3x of meer: zelfstandig zelfstandig zelfstandig
  const reTriple = /\b([a-zà-ÿ]+)(?:\s+\1){2,}\b/gi;
  const triples: Record<string, number> = {};
  reTriple.lastIndex = 0;
  while ((m = reTriple.exec(text)) !== null) {
    const w = m[1].toLowerCase();
    triples[w] = (triples[w] || 0) + 1;
  }

  for (const [w, c] of Object.entries(triples)) {
    const re = new RegExp(`\\b(${escapeRegExp(w)})(?:\\s+\\1){2,}\\b`, "gi");
    issues.push(
      mkIssue({
        severity: "BLOCK",
        type: "DUPLICATE",
        label: `Herhaald woord 3x+: "${w}"`,
        count: c,
        snippets: collectSnippets(text, re, maxSnippets),
        suggestion: `Vervang door 1x "${w}" (en herlees de zin).`,
      })
    );
  }

  // Alleen report 2x duplicates als ze vaak voorkomen of “gevoelige woorden” zijn
  const sensitive = new Set(["zelfstandig", "transparante", "samenwerking", "brandwacht"]);
  for (const [w, c] of Object.entries(hits2)) {
    if (c < 2 && !sensitive.has(w)) continue;
    const re = new RegExp(`\\b(${escapeRegExp(w)})\\s+\\1\\b`, "gi");
    issues.push(
      mkIssue({
        severity: sensitive.has(w) ? "BLOCK" : "WARN",
        type: "DUPLICATE",
        label: `Dubbel woord: "${w} ${w}"`,
        count: c,
        snippets: collectSnippets(text, re, maxSnippets),
        suggestion: `Haal één "${w}" weg.`,
      })
    );
  }

  return issues;
}

/** 2) herhaalde frases (2-6 woorden) zoals "in transparante samenwerking" herhaald */
function findRepeatedPhrases(text: string, maxSnippets: number): Issue[] {
  const issues: Issue[] = [];

  // hard-coded bekende pijnpunten
  const patterns: { label: string; re: RegExp; suggestion: string; severity: Severity }[] = [
    {
      label: `Herhaalde frase: "in transparante samenwerking"`,
      re: /\bin\s+transparante\s+samenwerking\b(?:\s+\bin\s+transparante\s+samenwerking\b)+/gi,
      suggestion: `Gebruik "in transparante samenwerking" één keer. Herstructureer de zin.`,
      severity: "BLOCK",
    },
    {
      label: `Herhaalde frase: "zelfstandig brandwacht"`,
      re: /\bzelfstandig\s+brandwacht\b(?:\s+\bzelfstandig\s+brandwacht\b)+/gi,
      suggestion: `Gebruik "zelfstandig brandwacht" één keer. Herlees kop/zin.`,
      severity: "BLOCK",
    },
  ];

  for (const p of patterns) {
    const snippets = collectSnippets(text, p.re, maxSnippets);
    if (!snippets.length) continue;
    issues.push(
      mkIssue({
        severity: p.severity,
        type: "REPEAT_PHRASE",
        label: p.label,
        count: snippets.length,
        snippets,
        suggestion: p.suggestion,
      })
    );
  }

  return issues;
}

/** 3) roadmap leak: toekomstfeatures / te specifieke product-beloftes */
function findRoadmapLeaks(text: string, maxSnippets: number): Issue[] {
  const issues: Issue[] = [];

  const leaks: { label: string; re: RegExp; suggestion: string }[] = [
    {
      label: "Toekomstfeature: E2E chat / beveiligd chatten",
      re: /\b(e2e|end[-\s]?to[-\s]?end)\b.*\b(chat|chatten)\b|\b(beveiligd)\s+chatten\b/gi,
      suggestion: `Vervang door: "Je stemt direct af met de professional." (zonder feature-details)`,
    },
    {
      label: "Toekomstfeature: logging / uniek ID / dispute bewijs",
      re: /\b(gelogd|loggen|loggegevens|uniek(e)?\s+id|dispuut|bewijs)\b/gi,
      suggestion: `Laat weg in ontwikkelfase. Houd het op: "Heldere afspraken, transparant vastgelegd."`,
    },
    {
      label: "Toekomstfeature: spoed-uitvraag",
      re: /\b(spoed[-\s]?uitvraag|spoedaanvraag|binnen\s+enkele\s+minuten)\b/gi,
      suggestion: `Vervang door: "Snel inzicht in beschikbaarheid." (zonder tijden/claims)`,
    },
    {
      label: "Toekomstfeature: addendum / basisovereenkomst details",
      re: /\b(addendum|basisovereenkomst|modelovereenkomst)\b/gi,
      suggestion: `Alleen noemen als het al live is. Anders: "Duidelijke afspraken tussen partijen."`,
    },
    {
      label: "Toekomstfeature: dashboard/app telefoon claim",
      re: /\b(dashboard|op\s+je\s+telefoon|mobiel)\b/gi,
      suggestion: `Vervang door: "Via het platform." (geen kanaal/details)`,
    },
    {
      label: "Toekomstfeature: profielen op basis van tarief/certificaten/regio (te concreet)",
      re: /\b(beschikbare\s+profielen|op\s+basis\s+van\s+tarief|certificaten|regio)\b/gi,
      suggestion: `Vervang door: "Je vindt passende professionals op basis van relevante criteria."`,
    },
  ];

  for (const l of leaks) {
    const snippets = collectSnippets(text, l.re, maxSnippets);
    if (!snippets.length) continue;

    issues.push(
      mkIssue({
        severity: "BLOCK",
        type: "ROADMAP_LEAK",
        label: l.label,
        count: snippets.length,
        snippets,
        suggestion: l.suggestion,
      })
    );
  }

  return issues;
}

/** 4) bureau-/control-taal die strijdig is met “platform + tooling” */
function findBureauTone(text: string, maxSnippets: number): Issue[] {
  const issues: Issue[] = [];

  const terms: { label: string; re: RegExp; suggestion: string; severity: Severity }[] = [
    {
      label: `Bureau-taal: "wij regelen"`,
      re: /\bwij\s+regel(en|t)\b/gi,
      suggestion: `Vervang door: "Je regelt het rechtstreeks; wij bieden tooling en inzicht."`,
      severity: "BLOCK",
    },
    {
      label: `Bureau-taal: "ontzorgen"`,
      re: /\bontzorg(en|t|ing)\b/gi,
      suggestion: `Vervang door: "De professional voert uit; het platform ondersteunt met tooling."`,
      severity: "BLOCK",
    },
    {
      label: `Bureau-taal: "bemiddelen/bemiddeling"`,
      re: /\bbemiddel(ing|en|t)\b/gi,
      suggestion: `Vervang door: "online matching + tooling voor directe samenwerking."`,
      severity: "BLOCK",
    },
    {
      label: `Bureau-taal: "wij plannen / ingepland"`,
      re: /\b(wij\s+plann(en|t)|wordt\s+ingepland|ingepland)\b/gi,
      suggestion: `Vervang door: "Partijen stemmen direct af; jij houdt regie."`,
      severity: "WARN",
    },
    {
      label: `Bureau-taal: "tussenpersoon/tussenpartij" (kan oké zijn, maar check context)`,
      re: /\b(tussenpersoon|tussenpartij)\b/gi,
      suggestion: `Context check: liever "platform" i.p.v. "tussenpersoon".`,
      severity: "WARN",
    },
  ];

  for (const t of terms) {
    const snippets = collectSnippets(text, t.re, maxSnippets);
    if (!snippets.length) continue;
    issues.push(
      mkIssue({
        severity: t.severity,
        type: "BUREAU_TONE",
        label: t.label,
        count: snippets.length,
        snippets,
        suggestion: t.suggestion,
      })
    );
  }

  return issues;
}

/** 5) optioneel: schreeuwerig taalgebruik (mild, vooral voor consistentie) */
function findShouty(text: string, maxSnippets: number): Issue[] {
  const issues: Issue[] = [];

  // veel caps / “beste / goedkoopste / nummer 1”
  const shout: { label: string; re: RegExp; suggestion: string }[] = [
    {
      label: "Schreeuwerig: superlatieven / claims",
      re: /\b(altijd|nooit|nummer\s*1|de\s+beste|goedkoopste|gegarandeerd|100%|beste\s+keuze)\b/gi,
      suggestion: `Maak het feitelijk: "transparant", "direct", "zonder bureau", "met tooling".`,
    },
  ];

  for (const s of shout) {
    const snippets = collectSnippets(text, s.re, maxSnippets);
    if (!snippets.length) continue;
    issues.push(
      mkIssue({
        severity: "WARN",
        type: "SHOUTY",
        label: s.label,
        count: snippets.length,
        snippets,
        suggestion: s.suggestion,
      })
    );
  }

  return issues;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function summarize(issues: Issue[]) {
  const blocks = issues.filter((i) => i.severity === "BLOCK").length;
  const warns = issues.filter((i) => i.severity === "WARN").length;
  const infos = issues.filter((i) => i.severity === "INFO").length;
  return { blocks, warns, infos };
}

function printIssue(issue: Issue) {
  const icon = issue.severity === "BLOCK" ? "⛔" : issue.severity === "WARN" ? "⚠️" : "ℹ️";
  console.log(`   ${icon} [${issue.type}] ${issue.label} (×${issue.count})`);
  for (const snip of issue.snippets) {
    console.log(`      ↳ …${snip}…`);
  }
  if (issue.suggestion) console.log(`      ✅ Suggestie: ${issue.suggestion}`);
}

function printPage(r: PageReport, verbose: boolean) {
  console.log(`\n📄 ${r.url}`);
  console.log(`   🧮 status: ${r.status} | woorden: ${r.words} | blocks: ${r.summary.blocks} | warns: ${r.summary.warns}`);

  if (!r.issues.length) {
    console.log(`   ✅ Geen issues gevonden.`);
    return;
  }

  const blocks = r.issues.filter((i) => i.severity === "BLOCK");
  const warns = r.issues.filter((i) => i.severity === "WARN");
  const infos = r.issues.filter((i) => i.severity === "INFO");

  if (blocks.length) {
    console.log(`   ⛔ Blockers:`);
    blocks.forEach(printIssue);
  }
  if (warns.length) {
    console.log(`   ⚠️ Warnings:`);
    warns.forEach(printIssue);
  }
  if (verbose && infos.length) {
    console.log(`   ℹ️ Info:`);
    infos.forEach(printIssue);
  }
}

async function analysePage(base: string, p: string, maxSnippets: number): Promise<PageReport> {
  const url = new URL(p, base).toString();
  const { status, body } = await fetchUrl(url);

  if (status >= 400) {
    return {
      path: p,
      url,
      status,
      words: 0,
      issues: [],
      summary: { blocks: 0, warns: 0, infos: 0 },
    };
  }

  const text = htmlToText(body);
  const words = countWords(text);

  const issues: Issue[] = [
    ...findDuplicateWords(text, maxSnippets),
    ...findRepeatedPhrases(text, maxSnippets),
    ...findRoadmapLeaks(text, maxSnippets),
    ...findBureauTone(text, maxSnippets),
    ...findShouty(text, maxSnippets),
  ];

  return {
    path: p,
    url,
    status,
    words,
    issues,
    summary: summarize(issues),
  };
}

async function main() {
  const { url: base, paths, onlyIssues, verbose, json, maxSnippets, failOn404 } = parseArgs(process.argv);

  console.log("🛡️ Tone Guard — ProBrandwacht / ProSafetyMatch");
  console.log(`🔗 Base: ${base}`);
  console.log(`🌐 Paths: ${paths.join(", ")}`);

  const reports: PageReport[] = [];
  let anyHard = false;

  for (const p of paths) {
    const pageUrl = new URL(p, base).toString();

    try {
      const r = await analysePage(base, p, maxSnippets);

      if (r.status === 404) {
        console.log(`\n📄 ${pageUrl}`);
        console.log(`   ⚠️ SKIP (404): route bestaat niet (meer).`);
        if (failOn404) anyHard = true;
        reports.push(r);
        continue;
      }

      if (r.status >= 400) {
        console.log(`\n📄 ${pageUrl}`);
        console.log(`   ❌ HTTP ${r.status}`);
        anyHard = true;
        reports.push(r);
        continue;
      }

      const shouldPrint = !onlyIssues || r.summary.blocks > 0 || r.summary.warns > 0;
      if (shouldPrint) printPage(r, verbose);

      if (r.summary.blocks > 0) anyHard = true;
      reports.push(r);
    } catch (e: any) {
      console.log(`\n📄 ${pageUrl}`);
      console.log(`   ❌ Fout bij ophalen/analyseren: ${e?.message ?? String(e)}`);
      anyHard = true;
    }
  }

  // write report
  if (json) {
    const outDir = path.join(process.cwd(), "reports");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, "tone-guard.json");
    fs.writeFileSync(outFile, JSON.stringify(reports, null, 2), "utf8");
    console.log(`\n📝 Report: ${outFile}`);
  }

  if (anyHard) {
    console.log("\n⛔ Tone Guard: FAIL (blockers / errors gevonden). Fix vóór je pusht.");
    process.exit(1);
  } else {
    console.log("\n✅ Tone Guard: OK (geen blockers).");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

