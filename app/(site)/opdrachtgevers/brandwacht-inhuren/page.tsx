import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import { HeroShell } from '@/components/layout/hero-shell'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { InfoCardsRow } from '@/components/layout/info-cards-row'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/opdrachtgevers/zelfstandig-brandwacht-inhuren')

export default function BrandwachtInhurenOpdrachtgeversPage() {
  const canonical = 'https://www.probrandwacht.nl/opdrachtgevers/zelfstandig-brandwacht-inhuren'
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'zelfstandige brandwacht inhuren', url: canonical },
  ]

  const cards = [
    {
      eyebrow: 'Vandaag',
      title: 'Direct zicht op beschikbaarheid',
      body: (
        <>
          Handmatige matching en transparante communicatie over tarief, certificeringen en inzet. Geen marge op het uurtarief; jij schakelt
          rechtstreeks met de zelfstandige brandwacht of leverancier.
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

      <HeroBackground
        backgroundImage="/prosafetymatch-bg.webp"
        backgroundAlt="ProSafetyMatch achtergrond voor opdrachtgevers"
        imageClassName="object-[50%_44%]"
      >
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 pb-14 pt-8">
          <h1 className="text-center text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">zelfstandige brandwacht inhuren via ProBrandwacht</h1>
          <HeroShell
            eyebrow="Voor opdrachtgevers"
            title="Snelle koppeling met gecertificeerde brandwachten"
            headingLevel="h2"
            body={
              <>
                We ondersteunen met expertise je vandaag met zichtbaarheid en handmatige matching. Morgen brengt <span className="font-semibold">ProSafetyMatch</span>{' '}
                vraag en aanbod digitaal samen – DBA-proof, transparant en zonder marge op het uurtarief.
              </>
            }
            primaryCta={{ href: '/opdrachtgevers/aanmelden', label: 'Aanmelden als opdrachtgever' }}
            secondaryCta={{ href: '/probrandwacht-direct', label: 'ProBrandwacht Direct' }}
            footer={<>Niet-detacherend: je spreekt zelf tarief, taken en gezag af met de zelfstandige brandwacht.</>}
          />
        </div>
      </HeroBackground>

      <section className="mx-auto max-w-5xl space-y-10 px-4 pb-16">
        <InfoCardsRow items={cards} />

      </section>
    </main>
  )
}
