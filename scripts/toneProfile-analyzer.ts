#!/usr/bin/env ts-node

/**
 * Tone Profile Analyzer
 *
 * Doel:
 * - Scan 1+ URLs
 * - Meet:
 *   - conflict/aanvalstaal
 *   - pro-ZZP/autonomie-taal
 *   - bureau/control-taal
 *   - brug-/samenwerkings-taal
 * - Genereert per site een "vakbond-profiel":
 *   - Is het vooral corporate/bureau?
 *   - Activistisch/strijdend?
 *   - Bruggenbouwend / neutraal?
 *
 * Gebruik:
 *   npx ts-node scripts/toneProfile-analyzer.ts --urls=https://www.degrootbrandwachten.nl/,https://www.qforcebv.nl
 */

import fs from "node:fs";
import path from "node:path";

// ---------- CLI parsing ----------

const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

if (!argv.urls) {
  console.error("❌ Gebruik: --urls=https://site1.nl/,https://site2.nl/pagina");
  process.exit(1);
}

const URLS: string[] = String(argv.urls)
  .split(",")
  .map((u) => u.trim())
  .filter((u) => u.length > 0);

const JSON_OUT = String(argv.json ?? "0") === "1";

// ---------- Woordlijsten ----------

// Taal die snel als aanvallend/strijdend voelt
const conflictWords = [
  "strijd",
  "vechten",
  "misbruik",
  "uitbuiting",
  "oneerlijk",
  "schandalig",
  "schaamteloos",
  "kapotmaken",
  "misstand",
  "onacceptabel",
  "slachtoffer",
  "fout bezig",
];

// Taal die sterk pro-zzp / autonomie communiceert
const proZzpWords = [
  "zzp",
  "zelfstandige",
  "zelfstandigen",
  "ondernemer",
  "ondernemers",
  "autonomie",
  "eigen tarief",
  "eigen tarieven",
  "eigen regie",
  "eigen keuzes",
  "zelf bepalen",
  "vrijheid",
  "vrij om te kiezen",
  "eigen voorwaarden",
];

// Taal die typisch bij bureaus / control / afhankelijkheid hoort
const bureauControlWords = [
  "wij plannen je in",
  "wij plannen jou in",
  "wij plannen",
  "we plannen je in",
  "wordt ingepland",
  "inplannen",
  "word je ingepland",
  "wij zetten je in",
  "wij zetten jou in",
  "wij zetten in",
  "inzet van mensen",
  "wij bepalen",
  "we bepalen",
  "aansturen",
  "sturen aan",
  "wij regelen alles",
  "volledig ontzorgen",
  "ontzorgen",
  "we nemen het over",
  "wij nemen alles uit handen",
  "geplande uren",
  "beschikbaar stellen van personeel",
  "uurtarief wordt bepaald",
  "bemiddelen",
  "bemiddeling",
  "detacheerder",
  "uitzendbureau",
  "tussenpersoon",
  "tussenpartij",
];

// Brug-/samenwerkings-/balans-taal
const bridgeWords = [
  "samen",
  "in overleg",
  "partnerschap",
  "samenwerking",
  "in goed overleg",
  "transparantie",
  "transparant",
  "balans",
  "evenwicht",
  "eerlijk",
  "eerlijke tarieven",
  "afspraken",
  "heldere afspraken",
  "gezamenlijk",
  "samen optrekken",
  "samen bouwen",
  "duurzame relatie",
  "duurzame samenwerking",
];

type CategoryKey = "conflict" | "proZzp" | "bureauControl" | "bridge";

type CategoryProfile = {
  key: CategoryKey;
  label: string;
  words: string[];
};

const categories: CategoryProfile[] = [
  { key: "conflict", label: "Conflict / Aanval", words: conflictWords },
  { key: "proZzp", label: "Pro-ZZP / Autonomie", words: proZzpWords },
  { key: "bureauControl", label: "Bureau / Controle", words: bureauControlWords },
  { key: "bridge", label: "Brug / Samenwerking", words: bridgeWords },
];

// ---------- Types ----------

type CategoryScore = {
  key: CategoryKey;
  label: string;
  rawCount: number;
  perThousandWords: number;
  matchedExamples: string[];
};

type SiteProfile = {
  url: string;
  wordCount: number;
  categories: CategoryScore[];
  dominantTone: string;
  interpretation: string;
};

type ProfileReport = {
  scannedAt: string;
  sites: SiteProfile[];
};

// ---------- Helpers ----------

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

function analyseTextTone(url: string, text: string): SiteProfile {
  const lower = text.toLowerCase();
  const words = (text.match(/\S+/g) || []).length;

  const categoryScores: CategoryScore[] = categories.map((cat) => {
    let rawCount = 0;
    const matchedExamples: string[] = [];

    for (const phrase of cat.words) {
      const pattern = new RegExp(escapeRegExp(phrase.toLowerCase()), "g");
      const matches = lower.match(pattern);
      if (matches && matches.length > 0) {
        rawCount += matches.length;
        matchedExamples.push(phrase);
      }
    }

    const perThousand =
      words > 0 ? Math.round((rawCount / words) * 1000 * 100) / 100 : 0;

    return {
      key: cat.key,
      label: cat.label,
      rawCount,
      perThousandWords: perThousand,
      matchedExamples,
    };
  });

  const conflict = categoryScores.find((c) => c.key === "conflict")!;
  const proZzp = categoryScores.find((c) => c.key === "proZzp")!;
  const bureau = categoryScores.find((c) => c.key === "bureauControl")!;
  const bridge = categoryScores.find((c) => c.key === "bridge")!;

  // Simpele interpretatie-logica
  let dominantTone = "Neutraal / Corporate";
  let interpretationLines: string[] = [];

  // Detectie conflict
  if (conflict.perThousandWords > 2) {
    dominantTone = "Activistisch / Strijdend";
    interpretationLines.push(
      "Relatief veel strijd-/aanvalstermen: risico dat bureaus zich aangevallen voelen."
    );
  }

  // Sterk pro-ZZP, weinig conflict → vakbond-achtig maar constructief
  if (proZzp.perThousandWords > 1 && conflict.perThousandWords <= 2) {
    dominantTone = "Pro-ZZP / Vakbond-style (constructief)";
    interpretationLines.push(
      "Duidelijke focus op ZZP, autonomie en eigen regie, zonder harde strijdtaal."
    );
  }

  // Veel bureau-control-taal, weinig pro-ZZP → klassiek bureau
  if (bureau.perThousandWords > 1 && proZzp.perThousandWords < 0.5) {
    dominantTone = "Klassiek bureau / opdrachtgever-gedreven";
    interpretationLines.push(
      "Veel taal rond plannen, inzetten, ontzorgen en controle; positie lijkt bureau-centrisch."
    );
  }

  // Brug-taal kan de toon verzachten / bruggenbouwer maken
  if (bridge.perThousandWords > 0.5 && conflict.perThousandWords <= 1) {
    if (dominantTone === "Neutraal / Corporate") {
      dominantTone = "Bruggenbouwer / Samenwerkend";
    }
    interpretationLines.push(
      "Stevige aanwezigheid van samenwerkings- en transparantie-taal; toon is verbindend."
    );
  }

  // Als er helemaal niets uitspringt:
  if (interpretationLines.length === 0) {
    interpretationLines.push(
      "Weinig uitgesproken pro-ZZP, bureau- of strijdtaal; eerder neutrale corporate toon."
    );
  }

  return {
    url,
    wordCount: words,
    categories: categoryScores,
    dominantTone,
    interpretation: interpretationLines.join(" "),
  };
}

// ---------- Main ----------

async function main() {
  console.log("🔎 Tone Profile Analyzer (vakbond-style vergelijking)");
  console.log(`🌐 URLs: ${URLS.join(", ")}\n`);

  const profiles: SiteProfile[] = [];
  const errors: { url: string; error: string }[] = [];

  for (const url of URLS) {
    console.log(`📄 ${url}`);

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (ProBrandwacht-ToneProfile-Scanner; +https://www.probrandwacht.nl)",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const html = await res.text();
      const plain = stripHtml(html);
      const profile = analyseTextTone(url, plain);
      profiles.push(profile);

      console.log(
        `   🧮 Woorden: ${profile.wordCount} | Dominante toon: ${profile.dominantTone}`
      );

      for (const cat of profile.categories) {
        console.log(
          `   - ${cat.label}: ${cat.rawCount}x (${cat.perThousandWords} per 1000 woorden)${
            cat.matchedExamples.length ? " | voorbeelden: " + cat.matchedExamples.join(", ") : ""
          }`
        );
      }

      console.log(`   💬 Interpretatie: ${profile.interpretation}\n`);
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      console.log(`   💥 Fout: ${msg}\n`);
      errors.push({ url, error: msg });
    }

    await sleep(500); // rate limiting voorkomen
  }

  const report: ProfileReport = {
    scannedAt: new Date().toISOString(),
    sites: profiles,
  };

  const outDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "tone-profile-report.json");
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2), "utf8");

  if (JSON_OUT) {
    console.log(JSON.stringify(report, null, 2));
  }

  console.log(`📝 JSON tone-profiel rapport: ${outFile}`);

  if (errors.length > 0) {
    console.log("\n⚠️ Sites met laadfouten:");
    for (const e of errors) {
      console.log(` - ${e.url}: ${e.error}`);
    }
  }

  console.log("\n✅ Klaar. Gebruik de interpretatie om jouw 'vakbond-style' juist te positioneren: pro-ZZP, bruggenbouwend, niet aanvallend.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

