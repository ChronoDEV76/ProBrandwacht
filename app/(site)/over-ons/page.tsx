import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/over-ons')

export default function OverOnsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-14">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-slate-300/80">Over ProBrandwacht</p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Onafhankelijke marktduiding voor de brandwachtenmarkt
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-200/90">
              ProBrandwacht is een kennis- en duidingsinitiatief dat uitlegt hoe je brandveiligheidsinzet
              professioneel organiseert: uitvoerbaar op de werkvloer, uitlegbaar richting stakeholders en
              helder in rolverdeling.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-200/90">
              ProBrandwacht duidt de markt en kaders voor zelfstandige samenwerking — het initiatief zelf
              bemiddelt niet en stuurt niet.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-200/90">
              ProBrandwacht vertegenwoordigt geen beroepsgroep en spreekt niet namens brandwachten,
              opdrachtgevers of intermediairs.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-200/90">
              Er wordt onderzocht of er in de toekomst ondersteunende tooling kan ontstaan die afspraken
              beter helpt documenteren — dat verandert niets aan de onafhankelijke rol van ProBrandwacht.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-200/90">
              De markt is in beweging. Wetgeving, praktijk en interpretatie lopen niet in alle gevallen gelijk.
              ProBrandwacht pretendeert geen definitieve antwoorden te geven.
            </p>
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 rounded-2xl border border-slate-800/70 bg-slate-950/40 p-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Wat we wel doen</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-200/90">
              <li>Uitleg geven over samenwerking en uitvoerbaarheid</li>
              <li>Waarschuwen voor vage scopes en onduidelijke beslislijnen</li>
              <li>Kaders delen: welke vragen je vooraf stelt</li>
              <li>Voorbeelden geven van documenteerbare afspraken</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Wat we niet doen</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-200/90">
              <li>Geen bureau en geen werkgever</li>
              <li>Geen matching-engine en geen inzet beloven</li>
              <li>Geen prijssturing, geen rekenmodellen, geen percentages</li>
              <li>Geen oplossing verkopen of garanties suggereren</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/opdrachtgevers"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
          >
            Lees: voor opdrachtgevers
          </Link>
          <Link
            href="/voor-brandwachten"
            className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Lees: voor brandwachten
          </Link>
        </div>
      </section>
    </main>
  )
}
