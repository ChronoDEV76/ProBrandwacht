import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Voor Opdrachtgevers | ProBrandwacht.nl',
  description:
    'Brandwachten inhuren zonder gedoe of verborgen kosten. Transparant tarief, gecertificeerde professionals en escrow-betaling via ProSafetyMatch.',
  alternates: { canonical: '/opdrachtgevers' },
  openGraph: {
    title: 'Voor Opdrachtgevers | ProBrandwacht.nl',
    description:
      'Brandwachten inhuren zonder gedoe of verborgen kosten. Transparant tarief, gecertificeerde professionals en escrow-betaling via ProSafetyMatch.',
    url: 'https://probrandwacht.nl/opdrachtgevers',
    type: 'website',
  },
}

function JSONLD({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function VoorOpdrachtgeversPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wat kost een brandwacht via ProSafetyMatch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Gemiddeld €40–60 per uur. Je ziet altijd de volledige kostenopbouw en voorkomt de hoge marges van traditionele bureaus.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe weet ik dat ik een betrouwbare professional krijg?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Wij controleren certificaten en reviews, zodat je met de juiste professional samenwerkt. Alleen gecertificeerde brandwachten krijgen toegang.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan ik nu al een brandwacht boeken?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'We werken aan de livegang van ProSafetyMatch. Meld je aan voor de wachtlijst en krijg als eerste toegang zodra we starten.',
        },
      },
    ],
  }

  return (
    <>
      <JSONLD data={faqSchema} />
      <section className="mx-auto max-w-5xl px-4 py-12">
        {/* Hero */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Brandwachten inhuren zonder gedoe of verborgen kosten
          </h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            Via ProSafetyMatch huur je direct zzp-brandwachten in, met volledige transparantie over kosten en certificaten. Snel inzetbaar voor{' '}
            <strong>evenementen</strong>, <strong>bouw</strong> en <strong>industrie</strong>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/faq"
              className="rounded-2xl border px-5 py-3 text-slate-700 hover:bg-slate-50"
            >
              Bekijk veelgestelde vragen
            </a>
          </div>
        </header>

        {/* Voordelen */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">Transparant tarief</h3>
            <p className="mt-2 text-sm text-slate-700">
              Geen verborgen marges. Je ziet exact: jouw betaling, het netto-bedrag voor de brandwacht en de platformfee.
            </p>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">Snelle beschikbaarheid</h3>
            <p className="mt-2 text-sm text-slate-700">
              Binnen enkele uren een gecertificeerde brandwacht op locatie. Ideaal voor spoedklussen of tijdelijke bezetting.
            </p>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">Gecertificeerde & geverifieerde professionals</h3>
            <p className="mt-2 text-sm text-slate-700">
              Certificaten (BHV, VCA, EHBO, Manschap A/B) worden vooraf gecontroleerd. Identiteit en referenties worden geverifieerd, zodat altijd duidelijk is wie je op de werkvloer haalt.
            </p>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">Escrow-betaling = zekerheid</h3>
            <p className="mt-2 text-sm text-slate-700">
              Betaal vooraf in escrow; uitbetaling volgt na goedkeuring van de opdracht. Bescherming voor opdrachtgever én professional.
            </p>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">Favorieten & continuïteit</h3>
            <p className="mt-2 text-sm text-slate-700">
              Werk vaker samen met favoriete brandwachten. Zo bouw je aan een gemotiveerd en betrouwbaar team.
            </p>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">DBA-proof & compliance</h3>
            <p className="mt-2 text-sm text-slate-700">
              Standaard overeenkomsten en documentatie die passen binnen de DBA. Minder risico, meer zekerheid.
            </p>
          </div>
        </section>

        {/* Sectie: Hoe het werkt */}
        <section className="mt-14 rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Zo werkt het</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-700">
            <li>
              <strong>Aanmelden</strong> – maak een bedrijfsaccount aan en beschrijf je opdracht.
            </li>
            <li>
              <strong>Match & selectie</strong> – bekijk profielen, certificaten en reviews. Kies wie het beste past.
            </li>
            <li>
              <strong>Escrow & uitvoering</strong> – betaal veilig via escrow; de brandwacht start volgens afspraak.
            </li>
            <li>
              <strong>Beoordeling & vervolg</strong> – rond af, laat een review achter en voeg toe aan je favorieten voor herhaalopdrachten.
            </li>
          </ol>
          <div className="mt-6 text-sm text-slate-600">
            Klaar voor transparante inzet? Gebruik onderstaande link om je direct aan te melden voor de wachtlijst.
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold">Veelgestelde vragen</h2>
          <div className="mt-4 divide-y rounded-2xl border">
            <details className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                Wat kost een brandwacht via ProSafetyMatch?
                <span className="text-slate-400 group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-slate-700">
                Gemiddeld tussen <strong>€40–60 per uur</strong>. Je ziet altijd de volledige kostenopbouw: betaling opdrachtgever, netto-vergoeding voor de brandwacht en platformfee.
              </p>
            </details>
            <details className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                Hoe weet ik dat ik een betrouwbare professional krijg?
                <span className="text-slate-400 group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-slate-700">
                Certificaten en identiteit worden gecontroleerd. Je ziet beoordelingen van eerdere opdrachten en kunt favorieten opslaan.
              </p>
            </details>
            <details className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                Kan ik nu al boeken?
                <span className="text-slate-400 group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-slate-700">
                We bereiden de livegang van ProSafetyMatch voor. Meld je aan voor de wachtlijst en krijg als eerste toegang zodra we starten.
              </p>
            </details>
          </div>
        </section>

        {/* CTA slot */}
        <section className="mt-14 rounded-2xl bg-slate-50 p-6">
          <h2 className="text-xl font-semibold">Ervaar het verschil</h2>
          <p className="mt-2 max-w-3xl text-slate-700">
            Transparantie, zekerheid en snelheid — zonder verborgen marges. Sluit je vandaag aan en ontvang een uitnodiging zodra we live zijn.
          </p>
          <a
            href="https://forms.gle/3BXxU64yyxnfvrLN8"
            className="mt-4 inline-block rounded-2xl bg-brand-700 px-5 py-3 text-white shadow hover:bg-brand-500"
          >
            Meld je aan voor de wachtlijst
          </a>
        </section>
      </section>
    </>
  )
}
