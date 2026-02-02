import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import Prose from '@/components/prose'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/brandwachtenmarkt')

export default function BrandwachtenmarktPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Brandwachtenmarkt', url: 'https://www.probrandwacht.nl/brandwachtenmarkt' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 pb-10 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Kenniscluster
          </span>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Brandwachtenmarkt en systeemwerking
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Onafhankelijke duiding van hoe de brandwachtenmarkt werkt, hoe rollen zich verhouden en waar
            systeemspanningen ontstaan. Geen advies, geen oplossingstaal, wel context.
          </p>
        </div>
      </HeroBackground>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        <article className="rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)] md:p-8">
          <Prose>
            <h2>Doel en afbakening</h2>
            <p>
              Deze pillar page beschrijft hoe de markt voor brandwacht-inzet is gegroeid en waarom bepaalde
              spanningen terugkomen. Het doel is begrip en herkenning, niet beoordeling of sturing.
            </p>

            <h2>Hoe we dit onderwerp benaderen</h2>
            <ul>
              <li>We kijken naar rolverdeling, mandaat en systeemverantwoordelijkheid.</li>
              <li>We beschrijven waar aanwezigheid en veiligheid uit elkaar gaan lopen.</li>
              <li>We leggen uit hoe marktstructuur gedrag en verwachtingen kan sturen.</li>
            </ul>

            <h2>Onderwerpen in dit cluster</h2>
            <ul>
              <li>
                <Link href="/blog/brandveiligheidsmarkt-nederland-trends-en-regelgeving">
                  De brandveiligheidsmarkt in Nederland: trends en regelgeving
                </Link>
              </li>
              <li>
                <Link href="/blog/aanwezigheid-is-geen-veiligheid">Aanwezigheid is geen veiligheid</Link>
              </li>
              <li>
                <Link href="/blog/onbedoelde-veiligheidsillusie-als-systeemfout">
                  Onbedoelde veiligheidsillusie is een systeemfout
                </Link>
              </li>
              <li>
                <Link href="/blog/brandwacht-als-signaaldrager">
                  De brandwacht als signaaldrager, niet als risicodrager
                </Link>
              </li>
              <li>
                <Link href="/blog/veiligheid-vraagt-om-nuance">
                  Veiligheid vraagt om nuance - niet om zwart-witdenken
                </Link>
              </li>
            </ul>

            <h2>Leeswijzer</h2>
            <p>
              De artikelen in dit cluster zijn bewust beschrijvend. Ze benoemen systeemspanningen zonder
              individuele schuld of oplossingsrichting. Zo blijft de focus op inzicht en rolhelderheid.
            </p>
          </Prose>
        </article>
      </section>
    </main>
  )
}
