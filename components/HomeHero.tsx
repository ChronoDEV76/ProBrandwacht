"use client";

import { useEffect, useState } from "react";
import HomeHeroCycle from "@/components/home-hero-cycle";

const taglines = [
  "Het eerlijkste platform voor zzp-brandwachten — geen bureaugedoe, geen prijsdruk, geen flauwekul.",
  "Wij matchen expertise aan jouw opdracht.",
  "Bij beschikbaarheid — snel inzetbaar op locatie.",
  "Gecertificeerd. Gescreend. Gereed voor inzet.",
];

export default function HomeHero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % taglines.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="flex min-h-[50vh] items-center justify-center text-center">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 shadow-2xl backdrop-blur-xl sm:px-10 sm:py-12">
          <p className="mx-auto mb-3 inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-white/80">
            Door brandweermensen · Voor brandweermensen
          </p>

          <h1 className="text-4xl font-bold tracking-wide text-white drop-shadow-xl sm:text-[2.6rem]">ProBrandwacht</h1>

          <p className="mt-3 text-[15px] text-white sm:text-lg">
            Het platform voor gecertificeerde brandwachten — direct, eerlijk en zonder tussenschakels.
          </p>

          <p className="mt-3 text-sm font-semibold text-white sm:text-[15px]">
            Bij beschikbaarheid. Snel inzetbaar. Zonder loze beloftes.
          </p>

          <p className="mt-2 text-sm text-white sm:text-[15px]">
            Geen bureaus, geen concurrentiebedingen, geen race to the bottom — wel direct contact en eerlijke tarieven.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href="/zzp/aanmelden"
              className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-black/60"
            >
              Meld je aan als professional
            </a>

            <a
              href="/probrandwacht-direct"
              className="rounded-full bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur shadow-md shadow-black/30 transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Zoek direct een brandwacht
            </a>
          </div>

          <HomeHeroCycle />
        </div>
      </div>
    </section>
  );
}
