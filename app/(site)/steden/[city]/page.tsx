// app/steden/[city]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { DEFAULT_TARIFFS, type CityKey } from '@/lib/tariffs'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'

const CITY_LABEL: Record<CityKey, string> = {
  amsterdam: 'Amsterdam',
  rotterdam: 'Rotterdam',
  'den-haag': 'Den Haag',
  utrecht: 'Utrecht',
  industrie: 'Industrieel (algemeen)',
}

export function generateStaticParams() {
  return [
    { city: 'amsterdam' },
    { city: 'rotterdam' },
    { city: 'den-haag' },
    { city: 'utrecht' },
  ] satisfies Array<{ city: CityKey }>
}

const resolveLabel = (city: CityKey) => CITY_LABEL[city] ?? city.replace(/-/g, ' ')

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const rawCity = params.city
  if (!isCityKey(rawCity)) {
    const fallback = `https://www.probrandwacht.nl/steden/${rawCity}`
    return {
      title: 'Stad niet gevonden | ProBrandwacht.nl',
      description: 'De opgevraagde stadspagina bestaat niet (meer).',
      alternates: { canonical: fallback, languages: { 'nl-NL': fallback } },
      other: { hreflang: 'nl-NL' },
      openGraph: { url: fallback, title: 'Stad niet gevonden | ProBrandwacht.nl', description: 'De opgevraagde stadspagina bestaat niet (meer).' },
    }
  }

  const city = rawCity as CityKey
  const label = resolveLabel(city)
  const title = `Brandwacht tarieven ${label} | ProBrandwacht`
  const description = `Indicatieve tariefbandbreedtes voor ${label} en duidelijke uitleg. Voor een persoonlijk PDF-rapport ga je naar de centrale berekening op de homepage.`
  const canonical = `https://www.probrandwacht.nl/steden/${city}`

  return {
    title,
    description,
    alternates: { canonical, languages: { 'nl-NL': canonical } },
    other: { hreflang: 'nl-NL' },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: 'https://www.probrandwacht.nl/og-home.webp', width: 1200, height: 630, alt: `Brandwacht tarieven ${label}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.probrandwacht.nl/og-home.webp'],
    },
  }
}

export default function CityPage({ params }: { params: { city: string } }) {
  const rawCity = params.city
  if (!isCityKey(rawCity)) return notFound()
  const city = rawCity as CityKey
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

  return (
    <main className="mx-auto w-full min-h-full max-w-3xl space-y-8 px-4 py-10">
      <StructuredBreadcrumbs items={breadcrumbItems} />

      {/* Hero / inleiding */}
      <header className="mb-2">
        <h1 className="text-3xl font-semibold tracking-tight">Brandwacht inhuren in {label}</h1>
{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/chrono-direct" className="underline">Chrono Direct</a>.
</div>
{/* SEO-UPGRADE END */}
        <p className="mt-2 text-slate-700">
          Hieronder vind je <strong>indicatieve tariefbandbreedtes</strong> voor {label}. Voor een
          <strong> persoonlijk PDF-rapport met jouw netto waarde</strong> (incl. aftrekposten & reserveringen),
          gebruik je onze centrale berekening op de homepage.
        </p>
      </header>

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
function isCityKey(value: string): value is CityKey {
  return Object.prototype.hasOwnProperty.call(DEFAULT_TARIFFS, value)
}
