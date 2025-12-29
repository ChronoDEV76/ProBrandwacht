// app/(site)/steden/page.tsx
import Link from 'next/link'

import { CITY_DATA } from '@/lib/city-data'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata = getRouteMetadata('/steden')

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
              ProBrandwacht per stad: oriëntatie op inzet en afspraken
            </h1>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Op elke stedenpagina vind je een praktisch vertrekpunt voor gesprekken tussen zelfstandige
              brandwachten en opdrachtgevers: rollen, inzetcontext en aandachtspunten voor duidelijke,
              DBA-bewuste samenwerking.
            </p>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Gebruik dit overzicht om de route voor brandwachten, de route voor opdrachtgevers en onze
              uitgangspunten (kaders) te verkennen. Geen grote beloftes — wel duidelijke afspraken als basis.
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

              <Link
                href="/zzp/aanmelden"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/10"
              >
                Vrijblijvend aansluiten
              </Link>
            </div>
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

        <p className="mt-6 text-xs text-slate-400">
          Let op: inzet, afspraken en tariefscenario’s zijn altijd afhankelijk van locatie, risico’s en opdrachtcontext. Stem dit vooraf samen af.
        </p>
      </section>
    </main>
  )
}

