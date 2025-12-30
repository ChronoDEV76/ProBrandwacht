import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import SeoStructuredData from '@/components/SeoStructuredData'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/over-ons')

export default function OverOnsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Over ons', url: 'https://www.probrandwacht.nl/over-ons' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 3)} />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-14 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Over ProBrandwacht
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Geen mooie praat —
            <br className="hidden md:block" />
            een model dat standhoudt{' '}
            <span className="text-emerald-300">in uitvoering</span>.
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht is ontstaan vanuit praktijkervaring met samenwerkingen waarin verantwoordelijkheid en
            rolverdeling niet in alle gevallen helder waren. Wij kiezen voor duidelijkheid vooraf, en voor een selecte aanpak.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Kaders & intentie
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kennisbank
            </Link>
            <a
              href="mailto:info@prosafetymatch.nl"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Waarom</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Inzet is vaak afhankelijk van “wie je kent”, onduidelijke tariefopbouw en afspraken die pas op locatie
              zichtbaar worden. Dat creëert stress op de verkeerde plek: in uitvoering. Daarom bouwen wij op
              rolverdeling, toetsbare afspraken en directe afstemming.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.65)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Wat we bouwen</p>
              <p className="mt-2 text-sm text-slate-200">
                ProBrandwacht: de vakinhoudelijke laag en bètacommunity. ProSafetyMatch (in ontwikkeling): de
                technische laag voor communicatie, dossieropbouw en afhandeling.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.65)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Wat je merkt</p>
              <p className="mt-2 text-sm text-slate-200">
                Minder ruis. Meer uitlegbaarheid. En een hogere lat voor gedrag op de vloer. Niet perfect — wel
                gericht op wat in de praktijk werkt.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">Transparantie & contact</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              ProBrandwacht gebruikt aanmeldingen om testmomenten en feedbacksessies te plannen. Reactiesnelheid
              en doorlooptijden zijn afhankelijk van capaciteit.
              Vragen? Mail{' '}
              <a className="underline hover:text-white" href="mailto:info@prosafetymatch.nl">
                info@prosafetymatch.nl
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
