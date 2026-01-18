import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Cta } from '@/components/Cta'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import HeroBackground from '@/components/HeroBackground'
import { HeroShell } from '@/components/layout/hero-shell'
import { CITY_RECORD_MAP, CITY_SLUGS, type CitySlug } from '@/lib/city-data'
import { getRouteMetadata } from '@/lib/seo/metadata'
import { SPOED_UI_ENABLED } from '@/lib/featureFlags'

export const revalidate = 0
export const dynamic = 'force-dynamic'
const BASE_URL = 'https://www.probrandwacht.nl'

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }))
}

const isCitySlug = (value: string): value is (typeof CITY_SLUGS)[number] =>
  CITY_SLUGS.includes(value as (typeof CITY_SLUGS)[number])

const resolveLabel = (city: CitySlug) =>
  CITY_RECORD_MAP[city]?.name ?? city.replace(/-/g, ' ')

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
  const canonical = `${BASE_URL}/brandwacht-inhuren/${rawCity}`
  const base = getRouteMetadata('/brandwacht-inhuren/[city]')
  const title = `Brandwacht inhuren in ${label} | ProBrandwacht`
  const description = `Brandwacht inhuren in ${label}? Samenwerken rechtstreeks met zelfstandige brandwachten op basis van rolprofielen, certificaten en afspraken die vooraf kloppen.`

  return {
    ...base,
    title,
    description,
    alternates: { canonical, languages: { 'nl-NL': canonical } },
    openGraph: { ...(base.openGraph ?? {}), title, description, url: canonical },
    twitter: { ...(base.twitter ?? {}), title, description },
  }
}

export function BrandwachtInhurenCityPage({
  params,
  h1Verb = 'inhuren',
  includeSrOnlyH1 = true,
}: {
  params: { city: string }
  h1Verb?: 'inhuren' | 'huren'
  includeSrOnlyH1?: boolean
}) {
  const rawCity = params.city
  if (!isCitySlug(rawCity)) return notFound()

  const label = resolveLabel(rawCity)
  const cityData = CITY_RECORD_MAP[rawCity] as
    | { venues?: string[]; industrialAreas?: string[]; sectorNotes?: string }
    | undefined
  const venues = cityData?.venues ?? []
  const industrialAreas = cityData?.industrialAreas ?? []
  const sectorNotes = cityData?.sectorNotes

  const venueLine = venues.length
    ? `In en rond ${label} zie je inzet vaak bij locaties zoals ${venues.join(', ')} en vergelijkbare plekken met publieksrisico's en tijdelijke installaties.`
    : `In en rond ${label} zie je inzet vaak bij publiekslocaties, utiliteitsbouw en tijdelijke installaties.`

  const industrialLine = industrialAreas.length
    ? `Rond ${industrialAreas.join(', ')} ligt de nadruk vaak op industriële stops, heetwerk en logistieke omgevingen.`
    : `In industriele en logistieke omgevingen draait het vaak om toezicht bij onderhoud, heetwerk en besloten ruimten.`

  const sectorLine =
    sectorNotes ??
    'De inzet wisselt tussen preventief toezicht, brandmeldinstallaties en ondersteuning bij projecten met verhoogd risico.'

  const secondaryCta = SPOED_UI_ENABLED
    ? { href: '/probrandwacht-direct-spoed', label: 'Spoed? ProBrandwacht Direct' }
    : undefined

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Brandwacht inhuren', url: 'https://www.probrandwacht.nl/brandwacht-inhuren' },
    { name: `In ${label}`, url: `https://www.probrandwacht.nl/brandwacht-inhuren/${rawCity}` },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <section className="mx-auto max-w-5xl px-4 pb-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-200">
          <p>
            ProBrandwacht is geen klassiek bureau. We bewaken de uitvoerbaarheid van brandveiligheid en
            selecteren op rolhelderheid, afspraken en verantwoordelijkheid. Inzet is contextafhankelijk
            en hangt af van beschikbaarheid en afspraken tussen partijen. Je verkent hier vooral de kaders:
            rolverdeling, afstemming en verantwoordelijkheid.
          </p>
        </div>
      </section>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 pb-14 pt-8">
          {includeSrOnlyH1 ? (
            <h1 className="sr-only">Brandwacht {h1Verb} in {label} | ProBrandwacht</h1>
          ) : null}
          <HeroShell
            eyebrow={`Brandwacht inhuren in ${label}`}
            title={
              <>
                Directe afstemming. Heldere afspraken.
                <br />
                Inhuren in {label} zonder ruis.
              </>
            }
            headingLevel="h1"
            body={
              <>
                Geen volume-gedreven plaatsing: we kijken eerst of inzet klopt in de praktijk. Je werkt samen met
                zelfstandige brandwachten op basis van rolprofielen, certificaten en afspraken die vooraf kloppen.
                Tarief, inzet en verantwoordelijkheid spreek je direct af - DBA-bewust en uitlegbaar.
              </>
            }
            footer={
              <>
                ProSafetyMatch is in ontwikkeling als technische laag om afspraken, planning en documentatie later stap voor stap digitaal te ondersteunen.
              </>
            }
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Cta id="tertiary_contact_exploratory" />
            <Cta id="secondary_why_no" className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5" />
            {secondaryCta ? <Cta id="secondary_spoed_direct" /> : null}
          </div>
        </div>
      </HeroBackground>

      <section className="mx-auto max-w-5xl px-4 pb-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Zo toetsen we of inzet klopt
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li>- Rolzuiverheid: wie beslist, wie voert uit, en wat is de scope?</li>
            <li>- Uitvoerbaarheid: sluit de inzet aan op vergunning, risico en context?</li>
            <li>- Verantwoordelijkheid: afspraken vooraf, toetsbaar tijdens uitvoering.</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-10 pt-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Herkenbare scenario&apos;s in {label}
          </p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Wanneer directe afstemming helpt
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
              <p className="text-sm font-semibold text-white">Complex risico, weinig tijd</p>
              <p className="mt-2 text-sm text-slate-200">
                Je moet in {label} snel schakelen, maar alleen als rol en gezag vooraf helder zijn.
                Dat voorkomt discussies op locatie.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
              <p className="text-sm font-semibold text-white">Rolverdeling vervaagt in de praktijk</p>
              <p className="mt-2 text-sm text-slate-200">
                Afspraken lijken rond, maar verantwoordelijkheid blijft onduidelijk.
                Directe afspraken maken het besluitvormingspad zichtbaar.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
              <p className="text-sm font-semibold text-white">Uitleg richting audit of OR</p>
              <p className="mt-2 text-sm text-slate-200">
                Je moet later kunnen uitleggen waarom je voor deze inzet koos. Dossierdiscipline
                houdt die keuze verdedigbaar.
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
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Waar speelt deze inzet in {label} vaak?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
            {venueLine} {industrialLine}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">{sectorLine}</p>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-slate-100">Afspraken die je vooraf vastlegt</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>- Scope: wat wel/niet onder de inzet valt</li>
              <li>- Beslislijnen en escalatie (wie beslist wanneer)</li>
              <li>- Tarief + randvoorwaarden (reistijd/wachtdienst/nacht/weekend)</li>
              <li>- Toegang/parkeren/meldpunt en communicatiemiddelen</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Cta id="opdrachtgever_fit_your_case" />
            <Cta id="about_kaders_intentie" className="border-white/20" />
            <Cta id="secondary_steden_overview" className="border-white/20" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default function BrandwachtInhurenCityPageDefault(props: { params: { city: string } }) {
  return <BrandwachtInhurenCityPage {...props} />
}
