import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import Prose from '@/components/prose'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/wetgeving-brandwacht')

export default function WetgevingBrandwachtPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Wetgeving brandwacht', url: 'https://www.probrandwacht.nl/wetgeving-brandwacht' },
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
          <h1 className="text-3xl font-semibold text-white md:text-4xl">Wet- en regelgeving</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Duiding van wet- en regelgeving rond brandwacht-inzet en verantwoordelijkheid. We beschrijven
            kaders en begrippen zonder juridisch advies of interpretaties voor specifieke situaties.
          </p>
        </div>
      </HeroBackground>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        <article className="rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)] md:p-8">
          <Prose>
            <h2>Doel en afbakening</h2>
            <p>
              Deze pillar page zet de context neer voor wetgeving die de brandwachtenmarkt raakt. Het doel
              is helderheid over termen en reikwijdte, niet het geven van juridisch advies.
            </p>

            <h2>Hoe we dit onderwerp benaderen</h2>
            <ul>
              <li>We houden de taal feitelijk en beschrijvend.</li>
              <li>We leggen uit wat begrippen betekenen in de praktijk.</li>
              <li>We wijzen op rolafbakening en verantwoordelijkheid zonder oplossingsrichting.</li>
            </ul>

            <h2>Onderwerpen in dit cluster</h2>
            <ul>
              <li>
                <Link href="/blog/dba-en-brandwachten-wat-opdrachtgevers-moeten-weten">
                  DBA en brandwachten: wat opdrachtgevers moeten weten
                </Link>
              </li>
              <li>
                <Link href="/blog/zzp-direct-met-opdrachtgever-wet-dba">
                  ZZP direct met opdrachtgever: wet DBA
                </Link>
              </li>
              <li>
                <Link href="/blog/brandwacht-aanwezigheid-verantwoordelijkheid">
                  Brandwacht aanwezig zijn is iets anders dan verantwoordelijkheid dragen
                </Link>
              </li>
              <li>
                <Link href="/blog/wanneer-is-een-zelfstandige-brandwacht-vereist-bij-evenementen">
                  Wanneer is een brandwacht verplicht bij evenementen?
                </Link>
              </li>
            </ul>

            <h2>Leeswijzer</h2>
            <p>
              Deze teksten beschrijven regelgeving op hoofdlijnen. Bij vragen over de toepassing in een
              specifieke context is in de regel aanvullende duiding nodig.
            </p>
          </Prose>
        </article>
      </section>
    </main>
  )
}
