import type { Metadata } from 'next'

import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/tone-of-voice');

const principles = [
  { title: 'Ondernemend', body: 'We spreken brandwachten aan als zelfstandige professionals.' },
  { title: 'Transparant', body: 'Eerlijk, direct en duidelijk. Geen jargon, geen rookgordijnen.' },
  { title: 'Waardig en respectvol', body: 'Trots op het vak, respect voor het werk en de mens.' },
  { title: 'Toekomstgericht', body: 'Innovatief, modern en gericht op groei en verbetering.' },
  { title: 'Helder & menselijk', body: 'Korte zinnen, krachtige woorden, eenvoudig te begrijpen.' },
]

const useWords = ['professioneel', 'zelfstandig', 'transparant', 'eerlijk', 'modern', 'netwerk', 'respect', 'autonomie']
const avoidWords = ['inzetten', 'aansturen', 'geplande uren', 'onderbrengen', 'wij bepalen', 'verplicht']

export default function ToneOfVoicePage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Communicatiestijl', url: 'https://www.probrandwacht.nl/tone-of-voice' },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <section className="mx-auto max-w-5xl space-y-6 rounded-[26px] border border-white/10 bg-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)] md:p-8">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Communicatiestijl & tone of voice</p>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">Zo klinken we als ProBrandwacht</h1>
          <p className="max-w-3xl text-sm text-slate-200">
            Helder, ondernemend en respectvol. We spreken met vakmensen en opdrachtgevers als gelijken en kiezen voor transparantie in alles
            wat we schrijven.
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Tone of voice</p>
          <div className="grid gap-3 md:grid-cols-2">
            {principles.map(item => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                <p className="text-sm font-semibold text-white">⭐ {item.title}</p>
                <p className="mt-1 text-sm text-slate-200">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Gebruik woorden zoals</p>
            <ul className="mt-2 grid gap-2">
              {useWords.map(word => (
                <li key={word} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100">
                  <span aria-hidden>•</span>
                  <span className="capitalize">{word}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Vermijd woorden zoals</p>
            <ul className="mt-2 grid gap-2">
              {avoidWords.map(word => (
                <li key={word} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100">
                  <span aria-hidden>•</span>
                  <span className="capitalize">{word}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/80 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Spreek altijd vanuit gelijkwaardigheid</p>
          <ul className="space-y-2 text-sm text-slate-100">
            <li>Niet: “Wij hebben werk voor jou.”</li>
            <li>Maar: “Wij ondersteunen met expertise je kansen creëren.”</li>
            <li>Niet: “Wij zetten je op een project.”</li>
            <li>Maar: “Jij kiest opdrachten.”</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
