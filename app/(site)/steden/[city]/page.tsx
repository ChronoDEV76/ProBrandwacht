// app/steden/[city]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import CityHero from '@/components/city-hero'
import { DEFAULT_TARIFFS, type CitySlug } from '@/lib/tariffs'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'
import { CITY_DATA, CITY_SLUGS, type CityRecord } from '@/lib/city-data'

const CITY_RECORD_MAP = CITY_DATA.reduce((acc, city) => {
  acc[city.slug as CitySlug] = city
  return acc
}, {} as Record<CitySlug, CityRecord>)

export function generateStaticParams() {
  return CITY_SLUGS.map(city => ({ city })) satisfies Array<{ city: CitySlug }>
}

const resolveLabel = (city: CitySlug) => CITY_RECORD_MAP[city]?.name ?? city.replace(/-/g, ' ')
export const metadata: Metadata = getRouteMetadata('/steden/[city]');



export default function CityPage({ params }: { params: { city: string } }) {
  const rawCity = params.city
  if (!isCitySlug(rawCity)) return notFound()
  const city = rawCity as CitySlug
  const label = resolveLabel(city)

  const ranges = DEFAULT_TARIFFS[city]
  if (!ranges) return notFound()

  const canonical = `https://www.probrandwacht.nl/steden/${city}`

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
    { name: 'Regio tarieven', url: 'https://www.probrandwacht.nl/brandwacht-inhuren' },
    { name: `Brandwacht ${label}`, url: canonical },
  ]

  const heroHeading = (
    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
      Brandwacht tarieven {label}
    </h1>
  )

  return (
    <main className="mx-auto w-full min-h-full max-w-3xl space-y-8 px-4 py-10">
      <StructuredBreadcrumbs items={breadcrumbItems} />

      <CityHero cityName={label} heading={heroHeading} />

      <section className="space-y-3 text-slate-700">
        <p>
          Hieronder vind je <strong>indicatieve tariefbandbreedtes</strong> voor {label}. Voor een
          <strong> persoonlijk PDF-rapport met jouw netto waarde</strong> (incl. aftrekposten & reserveringen)
          gebruik je onze centrale berekening op de homepage.
        </p>
        <p className="text-sm text-slate-600">
          <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof
          afspraken. Lees meer over{' '}
          <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">
            brandwacht inhuren
          </a>{' '}
          of vraag direct aan via{' '}
          <a href="/probrandwacht-direct" className="underline">
            ProBrandwacht Direct
          </a>
          .
        </p>
      </section>

      {/* Adviesranges */}
      <section className="mb-2">
        <h2 className="text-xl font-semibold">Indicatieve adviesranges</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border p-4 bg-white shadow-sm">
            <div className="text-sm text-slate-600">Evenementen / Bouw</div>
            <div className="text-2xl font-semibold">€ {ranges.standaard.min}–€ {ranges.standaard.max} /u</div>
          </div>
          {ranges.industrie && (
            <div className="rounded-2xl border p-4 bg-white shadow-sm">
              <div className="text-sm text-slate-600">Industrie / Petrochemie</div>
              <div className="text-2xl font-semibold">€ {ranges.industrie.min}–€ {ranges.industrie.max} /u</div>
            </div>
          )}
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Deze bandbreedtes zijn een vertrekpunt. Het exacte tarief stem je samen af op certificaten, ervaring,
          werktijden en projectcomplexiteit.
        </p>
      </section>

      {/* Converterende CTA - leidt naar centrale leadgenerator */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Wil je weten wat je écht waard bent?</h2>
        <p className="text-slate-600 mb-4">
          Ontvang direct een <strong>persoonlijk PDF-rapport</strong> met jouw netto uurwaarde, inclusief reserveringen,
          aftrekposten en duidelijke opbouw. Geen tussenlaag, wel helder inzicht.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/#waarde-berekenen"
            className="rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Bereken mijn waarde
          </a>
          <Link
            href="/opdrachtgevers"
            className="rounded-2xl border px-5 py-3 text-sm font-semibold hover:bg-white"
          >
            Lees meer voor opdrachtgevers
          </Link>
        </div>
      </section>

      {/* Veelgestelde vragen */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Veelgestelde vragen</h2>
        <div className="mt-3 space-y-3">
          {opdrachtgeverFaq.map(item => (
            <details key={item.question} className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900 group-open:text-brand-700">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}

import { notFound } from 'next/navigation'
import { getRouteMetadata } from '@/lib/seo/metadata'

const CITY_SLUG_SET = new Set<string>(CITY_SLUGS)

function isCitySlug(value: string): value is CitySlug {
  return CITY_SLUG_SET.has(value)
}
