import type { Metadata } from 'next'
import Link from 'next/link'
import { getSignupUrl } from '@/lib/config'
import ShareBar from '@/components/share-bar'

export const revalidate = 60 * 60 * 24 // 24h ISR

function niceCity(slug: string) {
  return slug
    .split('-')
    .map(s => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(' ')
}

export async function generateStaticParams() {
  // Pre-render a broader set of cities for better coverage
  const { cities } = await import('@/lib/cities')
  return cities.map(city => ({ city }))
}

export async function generateMetadata({
  params,
}: {
  params: { city: string }
}): Promise<Metadata> {
  const city = params.city
  const cityName = niceCity(city)
  const title = `Brandwacht inhuren ${cityName} – binnenkort via slimme matching | ProBrandwacht.nl`
  const description = `Vind straks snel een brandwacht in ${cityName} via slimme matching. Transparante tarieven, escrow‑betaling en certificaat‑checks.`
  const keywords = [
    `brandwacht ${cityName}`,
    `brandwacht inhuren ${cityName}`,
    'brandwacht platform',
    'escrow brandwacht',
  ]
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/brandwacht-inhuren/${city}`,
      languages: { 'nl-NL': `/brandwacht-inhuren/${city}` },
    },
    openGraph: { title, description, url: `/brandwacht-inhuren/${city}` },
    other: { hreflang: 'nl-NL' },
  }
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = params.city
  const cityName = niceCity(city)
  const signupUrl = getSignupUrl()
  const pageUrl = `https://www.probrandwacht.nl/brandwacht-inhuren/${city}`
  const faqs = [
    {
      q: `Wanneer is een brandwacht verplicht bij evenementen in ${cityName}?`,
      a: `Bij vergunningsplichtige evenementen en zodra de veiligheidsregio dit voorschrijft (o.a. bij verhoogd risico, grote publieksstromen of pyrotechniek).`,
    },
    {
      q: `Wat kost een brandwacht in ${cityName}?`,
      a: `Gemiddeld €40–€60 per uur afhankelijk van type inzet, certificaten, duur en tijdstip.`,
      cta: true,
    },
    {
      q: `Mag een zzp‑brandwacht ingezet worden op bouwplaatsen?`,
      a: `Ja, mits de vereiste certificaten (bijv. VCA, BHV, EHBO) en projectvoorwaarden aanwezig zijn.`,
      cta: true,
    },
    {
      q: `Wat is een industriële brandwacht?`,
      a: `Een specialist die toezicht houdt bij risicovolle werkzaamheden (zoals heetwerk) in een industriële omgeving en kan ingrijpen bij calamiteiten.`,
    },
    {
      q: `Word ik via ProBrandwacht altijd betaald als brandwacht?`,
      a: `Ja. We werken met escrow‑betaling: de opdrachtgever betaalt vooraf op een tussenrekening en na bevestigde uitvoering volgt automatische uitbetaling.`,
      cta: true,
    },
    {
      q: `Kan ik als zzp‑brandwacht opdrachten krijgen via ProBrandwacht?`,
      a: `Ja. Meld je aan om updates en vroege toegang te krijgen tot het platform en om straks met je profiel zichtbaar te zijn voor opdrachtgevers.`,
      cta: true,
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.probrandwacht.nl/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Brandwacht inhuren',
        item: 'https://www.probrandwacht.nl/brandwacht-inhuren',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cityName,
        item: pageUrl,
      },
    ],
  }

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

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-semibold">
        Vind Straks Snel Een Brandwacht In {cityName} Door Slimme Matching‑Algoritmes
      </h1>
      <div>
        <a
          href={signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black"
        >
          Meld je aan (gratis) en kom straks met je profiel op ProSafetyMatch
        </a>
      </div>
      <p className="text-slate-600 max-w-2xl">
        We werken aan ProSafetyMatch: het digitale platform dat brandwachten en opdrachtgevers
        transparant aan elkaar koppelt. Hieronder vind je alvast informatie voor evenementen, bouw
        en industriële inzet, plus veelgestelde vragen.
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
            Toezicht op publieksveiligheid, crowd control ondersteuning en noodprocedures. Vaak
            verplicht bij vergunningsplichtige events.
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
            Brandwacht bij risicovolle werkzaamheden, tijdelijk brandrisico of
            in‑bedrijf‑stellingen. Let op certificaten en VCA.
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
            Industriële brandwacht voor heetwerk, besloten ruimten en onderhoudsstops. Ervaring en
            procedures zijn hier cruciaal.
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
                {f.cta ? (
                  <>
                    {' '}
                    <a
                      href={signupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Meld je aan (gratis)
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </section>
  )
}
