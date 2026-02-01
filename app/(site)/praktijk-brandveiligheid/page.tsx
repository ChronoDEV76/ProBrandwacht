import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import Prose from '@/components/prose'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/praktijk-brandveiligheid')

export default function PraktijkBrandveiligheidPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Praktijk brandveiligheid', url: 'https://www.probrandwacht.nl/praktijk-brandveiligheid' },
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
          <h1 className="text-3xl font-semibold text-white md:text-4xl">Praktijk en realiteit</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Dit cluster beschrijft waar systemen in de praktijk knellen. Geen oordeel, wel herkenning van
            de spanning tussen papier en uitvoering.
          </p>
        </div>
      </HeroBackground>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        <article className="rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)] md:p-8">
          <Prose>
            <h2>Doel en afbakening</h2>
            <p>
              Deze pillar page verbindt theorie met uitvoering. We beschrijven waar afspraken botsen met
              realiteit en wat dat betekent voor rolhelderheid en veiligheid.
            </p>

            <h2>Hoe we dit onderwerp benaderen</h2>
            <ul>
              <li>We beschrijven praktijkgevallen zonder oordeel of interventie.</li>
              <li>We benoemen frictie tussen verantwoordelijkheid en uitvoerbaarheid.</li>
              <li>We blijven bij observatie en duiding.</li>
            </ul>

            <h2>Onderwerpen in dit cluster</h2>
            <ul>
              <li>
                <Link href="/blog/5-meest-gemaakte-fouten-bij-brandwacht-inzet">
                  5 meest gemaakte fouten bij brandwacht-inhuur
                </Link>
              </li>
              <li>
                <Link href="/blog/industriele-brandwacht-wat-houdt-het-in">
                  Industriele brandwacht: wat houdt het in?
                </Link>
              </li>
              <li>
                <Link href="/blog/drie-soorten-brandwachten-en-waarom-ze-elkaar-juist-versterken">
                  Drie soorten brandwachten en waarom ze elkaar versterken
                </Link>
              </li>
              <li>
                <Link href="/blog/wat-doet-een-zelfstandige-brandwacht-manschap-a-b-taken-verantwoordelijkheden-en-regels">Brandwacht Manschap AB</Link>
              </li>
              <li>
                <Link href="/blog/wanneer-is-een-zelfstandige-brandwacht-vereist-bij-evenementen">
                  Wanneer is een brandwacht verplicht bij evenementen?
                </Link>
              </li>
            </ul>

            <h2>Leeswijzer</h2>
            <p>
              De focus ligt op wat er in de praktijk zichtbaar gebeurt. De artikelen zijn bedoeld om
              begrippen en rollen te verhelderen, niet om uitvoering te sturen.
            </p>
          </Prose>
        </article>
      </section>
    </main>
  )
}
