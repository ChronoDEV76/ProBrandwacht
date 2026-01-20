import type { Metadata } from 'next'

import { Cta } from '@/components/Cta'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/contact')

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Contact
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Contact
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is een platform dat samenwerking faciliteert tussen opdrachtgevers en zelfstandig
              uitvoerende professionals. Wij geven geen instructies, nemen geen beslissingen over
              samenwerking en zijn geen partij bij overeenkomsten.
            </p>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Heb je een vraag over onze werkwijze, de rol van het platform of wil je verkennend sparren over
              uitvoerbaarheid? Dan kun je hier contact opnemen.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Cta id="brandwacht_interest_waitlist" />
              <Cta id="opdrachtgever_explore" className="rounded-2xl px-5 py-2.5" />
              <Cta id="secondary_faq" />
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Contact opnemen betekent niet dat er een samenwerking tot stand komt. ProBrandwacht faciliteert
              uitsluitend de dialoog.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Waarover wil je sparren?</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>– DBA-bewuste samenwerking (rolverdeling / afspraken)</li>
              <li>– Inhuurstructuur en toetsbaarheid richting organisatie</li>
              <li>– Hoe je tarief, inzet en verantwoordelijkheden vooraf vastlegt</li>
              <li>– Roadmap ProSafetyMatch (praktische behoeften, niet “features”) </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Contactkanaal</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              Voeg in je bericht toe: context (event/industrie/bouw), locatie, gewenste inzetduur, en wat er nu onduidelijk is.
              Dan krijg je een antwoord dat direct bruikbaar is.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Verkennende intake</h2>
          <p className="mt-3 text-sm text-slate-200">
            Geen inschrijving of verkooppraat. Eerst toetsen of de vraag past en uitvoerbaar is.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Cta id="brandwacht_interest_waitlist" />
            <Cta id="opdrachtgever_explore" />
          </div>
        </div>
      </section>
    </main>
  )
}
