import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import SeoStructuredData from '@/components/SeoStructuredData'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/voor-brandwachten')

export default function VoorBrandwachtenPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Voor brandwachten', url: 'https://www.probrandwacht.nl/voor-brandwachten' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 4)} />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-14 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Voor brandwachten (zzp)
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Ondernemerschap is vrijheid —
            <br className="hidden md:block" />
            maar ook{' '}
            <span className="text-emerald-300">professioneel gedrag onder druk</span>.
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Dit platform past bij brandwachten die hun zelfstandige rol actief willen dragen — juridisch,
            operationeel en op de werkvloer. Aanmeldingen komen op een wachtlijst, inzet is contextafhankelijk en
            selectie kan onderdeel zijn van onboarding.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/voor-brandwachten/aanmelden"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Aanmelden (wachtlijst)
            </Link>
            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kaders & verantwoordelijkheid
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kennisbank
            </Link>
          </div>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Dit is de lat (in de regel)
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                <li>• Rolbegrip: weten wat jouw verantwoordelijkheid is (en wat niet).</li>
                <li>• Situatiegedrag: kalm communiceren als het spannend wordt.</li>
                <li>• Dossierdiscipline: afspraken vastleggen en terug te vinden houden.</li>
                <li>• Ondernemerschap: tarief/voorwaarden in overleg, zonder “iemand die het regelt”.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Dit is wat het niet is
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                <li>• Geen garantie op werk.</li>
                <li>• Geen “planners” die je sturen alsof je werknemer bent.</li>
                <li>• Geen standaardinstroom zonder dat de intentie en afspraken zijn besproken.</li>
                <li>• Geen snelle bulk-aanwas; kwaliteit gaat vóór volume.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">Waarom deze focus?</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              Omdat vertrouwen niet uit marketing komt, maar uit voorspelbaarheid in uitvoering. Opdrachtgevers
              kiezen onder druk vaak voor hiërarchie. Daarom werken we met duidelijke kaders en kan selectie onderdeel
              zijn van onboarding. ProSafetyMatch (in ontwikkeling) bouwt hier later technisch op door.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
