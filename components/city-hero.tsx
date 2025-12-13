import type { ReactNode } from 'react'

import { SPOED_UI_ENABLED } from '@/lib/featureFlags'

type CityHeroProps = {
  cityName: string
  heading?: ReactNode
}

export default function CityHero({ cityName, heading }: CityHeroProps) {
  const defaultHeading = (
    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
      Zelfstandige brandwacht {cityName}: word gevonden en blijf DBA-proof
    </h1>
  )

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-slate-50 p-6 ring-1 ring-slate-200 md:p-10">
      <div className="max-w-3xl">
        {heading ?? defaultHeading}
        <p className="mt-3 max-w-2xl text-slate-700">
          Sluit je aan bij ProBrandwacht; wij delen leads in en rond {cityName} en bereiden je voor op werken via ProSafetyMatch
          (Wet DBA-proof). Huidige status: handmatige matching en kennisdeling.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="/zzp/aanmelden"
            className="inline-flex items-center rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          >
            Meld je aan als zelfstandige brandwacht (gratis)
          </a>
          <a
            href="/over-ons"
            className="inline-flex items-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
          >
            Lees hoe we werken
          </a>
          {SPOED_UI_ENABLED ? (
            <a
              href="/probrandwacht-direct-spoed"
              className="text-sm font-semibold text-brand-700 underline underline-offset-4"
            >
              Spoed (24/7) →
            </a>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Direct contact met opdrachtgevers
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Geen concurrentiebeding · geen race to the bottom
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Voorbereiding op Wet DBA-afspraken
          </span>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-brand-100 blur-2xl sm:block" />
    </section>
  )
}
