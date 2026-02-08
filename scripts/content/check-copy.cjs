// scripts/content/check-copy.cjs
// Script 2.0 – Anti-bureau / Circle of Influence copy-checker
// Gebruik: node scripts/content/check-copy.cjs https://www.probrandwacht.nl

const axios = require("axios");
const cheerio = require("cheerio");

const url = process.argv[2];

if (!url) {
  console.error("Gebruik: node scripts/content/check-copy.cjs https://jouwdomein.nl");
  process.exit(1);
}

// PATROON CATEGORIEËN
const patterns = [
  // 1. Harde tijdsgaranties
  {
    category: "Tijdsgarantie",
    regex: /\b(binnen\s*\d+\s*uur|altijd binnen|in\s*2\s*uur|in\s*een\s*uur)\b/i,
    issue: "Harde tijdsbelofte (buiten je Circle of Influence).",
    suggestion:
      "Gebruik formuleringen als: 'vaak binnen 24 uur een voorstel' of 'zo snel mogelijk, met realistische planning op basis van beschikbaarheid en reistijd'.",
  },

  // 2. Werk- of inkomensgaranties
  {
    category: "Werkgarantie",
    regex: /\b(gegarandeerd werk|altijd werk|altijd opdrachten|nooit zonder opdracht|altijd inkomen|inkomen gegarandeerd)\b/i,
    issue: "Je kunt geen werk of inkomen garanderen.",
    suggestion:
      "Zeg liever: 'we leggen uit hoe samenwerking werkt' of 'we duiden waar je op moet letten', zonder absolute garantie.",
  },

  // 3. Race-to-the-bottom / goedkoopste taal
  {
    category: "Race to the bottom",
    regex: /\b(laagste tarief|laagste prijs|goedkoopste brandwachten|goedkoopste|onder de marktprijs|dumpprijzen)\b/i,
    issue: "Prijsveiling / race-to-the-bottom taal past niet bij jullie Anti-bureau positie.",
    suggestion:
      "Leg de nadruk op kwaliteit, veiligheid en rolafbakening. Bijvoorbeeld: 'uitlegbare afspraken' en 'duidelijke verantwoordelijkheden'.",
  },

  // 4. Absoluut risicoloos / 100%-claims
  {
    category: "Absoluut risicoloos",
    regex: /\b(geen risico voor jou|100%\s*risicovrij|altijd veilig|volledig zonder risico|100%\s*garantie)\b/i,
    issue: "100%-claims zijn zelden waar en juridisch gevoelig.",
    suggestion:
      "Formuleer bijvoorbeeld: 'we verkleinen risico's met duidelijke rolafbakening en afspraken', zonder 100%-garantie.",
  },

  // 5. Te absolute ontzorging / wij regelen alles
  {
    category: "Te absolute ontzorging",
    regex: /\b(wij regelen alles|je hoeft nooit meer acquisitie te doen|wij nemen alles over|je hoeft zelf niets te doen)\b/i,
    issue: "Te absolute belofte over acquisitie of inzet, buiten jullie invloedssfeer.",
    suggestion:
      "Gebruik: 'we bieden context en analyse' of 'we maken helder waar je op moet letten'.",
  },

  // 6. Bureau-/uitzendtaal (context check)
  {
    category: "Bureau-taal (check context)",
    regex: /\b(uitzenden|uitzendbureau|bemiddelen van kandidaten|we plaatsen kandidaten|onder onze vlag)\b/i,
    issue:
      "Dit kan je meer laten klinken als klassiek uitzendbureau dan als eerlijk ecosysteem.",
    suggestion:
      "Overweeg taal als: 'we duiden hoe samenwerking werkt' en 'afspraken maak je 1-op-1', zonder klassieke bureau-taal.",
  },

  // 7. Anti-ZZP / schijnzelfstandigheid
  {
    category: "Anti-ZZP / schijnzelfstandigheid",
    regex: /\b(onder (ons|onze) leiding en toezicht|wij bepalen je werktijden|mag niet voor anderen werken|exclusief voor ons werken|verplicht beschikbaar)\b/i,
    issue:
      "Dit kan duiden op schijnzelfstandigheid of ongewenste afhankelijkheidsrelatie.",
    suggestion:
      "Benadruk juist zelfstandigheid: 'jij bepaalt je beschikbaarheid', 'geen concurrentiebeding', 'je kiest zelf voor welke opdrachtgevers je werkt'.",
  },

  // 8. Overdreven marktmaker-claims
  {
    category: "Marktclaims",
    regex: /\b(wij veranderen de markt compleet|het enige échte platform|niemand anders kan dit|altijd de beste oplossing)\b/i,
    issue:
      "Te grote marktclaims die moeilijk waar te maken zijn en vaak buiten je directe invloed vallen.",
    suggestion:
      "Gebruik concreet bewijs of beperk de claim: 'we bouwen een eerlijk alternatief', 'we bieden een gezonder ecosysteem voor brandwachten en opdrachtgevers'.",
  },
];

function splitInSentences(text) {
  return text
    .split(/(?<=[\.\!\?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 30); // hele korte stukjes skippen
}

(async () => {
  try {
    console.log(`🔍 Haal content op van: ${url}\n`);
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    // Simpel: alle tekst in body
    const bodyText = $("body").text().replace(/\s+/g, " ").trim();
    const sentences = splitInSentences(bodyText);

    const findings = [];

    for (const sentence of sentences) {
      for (const pattern of patterns) {
        if (pattern.regex.test(sentence)) {
          findings.push({ sentence, ...pattern });
        }
      }
    }

    if (findings.length === 0) {
      console.log("✅ Geen risicovolle of anti-ecosysteem-teksten gevonden op basis van de huidige checks.\n");
      console.log(
        "Tip: hou zelf bij elke claim de vraag erbij: 'Ligt dit écht binnen onze Circle of Influence?'"
      );
      return;
    }

    console.log(`⚠️ Gevonden mogelijke verbeterpunten (${findings.length}):\n`);

    findings.forEach((f, i) => {
      console.log(`#${i + 1} [${f.category}]`);
      console.log(`Zin:       ${f.sentence}`);
      console.log(`Probleem:  ${f.issue}`);
      console.log(`Suggestie: ${f.suggestion}`);
      console.log("—".repeat(90));
    });
  } catch (err) {
    console.error("❌ Fout bij ophalen of analyseren:", err.message);
  }
})();
