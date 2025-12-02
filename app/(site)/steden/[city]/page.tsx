import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import HeroBackground from '@/components/HeroBackground'
import { HeroShell } from '@/components/layout/hero-shell'
import { InfoCardsRow } from '@/components/layout/info-cards-row'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { CITY_RECORD_MAP, CITY_SLUGS, type CitySlug } from '@/lib/city-data'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return CITY_SLUGS.map(city => ({ city }))
}

const isCitySlug = (value: string): value is (typeof CITY_SLUGS)[number] => CITY_SLUGS.includes(value as (typeof CITY_SLUGS)[number])
const resolveLabel = (city: CitySlug) => CITY_RECORD_MAP[city]?.name ?? city.replace(/-/g, ' ')
export const metadata: Metadata = getRouteMetadata('/steden/[city]');



export default function CityPage({ params }: { params: { city: string } }) {
  const rawCity = params.city
  if (!isCitySlug(rawCity)) return notFound()

  const label = resolveLabel(rawCity)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: opdrachtgeverFaq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: `Brandwacht ${label}`, url: `https://www.probrandwacht.nl/steden/${rawCity}` },
  ]

  const cards = [
    {
      eyebrow: 'Vandaag',
      title: `Zichtbaarheid in ${label}`,
      body: (
        <>
          We helpen je profiel scherp te krijgen en kijken mee bij aanvragen in en rond {label}. Geen garantie op opdrachten, wel een eerlijk
          vertrekpunt en duidelijke DBA-handvatten.
        </>
      ),
    },
    {
      eyebrow: 'Morgen',
      title: 'ProSafetyMatch',
      body: (
        <>
          Digitale omgeving (streefdatum Q1 2026) waarin vraag en aanbod elkaar rechtstreeks vinden – DBA-proof, transparant en zonder marge op
          het uurtarief. 10% platformfee, optioneel 1–2% escrow.
        </>
      ),
    },
    {
      eyebrow: 'FAQ kort',
      title: 'Wat kun je nu verwachten?',
      body: (
        <>
          Aanmelden is gratis. We beloven geen volle agenda, wel eerlijke communicatie, sectorinzichten en een platform dat met jou
          meegroeit richting ProSafetyMatch.
        </>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
{/* SEO-UPGRADE START */}
{/* Verwijderd op verzoek: extra linkblok bovenaan */}
{/* SEO-UPGRADE END */}
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground
        backgroundImage="/prosafetymatch-bg.webp"
        backgroundAlt={`ProSafetyMatch background voor ${label}`}
        imageClassName="object-[50%_44%]"
        overlayClassName="bg-slate-950/55"
      >
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 pb-14 pt-8">
          <h1 className="text-center text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
            Brandwacht in {label}
          </h1>
          <HeroShell
            eyebrow={`Brandwacht ${label} · Via ProBrandwacht`}
            title={<>Kies zelf je opdrachten in {label}</>}
            headingLevel="h2"
            body={
              <>
                Kies zelf je opdrachten in <span className="font-semibold">{label}</span> — zonder bureau, wel{' '}
                <span className="font-semibold">DBA-proof</span>. Vandaag via zichtbaarheid en handmatige matching, morgen via{' '}
                <span className="font-semibold">ProSafetyMatch</span>: een digitale omgeving waar vraag en aanbod elkaar rechtstreeks vinden
                zonder marge op het uurtarief.
              </>
            }
            primaryCta={{ href: '/zzp/aanmelden', label: 'Meld je aan als brandwacht' }}
            secondaryCta={{ href: '/missie', label: 'Lees onze missie' }}
            footer={<>Geen detacheringsbureau: je spreekt altijd zelf tarief, taken en gezag af met de opdrachtgever.</>}
          />
        </div>
      </HeroBackground>

      <div className="pt-6">
        <InfoCardsRow items={cards} />
      </div>

      <section className="mx-auto max-w-5xl px-4 pb-20 pt-6">
        <section className="rounded-[26px] border border-white/10 bg-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
          <h2 className="text-xl font-semibold text-slate-50">Veelgestelde vragen</h2>
          <ul className="mt-3 space-y-3">
            {opdrachtgeverFaq.map(f => (
              <li key={f.question}>
                <p className="text-sm font-semibold text-slate-50">{f.question}</p>
                <p className="mt-1 text-sm text-slate-200">{f.answer}</p>
              </li>
            ))}
          </ul>
        </section>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
