import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { SPOED_UI_ENABLED } from '@/lib/featureFlags'

const AnalyticsClient = dynamic(() => import('./AnalyticsClient'), { ssr: false })
export const metadata: Metadata = {
  title: 'Analytics debug | ProBrandwacht',
  robots: { index: false, follow: false },
}

export default function AnalyticsDebugPage() {
  const heading = <h1 className="text-2xl font-semibold">Share events (session)</h1>

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <AnalyticsClient heading={heading} />

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-white">Realtime acties uitproberen</h2>
          <p className="mt-2 text-sm text-slate-200">
            Share events verschijnen hier binnen enkele seconden. Test direct hoe de tools reageren en bekijk de resultaten in deze testomgeving.
          </p>
          <p className="mt-2 text-sm text-slate-200">
            Het is belangrijk dat opdrachtgevers en zzp’ers dezelfde gebeurtenissen
            zien en de resultaten gezamenlijk goedkeuren. Zo voelt iedereen dat de
            data stevig en controleerbaar ondersteunt wat er op de werkvloer gebeurt.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {SPOED_UI_ENABLED ? (
              <Link
                href="/probrandwacht-direct-spoed"
                className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                Naar ProBrandwacht Direct spoed
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  )
}
