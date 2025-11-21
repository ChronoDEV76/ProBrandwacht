import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import CityHero from '@/components/city-hero'
import ProbrandwachtDirectForm from '@/components/probrandwacht-direct-form'
import { getCityBySlug } from '@/lib/cities'
import { getSignupUrl } from '@/lib/config'
import { CITY_PAGES_ENABLED } from '@/lib/featureFlags'
import { cityCopy } from '@/lib/city-copy'
import { CITY_SLUGS, type CitySlug } from '@/lib/city-data'
import ReactMarkdown from 'react-markdown'

const ShareBar = dynamic(() => import('@/components/share-bar'), { ssr: false })

export const revalidate = 60 * 60 * 24 // 24h ISR

const isCitySlug = (value: string): value is CitySlug => CITY_SLUGS.includes(value as CitySlug)

function niceCity(slug: string) {
  return slug
    .split('-')
    .map(s => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(' ')
}

export async function generateStaticParams() {
  const { citySlugs } = await import('@/lib/cities')
  return CITY_PAGES_ENABLED ? citySlugs.map(city => ({ city })) : []
}

export async function generateMetadata({
  params,
}: {
  params: { city: string }
}): Promise<Metadata> {
  const city = params.city
  const cityMeta = getCityBySlug(city)
  const cityName = cityMeta?.name ?? niceCity(city)

  const copy = isCitySlug(city) ? cityCopy[city] : undefined

  const fallbackTitle = `Brandwacht inhuren ${cityName} – zzp-brandwachten voor events, bouw en industrie | ProBrandwacht.nl`
  const fallbackDescription = `Brandwacht nodig in ${cityName}? Via ProBrandwacht vind je rijksgediplomeerde zzp-brandwachten voor evenementen, bouw en industriële inzet. Nuchtere, duidelijke afspraken.`

  const title = copy?.metaTitle ?? fallbackTitle
  const description = copy?.metaDescription ?? fallbackDescription

  const keywords = [
    `brandwacht ${cityName}`,
    `brandwacht inhuren ${cityName}`,
    'brandwacht platform',
    'zzp brandwacht',
  ]
  const ogImage = 'https://www.probrandwacht.nl/og-home.webp'
  const canonical = `https://www.probrandwacht.nl/brandwacht-inhuren/${city}`

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: { 'nl-NL': canonical },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `Brandwacht inhuren ${cityName}` }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ProBrandwacht',
      creator: '@ProBrandwacht',
      images: [ogImage],
    },
    other: { hreflang: 'nl-NL' },
  }
}

export default function CityPage({ params }: { params: { city: string } }) {
  if (!CITY_PAGES_ENABLED) {
    notFound()
  }

  const city = params.city
  const cityMeta = getCityBySlug(city)
  const cityName = cityMeta?.name ?? niceCity(city)

  const copy = isCitySlug(city) ? cityCopy[city] : undefined

  const opdrachtgeverSignupUrl = getSignupUrl()
  const zzpSignupUrl = '/zzp/aanmelden'
  const pageUrl = `https://www.probrandwacht.nl/brandwacht-inhuren/${city}`

  const heroHeading = (
    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
      {copy?.h1 ? copy.h1 : <>Brandwacht inhuren in {cityName}</>}
    </h1>
  )

  type FAQItem = { q: string; a: string; ctaUrl?: string; ctaLabel?: string }

  const faqs: FAQItem[] = [
    {
      q: `Wanneer is een brandwacht verplicht bij evenementen in ${cityName}?`,
      a: `Bij vergunningsplichtige evenementen en wanneer de veiligheidsregio dit voorschrijft, bijvoorbeeld bij verhoogd risico, grote publieksstromen of gebruik van bijzondere effecten. De exacte eisen lopen per situatie en gemeente uiteen.`,
      ctaUrl: opdrachtgeverSignupUrl,
      ctaLabel: 'Meld je bedrijf aan',
    },
    {
      q: `Wat kost een brandwacht in ${cityName}?`,
      a: `De meeste zzp-brandwachten werken met uurtarieven grofweg tussen €40 en €60, afhankelijk van soort inzet, risico, duur en werktijden. Het tarief spreek je altijd vooraf samen af met de professional.`,
      ctaUrl: opdrachtgeverSignupUrl,
      ctaLabel: 'Vraag een indicatie aan',
    },
    {
      q: `Mag een zzp-brandwacht ingezet worden op bouwplaatsen?`,
      a: `Ja, mits de vereiste certificaten aanwezig zijn en de projectvoorwaarden dat toelaten. Denk aan Manschap A/B en aanvullende eisen zoals VCA, BHV of EHBO, afhankelijk van de situatie.`,
      ctaUrl: opdrachtgeverSignupUrl,
      ctaLabel: 'Bespreek je project',
    },
    {
      q: `Wat is een industriële brandwacht?`,
      a: `Een brandwacht die gewend is aan werken in industriële omgevingen, bijvoorbeeld bij heetwerk, onderhoudstops of besloten ruimten. Deze professionals kennen de procedures en veiligheidsafspraken op dit soort locaties.`,
      ctaUrl: opdrachtgeverSignupUrl,
      ctaLabel: 'Vind industriële profielen',
    },
    {
      q: `Kan ik als zzp-brandwacht opdrachten krijgen via ProBrandwacht?`,
      a: `Ja. ProBrandwacht brengt opdrachtgevers en zzp-brandwachten bij elkaar. Hoeveel opdrachten er zijn, hangt af van periode, regio en type inzet.`,
      ctaUrl: zzpSignupUrl,
      ctaLabel: 'Meld je aan als professional',
    },
    {
      q: 'Hoe lever ik certificaten aan?',
      a: 'Certificaten lever je rechtstreeks aan bij ProBrandwacht en/of de opdrachtgever, meestal als PDF of duidelijke scan. Samen kijken jullie of de certificaten passen bij de gevraagde inzet.',
      ctaUrl: opdrachtgeverSignupUrl,
      ctaLabel: 'Stel je vraag',
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Brandwacht inhuren', url: 'https://www.probrandwacht.nl/opdrachtgevers/brandwacht-inhuren' },
    { name: cityName, url: pageUrl },
  ]

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Brandwacht inhuren ${cityName}`,
    provider: {
      '@type': 'Organization',
      name: 'ProBrandwacht.nl',
      url: 'https://www.probrandwacht.nl',
    },
    areaServed: cityName,
    url: pageUrl,
    category: 'Brandveiligheid',
  }

  const geoJsonLd = cityMeta
    ? {
        '@context': 'https://schema.org',
        '@type': 'GeoCoordinates',
        latitude: cityMeta.latitude,
        longitude: cityMeta.longitude,
        name: cityName,
        url: pageUrl,
      }
    : null

  return (
    <section className="space-y-8">
      <StructuredBreadcrumbs items={breadcrumbItems} />

      <CityHero cityName={cityName} heading={heroHeading} />

      {copy?.intro ? (
        <p className="max-w-2xl text-sm text-slate-700">{copy.intro}</p>
      ) : null}

      {/* Voor opdrachtgevers & professionals */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-brand-700">Voor opdrachtgevers</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Direct schakelen met rijksgediplomeerde brandwachten</h2>
          <p className="mt-2 text-sm text-slate-600">
            Je wilt geen omwegen, maar iemand die weet wat er nodig is op jouw locatie. Via ProBrandwacht kom je in contact met
            zzp-brandwachten die gewend zijn aan evenementen, bouw en industriële omgevingen.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>• Minimaal rijksgediplomeerd Manschap A/B</li>
            <li>• Tarief en taken spreek je vooraf rechtstreeks af</li>
            <li>• Geschikt voor korte klussen én langere trajecten</li>
            <li>• Heldere afspraken over bereikbaarheid en aanspreekpunt</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={opdrachtgeverSignupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Meld je bedrijf aan
            </a>
            <Link href="/opdrachtgevers/brandwacht-inhuren" className="text-sm font-semibold text-brand-700 underline">
              Hoe werkt het?
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-brand-700">Voor professionals</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Minder lagen, meer zicht op je opdrachtgevers</h2>
          <p className="mt-2 text-sm text-slate-600">
            ProBrandwacht richt zich op zzp-brandwachten die hun vak serieus nemen. Je staat direct in contact met opdrachtgevers
            en kunt samen afspraken maken die passen bij jouw ervaring en beschikbaarheid.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>• Direct contact met opdrachtgevers</li>
            <li>• Nuchtere, duidelijke afspraken over uurtarief en taken</li>
            <li>• Geschikt voor zowel bij-klussen als vaste opdrachtgevers</li>
            <li>• Platform in ontwikkeling dat steeds meer ondersteuning biedt</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={zzpSignupUrl}
              className="rounded-2xl border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              Meld je aan als zzp-brandwacht
            </Link>
            <a href="/#waarde-berekenen" className="text-sm font-semibold text-slate-700 underline">
              Bekijk wat je waard bent
            </a>
          </div>
        </div>
      </section>

      {/* Korte uitleg ProBrandwacht / ProSafetyMatch */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">ProBrandwacht nu, ProSafetyMatch in ontwikkeling</h2>
        <p className="mt-2 text-sm text-slate-600">
          ProBrandwacht is de huidige schakel tussen opdrachtgevers en zzp-brandwachten. Tegelijkertijd werken we aan
          ProSafetyMatch: een platform dat deze samenwerking stap voor stap verder structureert en inzichtelijk maakt.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <BenefitCard
            title="Vandaag: direct inzetbaar"
            copy="Je schakelt met echte mensen en maakt concrete afspraken over inzet, tarief en planning. Zonder ingewikkelde constructies."
          />
          <BenefitCard
            title="Morgen: meer structuur en overzicht"
            copy="We bouwen aan tooling en platformfuncties die dossieropbouw en samenwerking makkelijker maken. Zonder grote beloftes: we verbeteren liever in stappen dan alles tegelijk te willen."
          />
        </div>
      </section>

      {/* City-specifieke longform body als Markdown */}
      {copy?.body && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            Meer over brandwacht inhuren in {cityName}
          </h2>
          <div className="prose prose-sm max-w-none text-slate-700">
            <ReactMarkdown>{copy.body}</ReactMarkdown>
          </div>
        </section>
      )}

      {/* City-specifieke case */}
      {copy?.localCaseTitle && copy?.localCaseBody && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Praktijkvoorbeeld uit {cityName}</h2>
          <h3 className="mt-2 text-sm font-semibold text-slate-800">{copy.localCaseTitle}</h3>
          <p className="mt-2 text-sm text-slate-600">{copy.localCaseBody}</p>
        </section>
      )}

      {/* Formulier */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Start je aanvraag via ProBrandwacht</h2>
        <p className="mt-2 text-sm text-slate-600">
          Geef kort aan wat je zoekt, voor welke periode en in welke omgeving. We kijken mee of er één of meerdere zzp-brandwachten
          aansluiten bij jouw vraag.
        </p>
        <div className="mt-4">
          <ProbrandwachtDirectForm />
        </div>
      </section>

      {/* Context & share */}
      <p className="max-w-2xl text-sm text-slate-600">
        In {cityName} is de behoefte aan goede brandwachten groot, maar je wilt geen onnodige schakels. ProBrandwacht helpt om
        opdrachtgevers en professionals op een nuchtere, overzichtelijke manier bij elkaar te brengen.
      </p>
      <p className="text-sm text-slate-600">
        Afspraken over tarief, taken en tijden maak je altijd vooraf en rechtstreeks met de betrokken partijen. Zo blijft iedereen
        eigenaar van zijn eigen werk en blijft het overzichtelijk.
      </p>

      <p className="text-sm text-slate-600">Deel deze pagina:</p>
      <ShareBar
        small
        url={pageUrl}
        title={`Vind een brandwacht in ${cityName} | ProBrandwacht.nl`}
        utmCampaign="city_share"
      />

      {/* FAQ */}
      <div>
        <h3 className="mb-2 text-xl font-semibold">Veelgestelde vragen</h3>
        <ul className="space-y-4">
          {faqs.map((f, i) => (
            <li key={i}>
              <p className="font-medium">{f.q}</p>
              <p className="text-sm text-slate-600">
                {f.a}{' '}
                {f.ctaUrl ? (
                  <a
                    href={f.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {f.ctaLabel || 'Lees meer'}
                  </a>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Verder lezen */}
      <div>
        <h3 className="mb-2 text-xl font-semibold">Verder lezen</h3>
        <ul className="list-disc pl-5 text-sm text-slate-700">
          <li>
            <Link className="underline" href="/blog/wat-kost-een-brandwacht-in-2025">
              Wat kost een brandwacht in 2025?
            </Link>
          </li>
          <li>
            <Link className="underline" href="/blog">
              Meer kennisartikelen →
            </Link>
          </li>
        </ul>
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {geoJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(geoJsonLd) }} />
      ) : null}
    </section>
  )
}

/* -------------------------- Kleine componenten -------------------------- */

function BenefitCard({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1">{copy}</p>
    </div>
  )
}
