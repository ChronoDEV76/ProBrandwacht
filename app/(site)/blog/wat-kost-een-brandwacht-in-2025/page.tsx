import type { Metadata } from 'next'
import CostCalculator from '@/components/CostCalculator'
import { getSignupUrl } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Wat kost een brandwacht in 2025? | ProBrandwacht.nl',
  description:
    'Indicatieve bandbreedtes voor brandwacht-tarieven in 2025. Opdrachtgever en zzp’er bepalen samen het tarief; wij laten alleen de kostenopbouw met fee en escrow zien.',
  alternates: { canonical: '/blog/wat-kost-een-brandwacht-in-2025' },
  openGraph: {
    title: 'Wat kost een brandwacht in 2025? | ProBrandwacht.nl',
    description:
      'Indicatieve uurtarieven per stad (Amsterdam, Rotterdam, Den Haag, Utrecht) en industrie. Inclusief tariefcalculator en rekenvoorbeelden.',
    url: 'https://www.probrandwacht.nl/blog/wat-kost-een-brandwacht-in-2025',
    type: 'article',
  },
}

export default function BlogKosten2025Page() {
  const signupUrl = getSignupUrl()
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Wat kost een brandwacht in 2025?</h1>
          <p className="mt-2 text-slate-700">
            Tarieven verschillen per regio en risicoprofiel. Hieronder vind je marktobservaties én een rekenhulpmiddel
            dat laat zien hoe platformfee en escrow worden opgebouwd. Het zijn voorbeelden: de uiteindelijke prijs stem je
            altijd af tussen opdrachtgever en professional.
          </p>
        </header>

        <section className="mb-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-medium">Belangrijk:</p>
            <p>
              ProSafetyMatch stelt geen tarieven vast. Opdrachtgever en zzp-brandwacht bepalen samen wat past bij de
              opdracht. De bedragen hieronder zijn bandbreedtes uit de markt om het gesprek te starten. De calculator helpt
              alleen om de kostenopbouw inzichtelijk te maken.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold">Veelvoorkomende bandbreedtes (indicatief)</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Stad / Cluster</th>
                  <th className="py-2">Evenementen/Bouw</th>
                  <th className="py-2">Industrie/Petrochemie</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Amsterdam</td>
                  <td className="py-2">€50–€55/u</td>
                  <td className="py-2">€60–€70/u</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Rotterdam</td>
                  <td className="py-2">€48–€53/u</td>
                  <td className="py-2">€62–€75/u</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Den Haag</td>
                  <td className="py-2">€47–€52/u</td>
                  <td className="py-2">€58–€68/u</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Utrecht</td>
                  <td className="py-2">€45–€50/u</td>
                  <td className="py-2">€56–€66/u</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            *Indicatief: hangt af van certificaten, spoed, nacht/weekend, inzetduur en de specifieke wensen van de
            opdrachtgever. Gebruik dit overzicht als startpunt voor jullie eigen tariefafspraak.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold">Welke brandwachten vind je op ProSafetyMatch?</h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-700">
            <li>
              <strong>Repressieve brandwachten</strong> – professionals uit korpsen en veiligheidsregio’s die af en toe
              extra diensten draaien en verzekerd zijn via hun werkgever.
            </li>
            <li>
              <strong>Volledig zzp-brandwachten</strong> – rijksgediplomeerd, vaak met ademlucht/BHV/VCA, kiezen bewust voor
              zelfstandig ondernemen en verwachten eerlijke afspraken.
            </li>
            <li>
              <strong>Industrieel inzetbare brandwachten</strong> – beschikken over petrochemische certificaten en zoeken
              stabiliteit in projecten waar dumpingtarieven juist extra risico opleveren.
            </li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Deze groepen bepalen samen met opdrachtgevers het tarief. Onze rol is om de opbouw inzichtelijk te maken en
            veilige escrow te leveren.
          </p>
        </section>

        <section className="mb-10">
          <CostCalculator />
        </section>

        <section className="mt-8">
          <div className="rounded-2xl bg-slate-50 p-6 text-center">
            <h3 className="text-lg font-semibold">Meer inzicht nodig?</h3>
            <p className="mt-2 text-slate-700">
              Gebruik de calculator als gesprekstool en bepaal samen een passend tarief. ProSafetyMatch zorgt voor
              transparantie, community-updates en veilige escrow.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-brand-700 px-5 py-3 text-white hover:bg-brand-500"
              >
                Start met een proefopdracht
              </a>
              <a
                href="https://forms.gle/PnaujHNoE7ZZSCfQ6"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border px-5 py-3 hover:bg-white"
              >
                Vraag een demo aan
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}
