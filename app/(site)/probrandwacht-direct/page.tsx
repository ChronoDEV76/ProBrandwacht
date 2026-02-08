import type { Metadata } from 'next'
import Link from 'next/link'

import { getRouteMetadata } from '@/lib/seo/metadata'
import { SPOED_UI_ENABLED } from '@/lib/featureFlags'

export const metadata: Metadata = getRouteMetadata('/probrandwacht-direct')

export default function ProBrandwachtDirectPage() {
  const showSpoed = SPOED_UI_ENABLED

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              ProBrandwacht Direct
            </span>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht beschrijft hoe zelfstandige samenwerking werkt, met heldere rolafbakening en
              directe lijnen tussen opdrachtgever en professional.
            </p>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht biedt context en maakt zichtbaar welke vragen vooraf helder moeten zijn, zodat
              afspraken uitlegbaar blijven.
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Snel schakelen kan -- als de basisgegevens kloppen.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht Direct is bedoeld voor situaties waarin tempo nodig is, maar helderheid voorop
              blijft staan. Eerst worden drie vragen gesteld: rol, risico en beslislijnen. Pas daarna volgen
              timing en locatie.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/contact" className="route-link">
                Verkennend contact
              </Link>
              <Link href="/opdrachtgevers" className="route-link">
                Voor opdrachtgevers
              </Link>
              {showSpoed && (
                <Link href="/probrandwacht-direct-spoed" className="route-link">
                  Spoedroute
                </Link>
              )}
            </div>

            <p className="text-xs text-slate-400">
              Dit is een route met dezelfde eis: afspraken vooraf, toetsbaar in uitvoering.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: '1) Minimale uitvraag',
              body: "Locatie, tijd, rol en risico's. Kort en concreet, zodat de parameters direct bruikbaar zijn.",
              accent: 'text-emerald-300',
            },
            {
              title: '2) 1-op-1 afstemming',
              body: 'Afspraken worden 1-op-1 gemaakt, met directe afstemming.',
              accent: 'text-sky-300',
            },
            {
              title: '3) Afspraken vastleggen',
              body: 'Scope en beslislijnen vooraf vastleggen. Dat helpt discussie tijdens uitvoering te beperken.',
              accent: 'text-violet-300',
            },
          ].map((x) => (
            <div key={x.title} className="panel p-6">
              <h2 className={`text-sm font-semibold ${x.accent}`}>{x.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{x.body}</p>
            </div>
          ))}
        </div>

        <div className="panel mt-6 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Wat vooraf klaar moet zijn</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>- Wie is aanspreekpunt op locatie?</li>
            <li>- Wat is de scope (wat valt binnen de inzet)?</li>
            <li>- Welke risico&apos;s zijn relevant (heetwerk, besloten ruimte, publiek)?</li>
            <li>- Hoe loopt escalatie (wie beslist wanneer)?</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
