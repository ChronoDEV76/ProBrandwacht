import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'

export const metadata: Metadata = {
  title: 'Waarom wij soms nee zeggen — ProBrandwacht',
  description:
    "Soms is 'nee' de professionele keuze. Niet als oordeel, maar als grens voor uitvoerbaarheid, veiligheid en rolhelderheid in brandveiligheidsinzet.",
  keywords: [
    'brandwacht',
    'brandwacht inhuren',
    'brandwacht huren',
    'zelfstandig samenwerken',
    'uitvoerbaarheid',
    'rolhelderheid',
  ],
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-6xl px-6 pb-14 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-slate-300/80">
              Uitvoerbaarheid en grensbewaking
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Waarom wij soms "nee" zeggen
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-200/90">
              Nee is hier geen oordeel over mensen of intenties. Het is een signaal dat
              randvoorwaarden ontbreken voor professioneel, veilig en uitlegbaar werk.
              Als scope, rol en beslislijnen niet kloppen, ontstaan discussies tijdens
              uitvoering. Dat wil je vermijden.
            </p>

            <div className="mt-7 rounded-2xl border border-slate-800/70 bg-slate-950/40 p-5">
              <p className="text-sm text-slate-200/90">
                <span className="font-semibold">Afbakening:</span> ProBrandwacht is geen bureau en beslist
                niets voor partijen. We duiden patronen die in de praktijk tot mislukte
                uitvoering leiden. Zo kun je ze vooraf voorkomen.
              </p>
            </div>
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4">
          <Reason
            title="1) Scope is te vaag"
            text="Als niemand precies kan zeggen wat bewaakt moet worden en waar de grenzen liggen, wordt veiligheid interpretatie. Leg vooraf vast wanneer opschaling nodig is."
          />
          <Reason
            title="2) Beslislijnen ontbreken"
            text="Als onduidelijk is wie beslist bij wijziging, stop of escalatie, ontstaat er druk op locatie. Dat is onprofessioneel en onveilig."
          />
          <Reason
            title="3) Randvoorwaarden ontbreken"
            text="Geen toegang, geen contactpunt, geen middelen, geen overdracht: dan wordt uitvoering improvisatie. Dat werkt tegen iedereen."
          />
          <Reason
            title="4) Tempo wint van veiligheid"
            text="Als doorwerken belangrijker wordt dan risico's beheersen, hoort de opdracht terug naar de tekentafel."
          />
          <Reason
            title="5) Afspraken zijn niet uitlegbaar"
            text="Als je achteraf niet kunt uitleggen wat er is afgesproken en waarom, is dat een teken dat je vooraf te weinig hebt afgebakend."
          />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/opdrachtgevers"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
          >
            Checklist voor opdrachtgevers
          </Link>
          <Link
            href="/voor-brandwachten"
            className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Kaders voor brandwachten
          </Link>
        </div>
      </section>
    </main>
  )
}

function Reason({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-slate-200/90">{text}</p>
    </div>
  )
}
