import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import PbDirectForm from '@/components/pb-direct-form'
import { SPOED_ROUTE_ENABLED } from '@/lib/featureFlags'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/probrandwacht-direct-spoed');


export default function PbDirectPage() {
  if (!SPOED_ROUTE_ENABLED) {
    notFound()
  }

  const canonical = 'https://www.probrandwacht.nl/probrandwacht-direct'
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 space-y-10">
      <StructuredBreadcrumbs
        items={[
          { name: 'Home', url: 'https://www.probrandwacht.nl/' },
          { name: 'ProBrandwacht Direct', url: canonical },
        ]}
      />

      <section className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold tracking-tight">ProBrandwacht Direct — spoed (24/7)</h1>
{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/probrandwacht-direct" className="underline">ProBrandwacht Direct</a>.
</div>
{/* SEO-UPGRADE END */}
        <p className="mt-2 text-slate-700">
          **Spoedaanvragen** worden direct doorgezet naar het ProBrandwacht Direct Slack-kanaal.
          Beschikbare brandwachten kunnen je inzet claimen; je ontvangt snel bevestiging.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Directe matching via Slack
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            DBA-proof afspraken
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            24/7 inzet
          </span>
        </div>
      </section>

      <PbDirectForm />
    </main>
  )
}

