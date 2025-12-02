import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import { HeroShell } from '@/components/layout/hero-shell'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { InfoCardsRow } from '@/components/layout/info-cards-row'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/opdrachtgevers/brandwacht-inhuren')

export default function BrandwachtInhurenOpdrachtgeversPage() {
  const canonical = 'https://www.probrandwacht.nl/opdrachtgevers/brandwacht-inhuren'
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Brandwacht inhuren', url: canonical },
  ]

  const cards = [
    {
      eyebrow: 'Vandaag',
      title: 'Direct zicht op beschikbaarheid',
      body: (
        <>
          Handmatige matching en transparante communicatie over tarief, certificeringen en inzet. Geen marge op het uurtarief; jij schakelt
          rechtstreeks met de brandwacht of leverancier.
        </>
      ),
    },
    {
      eyebrow: 'Morgen',
      title: 'ProSafetyMatch platform',
      body: (
        <>
          Digitale omgeving (streefdatum Q1 2026) waarin vraag en aanbod elkaar vinden. DBA-proof, transparant en met optionele escrow (1–2%)
          naast een vaste 10% platformfee.
        </>
      ),
    },
    {
      eyebrow: 'Doel',
      title: 'Eerlijk en voorspelbaar',
      body: (
        <>
          Helder profiel van elke professional, duidelijke afspraken over gezag en taken, en geen verborgen kosten. Zo houd je grip op
          veiligheid én budget.
        </>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground backgroundImage="/prosafetymatch-bg.webp" backgroundAlt="ProSafetyMatch achtergrond voor opdrachtgevers">
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 pb-14 pt-8">
          <h1 className="text-center text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">Brandwacht inhuren via ProBrandwacht</h1>
          <HeroShell
            eyebrow="Voor opdrachtgevers"
            title="Snelle koppeling met gecertificeerde brandwachten"
            headingLevel="h2"
            body={
              <>
                We helpen je vandaag met zichtbaarheid en handmatige matching. Morgen brengt <span className="font-semibold">ProSafetyMatch</span>{' '}
                vraag en aanbod digitaal samen – DBA-proof, transparant en zonder marge op het uurtarief.
              </>
            }
            primaryCta={{ href: '/opdrachtgevers/aanmelden', label: 'Aanmelden als opdrachtgever' }}
            secondaryCta={{ href: '/probrandwacht-direct', label: 'ProBrandwacht Direct' }}
            footer={<>Niet-detacherend: je spreekt zelf tarief, taken en gezag af met de brandwacht.</>}
          />
        </div>
      </HeroBackground>

      <section className="mx-auto max-w-5xl space-y-10 px-4 pb-16">
        <InfoCardsRow items={cards} />

        <section className="rounded-[26px] border border-white/10 bg-slate-950/85 p-6 text-slate-50 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
          <h2 className="text-xl font-semibold">Hoe we samenwerken</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li>• Transparante tarieven: geen marge op het uurtarief van de brandwacht.</li>
            <li>• Duidelijke profielen met certificeringen, inzetgebieden en ervaring.</li>
            <li>• Afspraken over gezag, taken en betaling leg je rechtstreeks vast.</li>
            <li>• Optionele escrow zodra ProSafetyMatch live is, voor betalingszekerheid.</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/probrandwacht-direct"
              className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-500/40 transition hover:bg-sky-400"
            >
              Start aanvraag
            </Link>
            <Link
              href="/missie"
              className="inline-flex items-center rounded-full border border-white/20 bg-slate-900/60 px-4 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-900/90"
            >
              Lees onze missie
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
