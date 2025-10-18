import type { Metadata } from 'next'
import Link from 'next/link'
import ShareBar from '@/components/share-bar'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { getCityBySlug } from '@/lib/cities'

export const revalidate = 60 * 60 * 24 // 24h ISR

function niceCity(slug: string) {
  return slug
    .split('-')
    .map(s => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(' ')
}

export async function generateStaticParams() {
  // Pre-render a broader set of cities for better coverage
  const { citySlugs } = await import('@/lib/cities')
  return citySlugs.map(city => ({ city }))
}

export async function generateMetadata({
  params,
}: {
  params: { city: string }
}): Promise<Metadata> {
  const city = params.city
  const cityMeta = getCityBySlug(city)
  const cityName = cityMeta?.name ?? niceCity(city)
  const title = `Brandwacht inhuren ${cityName} – Het alternatieve brandwachtplatform | ProBrandwacht.nl`
  const description = `Vind straks snel een brandwacht in ${cityName} via het alternatieve brandwachtplatform. Transparante tarieven, escrow‑betaling en certificaat‑checks.`
  const keywords = [
    `brandwacht ${cityName}`,
    `brandwacht inhuren ${cityName}`,
    'brandwacht platform',
    'escrow brandwacht',
  ]
  const ogImage = 'https://www.probrandwacht.nl/og-home.jpg'
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
  const city = params.city
  const cityMeta = getCityBySlug(city)
  const cityName = cityMeta?.name ?? niceCity(city)
  const zzpSignupUrl = '/zzp/aanmelden'
  const pageUrl = `https://www.probrandwacht.nl/brandwacht-inhuren/${city}`
  type FAQItem = { q: string; a: string; ctaUrl?: string }
  const faqs: FAQItem[] = [
    {
      q: `Wanneer is een brandwacht verplicht bij evenementen in ${cityName}?`,
      a: `Bij vergunningsplichtige evenementen en zodra de veiligheidsregio dit voorschrijft (o.a. bij verhoogd risico, grote publieksstromen of pyrotechniek).`,
    },
    {
      q: `Wat kost een brandwacht in ${cityName}?`,
      a: `Gemiddeld €40–€60 per uur afhankelijk van type inzet, certificaten, duur en tijdstip.`,
      ctaUrl: zzpSignupUrl,
    },
    {
      q: `Mag een zzp‑brandwacht ingezet worden op bouwplaatsen?`,
      a: `Ja, mits de vereiste certificaten (bijv. VCA, BHV, EHBO) en projectvoorwaarden aanwezig zijn.`,
      ctaUrl: zzpSignupUrl,
    },
    {
      q: `Wat is een industriële brandwacht?`,
      a: `Een specialist die toezicht houdt bij risicovolle werkzaamheden (zoals heetwerk) in een industriële omgeving en kan ingrijpen bij calamiteiten.`,
    },
    {
      q: `Word ik via ProBrandwacht altijd betaald als brandwacht?`,
      a: `Ja. We werken met escrow‑betaling: de opdrachtgever betaalt vooraf op een tussenrekening en na bevestigde uitvoering volgt automatische uitbetaling.`,
      ctaUrl: zzpSignupUrl,
    },
    {
      q: `Kan ik als zzp‑brandwacht opdrachten krijgen via ProBrandwacht?`,
      a: `Ja. Meld je aan om updates en vroege toegang te krijgen tot het platform en om straks met je profiel zichtbaar te zijn voor opdrachtgevers.`,
      ctaUrl: zzpSignupUrl,
    },
    {
      q: 'Hoe lever ik certificaten aan?',
      a: 'Upload certificaten bij voorkeur als PDF voor automatische controle. PNG of JPG kan ook: na je iDIN-verificatie checken we ze handmatig via registers zoals het Centraal Diploma Register VCA en verwijderen we de kopieën na goedkeuring. We herbeoordelen alle documenten minimaal jaarlijks.',
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
      <h1 className="text-3xl font-semibold">
        Van oude marge-modellen naar slimme matching in {cityName}
      </h1>
      <div>
        <a
          href="/zzp/aanmelden"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black"
        >
          Sluit je aan bij de ploeg die de norm herschrijft
        </a>
      </div>
      <p className="text-slate-600 max-w-2xl">
        Vandaag verlies je in {cityName} nog uren aan ondoorzichtige tussenlagen. Wij kennen die vertragingen, en daarom bouwen we aan een platform
        dat tarieven, certificaten en escrow in één oogopslag regelt zodat jij sneller kunt leveren. Hieronder zie je wat er verandert als jij meebouwt.
      </p>
      <p className="text-sm text-slate-600">
        Tarieven bepaal je altijd samen. Wij tonen eerlijk de verdeling: 10% platformfee voor community, support en
        matching plus 1–2% escrowkosten voor rekening van de opdrachtgever zodat uitbetaling verzekerd is.
      </p>
      <p className="text-sm text-brand-700 font-medium">
        Vandaag vangt een tussenlaag nog marge; morgen bepalen jij en de professional de regels. Gebruik deze pagina om de
        stap naar dat nieuwe systeem te zetten.
      </p>
      <p className="text-sm text-slate-600">Deel deze pagina:</p>
      <ShareBar
        small
        url={pageUrl}
        title={`Vind straks snel een brandwacht in ${cityName} | ProBrandwacht.nl`}
        utmCampaign="city_share"
      />

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border p-5 bg-white shadow-sm">
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-brand-700">
              <path fill="currentColor" d="M4 6h16v2H4V6Zm0 4h16v8H4v-8Zm2 2v4h12v-4H6Z" />
            </svg>
            <h2 className="font-semibold">Evenementen</h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            We houden toezicht op publieksveiligheid, ondersteunen crowd control en bewaken
            noodprocedures. Bij vergunningsplichtige events is inzet vrijwel altijd verplicht.
          </p>
        </div>
        <div className="rounded-xl border p-5 bg-white shadow-sm">
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-brand-700">
              <path fill="currentColor" d="M3 13h8V3h2v10h8v2H3v-2Zm0 4h18v2H3v-2Z" />
            </svg>
            <h2 className="font-semibold">Bouw</h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            We bewaken risicovolle werkzaamheden, tijdelijke brandrisico’s en inbedrijfstellingen.
            Let op geldige certificaten en VCA voor iedereen op locatie.
          </p>
        </div>
        <div className="rounded-xl border p-5 bg-white shadow-sm">
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-brand-700">
              <path fill="currentColor" d="M4 13V7h2v6h3V9h2v4h3V6h2v7h4v2H4Z" />
            </svg>
            <h2 className="font-semibold">Industrie</h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            We leveren industriële brandwachten voor heetwerk, besloten ruimten en onderhoudsstops.
            Ervaring met procedures is daarbij cruciaal.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Veelgestelde vragen</h3>
        <ul className="space-y-4">
          {faqs.map((f, i) => (
            <li key={i}>
              <p className="font-medium">{f.q}</p>
              <p className="text-sm text-slate-600">
                {f.a}
                {f.ctaUrl ? (
                  <>
                    {' '}
                  <a
                    href={f.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Sluit je aan bij de ploeg die de norm herschrijft
                  </a>
                  </>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Verder lezen</h3>
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

      {/* FAQ JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {geoJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(geoJsonLd) }} />
      ) : null}
    </section>
  )
}
