import Link from 'next/link'
import type { Metadata } from 'next'
import { getSignupUrl } from '@/lib/config'

export const metadata: Metadata = {
  title: 'ZZP brandwacht inhuren | ProBrandwacht.nl',
  description:
    'Meld je aan als zzp-brandwacht. Eerlijk tarief, escrow-betaling en DBA-proof samenwerken via ProSafetyMatch.',
  keywords: [
    'brandwacht platform',
    'brandwacht inhuren',
    'brandwacht tarieven',
    'escrow brandwacht',
    'probrandwacht',
  ],
  alternates: { canonical: '/', languages: { 'nl-NL': '/' } },
  other: { hreflang: 'nl-NL' },
  openGraph: {
    title: 'ZZP brandwacht inhuren | ProBrandwacht.nl',
    description:
      'Meld je aan als zzp-brandwacht. Eerlijk tarief, escrow-betaling en DBA-proof samenwerken via ProSafetyMatch.',
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

const heroBenefits = [
  {
    icon: '💶',
    text: 'Stel je eigen tarief en zie vooraf wat de opdrachtgever betaalt.',
  },
  {
    icon: '🔒',
    text: 'Escrow zorgt dat je na iedere klus zeker wordt uitbetaald.',
  },
  {
    icon: '📑',
    text: 'Certificaten en beschikbaarheid zijn direct zichtbaar voor extra opdrachten.',
  },
]

const problemModels = [
  {
    title: 'Traditioneel bureau',
    subtitle: 'Voorbeeldtarief: jij ontvangt €30/u',
    total: 50,
    segments: [
      { label: 'Bureau €20', amount: 20, className: 'bg-slate-300 text-slate-800' },
      { label: 'Brandwacht €30', amount: 30, className: 'bg-brand-500/90 text-white' },
    ],
  },
  {
    title: 'ProSafetyMatch (binnenkort)',
    subtitle: 'Voorbeeldtarief: jij ontvangt €40,50/u',
    total: 45,
    segments: [
      { label: 'Platform €4,50', amount: 4.5, className: 'bg-emerald-300 text-slate-900' },
      { label: 'Brandwacht €40,50', amount: 40.5, className: 'bg-brand-500/90 text-white' },
    ],
  },
]

const solutionFeatures = [
  {
    icon: '💶',
    title: 'Tarief zonder verrassingen',
    description: 'Het platform toont realtime wat de opdrachtgever betaalt en wat jij ontvangt.',
  },
  {
    icon: '🔒',
    title: 'Escrow-betalingen',
    description: 'Opdrachtgevers storten vooraf in escrow; jij wordt automatisch uitbetaald na oplevering.',
  },
  {
    icon: '📑',
    title: 'Certificaten centraal',
    description: 'Upload certificaten bij voorkeur als PDF. Gebruik je toch PNG of JPG, dan dienen die enkel ter controle. Houd je bestanden actueel zodat opdrachtgevers direct zien wat je in huis hebt.',
  },
]

const steps = [
  {
    title: 'Aanmelden',
    text: 'Vul gratis je gegevens in, upload certificaten en sluit je aan bij de eerste lichting brandwachten.',
  },
  {
    title: 'Updates ontvangen',
    text: 'Ontvang pilots, feedbacksessies en de roadmap van ProSafetyMatch rechtstreeks in je inbox.',
  },
  {
    title: 'Aan de slag',
    text: 'Krijg eerlijke opdrachten met vaste uitbetaling zodra het platform live is.',
  },
]

const faqItems = [
  {
    question: 'Hoeveel verdien ik straks via ProSafetyMatch?',
    answer:
      'Jij bepaalt je tarief en ontvangt 90% van het opdrachtbedrag rechtstreeks. Betaalt de opdrachtgever €45? Dan krijg jij €40,50 en houden wij 10% (€4,50) als platformfee voor community, support en matching. Daarbovenop rekenen we 1–2% escrowkosten voor rekening van de opdrachtgever zodat betalingen veilig en op tijd verlopen.',
  },
  {
    question: 'Hoe werkt escrow?',
    answer:
      'De opdrachtgever stort de gehele opdracht vooruit op een beveiligde rekening. Zodra jij de klus afrondt, wordt de betaling automatisch vrijgegeven. Zo heb je vooraf zekerheid dat het geld er is.',
  },
]

export default function HomePage() {
  const signupUrl = getSignupUrl()
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
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
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8 pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-20 lg:pb-24 space-y-12">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          {/* Hero */}
          <header className="space-y-6">
            <p className="text-sm uppercase tracking-wide text-brand-600">Voor zzp-brandwachten</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
              Verdien wat je waard bent – zonder bureau-marges.
            </h1>
            <p className="text-lg font-medium text-brand-700">
              Platform voor zzp-brandwachten in bouw, industrie en evenementen. Eerlijk, DBA-proof en met escrow-betaling.
            </p>
            <p className="text-slate-700 max-w-2xl">
              Sluit je aan bij ProSafetyMatch en werk rechtstreeks met opdrachtgevers. Alles over tarief, betaling en certificaten is helder. Lees op onze missiepagina wat je verder kunt verwachten.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
              >
                Meld je nu aan als zzp’er
              </a>
              <Link
                href="/manifest"
                className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Lees de volledige missie →
              </Link>
              <Link
                href="/opdrachtgevers"
                className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
              >
                Ook voor opdrachtgevers →
              </Link>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3 text-sm text-slate-700">
              {heroBenefits.map(benefit => (
                <li
                  key={benefit.text}
                  className="flex items-start gap-3 rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200"
                >
                  <span className="text-xl" aria-hidden="true">
                    {benefit.icon}
                  </span>
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500">
              Al meer dan <strong>100 brandwachten</strong> hebben zich aangemeld en uploaden hun certificaten voor een profiel op ProSafetyMatch.
            </p>
            <p className="text-sm text-slate-500">
              Meer weten? Bekijk onze <Link className="underline" href="/faq">brandwacht inhuren FAQ</Link> of lees de blog <Link className="underline" href="/blog/wat-kost-een-brandwacht-in-2025">Wat kost een brandwacht in 2025</Link>.
            </p>
          </header>

          {/* Vergelijking */}
          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-brand-600">Waarom dit loont</p>
              <h2 className="text-2xl font-semibold">Zo houd jij meer over per uur</h2>
              <p className="text-slate-700 max-w-3xl">
                Zzp-brandwachten leveren het werk, maar zien hun tarief verdampen door hoge bureau-marges
                en late betalingen. Met ProSafetyMatch zie je vooraf precies wat er binnenkomt en wat er
                af gaat.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {problemModels.map(model => (
                <article
                  key={model.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{model.title}</h3>
                    <p className="text-sm text-slate-600">{model.subtitle}</p>
                  </div>
                  <div className="overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <div className="flex h-10">
                      {model.segments.map(segment => (
                        <div
                          key={segment.label}
                          className={`flex items-center justify-center text-xs font-medium ${segment.className}`}
                          style={{ width: `${(segment.amount / model.total) * 100}%` }}
                          aria-label={segment.label}
                        >
                          {segment.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-xs text-slate-400">
              Bedragen zijn indicatief om het verschil in marges te tonen. Jij stelt altijd zelf je definitieve tarief vast.
            </p>
            <div>
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
              >
                Meld je nu aan als zzp’er
              </a>
            </div>
          </section>

         {/* Oplossing */}
          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-brand-600">Oplossing</p>
              <h2 className="text-2xl font-semibold">Zo lossen wij het voor jou op</h2>
              <p className="text-slate-700 max-w-3xl">
                ProSafetyMatch wordt je digitale backoffice: wij regelen eerlijke contracten, veilige
                betalingen en zichtbaarheid bij opdrachtgevers. Jij doet het werk, wij halen de frictie weg.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {solutionFeatures.map(feature => (
                <article
                  key={feature.title}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-5 text-sm shadow-sm"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {feature.icon}
                  </span>
                  <p className="text-base font-semibold text-slate-900">{feature.title}</p>
                  <p className="text-slate-700">{feature.description}</p>
                </article>
              ))}
            </div>
            <div>
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
              >
                Meld je nu aan als zzp’er
              </a>
            </div>
          </section>

          {/* Zo bouw je mee */}
          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-brand-600">Start vandaag</p>
              <h2 className="text-2xl font-semibold">Zo bouw je mee aan het platform</h2>
              <p className="text-slate-700 max-w-3xl">
                Jij krijgt als eerste toegang, denkt mee over de roadmap en bouwt mee aan een eerlijker
                markt. We houden je stap voor stap op de hoogte.
              </p>
            </div>
            <ul className="grid gap-3 md:grid-cols-3">
              {steps.map(step => (
                <li key={step.title} className="rounded-lg border bg-white p-4 text-sm shadow-sm">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-slate-600 mt-1">{step.text}</p>
                </li>
              ))}
            </ul>
            <div>
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
              >
                Meld je nu aan als zzp’er
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <div className="space-y-3">
            <p className="text-sm uppercase tracking-wide text-brand-600">FAQ</p>
            <h2 className="text-2xl font-semibold">Veelgestelde vragen van zzp-brandwachten</h2>
            <p className="text-slate-700 max-w-3xl">
              Geen marketingpraat, wel heldere antwoorden op de vragen die we dagelijks krijgen van
              brandwachten die willen overstappen.
            </p>
            <p className="text-sm text-slate-500">
              ProSafetyMatch is géén bemiddelingsbureau. Wij faciliteren het platform – profielen, escrow-betalingen en certificaatbeheer – maar de overeenkomst sluit je altijd rechtstreeks met de opdrachtgever of professional. Dat sluit aan bij DBA-proof werken. Gegevens worden versleuteld opgeslagen; alleen jij en geverifieerde opdrachtgevers zien je certificaten.
            </p>
            <p className="text-sm font-medium text-brand-700">
              Inmiddels hebben <strong>100+ brandwachten</strong> certificaten geüpload en bouwen ze hun profiel op. Meld je aan en sluit je bij hen aan.
            </p>
          </div>
            <div className="space-y-4">
              {faqItems.map(item => (
                <div key={item.question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
                  <p className="mt-2 text-slate-700">{item.answer}</p>
                </div>
              ))}
            </div>
            <div>
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
              >
                Meld je nu aan als zzp’er
              </a>
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border border-brand-200 bg-brand-50/70 p-5 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <span className="text-xl" aria-hidden="true">
                ⚖️
              </span>
              <div className="space-y-2">
                <h2 className="text-base font-semibold text-brand-700">Hoe we samenwerken</h2>
                <p>
                  ProSafetyMatch is géén bemiddelingsbureau. Wij bieden het platform – profielen, escrow-betalingen, certificaatbeheer en communicatie – maar de overeenkomst sluit je altijd rechtstreeks met de opdrachtgever of professional. Daarmee blijft het model DBA-proof: jij werkt zelfstandig, met eerlijke afspraken.
                </p>
                <p>
                  Certificaten worden versleuteld opgeslagen. Alleen jij en opdrachtgevers die je uitnodigt krijgen inzage en we verwijderen tijdelijke uploads (PNG/JPG) na verificatie.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
