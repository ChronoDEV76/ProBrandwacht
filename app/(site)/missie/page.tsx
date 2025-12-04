import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import { HeroShell } from '@/components/layout/hero-shell'
import { InfoCardsRow } from '@/components/layout/info-cards-row'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/missie');



export default function MissionPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Missie', url: 'https://www.probrandwacht.nl/missie' },
  ]

  const missionCards = [
    {
      eyebrow: 'Waarom',
      title: 'Eerlijker dan het bureaumodel',
      body: (
        <>
          Veel zzp-brandwachten leveren topwerk voor een tarief waar na marges weinig van overblijft. ProBrandwacht wil dat omdraaien:
          transparante afspraken, directe lijnen en geen marge op jouw uurtarief.
        </>
      ),
    },
    {
      eyebrow: 'Vandaag',
    title: 'Zichtbaarheid & handmatige matching',
      body: (
        <>
          Nu focussen we op een scherp netwerk, eerlijke informatie over tarieven en DBA en 1-op-1 koppelingen waar dat past. Geen gouden
          bergen, wel nuchtere ondersteuning.
        </>
      ),
    },
    {
      eyebrow: 'Morgen',
      title: 'ProSafetyMatch als fundament',
      body: (
        <>
          Streefdatum Q1 2026: een digitale omgeving waar vraag en aanbod elkaar rechtstreeks vinden – DBA-proof, transparant en zonder marge
          op het uurtarief. 10% platformfee, optionele escrow.
        </>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground>
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 pb-16 pt-10">
          <HeroShell
            eyebrow="Door brandweermensen · Voor brandweermensen"
            title="Missie: eerlijk werken in de veiligheidsketen"
            body={
              <>
                ProBrandwacht wil het anders doen: directe lijnen, heldere afspraken en{' '}
                <span className="font-semibold">geen marge op het uurtarief</span>. Vandaag via zichtbaarheid en handmatige matching; morgen via{' '}
                <span className="font-semibold">ProSafetyMatch</span>.
              </>
            }
            primaryCta={{ href: '/zzp/aanmelden', label: 'Ik ben brandwacht — start gratis' }}
            secondaryCta={{ href: '/opdrachtgevers', label: 'Ik ben opdrachtgever — zo werken we' }}
            footer={
              <>
                Vandaag: netwerk, kennis en praktische DBA-handvatten. Morgen: een digitale omgeving die samenwerken in veiligheid stap voor
                stap structureert.
              </>
            }
          />
          <p className="text-sm text-slate-200">We reageren binnen 1 werkdag.</p>
        </div>
      </HeroBackground>

      <InfoCardsRow items={missionCards} />

      <section className="mx-auto max-w-5xl space-y-8 px-4 pb-16">
        <section className="space-y-3 rounded-[26px] border border-white/10 bg-slate-950/85 px-6 py-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
          <h2 className="text-xl font-semibold text-slate-50">Hoe we bouwen</h2>
          <p className="text-sm text-slate-200">
            We focussen op wat we wél kunnen beïnvloeden: duidelijke afspraken, transparante tarieven en een platform dat het makkelijker
            maakt om goed samen te werken. Geen grote beloftes over “oneindige opdrachten”, maar concrete stappen richting een gezondere
            markt.
          </p>
          <ul className="space-y-1 text-sm text-slate-200">
            <li>• We luisteren naar ervaringen van brandwachten en opdrachtgevers.</li>
            <li>• We verbeteren in kleine, zichtbare stappen in plaats van één grote sprong.</li>
            <li>• We houden de regie bij de mensen die het werk doen – niet bij de tussenlaag.</li>
          </ul>
        </section>

        <section className="rounded-[26px] border border-white/10 bg-slate-900 px-6 py-6 text-slate-50 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
          <h2 className="text-xl font-semibold">Sluit je aan bij de eerste lichting</h2>
          <p className="mt-2 text-sm text-slate-200">
            Ben je brandwacht of opdrachtgever en wil je meebouwen aan een eerlijkere markt? Meld je aan, denk mee en groei met ProSafetyMatch
            mee vanaf de eerste versie.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/zzp/aanmelden"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500"
            >
              Ik ben brandwacht – start gratis
            </Link>
            <Link
              href="/opdrachtgevers"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-slate-50 transition hover:bg-slate-800"
            >
              Ik ben opdrachtgever – bekijk de aanpak
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
