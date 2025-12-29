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

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Spoed betekent tempo. Niet minder duidelijkheid.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Als je vandaag nog inzet nodig hebt, wil je een ding voorkomen: ruis. Deze route focust op een snelle aanvraag
              met minimale, noodzakelijke parameters zodat een zelfstandige direct kan beoordelen of het past.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Spoedaanvraag starten
              </Link>
              <Link
                href="/probrandwacht-direct"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Eerst de Direct-route lezen
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
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Minimale aanvraag (checklist)</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>- Stad/locatie + exacte starttijd</li>
              <li>- Rol (event/industrie/mangat/buitenwacht etc.)</li>
              <li>- Risico&apos;s (heetwerk, besloten ruimte, publiek)</li>
              <li>- Duur / eindtijd</li>
              <li>- Aanspreekpunt op locatie</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Afspraken die je niet uitstelt</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>- Tarief + reistijd/wachttijd</li>
              <li>- Scope (wat wel/niet) en beslislijnen</li>
              <li>- Communicatie (portofoon/telefoon) + meldpunt</li>
              <li>- Rapportage (kort, toetsbaar, werkbaar)</li>
            </ul>

            <div className="mt-6">
              <Link href="/belangen" className="text-sm font-semibold text-emerald-200 hover:text-emerald-100">
                Bekijk kaders & richtlijnen {'->'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
