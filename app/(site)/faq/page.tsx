import type { Metadata } from 'next'

import HeroBackground from '@/components/HeroBackground'
import SeoStructuredData from '@/components/SeoStructuredData'
import AfbakeningNote from '@/components/afbakening-note'
import { getRouteMetadata } from '@/lib/seo/metadata'
import faqItems from '@/content/faq.json'

export const metadata: Metadata = getRouteMetadata('/faq')

export default function FaqPage() {
  const structuredFaqs = faqItems.map((item) => ({
    question: item.question,
    answer: item.answer.join(' '),
  }))

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={structuredFaqs.slice(0, 7)} />

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-14 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Veelgestelde vragen
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-5xl">FAQ</h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Antwoorden die grenzen, rolverdeling en verantwoordelijkheden duidelijk maken, met focus op context
            en rolhelderheid.
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht licht de markt en kaders voor zelfstandige samenwerking toe — het initiatief zelf
            bemiddelt niet en stuurt niet.
          </p>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-12 md:py-16">
          {faqItems.map((item) => (
            <div key={item.id} className="panel p-6">
              <h2 className="text-xl font-semibold text-white md:text-2xl">{item.question}</h2>
              <div className="mt-3 space-y-2">
                {item.answer.map((line) => (
                  <p key={line} className="text-sm leading-relaxed text-slate-200 md:text-base">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <AfbakeningNote />
      </section>
    </main>
  )
}
