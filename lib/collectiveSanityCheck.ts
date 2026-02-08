// lib/collectiveSanityCheck.ts

export function runCollectiveSanityCheck(root?: Document | HTMLElement): void {
  if (typeof window === "undefined") {
    // Niet draaien tijdens SSR
    return;
  }

  const problematicPatterns: RegExp[] = [
    /wij zetten je in/i,
    /wij zetten jou in/i,
    /wij plannen je in/i,
    /wij plannen jou in/i,
    /wij plannen/i,
    /wordt ingepland/i,
    /kom in actie/i,
    /verzet je/i,
    /samen moeten we/i,
    /prijssturing/i,
    /exclusiviteit/i,
    /exclusief voor ons/i,
    /verboden relatiebeding/i,
    /relatiebeding/i,
    /\b(detacheringsbureau|uitzendbureau)\b/i,
    /\bbureau\b/i,
    /\bbemiddeling\b/i,
    /\bwij versus zij\b/i,
    /\bwij vs\.? zij\b/i,
    /\bnamens brandwachten\b/i,
    /\bnamens opdrachtgevers\b/i,
    /\bnamens (?:intermediairs|bureaus)\b/i,
    /\bcollectieve actie\b/i,
    /\bonderhandelen\b/i,
    /\bzetten druk\b/i,
    /\bbelangenbehartiging\b/i,
    /\bschijnveiligheid\b/i,
    /\bmisbruik\b/i,
    /\buitbuiting\b/i,
    /\boneerlijk\b/i,
    /\bschuld\b/i,
    /\bfalen\b/i,
    /\bmacht\b/i,
    /\bmanipulatie\b/i,
    /\bstrijd\b/i,
    /\boorlog\b/i,
    /\bboeman\b/i,
    /\btegenpartij\b/i,
  ];

  const authorityIndicators: RegExp[] = [
    /context/i,
    /duiding/i,
    /afbakening/i,
    /rolverdeling/i,
    /verantwoordelijkheid/i,
    /bevoegdheden/i,
    /systeemwerking/i,
    /spanningsveld/i,
    /risicoverdeling/i,
    /marktstructuur/i,
    /juridische positionering/i,
    /veiligheidskundig kader/i,
    /observatie/i,
    /signalering/i,
    /vastlegging/i,
    /referentiepunt/i,
    /onafhankelijk/i,
  ];

  const target: Document | HTMLElement = root ?? document;
  const text =
    (target as Document).body?.innerText ??
    (target as HTMLElement).innerText ??
    "";

  console.group("🧠 ProBrandwacht Sanity Script");

  console.log("🔎 Controle op potentieel risicovolle termen:");
  let foundBad = false;
  for (const pattern of problematicPatterns) {
    if (pattern.test(text)) {
      foundBad = true;
      console.warn("⚠️ Gevonden verdachte term/patroon:", pattern);
    }
  }
  if (!foundBad) {
    console.log("✅ Geen risicovolle termen gevonden.");
  }

  console.log("✅ Controle op positieve autoriteits-taal:");
  let foundGood = false;
  for (const pattern of authorityIndicators) {
    if (pattern.test(text)) {
      foundGood = true;
      console.log("✔ Sterke term gevonden:", pattern);
    }
  }
  if (!foundGood) {
    console.warn(
      "⚠️ Geen kern-termen gevonden. Overweeg woorden als 'context', 'duiding', 'afbakening', 'rolverdeling', 'systeemwerking', 'veiligheidskundig kader', 'onafhankelijk'."
    );
  }

  console.groupEnd();

  if (foundBad) {
    throw new Error("Sanity Check: verboden termen gevonden. Aanpassen voor launch.");
  }
}
