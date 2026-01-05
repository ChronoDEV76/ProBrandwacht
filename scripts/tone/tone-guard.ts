#!/usr/bin/env ts-node

/**
 * 🛡️ Tone Guard — ProBrandwacht / ProSafetyMatch
 *
 * Doel:
 * - Check alleen de “app-tekst” (HTML -> plain text) op tone-signalen vóór publish
 * - Detecteer: bureau/control-taal, feature-leaks, schreeuw/oorlogstaal, te stellige beloftes
 * - Extra guard: als er "calculator/vergelijking" copy staat, dan moet er ook nuance/disclaimer staan
 *
 * CLI:
 *   npx ts-node scripts/tone/tone-guard.ts --url=http://localhost:3000 --paths=/,/opdrachtgevers,/voor-brandwachten,/belangen
 *
 * Opties:
 *   --onlyIssues=true|false   (default true)
 *   --verbose=true|false      (default false)
 *   --maxSnippets=3           (default 3)
 *   --report=reports/tone-guard.json (default)
 */

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import https from "node:https";
import { URL } from "node:url";

type Level = "ERROR" | "WARN" | "INFO";

type Rule = {
  id: string;
  level: Level;
  title: string;
  why: string;
  re: RegExp;
  replacement?: string; // wording suggestion
  allowIfAlsoMatchesAny?: RegExp[]; // if these are present, don't flag (escape hatch)
};

type Hit = {
  ruleId: string;
  level: Level;
  title: string;
  match: string;
  count: number;
  snippets: string[];
  replacement?: string;
};

type PageReport = {
  path: string;
  url: string;
  httpStatus?: number;
  words: number;
  issues: Hit[];
  notes: string[];
};

type RunReport = {
  meta: {
    timestamp: string;
    base: string;
    paths: string[];
    onlyIssues: boolean;
    verbose: boolean;
  };
  pages: PageReport[];
  summary: {
    pagesChecked: number;
    pagesWithIssues: number;
    errors: number;
    warnings: number;
  };
};

function parseArgs(argv: string[]) {
  const args: Record<string, string | boolean> = {};
  for (const part of argv.slice(2)) {
    if (!part.startsWith("--")) continue;
    const [k, ...rest] = part.replace(/^--/, "").split("=");
    args[k] = rest.length ? rest.join("=") : true;
  }

  const url = String(args.url || "");
  if (!url) {
    console.error("❌ Gebruik: --url=http://localhost:3000");
    process.exit(1);
  }

  const base = url.replace(/\/$/, "");
  const paths = String(args.paths || "/")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const onlyIssues =
    args.onlyIssues === false || args.onlyIssues === "false" ? false : true;
  const verbose = args.verbose === true || args.verbose === "true";
  const maxSnippets = Number(args.maxSnippets ?? 3) || 3;
  const reportPath = String(args.report || "reports/tone-guard.json");

  return { base, paths, onlyIssues, verbose, maxSnippets, reportPath };
}

/** Fetch HTML (works even if global fetch isn't present / to keep it deterministic) */
function fetchHtml(u: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const target = new URL(u);
    const lib = target.protocol === "https:" ? https : http;

    const req = lib.get(
      u,
      {
        headers: {
          "User-Agent": "ToneGuard/1.0 (ProBrandwacht/ProSafetyMatch)",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
        },
      },
      (res) => {
        const status = res.statusCode || 0;
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status, body: data }));
      }
    );
    req.on("error", reject);
  });
}

/** HTML -> plain text (enough for tone check) */
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(p|div|li|h1|h2|h3|h4|h5|br|section|article|header|footer|main|nav)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text: string): number {
  const parts = text.split(/\s+/).filter(Boolean);
  return parts.length;
}

function countMatches(text: string, re: RegExp): number {
  re.lastIndex = 0;
  let c = 0;
  while (re.exec(text)) c++;
  return c;
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

/**
 * ✅ EXACTE TONE RULES
 * - Bureau/control-taal (wij regelen, ontzorgen, bemiddelen)
 * - Feature-leaks (E2E chat, logs, addendum, spoeduitvraag, etc.)
 * - Oorlogsretoriek / bureau-bashing
 * - Te stellige beloftes (zekerheden)
 * - Calculator nuance guard (als je vergelijkt, moet je nuanceren)
 */
const RULES: Rule[] = [
  // 1) Bureau/control-taal (die jij expliciet NIET wilt)
  {
    id: "bureau-wij-regelen",
    level: "ERROR",
    title: "‘Wij regelen’ / ‘wij nemen over’ framing",
    why: "Je positioneert als platform + zelf-regie. ‘Wij regelen/ontzorgen/plannen’ klinkt als bureau.",
    re: /\b(wij\s+regelen|we\s+regelen|wij\s+nemen\s+over|we\s+nemen\s+over|wij\s+plannen|we\s+plannen|wordt\s+ingepland|aansturen)\b/gi,
    replacement: "‘Jij houdt regie; het platform faciliteert matching, inzicht en tooling.’",
  },
  {
    id: "bureau-ontzorgen",
    level: "ERROR",
    title: "‘Ontzorgen’ / ‘bemiddelen’ / ‘bemiddeling’",
    why: "ProSafetyMatch is geen bemiddelingsbureau; ‘ontzorgen/bemiddeling’ triggert dat frame.",
    re: /\b(ontzorg(en|t|ing)|bemiddel(ing|en|t)|tussenpersoon|tussenpartij|detacheerder|uitzendbureau)\b/gi,
    replacement: "Gebruik: ‘directe afspraken’, ‘platform faciliteert’, ‘eerlijk proces’, ‘zelfstandig’.",
    // Escape hatch: als je expliciet zegt "geen bemiddelingsbureau" mag het soms
    allowIfAlsoMatchesAny: [/\b(geen\s+bemiddelingsbureau|geen\s+klassiek\s+bureau|zonder\s+bureau)\b/i],
  },

  // 2) Feature-leaks (ontwikkelfase: NIET concreet maken)
  {
    id: "feature-leak-chat-e2e",
    level: "ERROR",
    title: "Feature-leak: (E2E) chat / dashboard / telefoon",
    why: "Roadmap/features niet noemen in publieke copy (kopieerbaar + belofte-risico).",
    re: /\b(e2e|end-?to-?end|beveiligd\s+chatten|chatten\s+in\s+het\s+dashboard|chat\s+in\s+het\s+dashboard|op\s+je\s+telefoon)\b/gi,
    replacement: "Hou het abstract: ‘tooling voor duidelijke afspraken en samenwerking’.",
  },
  {
    id: "feature-leak-logging-dispuut",
    level: "ERROR",
    title: "Feature-leak: logging / uniek ID / dispuut",
    why: "Juridische/operationele details niet lekken in copy tijdens ontwikkeling.",
    re: /\b(gelogd|chatgegevens|uniek\s+id|opvraagbaar|dispuut|geschil|audit[-\s]?trail)\b/gi,
    replacement: "Hou het abstract: ‘eerlijke en vastlegging van afspraken (waar passend)’.",
  },
  {
    id: "feature-leak-spoed-addendum",
    level: "ERROR",
    title: "Feature-leak: spoeduitvraag / addendum / contract-flow",
    why: "Niet noemen wat straks precies kan (spoed, addendum, basisovereenkomst).",
    re: /\b(spoed\s*uitvraag|spoeduitvraag|addendum|basis\s*overeenkomst|overeenkomst\s+genereren|contract\s+in\s+het\s+platform)\b/gi,
    replacement: "Gebruik: ‘ondersteunende tooling voor samenwerking en afspraken’.",
  },

  // 3) Bureau-bashing / oorlogstaal
  {
    id: "war-bureaus-fout",
    level: "WARN",
    title: "Bureau-bashing / polariserende taal",
    why: "Je wilt volwassen, verbindend blijven (brug), zonder ‘oorlog’ frame.",
    re: /\b(bureaus?\s+(pakken|misleiden|zijn\s+fout|verzieken|stelen)|klanten\s+stelen|slager\s+keurt\s+zijn\s+eigen\s+vlees)\b/gi,
    replacement: "Herformuleer naar: ‘we kiezen voor eerlijke, directheid en betere samenwerking’.",
  },
  {
    id: "war-scheld-sneer",
    level: "WARN",
    title: "Schreeuwerige of sneer-taal",
    why: "Je wil rust + volwassenheid uitstralen, geen aanval.",
    re: /\b(schreeuw(erd|en)|van\s+de\s+daken\s+schreeuwen|bijdehand|gezeik|dwars\s+liggen)\b/gi,
    replacement: "Houd het neutraal: ‘wij bouwen aan een rustiger, eerlijker proces’.",
  },

  // 4) Te stellige beloftes (claim-risico)
  {
    id: "absolute-promises",
    level: "WARN",
    title: "Te absolute beloftes (‘altijd’, ‘zeker’, ‘binnen enkele minuten’)",
    why: "Voorkom harde beloftes die je (nog) niet kunt garanderen.",
    re: /\b(altijd|100%|zeker|gegarandeerd|binnen\s+enkele\s+minuten|direct\s+beschikbaar|nooit)\b/gi,
    replacement: "Gebruik nuance: ‘vaak’, ‘meestal’, ‘waar mogelijk’, ‘indicatief’, ‘afhankelijk van beschikbaarheid’.",
  },
];

/**
 * Calculator/vergelijking nuance guard:
 * - Als de page tekst duidelijke ‘vergelijking/calculator/fee/marge/uurtarief’ signalen bevat,
 *   dan moet er óók minstens één disclaimer/nuance term staan.
 */
// Let op: "tarief/tarieven" alleen is te breed (bijv. /over-ons). We triggeren pas bij echte vergelijking/calculator-signalen.
const CALC_TRIGGER =
  /\b(uurtarief|uur\s*prijs|platformfee|fee|marge|via\s+bureau|t\.o\.v\.|verschil|calculator|bereken|tarief[-\s]?bereken|pdf[-\s]?rapport)\b/i;

const CALC_DISCLAIMERS = [
  /\bindicatie(f)?\b/i,
  /\bscenario\b/i,
  /\bschatting\b/i,
  /\b(geen\s+garantie|indicatief)\b/i,
  /\bafhankelijk\s+van\b/i,
  /\bmarktconform\b/i,
  /\bvoorbehoud\b/i,
];

function hasAny(text: string, res: RegExp[]) {
  return res.some((r) => r.test(text));
}

function applyRules(text: string, maxSnippets: number): { issues: Hit[]; notes: string[] } {
  const issues: Hit[] = [];
  const notes: string[] = [];

  for (const rule of RULES) {
    const count = countMatches(text, rule.re);
    if (!count) continue;

    // allowIfAlsoMatchesAny = escape hatch (e.g. "geen bemiddelingsbureau")
    if (rule.allowIfAlsoMatchesAny && hasAny(text, rule.allowIfAlsoMatchesAny)) {
      notes.push(`Rule ${rule.id} matched but was allowed due to explicit counter-framing.`);
      continue;
    }

    const snippets = collectSnippets(text, rule.re, maxSnippets);
    // for reporting: show the first actual match (best-effort)
    rule.re.lastIndex = 0;
    const m = rule.re.exec(text);
    const match = m?.[0] ?? "(match)";

    issues.push({
      ruleId: rule.id,
      level: rule.level,
      title: rule.title,
      match,
      count,
      snippets,
      replacement: rule.replacement,
    });
  }

  // Calculator nuance guard
  if (CALC_TRIGGER.test(text)) {
    const ok = hasAny(text, CALC_DISCLAIMERS);
    if (!ok) {
      issues.push({
        ruleId: "calc-missing-disclaimer",
        level: "WARN",
        title: "Calculator/vergelijking zonder nuance/disclaimer",
        match: "calculator/vergelijking copy",
        count: 1,
        snippets: ["(Trigger gevonden: vergelijking/calculator/fee/marge, maar geen disclaimer-term)"],
        replacement: "Voeg 1–2 termen toe zoals: ‘indicatief’, ‘scenario’, ‘afhankelijk van’, ‘marktconform’, ‘geen garantie’.",
      });
    }
  }

  return { issues, notes };
}

function printPage(pr: PageReport, verbose: boolean) {
  console.log(`\n📄 ${pr.url}`);

  if (pr.httpStatus && pr.httpStatus >= 400) {
    console.log(`   ❌ HTTP ${pr.httpStatus} (pagina niet beschikbaar)`);
    return;
  }

  console.log(`   🧮 woorden: ${pr.words}`);

  if (pr.issues.length === 0) {
    console.log(`   ✅ Geen tone-issues gevonden.`);
    return;
  }

  const errors = pr.issues.filter((i) => i.level === "ERROR").length;
  const warns = pr.issues.filter((i) => i.level === "WARN").length;

  console.log(`   ⚠ Issues: ${errors} ERROR, ${warns} WARN`);

  for (const hit of pr.issues) {
    const badge = hit.level === "ERROR" ? "🟥" : hit.level === "WARN" ? "🟧" : "🟦";
    console.log(`   ${badge} [${hit.level}] ${hit.title}  (×${hit.count})`);
    if (hit.replacement) console.log(`      → Suggestie: ${hit.replacement}`);
    for (const s of hit.snippets) console.log(`      ↳ …${s}…`);
  }

  if (verbose && pr.notes.length) {
    console.log(`   📝 notes:`);
    pr.notes.forEach((n) => console.log(`      - ${n}`));
  }
}

async function analysePage(base: string, p: string, maxSnippets: number): Promise<PageReport> {
  const url = new URL(p, base).toString();

  const { status, body } = await fetchHtml(url);
  if (status >= 400) {
    return {
      path: p,
      url,
      httpStatus: status,
      words: 0,
      issues: [],
      notes: [],
    };
  }

  const text = htmlToText(body);
  const words = wordCount(text);

  const { issues, notes } = applyRules(text, maxSnippets);

  return {
    path: p,
    url,
    httpStatus: status,
    words,
    issues,
    notes,
  };
}

function shouldPrint(pr: PageReport, onlyIssues: boolean) {
  if (!onlyIssues) return true;
  if (pr.httpStatus && pr.httpStatus >= 400) return true; // show broken route
  return pr.issues.length > 0;
}

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function main() {
  const { base, paths, onlyIssues, verbose, maxSnippets, reportPath } = parseArgs(process.argv);

  console.log("🛡️ Tone Guard — ProBrandwacht / ProSafetyMatch");
  console.log(`🔗 Base: ${base}`);
  console.log(`🌐 Paths: ${paths.join(", ")}`);
  if (!onlyIssues) console.log("ℹ️ onlyIssues=false (laat ook ‘goede’ pagina’s zien)");
  if (verbose) console.log("ℹ️ verbose=true (laat extra info zien)");

  const pages: PageReport[] = [];
  let errors = 0;
  let warnings = 0;

  for (const p of paths) {
    try {
      const pr = await analysePage(base, p, maxSnippets);
      pages.push(pr);

      errors += pr.issues.filter((i) => i.level === "ERROR").length;
      warnings += pr.issues.filter((i) => i.level === "WARN").length;

      if (shouldPrint(pr, onlyIssues)) printPage(pr, verbose);
    } catch (e: any) {
      const url = new URL(p, base).toString();
      const pr: PageReport = {
        path: p,
        url,
        httpStatus: 0,
        words: 0,
        issues: [
          {
            ruleId: "fetch-failed",
            level: "ERROR",
            title: "Fout bij ophalen/analyseren",
            match: e?.message ?? String(e),
            count: 1,
            snippets: [],
          },
        ],
        notes: [],
      };
      pages.push(pr);
      errors += 1;
      if (shouldPrint(pr, onlyIssues)) printPage(pr, verbose);
    }
  }

  const report: RunReport = {
    meta: {
      timestamp: new Date().toISOString(),
      base,
      paths,
      onlyIssues,
      verbose,
    },
    pages,
    summary: {
      pagesChecked: pages.length,
      pagesWithIssues: pages.filter((p) => p.issues.length > 0 || (p.httpStatus ?? 0) >= 400).length,
      errors,
      warnings,
    },
  };

  ensureDir(reportPath);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");

  console.log(`\n📝 Report: ${path.resolve(reportPath)}`);

  // Exit code: fail pipeline on ERROR
  if (errors > 0) process.exit(2);
}

main();
