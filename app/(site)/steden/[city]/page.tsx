import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import HeroBackground from '@/components/HeroBackground'
import { HeroShell } from '@/components/layout/hero-shell'
import { InfoCardsRow } from '@/components/layout/info-cards-row'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import {
  CITY_RECORD_MAP,
  CITY_SLUGS,
  type CityRecordShape,
  type CitySlug,
} from '@/lib/city-data'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'
import { SPOED_UI_ENABLED } from '@/lib/featureFlags'

export const revalidate = 86400

const BASE_URL = 'https://www.probrandwacht.nl'

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }))
}

const isCitySlug = (value: string): value is (typeof CITY_SLUGS)[number] =>
  CITY_SLUGS.includes(value as (typeof CITY_SLUGS)[number])

const resolveLabel = (city: CitySlug) =>
  CITY_RECORD_MAP[city]?.name ?? city.replace(/-/g, ' ')

function listToSentence(items: string[], max = 4) {
  const cleaned = (items ?? []).map((s) => s.trim()).filter(Boolean)
  const head = cleaned.slice(0, max)
  const tail = cleaned.length > max ? ' e.a.' : ''
  return head.join(', ') + tail
}

export async function generateMetadata({
  params,
}: {
  params: { city: string }
}): Promise<Metadata> {
  const rawCity = params.city

  if (!isCitySlug(rawCity)) {
    return {
      title: 'Pagina niet gevonden | ProBrandwacht',
      robots: { index: false, follow: false },
    }
  }

  const label = resolveLabel(rawCity)
  const canonical = `${BASE_URL}/steden/${rawCity}`
  const base = getRouteMetadata('/steden/[city]')
  const title = `Zelfstandige brandwacht in ${label} | ProBrandwacht`

  const cityData = CITY_RECORD_MAP[rawCity] as CityRecordShape
  const sectorNotes = cityData?.sectorNotes

  const description = sectorNotes
    ? `Zelfstandige brandwacht in ${label}? ${sectorNotes} ProBrandwacht helpt met duidelijke afspraken, directe afstemming en DBA-bewuste samenwerking (contextafhankelijk).`
    : `Zelfstandige brandwacht in ${label}? ProBrandwacht helpt met duidelijke afspraken, directe afstemming en DBA-bewuste samenwerking (contextafhankelijk).`

  return {
    ...base,
    title,
    description,
    alternates: { canonical, languages: { 'nl-NL': canonical } },
    openGraph: { ...(base.openGraph ?? {}), title, description, url: canonical },
    twitter: { ...(base.twitter ?? {}), title, description },
  }
}

export default function CityPage({ params }: { params: { city: string } }) {
  const rawCity = params.city
  if (!isCitySlug(rawCity)) return notFound()

  const label = resolveLabel(rawCity)
  const cityData = CITY_RECORD_MAP[rawCity] as CityRecordShape

  const venues = cityData?.venues ?? []
  const industrialAreas = cityData?.industrialAreas ?? []
  const sectorNotes = cityData?.sectorNotes

  const venueNames = listToSentence(venues, 4)
  const industrialNames = listToSentence(industrialAreas, 4)

  const venueLine = venues.length
    ? `Evenementlocaties zoals ${venueNames} en vergelijkbare plekken zorgen geregeld voor tijdelijke installaties en publieksrisico’s.`
    : `Evenementen, utiliteitsbouw en tijdelijke installaties zorgen regelmatig voor extra toezicht en duidelijke rolverdeling.`

  const industrialLine = industrialAreas.length
    ? `Rond ${industrialNames} ligt de nadruk vaak op industriële stops, heetwerk en logistieke omgevingen.`
    : `In industriële en logistieke omgevingen draait het vaak om toezicht bij onderhoud, heetwerk en besloten ruimten.`

  const sectorLine =
    sectorNotes ??
    'De inzet wisselt tussen preventief toezicht, brandmeldinstallaties en ondersteuning bij projecten met verhoogd risico.'

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: opdrachtgeverFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Steden', url: 'https://www.probrandwacht.nl/steden' },
    {
      name: `Zelfstandige brandwacht in ${label}`,
      url: `https://www.probrandwacht.nl/steden/${rawCity}`,
    },
  ]

  const cards = [
    {
      eyebrow: 'Voor professionals',
      title: `Werken als zelfstandige brandwacht in ${label}`,
      body: (
        <>
          Praktische duiding van rollen (bijv. industrieel, event, mangat/buitenwacht),
          verantwoordelijkheden en professioneel gedrag op de vloer. Gericht op zelfstandig
          werken met duidelijke afspraken — zonder ruis.
        </>
      ),
    },
    {
      eyebrow: 'Samenwerking & kaders',
      title: 'DBA-bewust en uitlegbaar samenwerken',
      body: (
        <>
          Hoe je vooraf vastlegt wie beslist, wie aanspreekpunt is, welke verwachtingen gelden en
          hoe je dit toetsbaar houdt voor opdrachtgever én professional. Afspraken zijn in de regel
          contextafhankelijk.
        </>
      ),
    },
    {
      eyebrow: 'Tarief & randvoorwaarden',
      title: 'Tarief, inzet en voorwaarden bespreek je vooraf',
      body: (
        <>
          Verschil tussen preventief en repressief, dag/nacht/weekend, reis- en wachttijd.
          Voorbeelden zijn indicatief: het uiteindelijke tarief en de voorwaarden spreken jullie 1-op-1 af.
        </>
      ),
    },
  ]

  const secondaryCta = SPOED_UI_ENABLED
    ? { href: '/probrandwacht-direct-spoed', label: 'Spoed? ProBrandwacht Direct' }
    : undefined

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <section className="mx-auto max-w-5xl px-4 pb-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-200">
          <p>
            ProBrandwacht is een selectief platform voor zelfstandige brandwachten en opdrachtgevers
            die bewust kiezen voor directe samenwerking — en begrijpen wat dat vraagt in gedrag,
            verantwoordelijkheid en ondernemerschap. We zijn geen bureau en bieden geen garantie op inzet.
            Of een inzet haalbaar is, is contextafhankelijk en hangt af van beschikbaarheid en afspraken tussen partijen.
            Je verkent hier vooral de kaders: rolverdeling, afstemming en verantwoordelijkheid.
          </p>
        </div>
      </section>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 pb-14 pt-8">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            Zelfstandige brandwacht in {label}
          </h1>

          <HeroShell
            eyebrow={`Voor zelfstandige brandwachten & opdrachtgevers in ${label}`}
            title={
              <>
                Serieuze inzet vraagt serieuze afspraken.
                <br />
                Samenwerken in {label}, zonder ruis.
              </>
            }
            headingLevel="h2"
            body={
              <>
                ProBrandwacht helpt zelfstandige brandwachten en opdrachtgevers elkaar vinden op basis van{' '}
                <span className="font-semibold">vakmanschap</span>,{' '}
                <span className="font-semibold">rolverdeling</span> en afspraken die{' '}
                <span className="font-semibold">uitlegbaar</span> blijven.
                We zijn geen “urenfabriek” en doen geen tarief-dwang: je spreekt samen inzet, tarief en
                verantwoordelijkheid af — DBA-bewust en contextafhankelijk.
              </>
            }
            primaryCta={{ href: '/voor-brandwachten', label: 'Route voor brandwachten' }}
            secondaryCta={secondaryCta}
            footer={
              <>
                ProSafetyMatch is in ontwikkeling als technische laag om afspraken en samenwerking stap voor stap
                digitaal te ondersteunen — zonder extra tussenlagen toe te voegen.
              </>
            }
          />
        </div>
      </HeroBackground>

      <div className="fixed bottom-4 left-4 right-4 z-20 md:hidden">
        <Link
          href="/opdrachtgevers/aanmelden"
          className="flex items-center justify-center rounded-full bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-300"
        >
          Brandwacht inhuren in {label}
        </Link>
      </div>

      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-10 pt-6 md:flex-row md:items-center">
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            Meebouwen aan een werkbare route in {label}
          </h2>

          <p className="text-sm leading-relaxed text-slate-200 md:text-base">
            We zoeken zelfstandige brandwachten en opdrachtgevers in {label} die volwassen willen samenwerken:
            met heldere profielen (certificaten/ervaring), directe afstemming en afspraken die vooraf kloppen.
          </p>

          <p className="text-sm text-slate-200 md:text-base">
            ProBrandwacht is de vakinhoudelijke basis. ProSafetyMatch is in ontwikkeling als technische laag
            (o.a. dossiervorming, afspraken, communicatie), zodat samenwerking later makkelijker kan — zonder
            dat autonomie verdwijnt.
          </p>

          <p className="text-xs text-slate-400">
            Voorbeelden en formuleringen zijn indicatief. Het uiteindelijke kader is afhankelijk van context,
            risico en de afspraken die jullie vastleggen.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/zzp/aanmelden"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Ik wil verkennen als brandwacht
            </Link>
            <Link
              href="/opdrachtgevers/aanmelden"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
            >
              Ik wil verkennen als opdrachtgever
            </Link>
          </div>
        </div>

        <div className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.6)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Voor opdrachtgevers
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li>- Zicht op certificaten, ervaring en rolprofielen in {label}.</li>
            <li>- Afspraken vooraf: tarief, inzet, rolverdeling en escalatie.</li>
            <li>- DBA-bewust samenwerken zonder onnodige schakels.</li>
          </ul>

          <div className="mt-4">
            <Link
              href="/opdrachtgevers"
              className="text-sm font-semibold text-emerald-200 hover:text-emerald-100"
            >
              Lees de opdrachtgever-route →
            </Link>
          </div>
        </div>
      </section>

      <div className="pt-2">
        <InfoCardsRow items={cards} />
      </div>

      <section className="mx-auto max-w-5xl px-4 pb-10 pt-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Herkenbare scenario's in {label}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 md:text-3xl">
            Waar deze aanpak het verschil maakt
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
              <p className="text-sm font-semibold text-white">Complexe locatie, onduidelijk gezag</p>
              <p className="mt-2 text-sm text-slate-200">
                In {label} ontstaat frictie als niemand kan uitleggen wie beslist. Deze route dwingt
                rolafbakening vooraf af, zodat uitvoering rustig blijft.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
              <p className="text-sm font-semibold text-white">Spoed zonder randvoorwaarden</p>
              <p className="mt-2 text-sm text-slate-200">
                Er is haast, maar afspraken over toegang, meldpunt en verslaglegging ontbreken.
                Dan eerst kaders, pas daarna inzet.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
              <p className="text-sm font-semibold text-white">Verantwoording achteraf</p>
              <p className="mt-2 text-sm text-slate-200">
                Bij audit of incident wil je kunnen aantonen wie wat deed en waarom. Dossierdiscipline
                maakt die uitleg mogelijk.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-10 pt-10">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Lokale context in {label}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 md:text-3xl">
            Waar kom je dit type inzet vaak tegen in {label}?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
            In {label} zie je brandwacht-inzet terug bij projecten waar tijdelijke installaties, publieksveiligheid
            of verhoogd brandrisico samenkomen. {venueLine} {industrialLine}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">{sectorLine}</p>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-slate-100">
              Praktische afspraken die in {label} vaak terugkomen
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>- Aanrijtijd/reistijd en meldpunten: vooraf vastleggen voorkomt vertraging.</li>
              <li>- Toegang/parkeren/ID-checks: wie regelt wat, en wanneer?</li>
              <li>- Rolverdeling bij tijdelijke installaties of onderhoudswerk: wie beslist bij twijfel?</li>
              <li>- Escalatie: wie belt wie, en vanaf welk moment wordt opgeschaald?</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/voor-brandwachten"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Route voor brandwachten
            </Link>
            <Link
              href="/opdrachtgevers"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
            >
              Route voor opdrachtgevers
            </Link>
            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
            >
              Bekijk de kaders
            </Link>
            <Link
              href="/steden"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
            >
              Terug naar stedenoverzicht
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 pt-6">
        <section className="rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
          <h2 className="text-xl font-semibold text-slate-50">Veelgestelde vragen</h2>
          <ul className="mt-3 space-y-3">
            {opdrachtgeverFaq.map((f) => (
              <li key={f.question}>
                <p className="text-sm font-semibold text-slate-50">{f.question}</p>
                <p className="mt-1 text-sm text-slate-200">{f.answer}</p>
              </li>
            ))}
          </ul>
        </section>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
