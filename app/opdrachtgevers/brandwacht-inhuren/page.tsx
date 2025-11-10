import type { Metadata } from 'next'
import Link from 'next/link'

import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'

const canonicalUrl = 'https://www.probrandwacht.nl/opdrachtgevers/brandwacht-inhuren'
const ogImage = 'https://www.probrandwacht.nl/og-home.webp'

export const metadata: Metadata = {
  title: 'Brandwacht inhuren – eerlijk & DBA-proof | ProBrandwacht',
  description:
    'Huur gecertificeerde (ZZP) brandwachten zonder marges of bemiddelaars. Eerlijk tarief, DBA-proof samenwerking en direct contact met professionals.',
  keywords: [
    'brandwacht',
    'brandwacht inhuren',
    'brandwacht huren',
    'DBA-proof brandwacht',
    'brandwacht tarieven',
  ],
  alternates: {
    canonical: canonicalUrl,
    languages: { 'nl-NL': canonicalUrl },
  },
  openGraph: {
    url: canonicalUrl,
    title: 'Brandwacht inhuren – eerlijk & DBA-proof | ProBrandwacht',
    description:
      'Huur gecertificeerde (ZZP) brandwachten zonder marges of bemiddelaars. Eerlijk tarief, DBA-proof samenwerking en direct contact met professionals.',
    siteName: 'ProBrandwacht.nl',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Brandwacht inhuren via ProBrandwacht.nl',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProBrandwacht',
    creator: '@ProBrandwacht',
    title: 'Brandwacht inhuren – eerlijk & DBA-proof | ProBrandwacht',
    description:
      'Huur gecertificeerde (ZZP) brandwachten zonder marges of bemiddelaars. Eerlijk tarief, DBA-proof samenwerking en direct contact met professionals.',
    images: [ogImage],
  },
}

const breadcrumbItems = [
  { name: 'Home', url: 'https://www.probrandwacht.nl/' },
  { name: 'Voor opdrachtgevers', url: 'https://www.probrandwacht.nl/opdrachtgevers' },
  { name: 'Brandwacht inhuren', url: canonicalUrl },
]

const faqItems = [
  {
    question: 'Welke certificaten hebben jullie brandwachten?',
    answer:
      'Onze professionals beschikken over VCA (VOL), BHV/brandpreventie en – waar relevant – mangatwacht, gasmeting of ademlucht certificaten. Je ziet certificaatstatus en vervaldatum direct in het profiel.',
  },
  {
    question: 'Hoe werkt het tarief en de platformfee?',
    answer:
      'Het uurtarief bepaal je samen met de professional. Wij maken duidelijk hoe de vergoeding wordt opgebouwd voor verificaties, support en het netto honorarium. Geen verborgen marges.',
  },
  {
    question: 'Is de samenwerking DBA-proof?',
    answer:
      'Ja. Contracten lopen rechtstreeks tussen opdrachtgever en professional. De platformdocumentatie helpt bij gezag, ondernemersrisico en aansprakelijkheid. Wij faciliteren tooling en documentatie, geen bemiddeling.',
  },
  {
    question: 'In welke regio’s leveren jullie brandwachten?',
    answer:
      'Onze community is actief in haven- en industrieregio’s (Rotterdam, Moerdijk, Terneuzen) én landelijke projecten. Via filters kies je per locatie, dienst en werktijd.',
  },
]

const useCases = [
  {
    title: 'Haven & zware industrie',
    description:
      'Brandsurveillance bij laden/lossen, tankonderhoud en heetwerk. Vereist vaak VCA VOL, ademlucht, mangatwacht en gasmeting.',
    href: '/brandwacht/haven-industrie',
  },
  {
    title: 'Turnaround & stops',
    description:
      'Extra toezicht tijdens shutdowns, onderhoud en revisies. Nacht- en weekenddiensten, escalatieplannen en werkvergunningen inbegrepen.',
    href: '/brandwacht/turnaround-stop',
  },
  {
    title: 'Mangatwacht & buitenwacht',
    description:
      'Veiligheidswacht bij besloten ruimten. Checklists voor gasmeting, reddingsmateriaal en evacuatieroutes standaard beschikbaar.',
    href: '/brandwacht/mangatwacht',
  },
]

const regions = [
  { title: 'Rotterdam & Botlek', copy: 'Havenfaciliteiten, chemie en raffinage – snel opschalen bij stops en onderhoud.' },
  { title: 'Moerdijk & Brabantse industrie', copy: 'Logistieke terminals, warehouses en petrochemische plants met 24/7 inzet.' },
  { title: 'Terneuzen & Zeeuws-Vlaanderen', copy: 'Dow-terrein en omliggende chemieclusters met streng gecertificeerd personeel.' },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Brandwacht inhuren',
  serviceType: 'Brandwacht diensten',
  provider: {
    '@type': 'Organization',
    name: 'ProBrandwacht.nl',
    url: 'https://www.probrandwacht.nl',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Nederland',
  },
  url: canonicalUrl,
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'EUR',
    description: 'Heldere kostenopbouw met directe contracten.',
  },
}

export default function BrandwachtInhurenOpdrachtgeversPage() {
  return (
    <main className="mx-auto w-full min-h-full max-w-5xl space-y-12 px-4 py-10">
      <StructuredBreadcrumbs items={breadcrumbItems} />

      <section className="space-y-5 rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-100">
          Direct contact, geen bemiddeling
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Brandwacht inhuren</h1>
        {/* SEO-UPGRADE START */}
        <div className="mt-2 text-slate-600 text-sm">
          <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
          Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/probrandwacht-direct" className="underline">ProBrandwacht Direct</a>.
        </div>
        {/* SEO-UPGRADE END */}
        <p className="max-w-3xl text-slate-700">
          Maak een match met gecertificeerde brandwachten zonder tussenlaag. Jij bepaalt tarief en planning; wij verzorgen certificaatcontrole en DBA-proof documentatie. Eerlijk, snel en betrouwbaar.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/opdrachtgevers/aanmelden"
            className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-brand-700/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700/40"
          >
            Vraag een brandwacht aan
          </Link>
          <Link
            href="/missie"
            className="inline-flex items-center rounded-md border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
          >
            Bekijk onze missie
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Tarieven & helderheid</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>• Selecteer op tariefbandbreedte, werktijd (dag/nacht) en dienstduur.</li>
            <li>• Zie direct de platformfee (10%) en het netto honorarium.</li>
            <li>• Deel dezelfde tariefberekening met finance & HR om interne afstemming te versnellen.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">DBA-proof samenwerking</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>• Contracten altijd rechtstreeks tussen opdrachtgever en professional.</li>
            <li>• Checklists voor gezag, ondernemersrisico en aansprakelijkheid inbegrepen.</li>
            <li>• Escrow zorgt voor automatische betaling na bevestigde uitvoering.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Certificeringen & kwaliteit</h2>
        <p className="mt-3 text-sm text-slate-700">
          Profielen tonen altijd actuele certificaten (VCA VOL, BHV/brandpreventie, mangatwacht, gasmeting) en status van iDIN-verificatie. Verlopen documenten worden automatisch gemarkeerd.
        </p>
        <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <strong>VCA & Safety</strong>
            <p className="mt-2">VCA (VOL), BHV, EHBO, NIBHV, adembescherming.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <strong>Besloten ruimten</strong>
            <p className="mt-2">Mangatwacht, buitenwacht, gasmeting/Atex, rescueteam.</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Regio’s & beschikbaarheid</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {regions.map(region => (
            <div key={region.title} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              <strong>{region.title}</strong>
              <p className="mt-2">{region.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Werktijden & planning</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>• 24/7 inzetbaar: dag, nacht en consignatie.</li>
          <li>• Ondersteuning voor korte klussen, turnarounds en langlopende contracten.</li>
          <li>• Escrow maakt spoedaanvragen mogelijk zonder gedoe met inkooporders.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Use-cases</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {useCases.map(item => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{item.description}</p>
              <Link
                href={item.href}
                className="mt-4 inline-flex text-sm font-medium text-brand-700 hover:underline"
              >
                Lees de checklist
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Veelgestelde vragen</h2>
        <div className="mt-4 space-y-3">
          {faqItems.map(item => (
            <details key={item.question} className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900 group-open:text-brand-700">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-brand-700 px-6 py-5 text-white">
        <div>
          <h2 className="text-lg font-semibold">Start met eerlijke inhuur</h2>
          <p className="text-sm text-brand-100">
            Meld je bedrijf aan en ontvang binnen 24 uur toegang tot het aanvraagportaal.
          </p>
        </div>
        <Link
          href="/opdrachtgevers/aanmelden"
          className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow hover:bg-white/90"
        >
          Vraag een brandwacht aan
        </Link>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </main>
  )
}
