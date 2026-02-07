import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import HeroBackground from '@/components/HeroBackground'
import AfbakeningNote from '@/components/afbakening-note'
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
  const title = `Brandwacht-inzet in ${label}: verantwoordelijkheden en regels | ProBrandwacht`

  const cityData = CITY_RECORD_MAP[rawCity] as CityRecordShape
  const sectorNotes = cityData?.sectorNotes

  const description = sectorNotes
    ? `Onafhankelijke uitleg over brandwacht-inzet in ${label}. ${sectorNotes} Wat is verplicht, wie is verantwoordelijk en waar gaat het vaak mis?`
    : `Onafhankelijke uitleg over brandwacht-inzet in ${label}. Wat is verplicht, wie is verantwoordelijk en waar gaat het vaak mis?`

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
      name: `Brandwacht-inzet in ${label}`,
      url: `https://www.probrandwacht.nl/steden/${rawCity}`,
    },
  ]

  const cards = [
    {
      eyebrow: 'Voor professionals',
      title: `Werken als zelfstandige brandwacht in ${label}`,
      body: (
        <>
          Praktische uitleg van rollen (bijv. industrieel, event, mangat/buitenwacht),
          verantwoordelijkheden en professioneel gedrag op de vloer. Gericht op zelfstandig
          werken met duidelijke afspraken -- zonder ruis.
        </>
      ),
    },
    {
      eyebrow: 'Samenwerking & kaders',
      title: 'Uitlegbaar samenwerken',
      body: (
        <>
          Hoe je vooraf vastlegt wie beslist, wie aanspreekpunt is, welke verwachtingen gelden en
          hoe je dit toetsbaar houdt voor opdrachtgever en professional. Afspraken zijn in de regel
          contextafhankelijk.
        </>
      ),
    },
    {
      eyebrow: 'Randvoorwaarden',
      title: 'Scope en beslislijnen bespreek je vooraf',
      body: (
        <>
          Voorbeelden zijn indicatief. Het uiteindelijke kader spreken partijen 1-op-1 af, passend
          bij rol, locatie en risico.
        </>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <section className="mx-auto max-w-5xl px-4 pt-10">
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          Brandwacht-inzet in {label}: verantwoordelijkheden, regels en aandachtspunten
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-200">
          ProBrandwacht legt uit hoe zelfstandige samenwerking werkt, met heldere rolafbakening en directe
          lijnen tussen opdrachtgever en professional. We maken zichtbaar waar grenzen liggen; lees waarom op{' '}
          <Link
            href="/waarom-wij-soms-nee-zeggen"
            className="text-emerald-200 underline underline-offset-4 hover:text-emerald-100"
          >
            waarom wij soms nee zeggen
          </Link>
          .
        </p>

        <p className="mt-4 text-base leading-relaxed text-slate-200">
          <strong className="text-white">Deze pagina is een werkkaart.</strong>{' '}
          ProBrandwacht maakt inzichtelijk hoe brandwacht-inzet in {label} kan worden ingericht binnen
          een zelfstandige 1-op-1 samenwerking.
        </p>

        <p className="mt-4 text-base leading-relaxed text-slate-200">
          Of inzet passend is, hangt af van de context, rolverdeling en feitelijke uitvoering. Past
          dat niet? Dan is nee soms de professionele keuze.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/voor-brandwachten" className="route-link">
            Voor brandwachten
          </Link>
          <Link href="/opdrachtgevers" className="route-link">
            Voor opdrachtgevers
          </Link>
          <Link href="/waarom-wij-soms-nee-zeggen" className="route-link">
            Waarom wij soms nee zeggen
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="panel p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">ProBrandwacht</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              Werkkaart en uitleg vooraf, met focus op rolhelderheid en uitvoerbaarheid.
            </p>
          </div>
        </div>
      </section>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 pb-14 pt-8">
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
                Geen plaatsing of selectie: we beschrijven wat inzet werkbaar maakt in de praktijk. We lichten
                samenwerking toe op basis van <span className="font-semibold">vakmanschap</span>,{' '}
                <span className="font-semibold">rolverdeling</span> en afspraken die{' '}
                <span className="font-semibold">uitlegbaar</span> blijven. Afspraken spreek je 1-op-1 af,
                contextafhankelijk.
              </>
            }
            footer={<>ProBrandwacht legt uit en kadert -- uitvoering blijft bij de betrokken partijen.</>}
          />
        </div>
      </HeroBackground>

      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-10 pt-6 md:flex-row md:items-center">
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            Meebouwen aan een werkbare route in {label}
          </h2>

          <p className="text-sm leading-relaxed text-slate-200 md:text-base">
            We richten ons op zelfstandige brandwachten en opdrachtgevers in {label} die volwassen willen
            samenwerken: met heldere profielen, rechtstreekse afstemming en afspraken die vooraf kloppen.
          </p>

          <p className="text-xs text-slate-400">
            Voorbeelden en formuleringen zijn indicatief. Het uiteindelijke kader is afhankelijk van context,
            risico en de afspraken die jullie vastleggen.
          </p>

        </div>

        <div className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.6)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Voor opdrachtgevers - uitvoerbaar vooraf
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li>- Zicht op certificaten, ervaring en rolprofielen in {label}.</li>
            <li>- Afspraken vooraf: scope, rolverdeling en escalatie.</li>
            <li>- Samenwerken zonder onnodige schakels.</li>
          </ul>

        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <AfbakeningNote />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-10">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Zo herkennen we uitvoerbaarheid
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li>- Rolzuiverheid: wie beslist, wie voert uit, en wat is de scope?</li>
            <li>- Uitvoerbaarheid: sluit de inzet aan op vergunning, risico en context?</li>
            <li>- Verantwoordelijkheid: afspraken vooraf, toetsbaar tijdens uitvoering.</li>
          </ul>
        </div>
      </section>

      <div className="pt-2">
        <InfoCardsRow items={cards} />
      </div>

      <section className="mx-auto max-w-5xl px-4 pb-10 pt-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Herkenbare scenario&apos;s in {label}
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
              <li>- Aanrijtijd/reistijd en meldpunten: vooraf vastleggen helpt vertraging te beperken.</li>
              <li>- Toegang/parkeren/ID-checks: wie regelt wat, en wanneer?</li>
              <li>- Rolverdeling bij tijdelijke installaties of onderhoudswerk: wie beslist bij twijfel?</li>
              <li>- Escalatie: wie belt wie, en vanaf welk moment wordt opgeschaald?</li>
            </ul>
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
