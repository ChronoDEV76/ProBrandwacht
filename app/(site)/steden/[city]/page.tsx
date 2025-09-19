import CostCalculator from '@/components/CostCalculator'
import Link from 'next/link'
import { getSignupUrl } from '@/lib/config'
import { DEFAULT_TARIFFS, type CityKey } from '@/lib/tariffs'

const CITY_LABEL: Record<CityKey, string> = {
  amsterdam: 'Amsterdam',
  rotterdam: 'Rotterdam',
  'den-haag': 'Den Haag',
  utrecht: 'Utrecht',
  industrie: 'Industrieel (algemeen)',
}

export function generateStaticParams() {
  return [
    { city: 'amsterdam' },
    { city: 'rotterdam' },
    { city: 'den-haag' },
    { city: 'utrecht' },
  ]
}

export default function CityPage({ params }: { params: { city: CityKey } }) {
  const city = params.city
  const label = CITY_LABEL[city]
  const ranges = DEFAULT_TARIFFS[city]
  const signupUrl = getSignupUrl()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Brandwacht inhuren in {label}</h1>
        <p className="mt-2 text-slate-700">
          Indicatieve bandbreedtes en een rekenhulpmiddel om de kostenopbouw te bekijken. Afstemmen doe je altijd samen
          met de professional.
        </p>
      </header>

      <section className="mb-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          ProSafetyMatch bepaalt geen tarieven. Gebruik de bandbreedtes als vertrekpunt en vul in de calculator het tarief
          in dat jullie zelf afspreken. De fee- en escrowberekening blijft gelijk zodat iedereen hetzelfde inzicht heeft.
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Adviesranges</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border p-4">
            <div className="text-sm text-slate-600">Evenementen / Bouw</div>
            <div className="text-2xl font-semibold">
              € {ranges.standaard.min}–€ {ranges.standaard.max} /u
            </div>
          </div>
          {ranges.industrie && (
            <div className="rounded-2xl border p-4">
              <div className="text-sm text-slate-600">Industrie / Petrochemie</div>
              <div className="text-2xl font-semibold">
                € {ranges.industrie.min}–€ {ranges.industrie.max} /u
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-10">
        <CostCalculator initialCity={city} />
      </section>

      <section className="mt-6 rounded-2xl bg-slate-50 p-6">
        <h3 className="text-lg font-semibold">Voorbeeldcase</h3>
        <p className="mt-2 text-slate-700">
          {label}: stel dat je een gecertificeerde brandwacht (BHV/VCA) zoekt voor laswerkzaamheden. Met de calculator
          hierboven vul je het afgesproken uurtarief in en zie je meteen hoe platformfee en escrow uitpakken.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-brand-700 px-5 py-3 text-white hover:bg-brand-500"
          >
            Start met een proefopdracht
          </a>
          <Link href="/opdrachtgevers" className="rounded-2xl border px-5 py-3 hover:bg-white">
            Lees meer voordelen
          </Link>
        </div>
      </section>
    </main>
  )
}
