import Link from 'next/link'
import type { Metadata } from 'next'
import { coreCities } from '@/lib/cities'
import { authoritativeSources } from '@/lib/seo/authoritative-sources'

export const metadata: Metadata = {
  title: 'ZZP brandwacht inhuren | ProBrandwacht.nl',
  description:
    'Meld je aan als zzp-brandwacht. Vergelijk traditionele bureauconstructies met een transparant zzp-brandwacht tarief, escrow-betaling en DBA-proof overeenkomsten via ProSafetyMatch.',
  keywords: [
    'brandwacht gezocht zzp',
    'brandwacht huren',
    'brandwacht zzp',
    'brandwacht salaris',
    'brandwacht kosten',
    'brandwacht industriële',
    'brandwacht tarieven',
    'brandwacht werk',
    'brandwacht platform',
    'brandwacht inhuren',
    'zzp brandwacht inhuren',
    'brandwacht tarieven',
    'escrow brandwacht',
    'probrandwacht',
  ],
  alternates: { canonical: '/', languages: { 'nl-NL': '/' } },
  other: { hreflang: 'nl-NL' },
  openGraph: {
    title: 'ZZP brandwacht inhuren | ProBrandwacht.nl',
    description:
      'Meld je aan als zzp-brandwacht. Vergelijk bestaande bureauconstructies met een eerlijk alternatief via ProSafetyMatch.',
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
    icon: '⚡',
    text: 'Match en start sneller dankzij directe profielen en escrow-uitbetaling.',
  },
  {
    icon: '🧭',
    text: 'Blijf ondernemer: jij beslist waar en wanneer je werkt, wij regelen de administratie.',
  },
]

const problemModels = [
  {
    title: 'Traditioneel model met tussenpartij',
    subtitle: 'Voorbeeld: opdrachtgever betaalt €50/u, na marge blijft €30/u over',
    total: 50,
    segments: [
      { label: 'Tussenpartij €20', amount: 20, className: 'bg-slate-300 text-slate-800' },
      { label: 'Brandwacht €30', amount: 30, className: 'bg-brand-500/90 text-white' },
    ],
  },
  {
    title: 'Directe afspraak via ProSafetyMatch',
    subtitle: 'Voorbeeld: jullie spreken €45/u af, jij ontvangt €40,50/u',
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
    description: 'Jij en de opdrachtgever bepalen het tarief; wij tonen realtime de verdeling en fee.',
  },
  {
    icon: '⚡',
    title: 'Sneller aan het werk',
    description: 'Aanmelden, documenten uploaden en matchen kan in minuten. Geen tussenlaag die de planning vertraagt.',
  },
  {
    icon: '📑',
    title: 'Certificaten centraal',
    description: 'Upload certificaten bij voorkeur als PDF. Gebruik je toch PNG of JPG, dan dienen die enkel ter controle en verwijderen we ze na verificatie. We checken documenten minimaal jaarlijks zodat opdrachtgevers direct zien wat je in huis hebt.',
  },
]

const audienceProfiles = [
  {
    title: 'Repressieve brandwachten',
    description:
      'Werken bij korps of veiligheidsregio en draaien af en toe een extra dienst. Ze brengen operationele ervaring mee.',
  },
  {
    title: 'Volledig zzp-brandwachten',
    description:
      'Rijksgediplomeerd, vaak met ademlucht en BHV/VCA. Ze kiezen bewust voor zzp en zoeken eerlijke, direct te sluiten afspraken zonder verborgen marges.',
  },
  {
    title: 'Industrieel inzetbare brandwachten',
    description:
      'Beschikken over industriecertificaten en projectervaring. De juiste prijsafspraak zorgt voor motivatie en continuïteit op risicolocaties.',
  },
]

const steps = [
  {
    title: 'Snelle aanmelding',
    text: 'Vul gratis je gegevens in, upload certificaten en krijg binnen enkele minuten je eerste profiel online.',
  },
  {
    title: 'Updates ontvangen',
    text: 'Ontvang pilots, feedbacksessies en de roadmap van ProSafetyMatch rechtstreeks in je inbox.',
  },
  {
    title: 'Aan de slag',
    text: 'Krijg eerlijke opdrachten, directe betaling en behoud je ondernemersvrijheid zodra het platform live is.',
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

const keyCities = coreCities
const highlightedSources = authoritativeSources.slice(0, 4)

export default function HomePage() {
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
              ZZP-brandwacht tarief zonder verborgen marge.
            </h1>
            <p className="text-lg font-medium text-brand-700">
              Geen tussenpersoon, wél transparante uurtarieven, escrow-betaling en DBA-proof afspraken.
            </p>
            <p className="text-slate-700 max-w-2xl">
              Jij bepaalt je tarief, wij faciliteren de infrastructuur: escrow, certificaten, compliance en directe matching. Binnen minuten staat straks je profiel live en ben je inzetbaar zonder eindeloos wachten op een tussenpartij.
            </p>
            <p className="text-slate-700 max-w-2xl">
              Zo vergelijk je eenvoudig met bestaande bureauconstructies, beweeg je sneller van aanvraag naar inzet en blijf je ondernemer met eigen regie. Alle berekeningen sluiten aan op officiële cijfers van CBS, KVK, Belastingdienst en FNV.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://forms.gle/fAChpLDNSJWRBHDC7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
              >
                Sluit je aan bij de ploeg die de norm herschrijft
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
            <nav aria-label="Populaire steden" className="text-sm text-slate-600">
              <p className="font-medium text-slate-700">Brandwacht inhuren in jouw regio</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {keyCities.map(city => (
                  <li key={city.slug}>
                    <Link
                      href={`/brandwacht-inhuren/${city.slug}`}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 transition hover:bg-brand-50 hover:text-brand-700"
                    >
                      Brandwacht inhuren {city.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/blog/wat-kost-een-brandwacht-in-2025"
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 transition hover:bg-brand-50 hover:text-brand-700"
                  >
                    Bekijk tariefuitleg →
                  </Link>
                </li>
              </ul>
            </nav>
            <p className="text-sm text-slate-500">
              Al meer dan <strong>100 brandwachten</strong> hebben zich aangemeld en uploaden hun certificaten voor een profiel op ProSafetyMatch.
            </p>
            <p className="text-sm text-slate-500">
              Meer weten? Bekijk onze <Link className="underline" href="/faq">brandwacht inhuren FAQ</Link> of lees de blog <Link className="underline" href="/blog/wat-kost-een-brandwacht-in-2025">Wat kost een brandwacht in 2025</Link>.
            </p>
          </header>

          <section className="rounded-3xl border border-brand-100 bg-brand-50/60 p-5 text-sm text-brand-800">
            <p className="font-semibold">Onze rol als platform</p>
            <p className="mt-1">
              We zijn geen bureau en geen tariefbepaler. We kennen de pijn van laat betaalde diensten en onzichtbare marges. Op ProSafetyMatch kies jij, reageert de opdrachtgever direct en zorgen wij voor een eerlijke verdeling, escrow en documentatie – zonder iets op te leggen, wel door alles helder te maken.
            </p>
          </section>

          {/* Vergelijking */}
          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-brand-600">Waarom dit loont</p>
              <h2 className="text-2xl font-semibold">Zo houd jij meer over per uur</h2>
              <p className="text-slate-700 max-w-3xl">
                In traditionele modellen gaat een deel van het uurtarief op aan tussenpartijen en wisselende
                betaaltermijnen. Met ProSafetyMatch zie je vooraf precies wat er binnenkomt, welke kosten
                daarbij horen en wat er netto overblijft – en je hoeft niet langer te wachten op een bureau om te starten.
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
              href="https://forms.gle/fAChpLDNSJWRBHDC7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
            >
              Sluit je aan bij de ploeg die de norm herschrijft
            </a>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-brand-800">Onderbouwd met officiële bronnen</h2>
          <p className="text-sm text-slate-700">
            We gebruiken data van CBS, KVK, Belastingdienst, FNV en andere autoriteiten voor onze tariefbandbreedtes,
            escrowpercentages en DBA-proof documenten. Daarmee bewijs je richting opdrachtgevers en inspecties dat jouw
            zzp-brandwacht tarief marktconform en transparant is.
          </p>
          <ul className="grid gap-4 md:grid-cols-2">
            {highlightedSources.map(source => (
              <li key={source.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">{source.title}</p>
                <p className="mt-1 text-xs text-slate-600">{source.description}</p>
                <ul className="mt-2 space-y-1">
                  {source.links.map(link => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-brand-700 underline hover:text-brand-800"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500">
            Alle bronnen op één plek? Bekijk de volledige lijst voor copywriters en marketeers op{' '}
            <Link href="/seo-resources" className="font-medium text-brand-700 underline hover:text-brand-800">
              autoritaire bronnen voor brandwachtcontent
            </Link>
            .
          </p>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-brand-600">Voor wie</p>
              <h2 className="text-2xl font-semibold">Drie groepen brandwachten, één platform</h2>
              <p className="text-slate-700 max-w-3xl">
                De markt is divers. We brengen iedereen bij elkaar en maken zichtbaar wat iemand meebrengt, zonder dat
                we tarieven opleggen.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {audienceProfiles.map(profile => (
                <article key={profile.title} className="rounded-2xl border bg-white p-5 text-sm shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900">{profile.title}</h3>
                  <p className="mt-2 text-slate-700">{profile.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Waarom inzicht in modellen het verschil maakt</h2>
            <p className="text-slate-700 max-w-3xl">
              Een tarief van €30/u kan goed voelen, maar zonder eerlijk zicht op de verdeling is het lastig om motivatie en
              continuïteit hoog te houden. Onze aanpak: jij en de opdrachtgever kiezen het tarief, terwijl wij de
              verdeling helder maken, betalingen via escrow zeker stellen en je ondernemersvrijheid beschermen.
            </p>
            <ul className="grid gap-3 md:grid-cols-3 text-sm text-slate-700">
              <li className="rounded-2xl border bg-white p-4 shadow-sm">
                <strong>Motivatie blijft hoger.</strong> Eerlijke afspraken zorgen dat professionals hun volledige
                aandacht bij de klus houden.
              </li>
              <li className="rounded-2xl border bg-white p-4 shadow-sm">
                <strong>Minder risico voor opdrachtgevers.</strong> Certificaten, escrow en duidelijke verwachtingen
                verkleinen kans op fouten of uitval.
              </li>
              <li className="rounded-2xl border bg-white p-4 shadow-sm">
                <strong>Continuïteit op de werkvloer.</strong> Wie goed wordt beloond, keert terug en bouwt kennis op van
                jouw locaties.
              </li>
            </ul>
          </section>

         {/* Oplossing */}
          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-brand-600">Oplossing</p>
              <h2 className="text-2xl font-semibold">Zo lossen wij het voor jou op</h2>
              <p className="text-slate-700 max-w-3xl">
                ProSafetyMatch wordt je digitale backoffice: jullie spreken het tarief af, wij laten realtime zien hoe
                opdrachtgeverstarief, fee en netto uitbetaling zich tot elkaar verhouden. Met escrow, documenten en
                dashboards blijft alles veilig en zichtbaar.
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
            href="https://forms.gle/fAChpLDNSJWRBHDC7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
          >
            Sluit je aan bij de ploeg die de norm herschrijft
          </a>
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-brand-600">Eerlijke cijfers</p>
              <h2 className="text-2xl font-semibold">Zo ziet een eerlijke tariefopbouw eruit</h2>
              <p className="text-slate-700 max-w-3xl">
                Opdrachtgever en zzp’er vullen samen het afgesproken tarief in. Onze tools tonen direct wat er met iedere
                euro gebeurt. Geen verrassingen achteraf, wel bewijs dat kwaliteit eerlijk wordt beloond.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-4 text-sm text-slate-700">
              <div className="rounded-2xl border bg-white p-4">
                <p className="font-semibold text-slate-900">Opdrachtgever kiest</p>
                <p className="mt-1">Bijvoorbeeld €52/u voor 8 uur inzet.</p>
              </div>
              <div className="rounded-2xl border bg-white p-4">
                <p className="font-semibold text-slate-900">Fee zichtbaar</p>
                <p className="mt-1">10% platformfee = €41,60. Iedereen ziet dezelfde regel.</p>
              </div>
              <div className="rounded-2xl border bg-white p-4">
                <p className="font-semibold text-slate-900">Netto voor zzp’er</p>
                <p className="mt-1">€46,80/u → motivatie en kwaliteit blijven hoog.</p>
              </div>
              <div className="rounded-2xl border bg-white p-4">
                <p className="font-semibold text-slate-900">Escrow & zekerheid</p>
                <p className="mt-1">1,5% escrow gekoppeld aan oplevering. Geen late betalingen.</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Gebruik de calculator in onze blogs of stadspagina’s om dit zelf in te vullen. Wij stellen geen tarieven vast,
              maar zorgen dat iedereen met dezelfde informatie aan tafel zit.
            </p>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-brand-600">Community & kennis</p>
              <h2 className="text-2xl font-semibold">Samen bouwen aan een eerlijk vak</h2>
              <p className="text-slate-700 max-w-3xl">
                Volledig zzp’ers hebben geen vakbond of collectief. Daarom bouwen we een community voor kennisdeling,
                feedback op platformfeatures en gezamenlijke scholing. Hoe meer input, hoe beter we samen grip houden
                op eerlijke tarieven en afspraken.
              </p>
            </div>
            <ul className="grid gap-3 md:grid-cols-3 text-sm text-slate-700">
              <li className="rounded-2xl border bg-white p-4 shadow-sm">
                <strong>Kennis & blogs.</strong> Regelmatige inzichten over tarieven, certificaten en best practices.
              </li>
              <li className="rounded-2xl border bg-white p-4 shadow-sm">
                <strong>Community-updates.</strong> Zzp’ers denken mee over roadmap, compliance en tooling.
              </li>
              <li className="rounded-2xl border bg-white p-4 shadow-sm">
                <strong>Directe feedbackloop.</strong> Opdrachtgevers en professionals geven input op matching en dashboards.
              </li>
            </ul>
          </section>

          {/* Zo bouw je mee */}
          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-brand-600">Start vandaag</p>
              <h2 className="text-2xl font-semibold">Zo bouw je mee aan het platform</h2>
            <p className="text-slate-700 max-w-3xl">
              Jij krijgt als eerste toegang, denkt mee over de roadmap en bouwt mee aan een eerlijkere
              markt. We houden je stap voor stap op de hoogte en zorgen dat je zonder wachtrij kunt starten zodra nieuwe features live gaan.
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
                href="https://forms.gle/fAChpLDNSJWRBHDC7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
              >
                Sluit je aan bij de ploeg die de norm herschrijft
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
              href="https://forms.gle/fAChpLDNSJWRBHDC7"
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
                  Certificaten worden versleuteld opgeslagen. Alleen jij en opdrachtgevers die je uitnodigt krijgen inzage. We controleren documenten minimaal jaarlijks en verwijderen tijdelijke uploads (PNG/JPG) na verificatie.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
