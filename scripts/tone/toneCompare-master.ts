#!/usr/bin/env ts-node

/**
 * Master Tone & SEO Comparison Tool
 *
 * Combineert:
 *  - reports/tone-live-report.json
 *  - reports/tone-competitors-report.json
 *  - reports/tone-profile-report.json
 *  - reports/tone-advice-probrandwacht.json
 *
 * Doel:
 *   - ProBrandwacht taalkundig positioneren als:
 *       * pro-ZZP
 *       * vakbond-style
 *       * bruggenbouwer
 *       * SEO-autoriteit in brandveiligheid + zelfstandigheid
 */

import fs from "node:fs";
import path from "node:path";

type Category = {
  key: string;
  label: string;
  perThousandWords: number;
};

type SiteProfile = {
  url: string;
  wordCount: number;
  categories: Category[];
  dominantTone: string;
  interpretation: string;
};

type ProfilesReport = {
  scannedAt: string;
  sites: SiteProfile[];
};

type LivePage = {
  url: string;
  ok: boolean;
  issues: { found: string; suggestion: string }[];
  positives: string[];
};

type LiveReport = {
  base: string;
  scannedAt: string;
  pages: LivePage[];
};

type CompetitorPage = {
  url: string;
  ok: boolean;
  issues: { found: string; suggestion: string }[];
  positives: string[];
  words?: number;
  hardWordCount?: number;
  toneScore?: number;
};

type CompetitorReport = {
  scannedAt: string;
  pages: CompetitorPage[];
};

type PageAdvice = {
  url: string;
  wordCount: number;
  proZzpCount: number;
  bureauCount: number;
  bridgeCount: number;
  proZzpPerK: number;
  bureauPerK: number;
  bridgePerK: number;
  advice: string[];
};

function load<T = any>(file: string): T {
  const full = path.join(process.cwd(), "reports", file);
  if (!fs.existsSync(full)) {
    console.error("❌ Kon JSON niet vinden:", full);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(full, "utf8")) as T;
}

// JSON inladen
const live = load<LiveReport>("tone-live-report.json");
const competitors = load<CompetitorReport>("tone-competitors-report.json");
const profiles = load<ProfilesReport>("tone-profile-report.json");
const advice = load<PageAdvice[]>("tone-advice-probrandwacht.json");

// --------- Analyse-logica ---------

function avg(arr: number[]): number {
  if (!arr.length) return 0;
  return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100;
}

// Filter profielen van concurrenten vs jezelf
const competitorProfiles: SiteProfile[] = profiles.sites.filter(
  (s: SiteProfile) => !s.url.includes("probrandwacht")
);

const selfProfile = profiles.sites.find((s: SiteProfile) =>
  s.url.includes("probrandwacht")
);

if (!selfProfile) {
  console.error(
    "❌ Geen selfProfile gevonden in tone-profile-report.json (geen URL met 'probrandwacht')."
  );
  process.exit(1);
}

function getCat(site: SiteProfile, key: string): Category {
  const found = site.categories.find((c) => c.key === key);
  if (!found) {
    return { key, label: key, perThousandWords: 0 };
  }
  return found;
}

// Gemiddelde waarden concurrenten
const avgConflict = avg(
  competitorProfiles.map(
    (p: SiteProfile) => getCat(p, "conflict").perThousandWords
  )
);

const avgProZzp = avg(
  competitorProfiles.map(
    (p: SiteProfile) => getCat(p, "proZzp").perThousandWords
  )
);

const avgBureau = avg(
  competitorProfiles.map(
    (p: SiteProfile) => getCat(p, "bureauControl").perThousandWords
  )
);

const avgBridge = avg(
  competitorProfiles.map(
    (p: SiteProfile) => getCat(p, "bridge").perThousandWords
  )
);

// Self metrics
const selfConflict = getCat(selfProfile, "conflict").perThousandWords;
const selfProZzp = getCat(selfProfile, "proZzp").perThousandWords;
const selfBureau = getCat(selfProfile, "bureauControl").perThousandWords;
const selfBridge = getCat(selfProfile, "bridge").perThousandWords;

// --------- SEO & Tone ADVIES ---------

function seoSuggestions(): string[] {
  const suggestions: string[] = [];

  // (1) Pro-ZZP moet duidelijk hoger/zichtbaarder zijn dan de markt
  if (selfProZzp < avgProZzp * 1.5) {
    suggestions.push(
      "Voeg meer expliciete autonomie-taal toe (eigen regie, zzp’er bepaalt, eigen voorwaarden) om je pro-ZZP-profiel sterker te maken dan de markt."
    );
  } else {
    suggestions.push(
      "Je pro-ZZP/autonomie-taal ligt al duidelijk boven het gemiddelde van de markt. Dit ondersteunt je vakbond-achtige positionering."
    );
  }

  // (2) Bureau-taal moet lager zijn dan de markt
  if (selfBureau > avgBureau) {
    suggestions.push(
      "Er zit nog relatief veel bureau-/control-taal in vergelijking met de markt (woorden als ‘bemiddeling’, ‘ontzorgen’, ‘wij plannen’). Herformuleer dit naar 'direct contact', 'uitleg', 'afbakening', 'zelf kiezen'."
    );
  } else {
    suggestions.push(
      "Je gebruikt minder bureau-/control-taal dan de gemiddelde concurrent, wat je onderscheid als geen klassiek bureau versterkt."
    );
  }

  // (3) Brug-taal als unique selling point
  if (selfBridge < avgBridge * 2) {
    suggestions.push(
      "Je brug-/samenwerkingstaal is aanwezig, maar kan nog scherper boven de markt uitsteken. Benadruk vaker ‘samen verantwoordelijkheid nemen’, ‘eerlijk samenwerken’ en ‘heldere, toetsbare afspraken’."
    );
  } else {
    suggestions.push(
      "Je brugtaal (samen, eerlijk, heldere afspraken) ligt ruim boven het marktgemiddelde. Dit maakt je geloofwaardig als verbinding tussen zzp’ers en opdrachtgevers."
    );
  }

  // (4) Conflict-loos blijven
  if (selfConflict > 0) {
    suggestions.push(
      "Er is enige conflict-/strijdtaal aanwezig. Verwijder harde woorden om het vakbond-style zonder vijandbeeld te behouden."
    );
  } else {
    suggestions.push(
      "Je gebruikt geen conflict-/strijdtaal; dat past goed bij een volwassen, verbindende frontstage-duidingspositie."
    );
  }

  return suggestions;
}

// --------- MASTER RAPPORT ---------

const masterReport = {
  generatedAt: new Date().toISOString(),
  comparison: {
    competitors: {
      avgConflict,
      avgProZzp,
      avgBureau,
      avgBridge,
    },
    self: {
      conflict: selfConflict,
      proZzp: selfProZzp,
      bureau: selfBureau,
      bridge: selfBridge,
    },
    deltas: {
      conflictDiff: selfConflict - avgConflict,
      proZzpDiff: selfProZzp - avgProZzp,
      bureauDiff: selfBureau - avgBureau,
      bridgeDiff: selfBridge - avgBridge,
    },
  },
  seoAndToneAdvice: seoSuggestions(),
  pageAdvice: advice,
};

// JSON opslaan
const outFile = path.join(
  process.cwd(),
  "reports",
  "tone-master-comparison.json"
);
fs.writeFileSync(outFile, JSON.stringify(masterReport, null, 2), "utf8");

console.log("✅ MASTER ANALYSIS COMPLETE");
console.log("📁 Rapport opgeslagen in:");
console.log(outFile);

console.log("\n📊 SAMENVATTING:");
console.log("------------------------------------------------");
console.log("ProBrandwacht vs concurrenten:");
console.log(
  "- Conflict-taal:",
  selfConflict,
  "(self) vs",
  avgConflict,
  "(avg competitors)"
);
console.log(
  "- Pro-ZZP:",
  selfProZzp,
  "(self) vs",
  avgProZzp,
  "(avg competitors)"
);
console.log(
  "- Bureau-control:",
  selfBureau,
  "(self) vs",
  avgBureau,
  "(avg competitors)"
);
console.log(
  "- Brug/samen:",
  selfBridge,
  "(self) vs",
  avgBridge,
  "(avg competitors)"
);
console.log("------------------------------------------------");
console.log("\n🧠 SEO + Tone Of Voice Advies:");
seoSuggestions().forEach((s) => console.log(" - " + s));

console.log(
  "\n📄 Pagina-specifieke adviezen staan in 'reports/tone-advice-probrandwacht.json'."
);
