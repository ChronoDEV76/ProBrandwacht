// app/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import SeoStructuredData from '@/components/SeoStructuredData'
import CpiChart from '@/components/cpi-chart'

const CostCalculator = dynamic(() => import('@/components/cost-calculator'), {
  ssr: false,
  loading: () => <div className="h-24 animate-pulse rounded-xl bg-slate-100" />,
})

export const metadata: Metadata = {
  title: 'Brandwacht inhuren | ProBrandwacht.nl – transparante tarieven & DBA-proof samenwerking',
  description:
    'ProBrandwacht.nl is het onafhankelijke platform voor brandwachten en opdrachtgevers. Ontdek transparante tarieven, escrow-betalingen en DBA-proof samenwerking zonder tussenbureau.',
  keywords: [
    // Kern
    'brandwacht inhuren',
    'zzp brandwacht',
    'recruitment brandwacht',
    'transparante brandwacht tarieven',
    'brandwacht tarieven 2025',
    'brandwacht kosten per uur',
    'dba proof samenwerking brandwacht',
    'brandwacht compliance platform',
    'brandwacht match platform',
    'brandwacht recruitment platform',
    'alternatief brandwacht bureau',
    'probrandwacht',
    'prosafetymatch',

    // Uitleg & differentiatie
    'transparant inhuur brandwacht',
    'escrow brandwacht dienst',
    'veiligheidsbureau brandwacht alternatief',
    'brandwacht compliance dba',
    'dba proof recruitment platform',
    'dba verklaring brandwacht samenwerking',
    'brandwacht overeenkomst opdrachtgever zzp',
    'dba wetgeving brandwachten',

    // Educatief & thought leadership
    'brandwacht tarieven berekenen',
    'brandwacht uurtarief zzp voorbeeld',
    'brandwacht tariefverschillen bureau vs zzp',
    'hoe werkt escrow voor brandwachten',
    'voordelen direct samenwerken met brandwacht',
    'dba checklist brandveiligheid',
    'brandwacht overeenkomst zonder bureau',
    'digitale matching brandwachten',
    'nieuwe norm brandwacht samenwerking',
    'zelfstandige brandwacht ondernemerschap',
    'transparante tarieven veiligheidssector',
    'brandwacht compliance en certificering',
  ],
  alternates: {
    canonical: 'https://www.probrandwacht.nl/',
    languages: { 'nl-NL': 'https://www.probrandwacht.nl/' },
  },
  authors: [{ name: 'ProBrandwacht', url: 'https://www.probrandwacht.nl' }],
  creator: 'ProBrandwacht',
  publisher: 'ProBrandwacht',
  openGraph: {
    title: 'Brandwacht inhuren via ProBrandwacht.nl | Transparante tarieven & directe samenwerking',
    description:
      'Huur een brandwacht of veiligheidsprofessional in zonder tussenbureau. Transparante tarieven, escrow-betaling en DBA-proof samenwerking via ProSafetyMatch.',
    url: 'https://www.probrandwacht.nl/',
    locale: 'nl_NL',
    siteName: 'ProBrandwacht',
    images: [
      {
        url: 'https://www.probrandwacht.nl/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Brandwacht inhuren via ProBrandwacht',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProBrandwacht',
    creator: '@ProBrandwacht',
    title: 'Brandwacht inhuren via ProBrandwacht.nl',
    description:
      'DBA-proof brandwacht inhuren? Vergelijk transparante tarieven, escrow-betalingen en gecertificeerde teams via ProBrandwacht.nl.',
    images: ['https://www.probrandwacht.nl/og-home.jpg'],
  },
  robots: { index: true, follow: true },
}

const heroHighlights = [
  {
    label: 'Transparante kosten',
    description: 'Iedereen ziet dezelfde tariefopbouw met platformfee en escrow uitgesplitst.',
  },
  {
    label: 'Regie bij professional',
    description:
      'Je blijft ondernemer: directe contracten, zelfstandige facturatie en eigen agenda.',
  },
  {
    label: 'DBA-proof afspraken',
    description:
      'Heldere rolverdeling plus documentatie en checks zodat bureauconstructies overbodig worden.',
  },
] as const

const whyHighlights = [
  {
    title: 'Tariefopbouw ontleed',
    description:
      'Begrijp hoe uurprijzen zijn opgebouwd vanuit cao-logica, marktdata en kostprijsmodellen.',
  },
  {
    title: 'DBA helder gemaakt',
    description:
      "Krijg concrete richtlijnen over gezag, ondernemersrisico en contractuele vrijheid voor zzp'ers.",
  },
  {
    title: 'Digitale alternatieven',
    description:
      'Ontdek hoe ProSafetyMatch matching, escrow en verificaties ondersteunt zonder bemiddeling.',
  },
] as const

const processSteps = [
  {
    title: 'Meld je aan',
    copy: 'Maak je profiel aan en geef aan of je professional of opdrachtgever bent.',
  },
  {
    title: 'Verifieer documenten',
    copy: 'Koppel iDIN, upload certificaten en leg compliance vast in je eigen dashboard.',
  },
  {
    title: 'Publiceer je profiel',
    copy: 'Zet je beschikbaarheid en tariefbandbreedte klaar zodat opdrachten je kunnen vinden.',
  },
  {
    title: 'Match & start',
    copy: 'Sluit direct je overeenkomst met escrow als vangnet. Geen verborgen marges.',
  },
  {
    title: 'Betaal transparant',
    copy: 'Escrow keert automatisch uit; je ziet realtime de fee en uitbetalingen.',
  },
] as const

const verificationPoints = [
  {
    heading: 'Certificaten uploaden',
    body: 'PDF heeft de voorkeur voor controle via registers (o.a. Centraal Diploma Register VCA). Niet-verifieerbare bestanden markeren we als risico.',
  },
  {
    heading: 'Identiteitscontrole',
    body: 'iDIN-verificatie koppelt certificaten aan de juiste persoon en voorkomt misbruik. Status zichtbaar in je dashboard.',
  },
  {
    heading: 'Periodieke checks',
    body: 'Verlopen documenten worden gesignaleerd; opdrachtgevers krijgen automatisch een notificatie bij vernieuwing.',
  },
  {
    heading: 'Ongeldige certificaten',
    body: 'Geweigerde uploads blijven verborgen voor opdrachtgevers. We vragen altijd om aanvullend bewijs.',
  },
] as const

const partnerBadges = [
  'CBS-data',
  'KVK kostprijsmodellen',
  'Belastingdienst Wet DBA',
  "FNV Veiligheidsregio's",
] as const

const knowledgeResources = [
  {
    label: 'Tariefcalculator',
    description: 'Bekijk per stad wat opdrachtgever betaalt, onze fee en jouw netto ontvangst.',
    href: '#tarief-calculator-home',
  },
  {
    label: 'DBA-checklist',
    description:
      'Doorloop de stappen voor gezag, ondernemersrisico en contractuele onafhankelijkheid.',
    href: '/blog/dba-en-brandwachten-wat-opdrachtgevers-moeten-weten',
  },
  {
    label: 'Toolkit voor certificaten',
    description:
      'Beheer documenten veilig; leer wanneer je moet vernieuwen en hoe escrow uitbetalingen werkt.',
    href: '/manifest',
  },
] as const

const faqEntries = [
  {
    question: 'Wat maakt ProBrandwacht anders dan een bureau?',
    answer:
      'Wij zijn een platform, geen bemiddelaar. De overeenkomst is altijd rechtstreeks tussen opdrachtgever en professional. Wij leveren tooling, escrow en compliance — zonder verborgen marges.',
  },
  {
    question: 'Kan ik eigen tarieven hanteren?',
    answer:
      'Ja. De calculator toont hoe fee en escrow worden opgebouwd zodat beide partijen dezelfde informatie hebben. Het uiteindelijke tarief bepaal je samen.',
  },
  {
    question: 'Hoe veilig zijn mijn certificaten?',
    answer:
      'Documenten worden versleuteld opgeslagen. Alleen jij en door jou uitgenodigde partijen hebben toegang. Niet-verifieerbare uploads worden gemarkeerd en nooit gedeeld zonder toestemming.',
  },
]

export default function HomePage() {
  const articleStructuredData = {
    title: 'Brandwacht inhuren – transparante tarieven & DBA-proof samenwerking',
    description:
      'ProBrandwacht.nl helpt opdrachtgevers en brandwachten met transparante tarieven, escrow en DBA-proof samenwerking zonder tussenbureau.',
    url: 'https://www.probrandwacht.nl/',
    datePublished: '2024-07-05',
    dateModified: '2024-07-05',
    image: 'https://www.probrandwacht.nl/og-home.jpg',
  }

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-brand-100/40 via-white to-white text-slate-900">
      <div className="relative mx-auto max-w-5xl space-y-16 px-4 pb-16 pt-10 sm:px-6 md:px-8 md:pb-24 md:pt-16">
        <SeoStructuredData
          includeOrganization={false}
          article={articleStructuredData}
          faqs={faqEntries}
        />

        {/* HERO */}
        <section aria-labelledby="hero-heading" className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-xs font-medium text-brand-700 shadow-sm">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Platform, geen bemiddelaar – overeenkomst direct tussen opdrachtgever en professional.
          </div>

          <header className="space-y-6">
            <p className="text-sm uppercase tracking-wide text-brand-700">
              Voor zzp-brandwachten en opdrachtgevers die transparantie eisen
            </p>
            <h1 id="hero-heading" className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Veiligheid, maar dan eerlijk geregeld.
            </h1>
            <p className="text-sm font-medium text-brand-700">
              Transparant. DBA-proof. Zonder verborgen marges.
            </p>
            <p className="max-w-3xl text-lg text-slate-700">
              ProBrandwacht is het onafhankelijke informatie- en aanmeldplatform voor de
              brandveiligheidssector. We koppelen je aan ProSafetyMatch voor matching, escrow en
              compliance — zodat jij open tarieven kunt hanteren, zonder tussenlaag.
            </p>
          </header>

          <nav aria-label="Primaire CTA’s" className="flex flex-wrap items-center gap-3">
            <Link
              href="#tarief-calculator-home"
              className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-700/90 focus:outline-none focus:ring-2 focus:ring-brand-700/40"
            >
              Bereken je tarief nu
            </Link>
            <Link
              href="/manifest"
              className="inline-flex items-center rounded-md border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              Lees de missie
            </Link>
            <Link
              href="/opdrachtgevers/aanmelden"
              className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Aanmelden als opdrachtgever
            </Link>
          </nav>

          <div className="grid gap-3 sm:grid-cols-3" aria-label="USP’s">
            {heroHighlights.map(item => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="mt-2 text-sm text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTEXT */}
        <section
          aria-labelledby="context-heading"
          className="rounded-3xl border border-amber-100 bg-white/90 p-6 shadow-sm sm:p-8"
        >
          <h2 id="context-heading" className="text-2xl font-semibold text-slate-900">
            Regels én realiteit: zo blijf je DBA-proof
          </h2>
          <p className="mt-3 text-slate-700">
            De Wet DBA wil eerlijke arbeidsverhoudingen. Tegelijk drukken inflatie, verzekeringen en
            certificeringen op de marges. Wij erkennen die spanning — en bouwen tooling die
            transparantie en naleving praktisch maakt voor beide kanten.
          </p>
          <ul className="mt-4 list-disc pl-5 text-sm text-slate-700">
            <li>Inflatie en loonkosten duwen tarieven omhoog; marges blijven krap.</li>
            <li>
              DBA-controles vragen aantoonbare zelfstandigheid, terwijl planning flexibiliteit
              vereist.
            </li>
            <li>
              We testen features met professionals én opdrachtgevers: minder marketing, meer
              bruikbaarheid.
            </li>
          </ul>
        </section>

        {/* WHY */}
        <section
          aria-labelledby="why-heading"
          className="rounded-3xl border border-brand-100 bg-white/85 p-6 shadow-sm sm:p-8"
        >
          <h2 id="why-heading" className="text-2xl font-semibold text-slate-900">
            Waarom ProBrandwacht?
          </h2>
          <p className="mt-3 text-slate-700">
            Tarieven, marges en rollen zijn vaak ondoorzichtig. Wij brengen orde in de
            marktstructuur en geven je instrumenten om afspraken op feiten te baseren.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {whyHighlights.map(item => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <p className="text-base font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* NOT A BUREAU */}
        <section
          aria-labelledby="nobureau-heading"
          className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 shadow-sm sm:p-8"
        >
          <h2 id="nobureau-heading" className="text-2xl font-semibold text-amber-900">
            Wij zijn geen bureau
          </h2>
          <p className="mt-3 text-slate-800">
            ProBrandwacht bemiddelt niet en houdt geen marge achter. Matching, contracteren en
            betalingen lopen via ProSafetyMatch als onafhankelijk platform. Jullie behouden
            volledige regie over afspraken en uitvoering. Wij ondersteunen met escrow en
            documentcontrole — zonder werkgeversrol.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-amber-300 bg-white/80 p-4 text-sm text-amber-900">
              Overeenkomst blijft rechtstreeks tussen opdrachtgever en professional.
            </div>
            <div className="rounded-2xl border border-amber-300 bg-white/80 p-4 text-sm text-amber-900">
              Gebruik eigen juridische/fiscale checks naast onze tooling.
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section
          aria-labelledby="process-heading"
          className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8"
        >
          <h2 id="process-heading" className="text-2xl font-semibold text-slate-900">
            Zo werkt het
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* VERIFICATION */}
        <section
          aria-labelledby="verify-heading"
          className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm sm:p-8"
        >
          <h2 id="verify-heading" className="text-2xl font-semibold text-slate-900">
            Verificatie en certificaten
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {verificationPoints.map(point => (
              <article
                key={point.heading}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <h3 className="text-base font-semibold text-slate-900">{point.heading}</h3>
                <p className="mt-2 text-sm text-slate-700">{point.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CPI & PARTNERS */}
        <section
          aria-labelledby="cpi-heading"
          className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-3 text-center">
            <h2 id="cpi-heading" className="text-2xl font-semibold text-red-700">
              Tariefontwikkeling in perspectief
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-slate-600">
              Inflatie en lasten drukken op de marges van zelfstandigen. We monitoren
              marktontwikkelingen en werken aan modellen waarin tarieftransparantie en eerlijke
              beloning hand in hand gaan.
            </p>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white/70 p-4 shadow-sm">
              <CpiChart />
              <p className="mt-2 text-center text-xs text-slate-500">
                Bron: CBS StatLine (jaar-op-jaar CPI) & interne ProBrandwacht-index
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3" aria-label="Indicatoren">
            <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4 text-center">
              <p className="text-2xl font-semibold text-brand-800">+5,4%</p>
              <p className="mt-2 text-xs text-slate-700">
                Loonkostenstijging veiligheidssector (indicatief)
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4 text-center">
              <p className="text-2xl font-semibold text-brand-800">41%</p>
              <p className="mt-2 text-xs text-slate-700">Professionals: inflatie = grootste zorg</p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4 text-center">
              <p className="text-2xl font-semibold text-brand-800">78%</p>
              <p className="mt-2 text-xs text-slate-700">
                Opdrachtgevers willen actief DBA-proof samenwerken
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Partners">
            {partnerBadges.map(label => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {label}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Bronnen:{' '}
            <Link href="https://www.cbs.nl/nl-nl/cijfers" className="underline">
              CBS
            </Link>
            , interne panels (n=&nbsp;187 professionals, 64 opdrachtgevers).
          </p>
        </section>

        {/* KNOWLEDGE */}
        <section
          aria-labelledby="knowledge-heading"
          className="rounded-3xl border border-brand-100 bg-white/90 p-6 shadow-sm sm:p-8"
        >
          <h2 id="knowledge-heading" className="text-2xl font-semibold text-brand-800">
            Kennis en hulpmiddelen
          </h2>
          <p className="mt-2 text-slate-700">
            Gebruik onze bronnen om tarieven te onderbouwen, DBA-risico te beperken en certificaten
            slim te beheren.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {knowledgeResources.map(resource => (
              <article
                key={resource.label}
                className="flex h-full flex-col justify-between rounded-2xl border border-brand-100 bg-white/90 p-4"
              >
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{resource.label}</h3>
                  <p className="mt-2 text-sm text-slate-700">{resource.description}</p>
                </div>
                <Link
                  href={resource.href}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-200"
                >
                  Lees meer
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* CALCULATOR */}
        <section
          id="tarief-calculator-home"
          aria-labelledby="calc-heading"
          className="space-y-4 rounded-3xl border border-brand-100 bg-brand-50/70 p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-2">
            <h2 id="calc-heading" className="text-2xl font-semibold text-brand-800">
              Reken zelf je tarief door
            </h2>
            <p className="text-sm text-slate-700">
              Gebruik de calculator hieronder voor een snelle indicatie en klik door naar de
              stadspagina voor meer scenario’s.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-4">
            <CostCalculator initialCity="amsterdam" />
          </div>
          <p className="text-xs text-slate-500">
            De calculator toont voorbeeldverdelingen. Elke opdracht stem je samen af op
            certificaten, risico en beschikbaarheid.
          </p>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8"
        >
          <h2 id="faq-heading" className="text-2xl font-semibold text-slate-900">
            Veelgestelde vragen
          </h2>
          <div className="mt-5 space-y-4">
            {faqEntries.map(item => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-slate-900 group-open:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-200">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3" aria-label="Acties">
            <Link
              href="/zzp/aanmelden"
              className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-700/90 focus:outline-none focus:ring-2 focus:ring-brand-700/40"
            >
              Meld je aan als professional
            </Link>
            <Link
              href="/opdrachtgevers"
              className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Meer voor opdrachtgevers
            </Link>
          </div>
        </section>

        {/* COMMUNITY */}
        <section
          aria-labelledby="community-heading"
          className="rounded-3xl border border-brand-100 bg-white/85 p-6 shadow-sm sm:p-8"
        >
          <h2 id="community-heading" className="text-2xl font-semibold text-slate-900">
            Denk met ons mee
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Heb jij ideeën om het spanningsveld tussen inflatie, DBA en veiligheid eerlijker te
            maken? Deel je inzichten — jouw feedback bepaalt onze roadmap.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="mailto:info@prosafetymatch.nl"
              className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-700/90 focus:outline-none focus:ring-2 focus:ring-brand-700/40"
            >
              Stuur je feedback
            </Link>
            <Link
              href="/manifest#community"
              className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Bekijk hoe we samenwerken
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
