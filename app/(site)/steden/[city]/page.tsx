import CostCalculator from '@/components/cost-calculator'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSignupUrl } from '@/lib/config'
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

function resolveLabel(city: CityKey) {
  return CITY_LABEL[city] ?? city.replace(/-/g, ' ')
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const rawCity = params.city
  if (!isCityKey(rawCity)) {
    const fallbackCanonical = `https://www.probrandwacht.nl/steden/${rawCity}`
    return {
      title: 'Stad niet gevonden | ProBrandwacht.nl',
      description: 'De opgevraagde stadspagina bestaat niet (meer).',
      alternates: { canonical: fallbackCanonical, languages: { 'nl-NL': fallbackCanonical } },
      other: { hreflang: 'nl-NL' },
      openGraph: {
        url: fallbackCanonical,
        title: 'Stad niet gevonden | ProBrandwacht.nl',
        description: 'De opgevraagde stadspagina bestaat niet (meer).',
        type: 'website',
      },
    }
  }
  const city = rawCity
  const label = resolveLabel(city)
  const title = `Brandwacht tarieven ${label} – Het alternatieve brandwachtplatform | ProBrandwacht.nl`
  const description = `Vergelijk brandwacht tarieven voor ${label} via het alternatieve brandwachtplatform. Zie direct de 10% platformfee en 1–2% escrowkosten zodat opdrachtgever en professional dezelfde kostenopbouw delen.`
  const canonical = `https://www.probrandwacht.nl/steden/${params.city}`
  const keywords = [
    `brandwacht ${label}`,
    `brandwacht inhuren ${label}`,
    'brandwacht tarieven',
    'escrow brandwacht',
  ]
  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages: { 'nl-NL': canonical } },
    other: { hreflang: 'nl-NL' },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function CityPage({ params }: { params: { city: string } }) {
  const rawCity = params.city
  if (!isCityKey(rawCity)) {
    notFound()
  }
  const city = rawCity
  const label = resolveLabel(city)
  const ranges = DEFAULT_TARIFFS[city]
  if (!ranges) {
    notFound()
  }
  const signupUrl = getSignupUrl()
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
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <StructuredBreadcrumbs items={breadcrumbItems} />
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Brandwacht inhuren in {label}</h1>
        <p className="mt-2 text-slate-700">
          Indicatieve bandbreedtes en een rekenhulpmiddel om de kostenopbouw te bekijken. Afstemmen doe je altijd samen
          met de professional.
        </p>
      </header>

      <section className="mb-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          ProSafetyMatch bepaalt geen tarieven. Gebruik de bandbreedtes als vertrekpunt en vul in de calculator het tarief
          in dat jullie zelf afspreken. De fee- en escrowberekening blijft gelijk: 10% platformfee voor community & support
          plus 1–2% escrowkosten voor rekening van de opdrachtgever. Iedereen ziet dezelfde regels.
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Adviesranges</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border p-4">
            <div className="text-sm text-slate-600">Evenementen / Bouw</div>
            <div className="text-2xl font-semibold">
              € {ranges.standaard.min}–€ {ranges.standaard.max} /u
            </div>
          </div>
          {ranges.industrie && (
            <div className="rounded-2xl border p-4">
              <div className="text-sm text-slate-600">Industrie / Petrochemie</div>
              <div className="text-2xl font-semibold">
                € {ranges.industrie.min}–€ {ranges.industrie.max} /u
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-10" id="tarief-calculator">
        <CostCalculator initialCity={city} />
      </section>

      <section className="mt-6 rounded-2xl bg-slate-50 p-6">
        <h3 className="text-lg font-semibold">Voorbeeldcase</h3>
      <p className="mt-2 text-slate-700">
        {label}: stel dat je een gecertificeerde brandwacht (BHV/VCA) zoekt voor laswerkzaamheden. Met de calculator
        hierboven vul je het afgesproken uurtarief in en zie je meteen hoe platformfee en escrow uitpakken.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-brand-700 px-5 py-3 text-white hover:bg-brand-500"
        >
          Lanceer de nieuwe standaard in {label}
        </a>
        <Link href="/opdrachtgevers" className="rounded-2xl border px-5 py-3 hover:bg-white">
          Lees meer voordelen
        </Link>
      </div>
      </section>

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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}

function isCityKey(value: string): value is CityKey {
  return Object.prototype.hasOwnProperty.call(DEFAULT_TARIFFS, value)
}
