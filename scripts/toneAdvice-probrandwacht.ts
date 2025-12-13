#!/usr/bin/env ts-node

import fs from "node:fs";
import path from "node:path";
import http from "http";
import https from "https";
import { URL } from "url";

/**
 * ProBrandwacht Tone & Taal Advisor
 *
 * - Analyseert ALLEEN gerenderde pagina-tekst (HTML → tekst)
 * - Detecteert:
 *   • dubbele woorden
 *   • herhaalde woordgroepen
 *   • bureau-/control-taal
 *   • roadmap / toekomstfeature-lekken
 * - Leest alleen, schrijft niets
 */

// ---------------- CLI ----------------

function parseArgs() {
  const args: Record<string, string> = {};
  for (const p of process.argv.slice(2)) {
    if (p.startsWith("--")) {
      const [k, v] = p.replace(/^--/, "").split("=");
      args[k] = v ?? "";
    }
  }

  if (!args.url) {
    console.error("❌ Gebruik: --url=http://localhost:3000");
    process.exit(1);
  }

  return {
    baseUrl: args.url.replace(/\/$/, ""),
    paths: (args.paths ?? "/")
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean),
  };
}

// ---------------- Fetch helpers ----------------

function fetchHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const lib = u.protocol === "https:" ? https : http;

    lib
      .get(
        url,
        { headers: { "User-Agent": "ProBrandwacht-ToneAdvisor/1.0" } },
        (res) => {
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => resolve(data));
        }
      )
      .on("error", reject);
  });
}

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(p|div|li|h1|h2|h3|section|article|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------- Checks ----------------

// ongewenste bureau-/control-taal
const BUREAU_TERMS = [
  "bemiddeling",
  "bemiddelen",
  "ontzorgen",
  "wij regelen",
  "wij plannen",
  "ingepland",
];

// roadmap / toekomstfeatures (MOETEN WEG)
const ROADMAP_TERMS = [
  "e2e",
  "end-to-end",
  "beveiligd chatten",
  "chatten in het dashboard",
  "chatgegevens",
  "gelogd",
  "spoed uitvraag",
  "addendum",
  "dashboard",
  "binnen enkele minuten beschikbaar",
];

// dubbele woorden
function findDoubleWords(words: string[]) {
  const hits: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i] === words[i + 1] && words[i].length > 3) {
      hits.push(`${words[i]} ${words[i + 1]}`);
    }
  }
  return hits;
}

// herhaalde woordgroepen (2–6 woorden)
function findRepeatedPhrases(words: string[]) {
  const hits: string[] = [];
  for (let size = 2; size <= 6; size++) {
    for (let i = 0; i < words.length - size * 2; i++) {
      const a = words.slice(i, i + size).join(" ");
      const b = words.slice(i + size, i + size * 2).join(" ");
      if (a === b && a.length > 12) {
        hits.push(a);
      }
    }
  }
  return hits;
}

// ---------------- Main ----------------

async function analysePage(base: string, route: string) {
  const url = `${base}${route}`;
  const html = await fetchHtml(url);
  const text = htmlToText(html).toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);

  const doubleWords = findDoubleWords(words);
  const repeatedPhrases = findRepeatedPhrases(words);

  const bureauHits = BUREAU_TERMS.filter((t) => text.includes(t));
  const roadmapHits = ROADMAP_TERMS.filter((t) => text.includes(t));

  return {
    url,
    wordCount: words.length,
    doubleWords,
    repeatedPhrases,
    bureauHits,
    roadmapHits,
  };
}

async function main() {
  const { baseUrl, paths } = parseArgs();

  console.log("🧭 ProBrandwacht Tone & Taal Advisor");
  console.log(`🔗 Base: ${baseUrl}`);
  console.log(`🌐 Paths: ${paths.join(", ")}`);

  for (const p of paths) {
    try {
      const r = await analysePage(baseUrl, p);

      const hasIssues =
        r.doubleWords.length ||
        r.repeatedPhrases.length ||
        r.bureauHits.length ||
        r.roadmapHits.length;

      if (!hasIssues) continue;

      console.log(`\n📄 ${r.url}`);
      console.log(`   🧮 woorden: ${r.wordCount}`);

      if (r.doubleWords.length) {
        console.log("   ⚠ Dubbele woorden:");
        r.doubleWords.slice(0, 3).forEach((w) =>
          console.log(`     - "${w}"`)
        );
      }

      if (r.repeatedPhrases.length) {
        console.log("   ⚠ Herhaalde woordgroepen:");
        r.repeatedPhrases.slice(0, 3).forEach((w) =>
          console.log(`     - "${w}"`)
        );
      }

      if (r.bureauHits.length) {
        console.log("   ⚠ Bureau-/control-taal:");
        r.bureauHits.forEach((w) =>
          console.log(`     - "${w}"`)
        );
      }

      if (r.roadmapHits.length) {
        console.log("   🚨 Toekomstfeatures / roadmap-lek:");
        r.roadmapHits.forEach((w) =>
          console.log(`     - "${w}"`)
        );
      }
    } catch (e: any) {
      console.log(`\n📄 ${baseUrl}${p}`);
      console.log(`   ❌ Fout: ${e.message}`);
    }
  }

  console.log("\n✅ Klaar — alleen echte taal-issues getoond.");
}

main();

