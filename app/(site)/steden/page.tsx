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
              Brandwacht per stad: context, risico’s en werkbare afspraken
            </h1>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              De kern verandert niet per stad: <span className="font-semibold">rolverdeling</span>,{' '}
              <span className="font-semibold">verwachtingen</span> en{' '}
              <span className="font-semibold">afspraken</span> moeten vooraf kloppen.
              Wat wél verschilt is de omgeving (event, industrie, utiliteit, bouw) en de praktische
              frictie op de vloer.
            </p>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Daarom is elke stedenpagina een compacte “werkkaart”: wat komt vaak voor, waar let je op,
              en welke afspraken voorkomen gedoe. Voorbeelden zijn{' '}
              <span className="font-semibold">indicatief</span> en{' '}
              <span className="font-semibold">contextafhankelijk</span>.
            </p>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Belangrijk: ProBrandwacht is géén “wij leveren standaard”-platform. Het is een vakinhoudelijke
              route voor opdrachtgevers en zelfstandigen die professioneel willen samenwerken — en
              meebouwen aan een digitaal vervolg (ProSafetyMatch).
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/voor-brandwachten"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Route voor brandwachten
              </Link>
              <Link
                href="/opdrachtgevers"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
              >
                Route voor opdrachtgevers
              </Link>
              <Link
                href="/belangen"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
              >
                Bekijk de kaders
              </Link>
            </div>

            <p className="pt-1 text-xs text-slate-400">
              Tip: kies je stad en lees vooral het stuk “praktische afspraken”. Dáár win je vertrouwen.
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

        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Niche & verwachting
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            ProBrandwacht focust op samenwerking die “inspectie-proof” en operationeel werkbaar is.
            Niet iedereen past in die manier van werken — en dat is oké. Als je vooral “snel uren”
            zoekt zonder heldere afspraken, dan is een klassiek bureau-model vaak logischer.
          </p>
        </div>
      </section>
    </main>
  )
}
