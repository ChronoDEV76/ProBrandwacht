import Link from 'next/link'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import SeoStructuredData from '@/components/SeoStructuredData'

import CpiChart from '@/components/cpi-chart'

const CostCalculator = dynamic(() => import('@/components/cost-calculator'), { ssr: false })

export const metadata: Metadata = {
  title: 'Brandwacht inhuren | ProBrandwacht.nl – transparante tarieven & DBA-proof samenwerking',
  description:
    'ProBrandwacht.nl is het onafhankelijke platform voor brandwachten en opdrachtgevers. Ontdek transparante tarieven, escrow-betalingen en DBA-proof samenwerking zonder tussenbureau.',
  keywords: [
    'brandwacht inhuren',
    'zzp brandwacht',
    'freelance brandwacht',
    'brandwacht tarieven 2025',
    'brandwacht kosten per uur',
    'transparante brandwacht tarieven',
    'probrandwacht',
    'prosafetymatch',
    'dba proof samenwerking',
    'escrow brandwacht',
    'HEV 2018 brandveiligheid',
    'BGBOP brandveiligheid',
    'brandbeveiliging evenement',
    'veiligheidsregio eisen brandwacht',
    'alternatief brandwacht bureau',
    'brandwacht evenementen Randstad',
    'directe opdracht zzp brandwacht',
    'brandwacht rijksgediplomeerd',
    'poort-QR check-in',
    'gasmeting gasmeter services',
    'mangatwacht buitenwacht',
  ],
  alternates: { canonical: '/', languages: { 'nl-NL': '/' } },
  openGraph: {
    title: 'Brandwacht inhuren via ProBrandwacht.nl | Transparante tarieven & directe samenwerking',
    description:
      'Huur een brandwacht of veiligheidsprofessional in zonder tussenbureau. Transparante tarieven, escrow-betaling en DBA-proof samenwerking via ProSafetyMatch.',
    url: 'https://www.probrandwacht.nl/',
    locale: 'nl_NL',
    images: [{ url: '/og-home.jpg', width: 1200, height: 630, alt: 'Brandwacht inhuren via ProBrandwacht' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProBrandwacht',
    creator: '@ProBrandwacht',
    title: 'Brandwacht inhuren via ProBrandwacht.nl',
    description:
      'DBA-proof brandwacht inhuren? Vergelijk transparante tarieven, escrow-betalingen en gecertificeerde teams via ProBrandwacht.nl.',
    images: ['/og-home.jpg'],
  },
}

const heroHighlights = [
  {
    label: 'Transparante kosten',
    description: 'Iedereen ziet dezelfde tariefopbouw met platformfee en escrow uitgesplitst.',
  },
  {
    label: 'Regie bij professional',
    description: 'Je blijft ondernemer: directe contracten, zelfstandige facturatie en eigen agenda.',
  },
  {
    label: 'DBA-proof afspraken',
    description: 'Heldere rolverdeling plus documentatie en checks zodat bureauconstructies overbodig worden.',
  },
]

const whyHighlights = [
  {
    title: 'Tariefopbouw ontleed',
    description: 'Begrijp hoe uurprijzen zijn opgebouwd vanuit cao-logica, marktdata en kostprijsmodellen.',
  },
  {
    title: 'DBA helder gemaakt',
    description: "Krijg concrete richtlijnen over gezag, ondernemersrisico en contractuele vrijheid voor zzp'ers.",
  },
  {
    title: 'Digitale alternatieven',
    description: 'Ontdek hoe ProSafetyMatch matching, escrow en verificaties ondersteunt zonder bemiddeling.',
  },
]

const processSteps = [
  { title: 'Meld je aan', copy: 'Maak je profiel aan en geef aan of je professional of opdrachtgever bent.' },
  { title: 'Verifieer documenten', copy: 'Koppel iDIN, upload certificaten en leg compliance vast in je eigen dashboard.' },
  { title: 'Publiceer je profiel', copy: 'Zet je beschikbaarheid en tariefbandbreedte klaar zodat opdrachten je kunnen vinden.' },
  { title: 'Match & start', copy: 'Opdrachtgever en professional sluiten direct hun overeenkomst met escrow als vangnet.' },
  { title: 'Betaal transparant', copy: 'Escrow keert automatisch uit, jij ziet realtime wat er binnenkomt en wat de fee is.' },
]

const verificationPoints = [
  {
    heading: 'Certificaten uploaden',
    body: 'PDF heeft de voorkeur voor controle via registers (o.a. Centraal Diploma Register VCA). JPG/PNG kan ook zodra iDIN is gekoppeld, wij markeren niet-verifieerbare bestanden expliciet als risico.',
  },
  {
    heading: 'Identiteitscontrole',
    body: 'iDIN-verificatie voorkomt misbruik en koppelt certificaten aan de juiste persoon. De status blijft in je dashboard zichtbaar.',
  },
  {
    heading: 'Periodieke checks',
    body: 'Verlopen documenten worden gesignaleerd, opdrachtgevers krijgen automatisch een notificatie wanneer vernieuwing nodig is.',
  },
  {
    heading: 'Ongeldige certificaten',
    body: 'Wordt een upload geweigerd, dan blijft het document verborgen voor opdrachtgevers en vragen we je om aanvullend bewijs.',
  },
]

const partnerBadges = ['CBS-data', "KVK kostprijsmodellen", "Belastingdienst Wet DBA", "FNV Veiligheidsregio's"]

const knowledgeResources = [
  {
    label: 'Tariefcalculator',
    description: 'Bekijk per stad wat opdrachtgever betaalt, welke fee wij rekenen en wat jij netto ontvangt.',
    href: '#tarief-calculator-home',
  },
  {
    label: 'DBA-checklist',
    description: 'Doorloop de stappen voor gezag, ondernemersrisico en contractuele onafhankelijkheid.',
    href: '/blog/dba-en-brandwachten-wat-opdrachtgevers-moeten-weten',
  },
  {
    label: 'Toolkit voor certificaten',
    description: 'Leer hoe je documenten veilig beheert, wanneer je moet vernieuwen en hoe escrow uitbetalingen werkt.',
    href: '/manifest',
  },
]

const faqEntries = [
  {
    question: 'Wat maakt ProBrandwacht anders dan een bureau?',
    answer:
      'Wij faciliteren tooling, escrow en compliance, maar de overeenkomst wordt altijd rechtstreeks gesloten tussen opdrachtgever en professional. Geen verborgen marges en geen bemiddeling.',
  },
  {
    question: 'Kan ik eigen tarieven hanteren?',
    answer:
      'Ja. De calculator laat alleen zien hoe fee en escrow worden opgebouwd zodat jullie dezelfde informatie hebben. Het tarief bepaal je altijd samen met de opdrachtgever.',
  },
  {
    question: 'Hoe veilig zijn mijn certificaten?',
    answer:
      'Certificaten worden versleuteld opgeslagen. Alleen jij en partijen die je uitnodigt krijgen toegang. Niet-verifieerbare uploads worden gemarkeerd en nooit gedeeld zonder jouw toestemming.',
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
    <div className="relative w-full bg-gradient-to-r from-brand-50 to-white">
      <div className="relative text-slate-900">
        <div className="relative mx-auto max-w-5xl space-y-16 px-4 pb-16 pt-10 sm:px-6 md:px-8 md:pb-24 md:pt-16">
          <SeoStructuredData includeOrganization={false} article={articleStructuredData} faqs={faqEntries} />

          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-xs font-medium text-brand-700 shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Platform, geen bemiddelaar - overeenkomst direct tussen opdrachtgever en professional.
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-wide text-brand-700">Voor zzp-brandwachten en opdrachtgevers die transparantie eisen</p>
              <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Veiligheid, maar dan eerlijk geregeld.</h1>
              <p className="text-sm font-medium text-brand-700">Veiligheid eerlijk geregeld — mét oog voor jouw kostendruk en marktrealiteit.</p>
              <p className="max-w-3xl text-lg text-slate-700">
                ProBrandwacht is het onafhankelijke informatie- en aanmeldplatform voor professionals in de industriële en brandveiligheidssector.
                We koppelen je aan ProSafetyMatch voor matching, escrow en compliance zodat jij open tarieven kunt laten zien, zonder tussenlaag.
              </p>
              <p className="max-w-3xl text-slate-700">
                Of je nu als brandwacht, mangatwacht of securityspecialist werkt, of als opdrachtgever verantwoordelijk bent voor veiligheid op locatie -
                wij helpen beide kanten om op een moderne, rechtvaardige manier samen te werken.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#tarief-calculator-home"
                className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-700/90"
              >
                Bereken je tarief nu
              </Link>
              <Link
                href="/manifest"
                className="inline-flex items-center rounded-md border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
              >
                Lees de missie
              </Link>
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
              >
                Aanmelden als opdrachtgever
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {heroHighlights.map(item => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-2 text-sm text-slate-700">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-amber-100 bg-white/90 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Tegenstrijdige realiteit: regels én realiteit</h2>
            <p className="mt-3 text-slate-700">
              De Wet DBA wil eerlijke arbeidsverhoudingen, maar hoge kosten door inflatie, verzekeringen en certificeringen maken het voor zelfstandigen lastig om gezond te blijven werken.
              We zien ook dat opdrachtgevers worstelen met zekerheid en compliance. Bij ProBrandwacht erkennen we deze spanning — en werken we actief aan structurele oplossingen om beide
              behoeften te ondersteunen.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Inflatie en loonkosten (+5,4% volgens CBS 2025) duwen tarieven omhoog terwijl marges krap blijven.</li>
              <li>DBA-controles vragen aantoonbare zelfstandigheid, maar planning en budget vragen juist om flexibiliteit.</li>
              <li>Onze features worden getest met professionals en opdrachtgevers zodat marketingpraatjes plaatsmaken voor bruikbare oplossingen.</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-brand-100 bg-white/85 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Waarom ProBrandwacht?</h2>
            <p className="mt-3 text-slate-700">
              De veiligheidsbranche is cruciaal maar vaak ondoorzichtig. Tarieven, marges en tussenpartijen maken het lastig om te zien wie waarvoor verantwoordelijk is.
              Wij brengen orde in die marktstructuur en geven je tools om gesprekken te voeren op basis van feiten.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {whyHighlights.map(item => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <p className="text-base font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-700">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-amber-900">Wij zijn geen bureau</h2>
            <p className="mt-3 text-slate-800">
              ProBrandwacht bemiddelt niet en houdt geen marge achter. We bouwen bewustwording, tooling en workflows. Matching, contracteren en betalingen verlopen via
              ProSafetyMatch als onafhankelijk platform. Jij en de opdrachtgever behouden volledige regie over afspraken en uitvoering. Soms bieden we ondersteunende
              functies zoals escrow-support of documentcontrole om processen soepel te laten verlopen, maar zonder de rol van werkgever of bemiddelaar over te nemen.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-amber-300 bg-white/80 p-4 text-sm text-amber-900">
                Platform, geen bemiddelaar: de overeenkomst blijft altijd rechtstreeks tussen opdrachtgever en professional.
              </div>
              <div className="rounded-2xl border border-amber-300 bg-white/80 p-4 text-sm text-amber-900">
                Wij zorgen voor tooling, escrow en controles, maar adviseren je om altijd eigen juridische of fiscale checks te laten uitvoeren.
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Hoe werkt het in de praktijk?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {processSteps.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{step.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Verificatie en certificaten</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {verificationPoints.map(point => (
                <article key={point.heading} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <h3 className="text-base font-semibold text-slate-900">{point.heading}</h3>
                  <p className="mt-2 text-sm text-slate-700">{point.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <div className="space-y-3 text-center">
              <h2 className="text-2xl font-semibold text-red-700">Tariefontwikkeling in perspectief</h2>
              <p className="mx-auto max-w-3xl text-sm text-slate-600">
                De stijgende inflatie en toenemende lasten drukken op de marges van zelfstandigen. ProBrandwacht monitort de marktontwikkelingen en werkt aan een model
                waarin tarieftransparantie en eerlijke beloning hand in hand gaan.
              </p>
              <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <CpiChart />
                <p className="mt-2 text-xs text-slate-500 text-center">Bron: CBS StatLine (jaar-op-jaar CPI) & interne ProBrandwacht-index</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4 text-center">
                <p className="text-2xl font-semibold text-brand-800">+5,4%</p>
                <p className="mt-2 text-xs text-slate-700">Loonkostenstijging veiligheidssector Q2 2025 (CBS)</p>
              </div>
              <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4 text-center">
                <p className="text-2xl font-semibold text-brand-800">41%</p>
                <p className="mt-2 text-xs text-slate-700">Professionals die inflatie als grootste zorg noemen (ProBrandwacht-peiling 2024)</p>
              </div>
              <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4 text-center">
                <p className="text-2xl font-semibold text-brand-800">78%</p>
                <p className="mt-2 text-xs text-slate-700">Opdrachtgevers die actief DBA-proof willen samenwerken (ProSafetyMatch survey)</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {partnerBadges.map(label => (
                <span key={label} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                  {label}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              Bronnen: <Link href="https://www.cbs.nl/nl-nl/cijfers" className="underline">CBS</Link>, interne panels (n=&nbsp;187 professionals, 64 opdrachtgevers).
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Onze agenda voor eerlijker werken</h2>
            <ul className="mt-4 space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">Q1</span>
                <div>
                  <p className="font-semibold">Inflatiecorrectie-indexering (2026)</p>
                  <p className="text-xs text-slate-600">Automatische suggesties voor tariefaanpassingen. Status: planning.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">Q2</span>
                <div>
                  <p className="font-semibold">Escrow &amp; garantiefaciliteit (2026)</p>
                  <p className="text-xs text-slate-600">Veilige betaling voor opdrachtgevers &amp; zekerheid voor professionals. Status: concept.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">Q3</span>
                <div>
                  <p className="font-semibold">Compliance-dashboard &amp; DBA-checker (2026)</p>
                  <p className="text-xs text-slate-600">Visuele indicatoren of een samenwerking binnen de wettelijke kaders valt. Status: concept.</p>
                </div>
              </li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">Statuslabels: in ontwikkeling, planning, concept. Feedback bepaalt prioriteit.</p>
          </section>

          <section className="rounded-3xl border border-brand-100 bg-white/90 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-brand-800">Kennis en hulpmiddelen</h2>
            <p className="mt-2 text-slate-700">
              Gebruik onze bronnen om tarieven te onderbouwen, DBA-risico te beperken en certificaten slim te beheren.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {knowledgeResources.map(resource => (
                <article key={resource.label} className="flex h-full flex-col justify-between rounded-2xl border border-brand-100 bg-white/90 p-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{resource.label}</h3>
                    <p className="mt-2 text-sm text-slate-700">{resource.description}</p>
                  </div>
                  <Link
                    href={resource.href}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
                  >
                    Lees meer
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section
            id="tarief-calculator-home"
            className="space-y-4 rounded-3xl border border-brand-100 bg-brand-50/70 p-6 shadow-sm sm:p-8"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-brand-800">Reken zelf je tarief door</h2>
              <p className="text-sm text-slate-700">
                Gebruik de calculator hieronder voor een snelle indicatie en klik door naar de stadspagina voor meer scenario’s.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-4">
              <CostCalculator initialCity="amsterdam" />
            </div>
            <p className="text-xs text-slate-500">
              Deze calculator toont voorbeeldverdelingen. Elke opdracht stem je samen af op certificaten, risico en beschikbaarheid.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Veelgestelde vragen</h2>
            <div className="mt-5 space-y-4">
              {faqEntries.map(item => (
                <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-900 group-open:text-brand-700">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
                </details>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/zzp/aanmelden"
                className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-700/90"
              >
                Meld je aan als professional
              </Link>
              <Link
                href="/opdrachtgevers"
                className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
              >
                Meer voor opdrachtgevers
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-brand-100 bg-white/85 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Denk met ons mee</h2>
            <p className="mt-2 text-sm text-slate-700">
              Heb jij ideeën om het spanningsveld tussen inflatie, DBA en veiligheid eerlijker te maken? Deel je inzichten zodat we onze roadmap blijven voeden met praktijkervaringen.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="mailto:info@chronosolutions.nl"
                className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-700/90"
              >
                Stuur je feedback
              </Link>
              <Link
                href="/manifest#community"
                className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
              >
                Bekijk hoe we samenwerken
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
