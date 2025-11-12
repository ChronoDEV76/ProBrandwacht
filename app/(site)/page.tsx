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

        <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Direct naar belangrijke pagina&apos;s</h2>
          <p className="mt-2 text-sm text-slate-600">
            Interne links helpen zoekmachines en bezoekers snel de juiste route te vinden. Kies wat bij je vraag past.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                href: '/opdrachtgevers',
                title: 'Opdrachtgevers',
                copy: 'Leer hoe je DBA-proof afspraken en tarifering vastlegt.',
              },
              {
                href: '/brandwacht/haven-industrie',
                title: 'Haven & industrie',
                copy: 'Checklist voor laden/lossen, tankonderhoud en petrochemie.',
              },
              {
                href: '/brandwacht-inhuren/rotterdam',
                title: 'Brandwacht Rotterdam',
                copy: 'Voorbeeldtarieven en beschikbaarheid per stadspagina.',
              },
              {
                href: '/blog',
                title: 'Blog & kennisbank',
                copy: 'Wet DBA, tarieven en praktijkcases vanuit de sector.',
              },
              {
                href: '/faq',
                title: 'Veelgestelde vragen',
                copy: 'Krijg snel antwoord over escrow, tarieven en documentatie.',
              },
              {
                href: '/probrandwacht-direct',
                title: 'ProBrandwacht Direct',
                copy: 'Plan opdrachten en zie direct hoe betalingen worden geborgd.',
              },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-brand-200 hover:bg-brand-50"
              >
                <p className="text-sm font-semibold text-slate-900">{link.title}</p>
                <p className="mt-1 text-sm text-slate-600">{link.copy}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
