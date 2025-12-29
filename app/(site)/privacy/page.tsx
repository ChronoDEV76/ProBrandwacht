import type { Metadata } from 'next'
import Link from 'next/link'

import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/privacy')

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Privacy
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Alleen data die nodig is om samenwerking helder te maken.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is niet gebouwd om zoveel mogelijk data te verzamelen. Het is gebouwd om afspraken, rolverdeling
              en professionaliteit zichtbaar te maken — met minimale gegevens en maximale controle voor de gebruiker.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/belangen"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Bekijk de kaders
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Vraag stellen
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Principes</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>– Dataminimalisatie: alleen wat nodig is voor matching en afspraken.</li>
            <li>– Transparantie: je ziet wat er wordt opgeslagen en waarom.</li>
            <li>– Controle: je beheert je profiel en zichtbaarheid.</li>
            <li>– Geen verkoop van persoonsgegevens.</li>
          </ul>

          <p className="mt-6 text-xs text-slate-500">
            In de praktijk werken we met dataminimalisatie: we vragen alleen gegevens die nodig zijn voor matching,
            communicatie en wettelijke verplichtingen. De exacte verwerking kan per situatie contextafhankelijk zijn.
          </p>

        </div>
      </section>
    </main>
  )
}
