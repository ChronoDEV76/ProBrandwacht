import type { ReactNode } from 'react'

import { Cta } from '@/components/Cta'
import { SPOED_UI_ENABLED } from '@/lib/featureFlags'

type CityHeroProps = {
  cityName: string
  heading?: ReactNode
}

export default function CityHero({ cityName, heading }: CityHeroProps) {
  const defaultHeading = (
    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
      Zelfstandige brandwacht {cityName}: helder samenwerken binnen Wet DBA
    </h1>
  )

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-slate-50 p-6 ring-1 ring-slate-200 md:p-10">
      <div className="max-w-3xl">
        {heading ?? defaultHeading}
        <p className="mt-3 max-w-2xl text-slate-700">
          ProBrandwacht is geen klassiek bureau en geen tariefdwang. We helpen afspraken vooraf helder krijgen,
          zodat inzet in en rond {cityName} in de praktijk klopt. ProSafetyMatch (in ontwikkeling) ondersteunt dit
          straks technisch, zonder extra tussenlagen.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Cta
            id="primary_select_compact"
            className="rounded-2xl border-slate-200 bg-white px-5 py-3 text-slate-900 hover:bg-slate-50"
          />
          <Cta
            id="secondary_why_no"
            className="rounded-2xl border border-slate-200 px-5 py-3 text-slate-800 hover:bg-white"
          />
          {SPOED_UI_ENABLED ? (
            <Cta id="secondary_spoed_direct" className="text-brand-700" />
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Direct contact met opdrachtgevers
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Geen concurrentiebeding · transparante tariefafspraken
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
