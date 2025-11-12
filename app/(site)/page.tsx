import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'

export const metadata: Metadata = {
  title: 'ProBrandwacht – Slimmer werken. Eerlijk verdienen. Samen vooruit.',
  description:
    'Bereken jouw echte waarde als professional. Eerlijke tarieven zonder strijkstok. Samen bouwen we aan een gezonde veiligheidsmarkt.',
  keywords: [
     'brandwacht',
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

        <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm space-y-5">
          <h2 className="text-xl font-semibold text-slate-900">Waarom dit werkt</h2>
          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold">Professionals</p>
              <p>Eerlijk tarief, directe afspraken, meer waardering.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold">Opdrachtgevers</p>
              <p>Meer kwaliteit, minder verloop, helder tarief.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold">Veiligheid</p>
              <p>Stabiel, betrouwbaar en aantoonbaar beter.</p>
            </div>
          </div>
          <p className="border-t border-slate-200 pt-3 text-center text-sm text-slate-600">
            Samen maken we de veiligheidssector gezonder. Vandaag eerlijk, morgen sterker.
          </p>
        </section>
      </div>
    </main>
  )
}
