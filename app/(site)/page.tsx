// app/(site)/page.tsx
import type { Metadata } from 'next'

import HeroBackground from '@/components/HeroBackground'
import { Cta } from '@/components/Cta'
import HomeUSPs from '@/components/HomeUSPs'
import WhyProbrandwachtSection from '@/components/why-probrandwacht-section'

export const metadata: Metadata = {
  title: 'ProBrandwacht — Uitvoerbare brandveiligheid',
  description:
    'ProBrandwacht is geen klassiek bureau. Wij bewaken dat brandveiligheid in de praktijk klopt — niet alleen op papier. Soms zeggen we ja. Soms zeggen we nee.',
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-14 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Geen klassiek bureau • Wel uitvoerbaarheid
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-5xl">
            Brandveiligheid vraagt meer dan inzet.{' '}
            <span className="text-emerald-300">Het vraagt uitvoerbaarheid.</span>
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht is geen klassiek bureau. Wij bewaken dat brandveiligheid in de
            praktijk klopt — niet alleen op papier. We matchen alleen waar rollen helder zijn, risico’s
            bespreekbaar zijn en afspraken daadwerkelijk uitvoerbaar zijn tijdens inzet.
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            <strong>Geen verborgen opslagen op het uurtarief.</strong> Eventuele platform- of servicekosten
            worden afzonderlijk berekend en in de regel vooraf transparant afgestemd met alle betrokkenen.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Cta id="brandwacht_interest_waitlist" />
            <Cta
              id="secondary_why_no"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5"
            />
          </div>

          <div className="mt-2 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Kern</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200 md:text-base">
              <strong>Wij verbinden alleen wat professioneel verantwoord is.</strong> Soms betekent dat:
              ja. Soms betekent dat: nee.
            </p>
          </div>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-12 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 md:p-6">
            <HomeUSPs className="px-0" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h2 className="text-2xl font-semibold text-white">Geen uren. Geen schijnzekerheid.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
                In een markt die steeds bureaucratischer wordt, groeit de afstand tussen papier en
                praktijk. Daar ontstaan risico’s — voor brandwachten én opdrachtgevers. ProBrandwacht
                zit niet “ertussen”, maar op de rand van regelgeving en uitvoering.
              </p>
              <p className="mt-4 text-sm text-slate-200 md:text-base">
                <strong>Wij bewaken de uitvoerbaarheid van brandveiligheid</strong> — niet alleen de inzet
                ervan.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h2 className="text-2xl font-semibold text-white">Wanneer wij wél en niet matchen</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
                <li>Rollen zijn helder (geen aannames, geen grijze zones).</li>
                <li>Risico’s zijn bespreekbaar (geen eenzijdige afwenteling).</li>
                <li>Afspraken zijn uitvoerbaar tijdens inzet (praktijk ≠ alleen papier).</li>
                <li>Kritisch meedenken hoort bij het werk (geen “niet zeuren”-cultuur).</li>
              </ul>
              <p className="mt-4 text-sm text-slate-200 md:text-base">
                Kunnen we dit niet waarmaken? Dan plaatsen we de opdracht niet.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Voor brandwachten - selectieve samenwerking
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">Professionele ruimte blijft leidend</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
                Je werkt niet in constructies waarin risico’s structureel bij jou landen of waar
                inhoudelijke zorgvuldigheid als lastig wordt gezien. Wij selecteren op uitvoerbaarheid,
                rolzuiverheid en professionele ruimte.
              </p>
              <div className="mt-5">
                <Cta id="brandwacht_learn_selection" />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Voor opdrachtgevers - uitvoerbaarheid vooraf
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">Zekerheid ontstaat vóór inzet</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
                Zekerheid ontstaat vóór inzet, niet bij toezicht. Wij helpen afspraken zo te organiseren
                dat ze in de praktijk kloppen. Minder discussie achteraf, meer rust tijdens uitvoering.
              </p>
              <div className="mt-5">
                <Cta id="opdrachtgever_explore" />
              </div>
            </div>
          </div>

          <WhyProbrandwachtSection />

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">Liever vooraf helder dan achteraf uitleggen</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Wij maken zichtbaar wat werkt, wat wringt en waar grenzen liggen. Dat is soms ongemakkelijk,
              maar in de regel eerlijk — en uiteindelijk goedkoper dan herstellen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Cta id="brandwacht_interest_waitlist" />
              <Cta
                id="secondary_how_we_work"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
