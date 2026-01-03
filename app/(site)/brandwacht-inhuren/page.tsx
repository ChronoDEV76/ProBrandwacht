import type { Metadata } from 'next'
import Link from 'next/link'

import { getRouteMetadata } from '@/lib/seo/metadata'
import { SPOED_UI_ENABLED } from '@/lib/featureFlags'

export const metadata: Metadata = getRouteMetadata('/brandwacht-inhuren')

export default function BrandwachtInhurenPage() {
  const showSpoed = SPOED_UI_ENABLED

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
              Brandwacht inhuren
            </span>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is een selectief platform voor zelfstandige brandwachten en opdrachtgevers
              die bewust kiezen voor directe samenwerking — en begrijpen wat dat vraagt in gedrag,
              verantwoordelijkheid en ondernemerschap. We zijn geen bureau en bieden geen garantie op inzet.
              Of een inzet haalbaar is, is contextafhankelijk en hangt af van beschikbaarheid en afspraken tussen partijen.
              Je verkent hier vooral de kaders: rolverdeling, afstemming en verantwoordelijkheid.
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Inhuren werkt pas goed als je inzet en verantwoordelijkheid vooraf definieert.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht helpt je direct samenwerken met zelfstandige brandwachten op basis van rolprofielen,
              certificaten en afspraken die toetsbaar blijven. Geen onzichtbare tussenlagen, wel structuur.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Ik wil verkennen als opdrachtgever
              </Link>

              <Link
                href="/opdrachtgevers"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Lees de opdrachtgever-route
              </Link>

              {showSpoed && (
                <Link
                  href="/probrandwacht-direct-spoed"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Spoed: Direct inzetten
                </Link>
              )}
            </div>

            <p className="text-xs text-slate-400">
              ProSafetyMatch is in ontwikkeling als technische laag om afspraken/planning/documentatie later digitaal te ondersteunen.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: '1) Maak de rol concreet',
              body: 'Wat verwacht je: toezicht, heetwerk, mangat/buitenwacht, BMA, publieksveiligheid? Zonder scope ontstaat miscommunicatie.',
              accent: 'text-emerald-300',
            },
            {
              title: '2) Leg beslislijnen vast',
              body: "Wie beslist bij opschaling? Wie is aanspreekpunt? Duidelijkheid voorkomt 'ketenruis' op locatie.",
              accent: 'text-sky-300',
            },
            {
              title: '3) Spreek tarief & randvoorwaarden af',
              body: 'Reistijd, wachtdienst, nacht/weekend, rapportage en materialen: vooraf afgestemd, achteraf uitlegbaar.',
              accent: 'text-violet-300',
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className={`text-sm font-semibold ${c.accent}`}>{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Waarom dit beter werkt</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
            De grootste problemen in inhuur zijn zelden &quot;mensen&quot;. Het zijn onduidelijke afspraken. Als je rolverdeling,
            verantwoordelijkheid en randvoorwaarden vooraf borgt, wordt uitvoering voorspelbaar en blijft samenwerking DBA-bewust.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Bekijk kaders & richtlijnen
            </Link>
            <Link
              href="/steden"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Bekijk stedenpagina&apos;s
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
