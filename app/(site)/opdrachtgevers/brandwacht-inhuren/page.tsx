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
          Handmatige matching en eerlijke communicatie over tarief, certificeringen en inzet. Geen marge op het uurtarief; jij schakelt
          rechtstreeks met de zelfstandige brandwacht of leverancier. Wat je afspreekt, ligt vast en blijft inzichtelijk.
        </>
      ),
    },
    {
      eyebrow: 'Morgen',
      title: 'ProSafetyMatch principes',
      body: (
        <>
          Digitale omgeving waarin vraag en aanbod elkaar direct vinden. DBA-bewust, eerlijk en zonder marge op het uurtarief; afspraken en betalingen blijven inzichtelijk.
        </>
      ),
    },
    {
      eyebrow: 'Doel',
      title: 'Eerlijk en voorspelbaar',
      body: (
        <>
          Helder profiel van elke professional, duidelijke afspraken over rolverdeling en taken, en geen verborgen kosten. Zo houd je grip op
          veiligheid én budget.
        </>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
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
                We koppelen zichtbaar en zonder marge op het uurtarief. <span className="font-semibold">ProSafetyMatch</span> staat voor directe, DBA-bewust afspraken tussen opdrachtgever en brandwacht: jij ziet wat er gebeurt en houdt continuïteit zonder ruis.
              </>
            }
            primaryCta={{ href: '/opdrachtgevers/aanmelden', label: 'Aanmelden als opdrachtgever' }}
            secondaryCta={{ href: '/probrandwacht-direct', label: 'ProBrandwacht Direct' }}
            footer={<>Niet-detacherend: je spreekt zelf tarief, taken en rolverdeling af met de zelfstandige brandwacht.</>}
          />
        </div>
      </HeroBackground>

      <section className="mx-auto max-w-5xl space-y-10 px-4 pb-16">
        <InfoCardsRow items={cards} />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-md shadow-black/30">
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">Zo huur je een rijksgediplomeerde brandwacht</h2>
            <p className="text-sm text-slate-200">
              Deel locatie, risico&apos;s, werkduur en benodigde certificaten. We koppelen je rechtstreeks aan beschikbare professionals, zodat jij
              snel weet wie er op het werk staat.
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>- Industrie, events, infra of turnarounds: helder profiel per inzet.</li>
              <li>- Tarief, taken en rolverdeling spreek je direct af binnen DBA-bewust kaders.</li>
              <li>- Rijk(s)gediplomeerde brandwachten, gasmeting/mangatwacht beschikbaar.</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/brandwacht-huren"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
              >
                Brandwacht inhuren
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Plan een intake
              </Link>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-md shadow-black/30">
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">Eerlijke samenwerking zonder detacheringsconstructie</h2>
            <p className="text-sm text-slate-200">
              Geen marge op het uurtarief. Je ziet het profiel en spreekt direct met de brandwacht. Wij houden afspraken, certificaten en
              verantwoordelijkheden zichtbaar zodat de inzet DBA-bewust blijft.
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>- Heldere, toetsbare afspraken over rolverdeling en taken.</li>
              <li>- Eventuele escrow is optioneel en zichtbaar; geen verborgen toeslagen op uurtarief.</li>
              <li>- Ondersteuning bij raamwerk van opdrachten en toolbox-bijeenkomsten zodat niets vaag blijft.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-md shadow-black/30">
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">FAQ</h2>
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-100">Hoe snel kan ik een brandwacht inhuren?</h3>
              <p className="text-sm text-slate-200">
                Bij spoed (ProBrandwacht Direct) koppelen we handmatig. Voor geplande inzetten deel je je opdracht; beschikbare
                brandwachten reageren direct met hun profiel en tarief.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-100">Wat betekent DBA-bewust brandwacht?</h3>
              <p className="text-sm text-slate-200">
                Rollen, taken en tarieven staan vooraf vast tussen opdrachtgever en brandwacht. Geen schijnzelfstandigheid; afspraken
                blijven eerlijk en herleidbaar.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-100">Welke certificaten kan ik verwachten?</h3>
              <p className="text-sm text-slate-200">
                Rijk(s)gediplomeerde brandwacht, BHV, VCA, gasmeting/gasmeter, mangatwacht/buitenwacht en aanvullende industriële
                veiligheidsopleidingen. Je ziet per profiel welke certificaten beschikbaar zijn.
              </p>
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}
