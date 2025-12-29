// app/(site)/page.tsx
import Link from 'next/link'

import WhyProBrandwachtSection from '@/components/why-probrandwacht-section'
import SeoStructuredData from '@/components/SeoStructuredData'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata = getRouteMetadata('/')

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 3)} />

      {/* HERO (ZZP EERST) */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24">
          <div className="relative z-10 max-w-xl space-y-6">
            <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              Voor zelfstandige brandwachten
            </div>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              Je bent zelfstandig — maar zo voelt het niet in alle gevallen.
            </h1>

            <h2 className="max-w-2xl text-lg font-medium leading-snug text-slate-100 md:text-xl">
              ProBrandwacht helpt je regie, afspraken en zelfstandigheid weer helder te krijgen.
            </h2>

            <p className="mt-3 max-w-2xl text-sm text-slate-200">
              Onduidelijke contracten, wisselende voorwaarden en steeds meer tussenlagen maken samenwerken onnodig
              ingewikkeld. ProBrandwacht is er voor zelfstandige brandwachten die professioneel willen ondernemen — met
              duidelijke, toetsbare afspraken.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>
                - Jij bepaalt je <strong className="font-semibold text-slate-100">tarief, agenda en inzet</strong>.
              </li>
              <li>
                - Afspraken zijn <strong className="font-semibold text-slate-100">toetsbaar en DBA-bewust</strong>.
              </li>
              <li>- Geen verborgen werkgeverschap of onzichtbare schakels.</li>
            </ul>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/voor-brandwachten"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Bekijk of dit bij jou past
              </Link>

              <Link
                href="/zzp/aanmelden"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-5 py-2.5 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
              >
                Vrijblijvend aansluiten
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-emerald-200">
              <Link href="/belangen" className="hover:text-emerald-100">
                Bekijk de kaders
              </Link>
              <Link href="/steden" className="hover:text-emerald-100">
                Alle steden &amp; regio’s
              </Link>
            </div>

            <p className="pt-2 text-xs text-slate-400">
              Geen klachtenplatform. Geen naming &amp; shaming. Wel duidelijke afspraken en professionele zelfstandigheid.
            </p>

            <p className="text-xs text-slate-400">
              ProBrandwacht is de vakinhoudelijke basis; ProSafetyMatch wordt de technische laag (in ontwikkeling) die
              afspraken en samenwerking digitaal ondersteunt — zonder extra schakels toe te voegen.
            </p>
          </div>

          {/* RECHTERKAART */}
          <div className="relative ml-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-black/50 md:w-1/2">
            <h3 className="text-sm font-semibold text-slate-100">Wat jij vastlegt (alleen wat nodig is)</h3>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>- Je certificaten en ervaring als zelfstandige brandwacht.</li>
              <li>- Je eigen uurtarief en beschikbaarheid.</li>
              <li>- Voorkeuren qua projecten, sector en werktijden.</li>
              <li>- Heldere afspraken over inzet, rol en verantwoordelijkheid.</li>
            </ul>
            <p className="text-xs text-slate-400">
              Dit start in de niche van brandwachten, met een route naar een breder safety-netwerk.
            </p>

            <div className="pt-1">
              <Link href="/opdrachtgevers" className="text-xs font-medium text-emerald-200 hover:text-emerald-100">
                Ben je opdrachtgever? Bekijk de route voor opdrachtgevers →
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE CTA BAR */}
        <div className="fixed bottom-4 left-4 right-4 z-20 md:hidden">
          <Link
            href="/voor-brandwachten"
            className="flex items-center justify-center rounded-full bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/50 transition hover:bg-emerald-300"
          >
            Bekijk of dit bij jou past
          </Link>
        </div>
      </section>

      {/* WAT PROBRANDWACHT DOET */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/90">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-14">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Wat ProBrandwacht doet</p>
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">Duidelijke afspraken, zonder extra lagen</h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is een onafhankelijke basis waar zelfstandige brandwachten en opdrachtgevers elkaar leren kennen
              via duidelijke profielen, heldere afspraken en directe lijnen. Vanuit die inhoud bouwen we aan ProSafetyMatch:
              de technische laag (in ontwikkeling) die planning, documentatie en vastlegging kan ondersteunen.
            </p>
          </div>
        </div>
      </section>

      {/* WHY PROBRANDWACHT */}
      <WhyProBrandwachtSection />

      {/* VOOR WIE */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/80">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
              Voor professionals en organisaties die het goed willen regelen
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              We beginnen bij de <strong className="font-semibold text-emerald-300">zelfstandige brandwacht</strong>: regie
              over tarief, agenda en inzet, met afspraken die kloppen. Opdrachtgevers krijgen een duidelijk beeld van wie ze
              inhuren en werken samen binnen uitlegbare kaders.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Voor zelfstandige brandwachten</h3>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>- Je bepaalt zelf je tarief en beschikbaarheid.</li>
                <li>- Je behoudt je zelfstandigheid en eigen naam — geen verborgen werkgeverschap.</li>
                <li>- Je werkt met afspraken die vooraf duidelijk en toetsbaar zijn.</li>
                <li>- Je kiest zelf welke inzet je vastlegt en aangaat.</li>
              </ul>
              <div className="pt-2">
                <Link href="/voor-brandwachten" className="text-sm font-semibold text-emerald-200 hover:text-emerald-100">
                  Lees de route voor brandwachten →
                </Link>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Voor opdrachtgevers</h3>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>- Direct contact met vakmensen zonder onnodige schakels.</li>
                <li>- Afspraken over tarief, rol en verantwoordelijkheden vooraf duidelijk.</li>
                <li>- DBA-bewust samenwerken binnen wet- en regelgeving.</li>
                <li>- Uitlegbaar richting HR, OR en toezichthouders.</li>
              </ul>
              <div className="pt-2">
                <Link href="/opdrachtgevers" className="text-sm font-semibold text-emerald-200 hover:text-emerald-100">
                  Lees de route voor opdrachtgevers →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AANSLUITEN (PROSAFETYMATCH) */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-12 md:flex-row md:items-center md:py-14">
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
              Vrijblijvend aansluiten bij ProSafetyMatch (in ontwikkeling)
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is de vakinhoudelijke laag; ProSafetyMatch wordt de technische laag die afspraken en samenwerking
              digitaal kan ondersteunen. Aansluiten betekent: meebouwen aan wat werkt in de praktijk — met heldere afspraken
              als basis.
            </p>
            <p className="text-sm text-slate-200 md:text-base">
              Geen grote beloftes, wel stap voor stap verbeteren: profielen, certificaten en afspraken blijven inzichtelijk en
              toetsbaar.
            </p>
          </div>

          <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-black/40">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Sluit je aan</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Link
                href="/zzp/aanmelden"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Als brandwacht
              </Link>
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
              >
                Als opdrachtgever
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Focus: zelfstandigheid, duidelijke afspraken en gelijkwaardige samenwerking.
            </p>
          </div>
        </div>
      </section>

      {/* SLOT */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
              Wij kiezen geen kamp, we kiezen voor duidelijke afspraken
            </h2>
            <p className="text-sm text-slate-200 md:text-base">
              ProBrandwacht is geen klassieke vakbond en geen bureau. Geen wij-zij, wel samen helder krijgen wat nodig is:
              duidelijke afspraken, kostendekkende tarieven en een rolverdeling die klopt.
            </p>
            <p className="text-sm text-slate-200 md:text-base">
              Zo maken we samen het werkveld veiliger, professioneler en eerlijker — zonder goede samenwerking in de weg te
              zitten.
            </p>
            <div>
              <Link
                href="/over-ons"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-400/10"
              >
                Lees onze missie en achtergrond
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
