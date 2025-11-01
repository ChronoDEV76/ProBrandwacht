// app/steden/[city]/page.tsx
import CostCalculator from '@/components/cost-calculator'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSignupUrl } from '@/lib/config'
import { DEFAULT_TARIFFS, type CityKey } from '@/lib/tariffs'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'

import { CITY_DATA, type CityRecord } from '@/lib/city-data'
import { getNearby } from '@/lib/nearby'
import { serviceJsonLd, offerCatalogJsonLd } from '@/lib/schema'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.probrandwacht.nl'

export function generateStaticParams() {
  // maak voor alle steden routes
  return CITY_DATA.map(c => ({ city: c.slug }))
}

function findCity(slug: string): CityRecord | null {
  // alias-normalisatie
  const direct = CITY_DATA.find(c => c.slug === slug)
  if (direct) return direct
  const alias = CITY_DATA.find(c => (c.aliases ?? []).includes(slug))
  return alias ?? null
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const rec = findCity(params.city)
  if (!rec || !isCityKey(rec.slug)) {
    const fallbackCanonical = `${BASE}/steden/${params.city}`
    return {
      title: 'Stad niet gevonden | ProBrandwacht.nl',
      description: 'De opgevraagde stadspagina bestaat niet (meer).',
      alternates: { canonical: fallbackCanonical, languages: { 'nl-NL': fallbackCanonical } },
      other: { hreflang: 'nl-NL' },
      openGraph: { url: fallbackCanonical, title: 'Stad niet gevonden | ProBrandwacht.nl', description: 'De opgevraagde stadspagina bestaat niet (meer).' },
    }
  }
  const label = rec.name
  const title = `Brandwacht tarieven ${label} | ProBrandwacht`
  const description = `Vergelijk brandwacht tarieven voor ${label}. Zie meteen de 10% platformfee en 1–2% escrowkosten, gedeeld door opdrachtgever en professional.`
  const canonical = `${BASE}/steden/${rec.slug}`
  return {
    title,
    description,
    alternates: { canonical, languages: { 'nl-NL': canonical } },
    other: { hreflang: 'nl-NL' },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: `${BASE}/og-home.jpg`, width: 1200, height: 630, alt: `Brandwacht tarieven ${label}` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${BASE}/og-home.jpg`] },
  }
}

export default function CityPage({ params }: { params: { city: string } }) {
  const rec = findCity(params.city)
  if (!rec || !isCityKey(rec.slug)) notFound()

  const city = rec.slug as CityKey
  const label = rec.name
  const ranges = DEFAULT_TARIFFS[city]
  if (!ranges) notFound()

  const signupUrl = getSignupUrl()
  const pageUrl = `${BASE}/steden/${rec.slug}`
  const nearby = getNearby(rec.slug, 4)

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
    { name: 'Home', url: `${BASE}/` },
    { name: 'Regio tarieven', url: `${BASE}/brandwacht-inhuren` },
    { name: `Brandwacht ${label}`, url: pageUrl },
  ]

  const updated = rec.updatedAt ?? new Date().toISOString().slice(0, 10)

  return (
    <>
      <main className="mx-auto w-full min-h-full max-w-3xl space-y-8 px-4 py-10 pb-28 sm:pb-10">
        <StructuredBreadcrumbs items={breadcrumbItems} />

        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Brandwacht inhuren in {label}</h1>
          <p className="mt-2 text-slate-700">
            Indicatieve bandbreedtes en een rekenhulpmiddel om de kostenopbouw te bekijken. Afstemmen doe je altijd samen met de professional.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href={signupUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-brand-700 px-5 py-3 text-white hover:bg-brand-500">
              Lanceer de nieuwe standaard in {label}
            </a>
            <Link href="/opdrachtgevers" className="rounded-2xl border px-5 py-3 hover:bg-white">
              Lees meer voordelen
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              Samen zetten we de nieuwe standaard voor brandwachten
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              Aangescherpt met feedback uit de sector (200+ professionals)
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500">Laatst geactualiseerd: {updated}</p>
        </header>

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900">
          <h2 className="text-lg font-semibold text-blue-900">Spoedproject of vaste inzet in {label}?</h2>
          <p className="mt-2">
            Via <strong>Chrono4Solutions</strong> kunnen we direct gecertificeerde brandwachten inzetten in {label}. Past de aanvraag binnen{' '}
            <strong>ProSafetyMatch</strong>, dan koppelen we je daar transparant door.
          </p>
          <Link
            href="/chrono-direct"
            className="mt-3 inline-flex rounded-md bg-brand-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Direct contact opnemen
          </Link>
        </section>

        {/* Lokale content-blokken */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Lokale context</h2>
            <p className="mt-2 text-sm text-slate-700">{rec.sectorNotes ?? `Vraag- en aanbod in ${label} wijzigt per seizoen en project.`}</p>
            {rec.venues?.length ? (
              <>
                <h3 className="mt-3 text-sm font-semibold">Veelgebruikte event-locaties</h3>
                <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                  {rec.venues.slice(0,3).map(v => <li key={v}>{v}</li>)}
                </ul>
              </>
            ) : null}
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Bouw & industrie</h2>
            <p className="mt-2 text-sm text-slate-700">Toezicht bij heetwerk, tijdelijke installaties en besloten ruimten.</p>
            {rec.industrialAreas?.length ? (
              <>
                <h3 className="mt-3 text-sm font-semibold">Belangrijke terreinen</h3>
                <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                  {rec.industrialAreas.slice(0,3).map(a => <li key={a}>{a}</li>)}
                </ul>
              </>
            ) : null}
          </div>
        </section>

        <section className="mb-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            ProSafetyMatch bepaalt geen tarieven. Gebruik de bandbreedtes als vertrekpunt en vul in de calculator het tarief in dat jullie zelf afspreken.
            De fee- en escrowberekening blijft gelijk: 10% platformfee voor community & support plus 1–2% escrowkosten voor rekening van de opdrachtgever.
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Adviesranges</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border p-4">
              <div className="text-sm text-slate-600">Evenementen / Bouw</div>
              <div className="text-2xl font-semibold">€ {ranges.standaard.min}–€ {ranges.standaard.max} /u</div>
            </div>
            {"industrie" in ranges && ranges.industrie ? (
              <div className="rounded-2xl border p-4">
                <div className="text-sm text-slate-600">Industrie / Petrochemie</div>
                <div className="text-2xl font-semibold">€ {ranges.industrie.min}–€ {ranges.industrie.max} /u</div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mb-10" id="tarief-calculator">
          <CostCalculator initialCity={city} />
        </section>

        {/* Nabije steden */}
        {nearby.length ? (
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Nabije steden</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {nearby.map(n => (
                <li key={n.slug}>
                  <Link className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50" href={`/steden/${n.slug}`}>
                    Brandwacht {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(rec, pageUrl)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogJsonLd(rec, ranges, pageUrl)) }} />
      </main>

      {/* Sticky mobiele CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-6px_18px_rgba(0,0,0,0.06)] px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+12px)] sm:hidden">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-2">
          <div className="flex w-full items-center gap-2">
            <a href={signupUrl} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-md bg-brand-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-600">
              Meld je bedrijf aan
            </a>
            <Link href="/zzp/aanmelden" className="rounded-md border border-slate-200 px-3 py-3 text-center text-sm font-semibold text-slate-800 hover:bg-white">
              Meld je aan (zzp)
            </Link>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Samen zetten we de nieuwe standaard voor brandwachten</p>
        </div>
      </div>
    </>
  )
}

function isCityKey(value: string): value is CityKey {
  return Object.prototype.hasOwnProperty.call(DEFAULT_TARIFFS, value)
}
