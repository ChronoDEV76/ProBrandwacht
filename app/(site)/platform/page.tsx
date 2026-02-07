import type { Metadata } from 'next'

import HeroBackground from '@/components/HeroBackground'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/platform')

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-14 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Initiatief
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-5xl">Wat is ProBrandwacht?</h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht is een onafhankelijk kennis- en vakplatform voor de Nederlandse
            brandwachtenmarkt.
          </p>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Het initiatief is ontstaan vanuit de praktijk: een markt waarin zelfstandige professionals,
            opdrachtgevers en tussenpartijen allemaal hun rol hebben -- maar waarin die rollen steeds vaker
            door elkaar lopen.
          </p>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-12 md:py-16">
          <div className="panel p-6">
            <h2 className="section-title">De rol van ProBrandwacht</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
              <li>Marktuitleg: laten zien hoe samenwerking met zelfstandige brandwachten werkt.</li>
              <li>Afbakening: laten zien waar verantwoordelijkheden beginnen en eindigen.</li>
              <li>Bewustwording: benoemen van risico&apos;s bij onduidelijke of verkapte constructies.</li>
            </ul>
          </div>

          <div className="panel p-6">
            <h2 className="section-title">Afbakening</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
              <li>ProBrandwacht opereert onafhankelijk van uitvoering en contractering.</li>
              <li>De samenwerking vindt plaats tussen opdrachtgever en professional.</li>
              <li>Het platform ondersteunt inzicht en rolhelderheid in plaats van planning.</li>
              <li>Besluiten en uitkomsten blijven contextafhankelijk.</li>
            </ul>
          </div>

          <div className="panel p-6">
            <h2 className="section-title">Publieke uitleg en context</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht bevindt zich bewust aan de voorkant van de markt: praktische uitleg en publieke
              informatie.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Het initiatief biedt duiding en overzicht. Samenwerking en afspraken blijven in de regel een
              verantwoordelijkheid van de betrokken partijen zelf.
            </p>
          </div>

          <div className="panel p-6">
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht kadert, waarschuwt en legt uit, zodat keuzes bewust en uitlegbaar blijven.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
