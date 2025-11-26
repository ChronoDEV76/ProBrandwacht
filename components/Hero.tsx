// components/Hero.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const taglines = [
  "Het eerlijkste platform voor zzp-brandwachten — geen bureaugedoe, geen prijsdruk, geen flauwekul.",
  "Wij matchen expertise aan jouw opdracht.",
  "Bij beschikbaarheid, Snel inzetbaar op locatie.",
  "Gecertificeerd. Gescreend. Gereed voor inzet.",
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % taglines.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* achtergrond */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 text-base font-semibold text-slate-700 shadow">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Door brandweermensen, voor brandweermensen
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            ProBrandwacht
            <span className="block text-slate-600 sm:mt-2 sm:text-[1.45rem]">
              Het platform voor gecertificeerde brandwachten 
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-900 sm:text-lg">
            Een netwerk van industriële, repressieve & rijksgediplomeerde professionals.
            <br />
            Direct, Eerlijk , Zonder tussenlagen 
          </p>

          {/* roterende payoff */}
          <p
            className="mx-auto mt-5 max-w-2xl text-base font-medium text-slate-900"
            aria-live="polite"
          >
            {taglines[idx]}
          </p>

          {/* CTA’s */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/zzp/aanmelden"
              className="inline-flex h-11 items-center rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Meld je aan als professional
            </Link>
            <Link
              href="/probrandwacht-direct"
              className="inline-flex h-11 items-center rounded-md border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-white"
            >
              Zoek direct een brandwacht
            </Link>
          </div>

          {/* trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
              Rijksgediplomeerd en/of repressief
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
              Eerlijke tarieven. Direct contact. Snel geregeld.
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
              Bij beschikbaarheid, Snel inzetbaar
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
