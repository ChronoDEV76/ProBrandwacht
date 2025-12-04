import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getRouteMetadata } from '@/lib/seo/metadata'

const LeadCalculator = dynamic(() => import('@/components/lead-calculator'), { ssr: false })
export const metadata: Metadata = getRouteMetadata('/tarief-berekenen');



export default function TariefBerekenenPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bereken je indicatieve uurtarief</h1>
      <p className="mt-2 max-w-xl text-sm text-slate-600">
        Deze onafhankelijke calculator helpt je nadenken over een eerlijk tarief.
        ProBrandwacht en ProSafetyMatch rekenen <strong>geen marge op jouw uurtarief</strong>.
      </p>
      <p className="mt-1 text-sm text-slate-700">We denken met je mee; dit blijft jouw tarief, zonder marge van ons.</p>
      <p className="mt-1 text-sm text-slate-700">Gebruik dit als startpunt in gesprekken; laat het weten als iets niet klopt.</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <LeadCalculator />
      </div>
    </main>
  )
}
