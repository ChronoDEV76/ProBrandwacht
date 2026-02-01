import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import AfbakeningNote from '@/components/afbakening-note'
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
              Onafhankelijke marktuitleg voor de brandwachtenmarkt
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-200/90">
              ProBrandwacht is een onafhankelijk kennisplatform over brandwacht-inzet, rollen en
              verantwoordelijkheden. We duiden hoe de markt werkt, welke randvoorwaarden ertoe doen en
              waar samenwerking in de praktijk vaak schuurt.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-200/90">
              ProBrandwacht is geen bureau, geen werkgever en geen matching-engine. We bemiddelen niet,
              sturen niet op voorwaarden en doen geen transacties.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-200/90">
              Ons doel is helderheid vóór inzet, zodat opdrachtgevers en professionals zelf betere,
              uitlegbare keuzes kunnen maken — 1-op-1 en in de praktijk.
            </p>
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="panel grid gap-4 p-6 md:grid-cols-2">
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

        <div className="mt-6">
          <AfbakeningNote />
        </div>

        <section className="panel mt-8 p-6">
          <h2 className="text-lg font-semibold text-white">Juridische disclaimer</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            De informatie op ProBrandwacht is uitsluitend informatief en algemeen van aard. ProBrandwacht
            geeft geen juridisch, fiscaal, compliance- of tariefadvies, bemiddelt niet en biedt geen
            garanties over uitkomsten, kwalificaties of handhaving. Afspraken over inzet en
            verantwoordelijkheden liggen in de regel rechtstreeks tussen opdrachtgever en professional. Aan de
            inhoud kunnen geen rechten worden ontleend.
          </p>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/opdrachtgevers"
            className="route-link"
          >
            Lees: voor opdrachtgevers
          </Link>
          <Link
            href="/voor-brandwachten"
            className="route-link"
          >
            Lees: voor brandwachten
          </Link>
        </div>
      </section>
    </main>
  )
}
