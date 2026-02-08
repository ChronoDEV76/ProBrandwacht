#!/usr/bin/env ts-node

import * as readline from "node:readline";
import fs from "node:fs";
import path from "node:path";

type Pattern = {
  label: string;
  pattern: RegExp;
  suggestion?: string;
};

const ROOT = process.cwd();
const TONE_PROFILE_PATH = path.join(ROOT, "scripts", "tone", "probrandwacht-tone.json");

function escapeRegex(s: string) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phraseToRegex(phrase: string) {
  const escaped = escapeRegex(phrase).replace(/\s+/g, "\\s+");
  const startsWord = /^[A-Za-z0-9]/.test(phrase);
  const endsWord = /[A-Za-z0-9]$/.test(phrase);
  const wrapped = startsWord && endsWord ? `\\b${escaped}\\b` : escaped;
  return new RegExp(wrapped, "i");
}

function loadToneProfile() {
  if (!fs.existsSync(TONE_PROFILE_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(TONE_PROFILE_PATH, "utf8"));
  } catch {
    return null;
  }
}

// Bureautaal: wat we willen ontmoedigen
const bureauPatterns: Pattern[] = [
  {
    label: "anti-bureau framing",
    pattern: /\b(wij|we)\s+zijn\s+tegen\s+bureaus?\b/i,
    suggestion: "Wij zijn vóór uitlegbaarheid, autonomie en volwassen samenwerking."
  },
  {
    label: "anti-bureau framing",
    pattern: /\banti-?\s*bureaus?\b/i,
    suggestion: "Wij zijn vóór uitlegbaarheid, autonomie en volwassen samenwerking."
  },
  {
    label: "bureaus doen het fout",
    pattern: /\bbureaus?\s+(doen|gaan)\s+(het\s+)?fout\b/i,
    suggestion: "Focus op uitlegbaarheid, autonomie en volwassen samenwerking."
  },
  {
    label: "bureaus onbetrouwbaar",
    pattern: /\bbureaus?\s+zijn\s+onbetrouwbaar\b/i,
    suggestion: "Focus op uitlegbaarheid, autonomie en volwassen samenwerking."
  },
  {
    label: "bemiddelingsbureau",
    pattern: /\bbemiddelings?bureau\b/i,
    suggestion:
      "initiatief dat uitlegt hoe 1-op-1 samenwerking werkt (zonder bureau)"
  },
  {
    label: "detacheringsbureau",
    pattern: /\bdetachering(s)?bureau\b/i,
    suggestion:
      "uitleg over zelfstandige samenwerking en rolafbakening"
  },
  {
    label: "ons bureau",
    pattern: /\bons (recruitment-?)?bureau\b/i,
    suggestion:
      "ons initiatief dat kaders en context biedt"
  },
  {
    label: "kandidaten",
    pattern: /\bkandidaten\b/i,
    suggestion: "brandwachten / professionals"
  },
  {
    label: "wordt ingezet",
    pattern: /\bwordt ingezet\b/i,
    suggestion: "werkt zelfbewust samen / kiest zelf voor opdrachten"
  },
  {
    label: "wordt geplaatst",
    pattern: /\bwordt geplaatst\b/i,
    suggestion: "start in een samenwerking die jij zelf gekozen hebt"
  },
  {
    label: "ontzorgen",
    pattern: /\bontzorgen(d|en)?\b/i,
    suggestion: "uitleg en afbakening, zodat jij zelf keuzes maakt"
  },
  {
    label: "volledig geregeld",
    pattern: /\b(volledig|helemaal) (voor u )?(geregeld|georganiseerd)\b/i,
    suggestion:
      "eerlijk ingericht, met duidelijke stappen die jij zelf doorloopt"
  },
  {
    label: "tarief in overleg",
    pattern: /\btarief in overleg\b/i,
    suggestion: "tarief wordt 1-op-1 afgesproken; geen advies of sturing"
  },
  {
    label: "uit handen nemen",
    pattern: /\b(neemt|nemen) .* uit handen\b/i,
    suggestion:
      "maken het eenvoudig voor je, maar jij houdt zelf de regie"
  }
];

// Positieve woorden: digitale, zelfbewuste, Circle-of-Influence-taal
const empowermentPatterns: Pattern[] = [
  { label: "rechtstreeks", pattern: /\brechtstreeks\b/i },
  { label: "zelf regie", pattern: /\bzelf(e)? regie\b/i },
  { label: "zelf kiezen", pattern: /\bzelf kiezen\b/i },
  { label: "direct contact", pattern: /\bdirect contact\b/i },
  { label: "DBA-proof", pattern: /\bDBA-?proof\b/i },
  { label: "eerlijk", pattern: /\beerlijk(e)?\b/i },
  { label: "helder", pattern: /\bhelder(e|heid)?\b/i },
  { label: "toetsbaar", pattern: /\btoetsbaar(e)?\b/i },
  { label: "duidelijk", pattern: /\bduidelijk(e)?\b/i },
  { label: "controleerbaar", pattern: /\bcontroleerbaar(e)?\b/i },
  { label: "goedgekeurd", pattern: /\bgoedgekeurd(e)?\b/i },
  { label: "gezamenlijk", pattern: /\bgezamenlijk(e)?\b/i },
  { label: "samen verantwoordelijk", pattern: /\bsamen verantwoordelijk\b/i },
  { label: "initiatief", pattern: /\binitiatief\b/i },
  { label: "analyse", pattern: /\banalyse\b/i },
  { label: "afbakening", pattern: /\bafbakening\b/i },
  { label: "uitlegbaarheid", pattern: /\buitlegbaar(heid)?\b/i },
  { label: "autonomie", pattern: /\bautonomie\b/i },
  { label: "volwassen samenwerking", pattern: /\bvolwassen samenwerking\b/i }
];

// Locus-of-control / Circle of Influence:
// "anderen doen iets met jou" -> buitencirkel
const externalControlPatterns: Pattern[] = [
  { label: "wordt ingepland", pattern: /\bwordt ingepland\b/i },
  { label: "wordt benaderd", pattern: /\bwordt benaderd\b/i },
  { label: "wordt gebeld", pattern: /\bwordt gebeld\b/i },
  { label: "wij regelen alles", pattern: /\bwij regelen alles\b/i },
  { label: "wij zorgen dat jij wordt ingezet", pattern: /\bwij zorgen dat jij.*wordt ingezet\b/i }
];

const toneProfile = loadToneProfile();
if (toneProfile) {
  const disallowed = toneProfile.disallowed_language ?? {};
  const avoidVoice = toneProfile.preferred_voice?.avoid ?? [];
  const forbiddenPromises = toneProfile.guarantees_and_promises?.forbidden ?? [];
  const closingAvoid = toneProfile.closing_guidance?.avoid ?? [];

  const pushTone = (label: string, phrases: string[]) => {
    if (!Array.isArray(phrases) || !phrases.length) return;
    phrases.forEach((phrase) => {
      bureauPatterns.push({
        label: `tone:${label}`,
        pattern: phraseToRegex(phrase),
        suggestion: "Herformuleer naar beschrijvende, neutrale systeemtaal."
      });
    });
  };

  pushTone("activist_terms", disallowed.activist_terms);
  pushTone("accusatory_terms", disallowed.accusatory_terms);
  pushTone("collective_identity", disallowed.collective_identity);
  pushTone("emotional_charge", disallowed.emotional_charge);
  pushTone("preferred_voice_avoid", avoidVoice);
  pushTone("forbidden_promises", forbiddenPromises);
  pushTone("closing_avoid", closingAvoid);
}

function countWords(text: string): number {
  const tokens = text.trim().split(/\s+/);
  return tokens.filter(Boolean).length;
}

type MatchResult = {
  label: string;
  match: string;
  index: number;
  suggestion?: string;
  context: string;
};

function findMatches(text: string, patterns: Pattern[]): MatchResult[] {
  const results: MatchResult[] = [];

  for (const p of patterns) {
    // g-flag zorgt dat we meerdere matches vinden
    const regex = new RegExp(p.pattern.source, p.pattern.flags.includes("g") ? p.pattern.flags : p.pattern.flags + "g");
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      const start = Math.max(0, m.index - 30);
      const end = Math.min(text.length, m.index + (m[0]?.length || 0) + 30);
      const context = text.slice(start, end).replace(/\n/g, " ");
      results.push({
        label: p.label,
        match: m[0],
        index: m.index,
        suggestion: p.suggestion,
        context
      });
    }
  }

  return results;
}

function analyze(text: string) {
  const clean = text.trim();
  if (!clean) {
    console.log("⚠️  Geen tekst aangeleverd. Geef tekst als argument of via stdin.");
    process.exit(1);
  }

  const wordCount = countWords(clean);
  const bureauMatches = findMatches(clean, bureauPatterns);
  const empowermentMatches = findMatches(clean, empowermentPatterns);
  const externalMatches = findMatches(clean, externalControlPatterns);

  // Bureauscore: aantal matches relatief t.o.v. lengte
  const bureauDensity = bureauMatches.length / Math.max(1, wordCount);
  // schaal 0–100, met zachte cap
  const bureauScore = Math.min(100, Math.round(bureauDensity * 400)); // 1 match per 25 woorden ≈ 16 punten

  // Circle-of-Influence score: hoe meer empowerment t.o.v. external, hoe beter
  const influenceRaw =
    empowermentMatches.length - externalMatches.length; // mag negatief zijn
  const influenceScore = Math.max(
    0,
    Math.min(100, 50 + influenceRaw * 10) // 50 is neutraal
  );

  console.log("🧪 Tekstanalyse – bureautaal & circle of influence");
  console.log("───────────────────────────────────────────────");
  console.log(`📏 Woorden:              ${wordCount}`);
  console.log(`🏢 Bureautaal-matches:   ${bureauMatches.length}`);
  console.log(`💡 Empowerment-matches:  ${empowermentMatches.length}`);
  console.log(`🌪 Externe-control-matches: ${externalMatches.length}`);
  console.log("");
  console.log(`🏢 Bureautaal-score (0–100, lager is beter): ${bureauScore}`);
  console.log(
    `⭕ Circle-of-Influence-score (0–100, hoger is meer zelfregie): ${influenceScore}`
  );

  console.log("\n📌 Bureautaal gevonden:");
  if (bureauMatches.length === 0) {
    console.log("  ✅ Geen expliciete bureautaal gevonden.");
  } else {
    for (const m of bureauMatches) {
      console.log(`\n  • Term: "${m.match}" (${m.label})`);
      console.log(`    Context: …${m.context}…`);
      if (m.suggestion) {
        console.log(`    💬 Suggestie: ${m.suggestion}`);
      }
    }
  }

  console.log("\n💡 Positieve (digitale / zelfregie) taal:");
  if (empowermentMatches.length === 0) {
    console.log(
      "  ℹ️  Geen duidelijke empowerment-woorden. Overweeg termen als 'rechtstreeks', 'zelf regie', 'eerlijk', 'analyse', 'afbakening'."
    );
  } else {
    const labels = Array.from(new Set(empowermentMatches.map((m) => m.label)));
    console.log("  ✓ Gezien:", labels.join(", "));
  }

  console.log("\n🌪 Externe-control zinnen (buitencirkel):");
  if (externalMatches.length === 0) {
    console.log("  ✅ Geen sterke 'met je laten sollen'-taal gevonden.");
  } else {
    for (const m of externalMatches) {
      console.log(`\n  • Zinsdeel: "${m.match}" (${m.label})`);
      console.log(`    Context: …${m.context}…`);
      console.log(
        "    💬 Hint: draai dit om naar wat de brandwacht zélf kiest of doet."
      );
    }
  }

  console.log("\nKlaar ✅");
}

// ─────────────────── CLI entry ───────────────────

const argText = process.argv.slice(2).join(" ").trim();

if (argText) {
  // Tekst via argument
  analyze(argText);
} else {
  // Tekst via stdin (bijv. echo "..." | npm run check:copy)
  const rl = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity
  });

  let buffer = "";
  rl.on("line", (line) => {
    buffer += line + "\n";
  });

  rl.on("close", () => {
    analyze(buffer);
  });
}
