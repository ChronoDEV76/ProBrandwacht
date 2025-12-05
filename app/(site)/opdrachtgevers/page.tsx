import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import { HeroShell } from '@/components/layout/hero-shell'
import { InfoCardsRow } from '@/components/layout/info-cards-row'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/opdrachtgevers');



export default function OpdrachtgeversPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Opdrachtgevers', url: 'https://www.probrandwacht.nl/opdrachtgevers' },
  ]

  const cards = [
    {
      eyebrow: 'Vandaag',
      title: 'Snel zicht op professionals',
      body: (
        <>
          Binnen één of twee dagen de juiste profielen op tafel; wij checken beschikbaarheid en legitimiteit. Geen tussenlaag: je spreekt
          zelf tarief, rol en verantwoordelijkheid af met de professional.
        </>
      ),
    },
    {
      eyebrow: 'Morgen',
      title: 'ProSafetyMatch tooling',
      body: (
        <>
          Digitale omgeving (streefdatum Q1 2026) voor transparante 1-op-1 matching, basisdocumenten en optionele escrow. 10% platformfee,
          zonder marge op het uurtarief.
        </>
      ),
    },
    {
      eyebrow: 'Voor welke vragen',
      title: 'Van events tot industrie',
      body: (
        <>
          Denk aan evenementen, tijdelijke objectbewaking, bouwplaatsen of industriële inzet waar een rijksgediplomeerde brandwacht gewenst
          of verplicht is. We kijken mee of ProBrandwacht / ProSafetyMatch past bij je casus.
        </>
      ),
    },
  ]

  const benefits = [
    {
      title: 'Helder profiel van elke brandwacht',
      copy:
        'Per professional zie je diploma’s, certificeringen, inzetgebieden en ervaring. We verifiëren die gegevens en toetsen op DBA en normering, zodat je weet wie je inhuurt en waarom die matcht. Geen gokwerk.',
    },
    {
      title: 'Rechtstreeks contact, geen ruis',
      copy: 'Je schakelt direct met de brandwacht. Tarief, inzet en tijden spreek je 1-op-1 af, zonder tussenbureau.',
    },
    {
      title: 'DBA-proof samenwerken',
      copy: 'Samenwerken met zelfstandige professionals, met focus op gezag, constructie en heldere afspraken.',
    },
    {
      title: 'Transparant tarief',
      copy:
        'Jij bepaalt het budget. We sturen erop dat het grootste deel van het uurtarief bij de professional terechtkomt, zonder marge bovenop zijn tarief.',
    },
  ]

  const futureItems = [
    {
      title: 'ProSafetyMatch (Q1 2026)',
      copy: 'Digitale omgeving waarin vraag en aanbod elkaar rechtstreeks vinden – DBA-proof en zonder marge op het uurtarief.',
    },
    {
      title: '1-op-1 via slimme tooling',
      copy: 'Directe koppeling met de juiste professional met tooling en ontzorging, zonder extra tussenlaag.',
    },
    {
      title: '10% platformfee + optioneel 1–2% escrow',
      copy: 'Eerlijk model voor onderhoud, innovatie en betalingszekerheid, zonder dat het uurtarief van de brandwacht wordt uitgehold.',
    },
    {
      title: 'Volledig inzicht in samenwerking',
      copy: 'Overzicht in diensten, beschikbaarheid, afspraken en – na livegang – facturatie en betalingen via het platform.',
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
            eyebrow="Voor opdrachtgevers · Door brandweermensen"
            title="Direct schakelen met rijksgediplomeerde brandwachten"
            body={
              <>
                Directe inzet via onze poule en betrouwbare derden, DBA-proof en gescreend/gecertificeerd. Jij bepaalt het budget; we sturen
                erop dat het grootste deel van het uurtarief bij de professional terechtkomt. <span className="font-semibold">ProSafetyMatch</span>{' '}
                wordt de tooling voor 1-op-1 matching zonder marge op het uurtarief.
              </>
            }
            primaryCta={{ href: '/opdrachtgevers/aanmelden', label: 'Meld je aan als opdrachtgever' }}
            secondaryCta={{ href: '/missie', label: 'Lees hoe we werken' }}
            footer={
              <>
                Niet-detacherend: jij maakt altijd rechtstreeks afspraken over tarief, gezag en taken met de brandwacht of leverancier.
              </>
            }
          />
          <p className="text-sm text-slate-200">We reageren binnen 1 werkdag.</p>
        </div>
      </HeroBackground>

      <InfoCardsRow items={cards} />

      <section className="mx-auto max-w-5xl space-y-8 px-4 pb-16">
        <section className="space-y-4 rounded-[26px] border border-white/10 bg-slate-950/80 px-6 py-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
          <h2 className="text-xl font-semibold text-slate-50">Wat je vandaag al via ProBrandwacht krijgt</h2>
          <p className="max-w-3xl text-sm text-slate-200">
            Vandaag al: zichtbare profielen, directe lijnen en praktische DBA-handvatten. Jij houdt regie over budget en afspraken; wij
            bewaken dat het grootste deel van het uurtarief bij de professional blijft.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map(item => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.6)]">
                <p className="text-sm font-semibold text-slate-50">{item.title}</p>
                <p className="mt-2 text-sm text-slate-200">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[26px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)] md:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold text-slate-50">ProSafetyMatch – wat je straks mag verwachten</h2>
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
              in ontwikkeling
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-200">
            ProSafetyMatch wordt het digitale platform waar brandwachten en opdrachtgevers elkaar rechtstreeks vinden – DBA-proof en zonder
            marge op het uurtarief. We bouwen in stappen en houden verwachtingen realistisch: liever zichtbaar beter maken dan grote beloftes
            doen.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {futureItems.map(item => (
              <div
                key={item.title}
                className="rounded-2xl border border-dashed border-amber-200/70 bg-amber-50/10 p-4 text-sm text-amber-50 shadow-[0_12px_28px_-18px_rgba(0,0,0,0.5)]"
              >
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-amber-50/90">{item.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Alles onder “in ontwikkeling” is onder voorbehoud en kan wijzigen op basis van praktijkervaring en feedback van gebruikers.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[26px] border border-white/10 bg-slate-950/85 p-5 text-slate-50 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Voor wie</p>
            <h3 className="mt-2 text-sm font-semibold">Industrie &amp; petrochemie</h3>
            <p className="mt-2 text-sm text-slate-200">
              Voor locaties met hoge veiligheids- en continuïteitseisen, waar betrouwbaarheid en vakkennis cruciaal zijn.
            </p>
          </div>
          <div className="rounded-[26px] border border-white/10 bg-slate-950/85 p-5 text-slate-50 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Voor wie</p>
            <h3 className="mt-2 text-sm font-semibold">Bouw &amp; renovatie</h3>
            <p className="mt-2 text-sm text-slate-200">
              Voor projecten waar brandveiligheid, toezicht en duidelijke afstemming met andere partijen centraal staat.
            </p>
          </div>
          <div className="rounded-[26px] border border-white/10 bg-slate-950/85 p-5 text-slate-50 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Voor wie</p>
            <h3 className="mt-2 text-sm font-semibold">Evenementen &amp; tijdelijke locaties</h3>
            <p className="mt-2 text-sm text-slate-200">
              Voor organisatoren die professioneel, zichtbaar en verantwoord willen omgaan met hun brandveiligheid.
            </p>
          </div>
        </section>

        <section className="rounded-[26px] border border-white/10 bg-slate-950/85 p-6 text-slate-50 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
          <h2 className="text-xl font-semibold">Mee de eerste stap zetten?</h2>
          <p className="mt-2 text-sm text-slate-200">
            Meld je bedrijf aan voor de wachtlijst. Dan kijken we samen hoe ProBrandwacht en straks ProSafetyMatch het beste kunnen aansluiten
            bij jullie risico’s, planning en manier van werken.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/opdrachtgevers/aanmelden"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
            >
              Schrijf mijn organisatie in
            </Link>
            <Link
              href="/steden/amsterdam"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-slate-50 transition hover:bg-slate-900"
            >
              Bekijk in welke steden we starten
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
