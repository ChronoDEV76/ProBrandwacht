import type { Metadata } from 'next'
import Link from 'next/link'
import { CITY_DATA } from '@/lib/city-data'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/steden')

export default function StedenIndexPage() {
  const cities = [...CITY_DATA].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Stedenoverzicht
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Brandwacht-inzet per stad: verantwoordelijkheden en aandachtspunten
            </h1>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht legt uit hoe zelfstandige samenwerking werkt -- geen bureau, geen werkgeversrol,
              geen matching-engine.
            </p>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              De kern verandert niet per stad: <span className="font-semibold">rolverdeling</span>,{' '}
              <span className="font-semibold">verwachtingen</span> en{' '}
              <span className="font-semibold">afspraken</span> hebben vooraf scherpte nodig. Wat wel verschilt is
              de omgeving (event, industrie, utiliteit, bouw) en de praktische frictie op de vloer.
            </p>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Daarom is elke stedenpagina een compacte werkkaart: wat komt vaak voor, waar let je op,
              en welke afspraken helpen gedoe te beperken. Voorbeelden zijn{' '}
              <span className="font-semibold">indicatief</span> en{' '}
              <span className="font-semibold">contextafhankelijk</span>.
            </p>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Belangrijk: ProBrandwacht is geen aanbieder of uitvoerder met standaardpakketten. Het is een
              vakinhoudelijke route voor opdrachtgevers en zelfstandigen die professioneel willen samenwerken.
            </p>

            <div className="panel p-5 text-sm text-slate-200 md:text-base">
              <h2 className="text-lg font-semibold text-white">Hoe je de stedenpagina&apos;s leest</h2>
              <ul className="mt-3 space-y-2">
                <li><strong>Regelgeving & praktijk:</strong> wat lokaal vaak speelt en welke kaders relevant zijn.</li>
                <li><strong>Verwarring:</strong> waar scope, rol of bevoegdheden snel vervagen.</li>
                <li><strong>Wat ProBrandwacht wél/niet doet:</strong> uitleg geven en kaderen, geen bemiddeling.</li>
                <li><strong>Verantwoordelijkheid:</strong> afspraken en uitvoering blijven bij opdrachtgever en professional.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/voor-brandwachten" className="route-link">
                Voor brandwachten
              </Link>
              <Link href="/opdrachtgevers" className="route-link">
                Voor opdrachtgevers
              </Link>
              <Link href="/waarom-wij-soms-nee-zeggen" className="route-link">
                Waarom wij soms nee zeggen
              </Link>
            </div>

            <p className="pt-1 text-xs text-slate-400">
              Tip: kies je stad en lees vooral het stuk “praktische afspraken”. Dat helpt vertrouwen opbouwen.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/steden/${city.slug}`}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm font-semibold text-slate-100 transition hover:border-emerald-300 hover:text-emerald-200"
            >
              {city.name}
            </Link>
          ))}
        </div>

        <div className="panel mt-8 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Niche & verwachting
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            ProBrandwacht focust op samenwerking die operationeel werkbaar en uitlegbaar is. Niet iedereen
            past in die manier van werken -- en dat is oké. Als je vooral snelheid zoekt zonder heldere
            afspraken, dan is een klassiek bureau-model vaak logischer.
          </p>
        </div>
      </section>
    </main>
  )
}
