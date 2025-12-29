import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getRouteMetadata } from '@/lib/seo/metadata'
import SeoStructuredData from '@/components/SeoStructuredData'

const LeadCalculator = dynamic(() => import('@/components/lead-calculator'), { ssr: false })
export const metadata: Metadata = getRouteMetadata('/tarief-berekenen');

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
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SeoStructuredData faqs={calculatorFaq} />
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-12 text-center sm:px-6 md:px-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Bereken je indicatieve uurtarief</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-200 md:text-base">
            Deze onafhankelijke calculator helpt je nadenken over een eerlijk tarief.
            ProBrandwacht en ProSafetyMatch rekenen <strong>geen marge op jouw uurtarief</strong>, alleen een platformfee van 10%.
          </p>
          <p className="mt-1 max-w-3xl text-sm text-slate-200 md:text-base">
            We denken met je mee; dit blijft jouw tarief, met slechts die 10% platformfee.
          </p>
          <p className="mt-1 max-w-3xl text-sm text-slate-200 md:text-base">
            Gebruik dit als startpunt in gesprekken; laat het weten als iets niet klopt.
          </p>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:px-8">
          <LeadCalculator />
        </div>
      </section>
    </main>
  )
}
