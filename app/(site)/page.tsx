import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import HomeHero from '@/components/HomeHero'
import { getRouteMetadata } from '@/lib/seo/metadata'

const LeadCalculator = dynamic(() => import('@/components/lead-calculator'), { ssr: false })

export const metadata: Metadata = getRouteMetadata('/')

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/brandweer.webp')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/60 via-brand-900/40 to-brand-900/55" />

      <div className="relative z-10 flex min-h-screen flex-col justify-center gap-4 px-4 pb-10 pt-6 sm:px-6 md:px-8">
        <HomeHero />

        <section>
          <div className="mx-auto max-w-4xl space-y-5">
            <div className="lead-calculator mx-auto max-w-4xl rounded-3xl border border-white/60 bg-white/95 p-6 text-slate-900 shadow-2xl sm:p-7">
              <LeadCalculator />
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur shadow-xl">
              <p className="text-xl font-semibold text-blue-50">“Eerlijk werken. Eerlijk verdienen.”</p>
              <p className="mt-2 text-sm text-white/90">
                ProBrandwacht is het voorportaal naar ProSafetyMatch: een eerlijk ecosysteem waar brandwachten en opdrachtgevers zonder bureau-gedoe samenwerken.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
