// lib/vakbondSanityCheck.ts

export function runVakbondSanityCheck(root?: Document | HTMLElement): void {
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
  ];

  const authorityIndicators: RegExp[] = [
    /eerlijke/i,
    /zelfstandigheid/i,
    /dba-bewust/i,
    /dbabewust/i,
    /professioneel netwerk/i,
    /kennisinitiatief/i,
    /duidingslaag/i,
    /marktkader/i,
    /referentiepunt/i,
    /publiek informatie-initiatief/i,
    /vakmanschap/i,
    /autonomie/i,
    /onafhankelijk/i,
    /heldere afspraken/i,
  ];

  const target: Document | HTMLElement = root ?? document;
  const text =
    (target as Document).body?.innerText ??
    (target as HTMLElement).innerText ??
    "";

  console.group("🧠 ProBrandwacht Vakbond Sanity Script");

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
      "⚠️ Geen autoriteits-termen gevonden. Overweeg woorden als 'eerlijke', 'zelfstandigheid', 'autonomie', 'kennisinitiatief', 'duidingslaag', 'onafhankelijk'."
    );
  }

  console.groupEnd();
}
