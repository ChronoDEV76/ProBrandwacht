import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getRouteMetadata } from '@/lib/seo/metadata'

const LeadCalculator = dynamic(() => import('@/components/lead-calculator'), { ssr: false })
export const metadata: Metadata = getRouteMetadata('/tarief-berekenen');



export default function TariefBerekenenPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bereken je indicatieve uurtarief</h1>
{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/probrandwacht-direct" className="underline">ProBrandwacht Direct</a>.
</div>
{/* SEO-UPGRADE END */}
      <p className="mt-2 max-w-xl text-sm text-slate-600">
        Deze onafhankelijke calculator helpt je nadenken over een eerlijk tarief.
        ProBrandwacht en ProSafetyMatch rekenen <strong>geen marge op jouw uurtarief</strong>.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <LeadCalculator />
      </div>
    </main>
  )
}
