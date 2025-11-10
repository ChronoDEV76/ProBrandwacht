import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const AnalyticsClient = dynamic(() => import('./AnalyticsClient'), { ssr: false })

export const metadata: Metadata = {
  title: 'Share events debug | ProBrandwacht',
  description: 'Bekijk live welke share_click events tijdens je sessie zijn geregistreerd voor testdoeleinden.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Share events debug | ProBrandwacht',
    description: 'Bekijk live welke share_click events tijdens je sessie zijn geregistreerd voor testdoeleinden.',
  },
  twitter: {
    card: 'summary',
    title: 'Share events debug | ProBrandwacht',
    description: 'Bekijk live welke share_click events tijdens je sessie zijn geregistreerd voor testdoeleinden.',
  },
}

export default function AnalyticsDebugPage() {
  const heading = <h1 className="text-2xl font-semibold">Share events (session)</h1>

  return (
    <section className="space-y-6">
      <AnalyticsClient heading={heading} />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Realtime acties uitproberen</h2>
        <p className="mt-2 text-sm text-slate-600">
          Share events verschijnen hier binnen enkele seconden. Test direct hoe de tools reageren en zet de volgende stap via ons platform.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/probrandwacht-direct"
            className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-brand-700/90"
          >
            ProBrandwacht Direct aanvragen
          </Link>
          <Link
            href="/probrandwacht-direct-spoed"
            className="inline-flex items-center rounded-md border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
          >
            Naar ProBrandwacht Direct spoed
          </Link>
        </div>
      </div>
    </section>
  )
}
