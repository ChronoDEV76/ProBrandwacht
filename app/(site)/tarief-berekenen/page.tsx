import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import SeoStructuredData from '@/components/SeoStructuredData'
import { getRouteMetadata } from '@/lib/seo/metadata'

const LeadCalculator = dynamic(() => import('@/components/lead-calculator'), { ssr: false })

export const metadata: Metadata = getRouteMetadata('/tarief-berekenen')

const calculatorFaq = [
  {
    question: 'Is dit tarief een garantie?',
    answer:
      'Nee. De calculator geeft een indicatie op basis van jouw input. Het uiteindelijke tarief spreek je in de regel 1-op-1 af met de opdrachtgever en is afhankelijk van context, risico en certificering.',
  },
  {
    question: 'Wat is het doel van de calculator?',
    answer:
      'Inzicht geven in een verdedigbaar uurtarief als zelfstandig professional, inclusief ondernemerschapskosten. Het helpt je gesprekken beter te voeren, niet om een vast tarief op te leggen.',
  },
  {
    question: 'Hoe past dit binnen Wet DBA?',
    answer:
      'Werken binnen Wet DBA gaat niet alleen over tarief, maar vooral over zelfstandigheid en duidelijke afspraken. De calculator ondersteunt vooral het gesprek over transparantie en onderbouwing.',
  },
]

export default function TariefBerekenenPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={calculatorFaq} />
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Tarief & onderbouwing
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Tarief is geen gok. Het is een onderbouwde afspraak.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Een goed tarief is uitlegbaar: risico, rol, tijd, locatie en randvoorwaarden bepalen de inzet.
              Deze pagina helpt je om het gesprek volwassen te voeren - zonder vage &quot;marktprijzen&quot; of afgeleide marges.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/voor-brandwachten"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Route voor brandwachten
              </Link>
              <Link
                href="/opdrachtgevers"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Route voor opdrachtgevers
              </Link>
              <Link
                href="/belangen"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Kaders & afspraken
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              Let op: voorbeelden zijn indicatief. Het doel is structuur in het gesprek, niet &quot;1 tarief voor iedereen&quot;.
            </p>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 md:px-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Bereken je indicatieve uurtarief</h2>
          <p className="mt-2 text-sm text-slate-200 md:text-base">
            Deze onafhankelijke calculator helpt je nadenken over een eerlijk tarief. ProBrandwacht en ProSafetyMatch rekenen{' '}
            <strong>geen marge op jouw uurtarief</strong>, alleen een platformfee van 10%.
          </p>
          <p className="mt-1 text-sm text-slate-200 md:text-base">
            We denken met je mee; dit blijft jouw tarief, met slechts die 10% platformfee.
          </p>
          <p className="mt-1 text-sm text-slate-200 md:text-base">
            Gebruik dit als startpunt in gesprekken; laat het weten als iets niet klopt.
          </p>
        </div>
        <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 md:px-8">
          <LeadCalculator />
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Wat bepaalt het tarief?</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>- Rol & verantwoordelijkheid (event / industrieel / mangat-buitenwacht)</li>
              <li>- Risiconiveau (heetwerk, besloten ruimte, publieksdruk)</li>
              <li>- Tijd (dag/nacht/weekend) en inzetduur</li>
              <li>- Locatie & aanrij-/wachttijd</li>
              <li>- Documentatie/rapportage-eisen</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Wat je vooraf vastlegt</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>- Wat je precies doet (scope) en wat niet</li>
              <li>- Wie beslist bij opschaling / stop (escalatie)</li>
              <li>- Reistijd, wachtdienst, pauzes, start/eindmoment</li>
              <li>- Wie levert materialen/portofoons/PBM</li>
              <li>- Hoe je rapporteert (toetsbaar, maar werkbaar)</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Praktisch (korte methode)</h2>
          <ol className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              {
                title: '1) Classificeer de inzet',
                text: 'Rol + risico + context (event/industrie/bouw).',
              },
              {
                title: '2) Maak randvoorwaarden expliciet',
                text: 'Reistijd, wachttijd, nacht/weekend, rapportage en beslislijnen.',
              },
              {
                title: '3) Leg het vast voor start',
                text: 'Zodat het achteraf uitlegbaar is en je geen discussie hoeft te voeren tijdens uitvoering.',
              },
            ].map((s) => (
              <li key={s.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                <p className="text-sm font-semibold text-slate-50">{s.title}</p>
                <p className="mt-2 text-sm text-slate-200">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/zzp/aanmelden"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Aanmelden als brandwacht
            </Link>
            <Link
              href="/opdrachtgevers/aanmelden"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Aanmelden als opdrachtgever
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
