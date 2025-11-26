import type { ReactNode } from 'react'

import { SPOED_UI_ENABLED } from '@/lib/featureFlags'

type CityHeroProps = {
  cityName: string
  heading?: ReactNode
}

export default function CityHero({ cityName, heading }: CityHeroProps) {
  const defaultHeading = (
    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
      Brandwacht inhuren in {cityName}
    </h1>
  )

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-slate-50 p-6 ring-1 ring-slate-200 md:p-10">
      <div className="max-w-3xl">
        {heading ?? defaultHeading}
        <p className="mt-3 max-w-2xl text-slate-700">
          Zoek je een <strong>brandwacht</strong> in {cityName}? Via ProBrandwacht.nl zie je in een paar minuten welke inzet aansluit op je aanvraag.
          Kies voor <span className="font-medium">ProBrandwacht Direct</span> voor geplande opdrachten.
          {SPOED_UI_ENABLED ? (
            <> Voor 24/7 inzet schakel je via <span className="font-medium">ProBrandwacht Direct spoed</span>. </>
          ) : null}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="/probrandwacht-direct"
            data-analytics="hero-probrandwacht-direct-cta"
            className="inline-flex items-center rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          >
            ProBrandwacht Direct — geplande inzet
          </a>
          {SPOED_UI_ENABLED ? (
            <a
              href="/probrandwacht-direct-spoed"
              data-analytics="hero-probrandwacht-direct-spoed-cta"
              className="inline-flex items-center rounded-2xl border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
            >
              ProBrandwacht Direct spoed — 24/7
            </a>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Gecertificeerde brandwachten in {cityName}
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            DBA-proof & duidelijke tarieven
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Direct contact met professionals
          </span>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-brand-100 blur-2xl sm:block" />
    </section>
  )
}
