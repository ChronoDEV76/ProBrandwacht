// app/(site)/waarom-wij-soms-nee-zeggen/page.tsx
import type { Metadata } from 'next'

import { Cta } from '@/components/Cta'
import HeroBackground from '@/components/HeroBackground'

export const metadata: Metadata = {
  title: 'Waarom wij soms nee zeggen — ProBrandwacht',
  description:
    'Wij zeggen soms nee tegen een opdracht. Niet omdat we moeilijk willen doen, maar omdat niet elke vraag professioneel uitvoerbaar en verantwoord is.',
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-14 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Positionering • Uitvoerbaarheid
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-5xl">
            Waarom wij soms <span className="text-emerald-300">nee</span> zeggen
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Bij ProBrandwacht zeggen we soms nee tegen een opdracht. Niet omdat we geen mensen hebben. Niet
            omdat we moeilijk willen doen. Maar omdat{' '}
            <strong>niet elke vraag professioneel uitvoerbaar en verantwoord is</strong>.
          </p>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-12 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Veiligheid vraagt eerlijkheid</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Niet elk risico laat zich oplossen met een handtekening. In de praktijk zien we dat rollen
              niet in alle gevallen helder zijn, verantwoordelijkheden worden verondersteld en uitvoerbaarheid onder
              druk komt te staan. Als wij dat vooraf zien, dan zeggen we dat ook.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Wanneer zeggen wij nee?</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
              <li>De rol van brandwacht is niet scherp afgebakend.</li>
              <li>Risico’s worden eenzijdig doorgeschoven.</li>
              <li>De praktijk sluit niet aan op vergunning of afspraak.</li>
              <li>Kritisch meedenken krijgt geen ruimte.</li>
              <li>Veiligheid wordt vooral administratief benaderd (papier boven uitvoering).</li>
            </ul>
            <p className="mt-4 text-sm text-slate-200 md:text-base">
              Niet omdat het “niet mag”, maar omdat het <strong>niet klopt</strong>.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Wat levert dat op?</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Voor brandwachten die bewust kiezen</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-200">
                  <li>Bescherming tegen onuitvoerbare constructies.</li>
                  <li>Duidelijkheid over rol en verantwoordelijkheid.</li>
                  <li>Ruimte om professioneel te handelen.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Voor opdrachtgevers die vooraf helder willen</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-200">
                  <li>Minder kans op handhavingsproblemen.</li>
                  <li>Rust tijdens uitvoering.</li>
                  <li>Duidelijkheid vooraf, minder discussie achteraf.</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-200 md:text-base">
              Nee zeggen is geen blokkade. Het is <strong>risicobeheersing aan de voorkant</strong>.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Liever vooraf helder dan achteraf uitleggen</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              In een steeds complexere markt is het verleidelijk om alles passend te maken. Wij doen het
              omgekeerde: we maken zichtbaar wat werkt, wat wringt en waar grenzen liggen. Dat is soms
              ongemakkelijk, maar in de regel eerlijk.
            </p>
            <blockquote className="mt-5 border-l-2 border-emerald-400/40 pl-4 italic text-slate-200">
              Brandveiligheid is geen product dat je bestelt. Het is een verantwoordelijkheid die je goed
              moet organiseren.
            </blockquote>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">En nu?</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Wil je sparren over uitvoerbaarheid, rolverdeling of inzet? Dan kijken we liever vooraf met je
              mee, zodat je achteraf geen verrassingen hebt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Cta id="tertiary_contact_exploratory" />
              <Cta id="opdrachtgever_fit_your_case" />
              <Cta id="brandwacht_learn_selection" />
            </div>
          </div>

          <div className="pt-2">
            <Cta id="secondary_back_home" />
          </div>
        </div>
      </section>
    </main>
  )
}
