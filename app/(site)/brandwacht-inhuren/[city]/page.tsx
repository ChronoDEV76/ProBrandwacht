import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import CityHero from '@/components/city-hero'
import ProbrandwachtDirectForm from '@/components/probrandwacht-direct-form'
import { getCityBySlug } from '@/lib/cities'
import { getSignupUrl } from '@/lib/config'

const ShareBar = dynamic(() => import('@/components/share-bar'), { ssr: false })

export const revalidate = 60 * 60 * 24 // 24h ISR

function niceCity(slug: string) {
  return slug
    .split('-')
    .map(s => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(' ')
}

export async function generateStaticParams() {
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
  const description = `Vind straks snel een brandwacht in ${cityName} via het alternatieve brandwachtplatform. Eerlijke tarieven en certificaat-checks.`
  const keywords = [
    `brandwacht ${cityName}`,
    `brandwacht inhuren ${cityName}`,
    'brandwacht platform',
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
  const city = params.city
  const cityMeta = getCityBySlug(city)
  const cityName = cityMeta?.name ?? niceCity(city)

  // CTA’s
  const opdrachtgeverSignupUrl = getSignupUrl()            // primaire doelgroep van deze pagina
  const zzpSignupUrl = '/zzp/aanmelden'                    // secundaire CTA waar relevant

  const pageUrl = `https://www.probrandwacht.nl/brandwacht-inhuren/${city}`

  const heroHeading = (
    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
      Brandwacht inhuren in {cityName}
    </h1>
  )

  type FAQItem = { q: string; a: string; ctaUrl?: string; ctaLabel?: string }

  const faqs: FAQItem[] = [
    {
      q: `Wanneer is een brandwacht verplicht bij evenementen in ${cityName}?`,
      a: `Bij vergunningsplichtige evenementen en zodra de veiligheidsregio dit voorschrijft (o.a. bij verhoogd risico, grote publieksstromen of pyrotechniek).`,
      ctaUrl: opdrachtgeverSignupUrl,
      ctaLabel: 'Meld je bedrijf aan'
    },
    {
      q: `Wat kost een brandwacht in ${cityName}?`,
      a: `Gemiddeld €40–€60 per uur afhankelijk van type inzet, certificaten, duur en tijdstip.`,
      ctaUrl: opdrachtgeverSignupUrl,
      ctaLabel: 'Vraag een profieloverzicht aan'
    },
    {
      q: `Mag een zzp-brandwacht ingezet worden op bouwplaatsen?`,
      a: `Ja, mits de vereiste certificaten (bijv. VCA, BHV, EHBO) en projectvoorwaarden aanwezig zijn.`,
      ctaUrl: opdrachtgeverSignupUrl,
      ctaLabel: 'Bekijk mogelijkheden'
    },
    {
      q: `Wat is een industriële brandwacht?`,
      a: `Een specialist die toezicht houdt bij risicovolle werkzaamheden (zoals heetwerk) in een industriële omgeving en kan ingrijpen bij calamiteiten.`,
      ctaUrl: opdrachtgeverSignupUrl,
      ctaLabel: 'Vind industriële profielen'
    },
    {
      q: `Word ik via ProBrandwacht altijd betaald als brandwacht?`,
      a: `Ja. We stemmen betalingen rechtstreeks af tussen opdrachtgever en professional zodat beide partijen vooraf duidelijkheid hebben.`,
      ctaUrl: zzpSignupUrl,
      ctaLabel: 'Meld je aan als professional'
    },
    {
      q: `Kan ik als zzp-brandwacht opdrachten krijgen via ProBrandwacht?`,
      a: `Ja. Meld je aan voor vroege toegang en zichtbaarheid richting opdrachtgevers.`,
      ctaUrl: zzpSignupUrl,
      ctaLabel: 'Meld je aan als professional'
    },
    {
      q: 'Hoe lever ik certificaten aan?',
      a: 'Upload certificaten bij voorkeur als PDF voor automatische controle. PNG of JPG kan ook: na je iDIN-verificatie checken we ze via registers (o.a. Centraal Diploma Register VCA) en verwijderen we kopieën na goedkeuring. Herbeoordeling minimaal jaarlijks.',
      ctaUrl: opdrachtgeverSignupUrl,
      ctaLabel: 'Start met een proefopdracht'
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

      <section className="space-y-3 text-slate-700">
        <p className="text-lg font-medium text-slate-800">
          Brandwacht inhuren in {cityName} — sneller, eerlijker en DBA-proof met directe toegang tot gecertificeerde
          professionals en realtime planning via ProBrandwacht Direct.
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

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={opdrachtgeverSignupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black"
        >
          Meld je bedrijf aan
        </a>
        <Link
          href="/opdrachtgevers/brandwacht-inhuren"
          className="text-sm font-medium text-slate-700 underline hover:text-slate-900"
        >
          Of lees eerst hoe het werkt
        </Link>
      </div>

      {/* Micro-belofte + Social proof */}
      <p className="text-xs text-slate-600">
        Met 2 velden zie je direct beschikbaarheid & tariefbandbreedte.
      </p>
      <p className="mt-1 inline-flex items-center rounded-full border px-3 py-1 text-xs text-slate-700">
        Aangescherpt met feedback uit de sector (200+ professionals)
      </p>

      {/* Loss-aversion nudge */}
      <p className="text-sm text-brand-700 font-medium">
        Elke week uitstel = langere doorlooptijd en minder grip op kwaliteit. Vandaag eerlijk
        regelen, morgen sneller leveren.
      </p>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Start je ProBrandwacht Direct aanvraag</h2>
        <p className="mt-2 text-sm text-slate-600">
          Eén formulier, realtime updates: meestal binnen enkele minuten zie je wie beschikbaar is en hoe betalingen worden geborgd.
        </p>
        <div className="mt-4">
          <ProbrandwachtDirectForm />
        </div>
      </section>

      {/* Context */}
      <p className="text-slate-600 max-w-2xl">
        In {cityName} verlies je vaak tijd en kwaliteit aan tussenlagen. ProSafetyMatch maakt tarief,
        certificaten in één oogopslag zichtbaar — zodat je direct kunt schakelen met de
        juiste professionals. Eisen uit de lokale vergunning (BGBOP/Omgevingswet) en Arbowet-artikel-3 controles
        worden in hetzelfde dossier vastgelegd.
      </p>
      <p className="text-sm text-slate-600">
        Tarieven bepaal je samen. Wij tonen eerlijk hoe de kosten verdeeld zijn, zonder verborgen marges.
        <br className="hidden sm:block" /> 0% verborgen marges — het uurtarief gaat rechtstreeks naar de professional.
      </p>

      {/* Share */}
      <p className="text-sm text-slate-600">Deel deze pagina:</p>
      <ShareBar
        small
        url={pageUrl}
        title={`Vind straks snel een brandwacht in ${cityName} | ProBrandwacht.nl`}
        utmCampaign="city_share"
      />

      {/* Domeinen */}
      <div className="grid gap-6 sm:grid-cols-3">
        <DomainCard
          title="Evenementen"
          copy="Toezicht op publieksveiligheid, crowd control en noodprocedures. Bij vergunningsplichtige events vaak verplicht."
        />
        <DomainCard
          title="Bouw"
          copy="Bewaking bij risicovolle werkzaamheden, tijdelijke brandrisico’s en inbedrijfstellingen. Let op geldige VCA en certificaten."
        />
        <DomainCard
          title="Industrie"
          copy="Industriële brandwachten voor heetwerk, besloten ruimten en onderhoudsstops. Ervaring met procedures is cruciaal."
        />
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Veelgestelde vragen</h3>
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

function DomainCard({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-xl border p-5 bg-white shadow-sm">
      <div className="flex items-start gap-2">
        <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-700" aria-hidden />
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-slate-600 mt-1">{copy}</p>
        </div>
      </div>
    </div>
  )
}
