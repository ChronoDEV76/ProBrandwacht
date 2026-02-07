import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import SeoStructuredData from '@/components/SeoStructuredData'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/belangen')

export default function BelangenPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Belangen', url: 'https://www.probrandwacht.nl/belangen' },
  ]

  const principles = [
    {
      title: 'Rolhelderheid voorop',
      body: 'Vooraf moet duidelijk zijn wie beslist, wie uitvoert en waar grenzen liggen. Dat helpt ruis op locatie te beperken.',
    },
    {
      title: 'Afspraken in gewone taal',
      body: 'Leg vast wat er nodig is om uitvoering begrijpelijk te houden: scope, stopcriteria en beslislijnen.',
    },
    {
      title: 'Professionele autonomie',
      body: 'Zelfstandig werken vraagt ruimte om grenzen aan te geven. Dat is geen weerstand, maar verantwoordelijkheid.',
    },
    {
      title: 'Uitlegbaarheid boven snelheid',
      body: 'Wat vooraf niet uit te leggen is, wordt achteraf een probleem. Duidelijkheid komt eerst.',
    },
    {
      title: 'Context bepaalt het kader',
      body: 'Geen vaste modellen. Elke inzet heeft eigen risico’s, omgeving en randvoorwaarden.',
    },
    {
      title: 'Heldere rolverdeling',
      body: 'ProBrandwacht biedt context en kaders, zodat uitvoering en afspraken helder 1-op-1 kunnen plaatsvinden.',
    },
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
            Kaders en intentie
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Dit is waar ProBrandwacht voor staat -- helder, uitlegbaar en uitvoerbaar.
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Deze pagina is bewust concreet. Niet om te verkopen, maar om verwachtingen goed te zetten.
            In een sector met veiligheid, druk en aansprakelijkheid werkt alleen wat in de praktijk standhoudt.
          </p>

          <div className="panel max-w-3xl p-5">
            <p className="text-sm leading-relaxed text-slate-200">
              ProBrandwacht brengt mensen samen om te begrijpen hoe de markt werkt — zodat iedereen zelf
              betere keuzes kan maken.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/opdrachtgevers" className="route-link">
              Voor opdrachtgevers
            </Link>
            <Link href="/voor-brandwachten" className="route-link">
              Voor brandwachten
            </Link>
            <Link href="/disclaimer" className="route-link">
              Disclaimer
            </Link>
          </div>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((p) => (
              <div
                key={p.title}
                className="panel p-6 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)]"
              >
                <p className="text-sm font-semibold text-white">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="panel mt-8 p-6">
            <p className="text-sm font-semibold text-white">Twijfel je of dit past?</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              Dan is dat een goed signaal om eerst de kennisbank te lezen. Wie vooraf helderheid zoekt,
              voorkomt later frictie -- en dat is precies wat we willen ondersteunen.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
