import Link from 'next/link'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CostCalculator = dynamic(() => import('@/components/cost-calculator'), { ssr: false })
export const metadata: Metadata = {
  title: 'ProBrandwacht.nl | Veiligheid, eerlijk geregeld',
  description:
    'ProBrandwacht is het onafhankelijke platform dat brandwachten en opdrachtgevers begeleidt naar transparante tarieven, DBA-proof afspraken en directe samenwerking via ProSafetyMatch.',
  keywords: [
    'probrandwacht',
    'prosafetymatch',
    'brandwacht platform',
    'brandwacht inhuren',
    'zzp brandwacht',
    'dba brandwacht',
    'escrow brandwacht',
    'transparante brandwacht tarieven',
  ],
  alternates: { canonical: '/', languages: { 'nl-NL': '/' } },
  other: { hreflang: 'nl-NL' },
  openGraph: {
    title: 'ProBrandwacht.nl | Veiligheid, eerlijk geregeld',
    description:
      'Bewustwording, transparantie en digitale onafhankelijkheid voor brandwachten en opdrachtgevers. Powered by ProSafetyMatch.',
    url: 'https://www.probrandwacht.nl/',
    images: [{ url: '/og-home.jpg', width: 1200, height: 630, alt: 'ProBrandwacht platform overzicht' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProBrandwacht',
    creator: '@ProBrandwacht',
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

const trustSignals = [
  { metric: '120+', label: 'Geverifieerde brandwachten in aanmelding' },
  { metric: '45', label: 'Opdrachtgevers in onboarding voor pilots' },
  { metric: '10%', label: 'Platformfee, altijd vooraf inzichtelijk' },
  { metric: '1-2%', label: 'Escrowkosten voor rekening van de opdrachtgever' },
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
    href: '/faq#certificaten',
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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntries.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <div className="relative w-full bg-gradient-to-r from-brand-50 to-white">
      <div className="relative text-slate-900">
        <div className="relative mx-auto max-w-5xl space-y-16 px-4 pb-16 pt-10 sm:px-6 md:px-8 md:pb-24 md:pt-16">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-xs font-medium text-brand-700 shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Platform, geen bemiddelaar - overeenkomst direct tussen opdrachtgever en professional.
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-wide text-brand-700">Voor zzp-brandwachten en opdrachtgevers die transparantie eisen</p>
              <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Veiligheid, maar dan eerlijk geregeld.</h1>
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
              ProSafetyMatch als onafhankelijk platform. Jij en de opdrachtgever behouden volledige regie over afspraken en uitvoering.
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

          <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Vertrouwen met cijfers en bronnen</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-4">
              {trustSignals.map(item => (
                <div key={item.label} className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4 text-center">
                  <p className="text-2xl font-semibold text-brand-800">{item.metric}</p>
                  <p className="mt-2 text-xs text-slate-700">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {partnerBadges.map(label => (
                <span key={label} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                  {label}
                </span>
              ))}
            </div>
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
        </div>
      </div>
    </div>
  )
}
