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
      title: 'DBA-bewust is ook gedrag',
      body: 'Niet alleen papier. Ook op de vloer: communicatie, rolverdeling en het vermijden van feitelijke gezagsverhouding.',
    },
    {
      title: 'Afspraken vooraf',
      body: 'Tarief, inzet, verantwoordelijkheden en randvoorwaarden worden vooraf afgestemd en vastgelegd (scenario-afhankelijk).',
    },
    {
      title: 'Transparantie over kosten',
      body: 'Kosten/fee en afspraken zijn uitlegbaar. Geen vage ‘pakketjes’, wél inzichtelijke opbouw.',
    },
    {
      title: 'Selectie is onderdeel van kwaliteit',
      body: 'Niet iedereen past. Dat is geen oordeel, maar een veiligheidskeuze: voorspelbaarheid in uitvoering.',
    },
    {
      title: 'Spoed blijft spoed',
      body: 'Korte uitvraag, snelle afstemming, en passende routes voor betaling/afronding. Beschikbaarheid blijft contextafhankelijk.',
    },
    {
      title: 'Eén aanspreeklijn, zonder schijn-hiërarchie',
      body: 'Op de vloer moet duidelijk zijn wie wat beslist. Daarom maken we rolbegrip expliciet en toetsbaar.',
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
            Kaders & intentie
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Dit is waar ProBrandwacht voor staat —
            <br className="hidden md:block" />
            helder, toetsbaar en uitvoerbaar.
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Deze pagina is bewust concreet. Niet om te “verkopen”, maar om verwachtingen goed te zetten — zonder
            bemiddeling of schijnzekerheden. In een sector met veiligheid, druk en aansprakelijkheid werkt alleen wat
            in de praktijk standhoudt.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/opdrachtgevers"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Voor opdrachtgevers
            </Link>
            <Link
              href="/voor-brandwachten"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Voor brandwachten
            </Link>
            <Link
              href="/disclaimer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
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
                className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)]"
              >
                <p className="text-sm font-semibold text-white">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">Twijfel je of dit past?</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              Dan is dat een goed signaal om eerst de kennisbank te lezen. Wie blind tekent of de intentie niet leest,
              loopt later risico op frictie — en dat is precies wat we willen voorkomen.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
