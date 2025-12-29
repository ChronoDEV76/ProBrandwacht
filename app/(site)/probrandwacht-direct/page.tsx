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
              Direct
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Snel inzetten kan - als de basisgegevens kloppen.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht Direct is bedoeld voor situaties waarin je tempo nodig hebt, maar niet wilt inleveren op helderheid.
              We sturen op minimale, noodzakelijke informatie: rol, risico, tijd, locatie en beslislijnen.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Start als opdrachtgever
              </Link>
              <Link
                href="/brandwacht-inhuren"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Lees hoe inhuren werkt
              </Link>
              {showSpoed && (
                <Link
                  href="/probrandwacht-direct-spoed"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Spoed: direct aanvragen
                </Link>
              )}
            </div>

            <p className="text-xs text-slate-400">
              Dit is geen &quot;snelle bemiddeling&quot;. Het is een snellere route met dezelfde eis: afspraken vooraf, toetsbaar in uitvoering.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: '1) Minimale intake',
              body: 'Locatie, tijd, rol, risico\'s, aantal professionals. Geen tekstmuur; alleen bruikbare parameters.',
              accent: 'text-emerald-300',
            },
            {
              title: '2) Directe afstemming',
              body: "Je spreekt met de zelfstandige over inzet en voorwaarden. Geen onzichtbare 'tussenbeslisser'.",
              accent: 'text-sky-300',
            },
            {
              title: '3) Afspraken vastleggen',
              body: 'Tarief, scope en beslislijnen vast voor start. Dat voorkomt discussie tijdens uitvoering.',
              accent: 'text-violet-300',
            },
          ].map((x) => (
            <div key={x.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className={`text-sm font-semibold ${x.accent}`}>{x.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{x.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Wat je vooraf klaar moet hebben</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>- Wie is aanspreekpunt op locatie?</li>
            <li>- Wat is de scope (wat wel/niet)?</li>
            <li>- Welke risico&apos;s zijn relevant (heetwerk, besloten ruimte, publiek)?</li>
            <li>- Hoe loopt escalatie (wie beslist wanneer)?</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
