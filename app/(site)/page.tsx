import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'

export const metadata: Metadata = {
  title: 'ProBrandwacht – Slimmer werken. Eerlijk verdienen. Samen vooruit.',
  description:
    'Bereken jouw echte waarde als professional. Eerlijke tarieven zonder tussenpartij. Samen bouwen we aan een gezonde veiligheidsmarkt.',
  keywords: [
     'brandwacht',
     'brandwacht nodig',
     'brandwacht inhuren',
     'brandwacht-inhuren',
     'brandwacht huren',
     'brandwacht-huren',
     'DBA-proof brandwacht',
     'brandwacht tarieven',
     'brandwacht spoed',
     'brandwacht direct', 'brandwacht aanvragen',
     'brandwacht uurtarief',
     'kosten brandwacht inhuren',
     '24/7 brandwacht',
     '24/7 brandwacht direct',
     'brandwacht petrochemie',
     'industriële brandwacht',
     'brandwacht evenementen',
     'brandwacht bij storing',
     'brandwacht brandmeldinstallatie',
     'veiligheidswacht inhuren',
     'brandwacht kantoor',
     'brandwacht zorginstelling',
     'zzp brandwacht opdrachten',
     'freelance brandwacht',
     'zzp brandwacht inhuren',
     'platform brandwachten',
     'brandwacht gezocht zzp',
     'brandwacht modelovereenkomst',
     'brandwacht heetwerkwacht',
     'brandwacht werkvergunning',
     'brandwacht inhuren kosten',
  ],
  robots: { index: true, follow: true },
}

const LeadCalculator = dynamic(() => import('@/components/lead-calculator'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-4xl rounded-xl bg-slate-100 p-10 text-center text-slate-400">
      Laden...
    </div>
  ),
})

export default function HomePage() {
  return (
    <main className="min-h-[100svh] bg-gradient-to-b from-brand-50 via-white to-white text-slate-900">
      <Hero />
      <div className="mx-auto max-w-4xl space-y-12 px-4 pb-20 sm:px-6 md:px-8">
        <LeadCalculator />
        <div className="rounded-3xl border border-brand-200 bg-white/90 p-6 text-center shadow-lg shadow-brand-100">
          <p className="text-xl font-semibold text-brand-900">
            “Vandaag eerlijk. Morgen beter en veiliger.”
          </p>
        </div>
      </div>
    </main>
  )
}
