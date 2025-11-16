// app/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import { getRouteMetadata } from '@/lib/seo/metadata'

const LeadCalculator = dynamic(() => import('@/components/lead-calculator'), { ssr: false })
export const metadata: Metadata = getRouteMetadata('/');



export default function HomePage() {
  return (
    <main className="min-h-[100svh] bg-gradient-to-b from-brand-50 via-white to-white text-slate-900">
      <Hero />
      <div className="mx-auto max-w-4xl space-y-12 px-4 pb-20 sm:px-6 md:px-8">
        <LeadCalculator />
        <div className="rounded-3xl border border-brand-200 bg-white/90 p-6 text-center shadow-lg shadow-brand-100">
          <p className="text-xl font-semibold text-brand-900">
            “Eerlijk werken. Eerlijk verdienen.”
          </p>
        </div>
      </div>
    </main>
  )
}
