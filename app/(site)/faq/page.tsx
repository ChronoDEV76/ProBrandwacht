import type { Metadata } from 'next'
import Link from 'next/link'

import SeoStructuredData from '@/components/SeoStructuredData'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/faq')

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 6)} />

      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Veelgestelde vragen
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Antwoorden die vooraf kloppen en achteraf uitlegbaar blijven.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is ingericht rond een simpele eis: samenwerking moet vooraf kloppen en achteraf
              uitlegbaar blijven — zonder bemiddeling, sturing of schijnzekerheden. Hieronder staan de vragen die het
              vaakst terugkomen bij zelfstandigen en opdrachtgevers.
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
                Bekijk de kaders
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)] md:p-8">
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">FAQ</h2>

          <ul className="mt-5 space-y-4">
            {generalPlatformFaq.map((f) => (
              <li key={f.question} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <p className="text-sm font-semibold text-slate-50">{f.question}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{f.answer}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-xs text-slate-400">
            Tip: twijfel je of iets écht DBA-bewust is, kijk dan niet alleen naar contracten, maar vooral naar
            rolverdeling, besluitvorming op de vloer en toetsbaarheid in de praktijk.
          </div>
        </div>
      </section>
    </main>
  )
}
