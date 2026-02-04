import type { Metadata } from 'next'

import Link from 'next/link'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/probrandwacht-direct-spoed')

export default function ProBrandwachtDirectSpoedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-orange-300/30 bg-orange-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-200">
              Spoed
            </span>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Dit initiatief legt uit hoe zelfstandige samenwerking werkt -- geen bureau, geen werkgeversrol,
              geen matching-engine.
            </p>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Het platform is geen klassiek bureau. Spoed is bedoeld voor korte, duidelijke afspraken; de
              context bepaalt wat verantwoord is.
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Spoed betekent tempo. Niet minder duidelijkheid.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Als je vandaag nog inzet nodig hebt, wil je een ding voorkomen: ruis. Deze route focust op een
              snelle aanvraag met minimale, noodzakelijke parameters zodat duidelijk is of het past. Pas als
              rol, risico en beslislijnen helder zijn, ga je verder met afspraken.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/contact" className="route-link">
                Verkennend contact
              </Link>
              <Link href="/probrandwacht-direct" className="route-link">
                Terug naar Direct
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              Praktisch: hoe concreter je locatie/rol/risico/duur, hoe sneller je een passende reactie krijgt.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="panel p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Minimale aanvraag (checklist)</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>- Stad/locatie + exacte starttijd</li>
              <li>- Rol (event/industrie/mangat/buitenwacht etc.)</li>
              <li>- Risico&apos;s (heetwerk, besloten ruimte, publiek)</li>
              <li>- Duur / eindtijd</li>
              <li>- Aanspreekpunt op locatie</li>
            </ul>
          </div>

          <div className="panel p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Afspraken die je niet uitstelt</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>- Inzetvoorwaarden (incl. reistijd/wachttijd)</li>
              <li>- Scope (wat wel/niet) en beslislijnen</li>
              <li>- Communicatie (portofoon/telefoon) + meldpunt</li>
              <li>- Rapportage (kort, toetsbaar, werkbaar)</li>
            </ul>

            <div className="mt-6">
              <Link href="/belangen" className="route-link">
                Kaders en intentie
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
