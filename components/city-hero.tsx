import type { ReactNode } from 'react'
import Link from 'next/link'

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
          ProBrandwacht biedt context en kaders voor zelfstandige samenwerking. Er wordt beschreven welke
          rolverdeling en afspraken vooraf nodig zijn om inzet in {cityName} uitvoerbaar te houden. Past dat
          niet? Dan is nee soms de professionele keuze; lees{' '}
          <Link href="/waarom-wij-soms-nee-zeggen" className="text-emerald-700 underline underline-offset-4 hover:text-emerald-800">
            waarom er soms nee wordt gezegd
          </Link>
          .
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Cta
            id="tertiary_contact_exploratory"
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

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Zo wordt uitvoerbaarheid herkend
          </p>
          <ul className="mt-3 space-y-2">
            <li>- Is de rol van de brandwacht expliciet?</li>
            <li>- Sluit de inzet aan op vergunning en praktijk?</li>
            <li>- Is verantwoordelijkheid helder bij escalatie?</li>
            <li>- Is de inzet uitvoerbaar zonder improvisatie?</li>
          </ul>
          <p className="mt-3 text-xs text-slate-600">
            Als dit klopt, kunnen partijen zelf verantwoord verder.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Rechtstreekse afstemming tussen partijen
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Geen concurrentiebeding · heldere afspraken
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
