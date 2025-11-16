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
  if (!CITY_PAGES_ENABLED) {
    notFound()
  }

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
      a: `Gemiddeld €40–€55 per uur voor evenementen en bouw; specialistische profielen zoals Manschap A/B of industrieel toezicht lopen door tot circa €70.`,
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

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-brand-700">Voor opdrachtgevers</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Direct toegang tot gecertificeerde teams</h2>
          <p className="mt-2 text-sm text-slate-600">
            Zie realtime wie er beschikbaar is, leg betaalafspraken vast en houd je dossiers DBA-proof terwijl we naar ProSafetyMatch toewerken.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>• Tariefopbouw gedeeld met finance & inkoop</li>
            <li>• Certificaten geborgd via iDIN + documentcontrole</li>
            <li>• Eén aanvraag voor geplande en spoed-inzet</li>
            <li>• Voorbeeld: bij €50/u klanttarief ontvangt de professional ±€42/u (15% fee + 1,5% escrow) — alles zichtbaar voor beide kanten</li>
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
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Word onderdeel van ProSafetyMatch</h2>
          <p className="mt-2 text-sm text-slate-600">
            Bouw je dossier nu al op via ProBrandwacht Direct. Zodra ProSafetyMatch live is schuiven je reviews, certificaten en escrow-geschiedenis automatisch mee.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>• Eerlijke vergoeding: 15% platformfee + 1,5–2% escrow</li>
            <li>• Direct contact met opdrachtgevers, geen tussenlaag</li>
            <li>• Bewijs van opdrachten en betalingen in één dashboard</li>
            <li>• Voorbeeld: klant betaalt €50/u ➜ jij houdt ±€42/u over (15% fee + 1,5% escrow) — nog steeds ±€10 meer dan via bureaus</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={zzpSignupUrl}
              className="rounded-2xl border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              Meld je aan als zzp-brandwacht
            </Link>
            <a href="/#waarde-berekenen" className="text-sm font-semibold text-slate-700 underline">
              Bereken je netto waarde
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Waarom ProSafetyMatch straks het verschil maakt</h2>
        <p className="mt-2 text-sm text-slate-600">
          ProBrandwacht werft vandaag al opdrachtgevers én professionals voor ProSafetyMatch, het platform waar dezelfde dossiers straks automatisch worden beheerd. Geen nieuwe onboarding, wel meer automatisering.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <BenefitCard title="Nu via ProBrandwacht Direct" copy="Inzet zoals u gewend bent van bureaus, maar met een eerlijkere verdeling richting de uitvoerende professional." />
          <BenefitCard title="Straks via ProSafetyMatch" copy="Automatische escrow, self-service matching en gedeelde auditlogs voor opdrachtgever én zzp’er, inclusief dashboards met innovatieve tools." />
        </div>
      </section>

      <div className="rounded-3xl border border-brand-200 bg-brand-50 p-5 text-center text-sm font-semibold text-brand-800">
        Betaal marktconform ±€50/u, laat de professional ±€42/u netto overhouden en geef direct €10+ per uur meer dan een traditioneel bureau (≈€30–€32/u). Dat is tot €400 extra beloning voor elke 40-urige week én een onweerstaanbare propositie richting de beste brandwachten.
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Veel aangevraagde inzet in {cityName}</h2>
        <p className="mt-2 text-sm text-slate-600">
          De meeste aanvragen gaan over <strong>brandwacht zzp inhuren</strong> voor specifieke situaties. Dit zijn de snelst groeiende categorieën in {cityName}:
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>• Heetwerk en preventiebrandwacht bij bouw en verbouwprojecten.</li>
          <li>• Laden/lossen van gevaarlijke stoffen en terminal-toezicht.</li>
          <li>• Tijdelijke nacht- of weekendploegen tijdens shutdowns en events.</li>
          <li>• Gasmeting, mangatwacht en toezicht in besloten ruimten.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Start je ProBrandwacht Direct aanvraag</h2>
        <div className="mt-4">
          <ProbrandwachtDirectForm />
        </div>
      </section>

      {/* Context */}
      <p className="text-slate-600 max-w-2xl">
        In {cityName} verlies je vaak tijd en kwaliteit aan tussenlagen. ProSafetyMatch maakt straks tarief,
        certificaten en dossierafspraken in één oogopslag zichtbaar zodat je direct schakelt met de juiste professionals.
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

function BenefitCard({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1">{copy}</p>
    </div>
  )
}
