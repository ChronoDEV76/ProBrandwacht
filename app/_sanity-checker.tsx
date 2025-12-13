// app/_sanity-checker.tsx
"use client";

import { useEffect } from "react";

type CheckResult = {
  riskyHits: string[];
  positiveHits: string[];
};

const RISKY_TERMS = [
  /bemiddelingsbureau/i,
  /bureaugedoe/i,
  /wij zetten je/i,
  /we plannen je in/i,
  /onderbrengen/i,
  /schijnzelfstandigheid/i,
  /uurtarief.*afromen/i,
];

const POSITIVE_TERMS = [
  /transparant/i,
  /zelfstandigheid/i,
  /autonomie/i,
  /tariefbewustzijn/i,
  /dba/i,
  /tariefopbouw/i,
  /handvat/i,
];

function scanCopy(text: string): CheckResult {
  const riskyHits = RISKY_TERMS.filter((re) => re.test(text)).map((re) => re.source);
  const positiveHits = POSITIVE_TERMS.filter((re) => re.test(text)).map((re) => re.source);
  return { riskyHits, positiveHits };
}

export function SanityChecker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const text = document?.body?.innerText || "";
    const { riskyHits, positiveHits } = scanCopy(text);

    // Expose manual trigger for console use
    // @ts-ignore
    if (typeof window !== "undefined") window.runVakbondSanityCheck = () => {
      const result = scanCopy(document.body?.innerText || "");
      logResults(result, true);
      return result;
    };

    logResults({ riskyHits, positiveHits });
  }, []);

  return null;
}

function logResults({ riskyHits, positiveHits }: CheckResult, manual = false) {
  const prefix = manual ? "[sanity:manual]" : "[sanity]";
  // eslint-disable-next-line no-console
  console.group(`${prefix} Vakbond copy check`);
  // eslint-disable-next-line no-console
  console.log("🔎 Controle op potentieel risicovolle termen:");
  if (riskyHits.length === 0) {
    // eslint-disable-next-line no-console
    console.log("✅ Geen risicovolle termen gevonden.");
  } else {
    riskyHits.forEach((hit) => {
      // eslint-disable-next-line no-console
      console.warn(`⚠️ Term/patroon gevonden: /${hit}/`);
    });
  }

  // eslint-disable-next-line no-console
  console.log("✅ Controle op positieve autoriteits-taal:");
  if (positiveHits.length === 0) {
    // eslint-disable-next-line no-console
    console.warn("⚠️ Geen autoriteits-termen gevonden. Overweeg woorden als transparant, zelfstandigheid, autonomie.");
  } else {
    positiveHits.forEach((hit) => {
      // eslint-disable-next-line no-console
      console.log(`✔ Autoriteitsterm gevonden: /${hit}/`);
    });
  }
  // eslint-disable-next-line no-console
  console.groupEnd();
}
