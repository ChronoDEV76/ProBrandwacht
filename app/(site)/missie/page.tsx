import type { Metadata } from 'next'

import { Cta } from '@/components/Cta'
import SeoStructuredData from '@/components/SeoStructuredData'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/missie')

export default function MissiePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 3)} />

      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Missie
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Veiligheid organiseer je met structuur, niet met beloftes.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is gebouwd rondom een praktische keuze: samenwerking tussen zelfstandige brandwachten
              en opdrachtgevers moet vooraf helder zijn, zodat uitvoering rustig en toetsbaar blijft.
            </p>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Professioneel betekent: vooraf uitleggen wat je niet doet als het misgaat. We werken alleen
              zo: met selectie op uitvoerbaarheid en verantwoordelijkheid die je op locatie kunt uitleggen.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Cta id="about_kaders_intentie" />
              <Cta id="secondary_over_ons" className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Waar we voor staan</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Toetsbare samenwerking</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Rol, tarief en verantwoordelijkheid moeten vooraf kloppen. Dat maakt samenwerking uitlegbaar richting HR/OR,
              toezichthouders en vooral: richting de mensen op locatie.
              Het gaat om gedrag onder druk, niet om mooie woorden.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Wat we niet doen</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Geen macht via software</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Geen lock-in, geen exclusiviteit, geen verborgen afhankelijkheid.
              Het platform ondersteunt afspraken - het neemt ze niet over en neemt geen rol over bij uitvoering.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">ProSafetyMatch (i.o.)</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht is de vakinhoudelijke basis. ProSafetyMatch wordt de technische laag om planning/documentatie/dossiers
            stap voor stap digitaal te ondersteunen - zonder extra schakels toe te voegen.
          </p>
        </div>
      </section>
    </main>
  )
}
