import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import SeoStructuredData from '@/components/SeoStructuredData'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/')

export default function HomePage() {
  const breadcrumbItems = [{ name: 'Home', url: 'https://www.probrandwacht.nl/' }]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 4)} />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-14 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            ProBrandwacht
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-5xl">
            Voor opdrachtgevers die{' '}
            <span className="text-emerald-300">helderheid vóór uitvoering</span> willen,
            <br className="hidden md:block" />
            en voor brandwachten die{' '}
            <span className="text-emerald-300">verantwoordelijkheid</span> durven te dragen.
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht is geen “werk-belofte” en geen klassiek bureau. Het is een voorloper op
            ProSafetyMatch: een DBA-bewuste manier van samenwerken waarbij tarief, inzet en rolverdeling
            <strong className="font-semibold text-slate-100"> vooraf</strong> worden afgestemd — in de regel direct tussen
            opdrachtgever en zelfstandige.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/opdrachtgevers"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/30 transition hover:bg-white/10"
            >
              Ik wil onderzoeken of deze manier van samenwerken bij mij past
            </Link>
            <Link
              href="/voor-brandwachten"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ik wil verkennen als brandwacht (zzp)
            </Link>
            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ik wil de kaders begrijpen
            </Link>
          </div>
          <p className="text-xs text-slate-300">
            Geen beloftes. Geen verplichtingen. Wel verantwoordelijkheid.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              {
                t: 'Spoed = kort & scherp',
                d: 'Voor uitvragen waar snelheid telt. Matching is afhankelijk van beschikbaarheid en locatie.',
              },
              {
                t: 'Selectief netwerk',
                d: 'We bouwen met vakmensen die situatie-gedrag en verantwoordelijkheid kunnen dragen (niet iedereen past).',
              },
              {
                t: 'Transparantie over kosten',
                d: 'Je ziet de opbouw en afspraken. Geen marketing-rookgordijnen; wél uitlegbaarheid.',
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)]"
              >
                <p className="text-sm font-semibold text-white">{x.t}</p>
                <p className="mt-2 text-sm text-slate-200">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              Wat je hier wél en niet mag verwachten
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Geen garantie op werk of bezetting — inzet is contextafhankelijk.</li>
              <li>• Wel: duidelijke kaders, directe afstemming en toetsbare afspraken.</li>
              <li>• Brandwachten komen op een wachtlijst; selectie kan onderdeel zijn van onboarding.</li>
            </ul>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <h2 className="text-lg font-semibold text-white">Dit platform is waarschijnlijk niet voor jou als:</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Je zoekt naar een partij die werk voor je regelt.</li>
              <li>• Je liever gestuurd wordt dan zelf verantwoordelijk bent.</li>
              <li>• Je DBA ziet als papierwerk in plaats van gedrag.</li>
            </ul>
          </div>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Voor opdrachtgevers</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Snel schakelen, zonder ruis</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                Je plaatst een uitvraag met locatie, rol en randvoorwaarden. Bij spoed kan dit via een korte funnel
                met directe communicatie. Betaling en afspraken zijn afhankelijk van het gekozen scenario.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/opdrachtgevers"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Ik wil verkennen als opdrachtgever
                </Link>
                <Link
                  href="/disclaimer"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Ik wil de DBA-kaders kennen
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Voor brandwachten</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Ondernemerschap mét rugdekking</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                Jij blijft zelfstandig. Tegelijk maken we zichtbaar wat “verantwoordelijkheid op de vloer” betekent:
                rolbegrip, communicatie, dossier-discipline en professioneel gedrag onder druk.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/voor-brandwachten"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Ik wil verkennen als brandwacht
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Ik wil de kennisbank lezen
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Volgende stap (oriëntatie)</p>
            <p className="mt-3 text-sm text-slate-200">
              Geen funnel, wel richting. Kies een rustig startpunt dat bij je past.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/bewust-zelfstandig-werken"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Lees hoe wij naar verantwoordelijkheid kijken
              </Link>
              <Link
                href="/probrandwacht-direct-spoed"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Bekijk hoe een spoedinzet is ingericht
              </Link>
              <Link
                href="/missie"
                className="inline-flex items-start justify-center rounded-2xl border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <span className="text-left">
                  <span className="block">Ik wil mij verdiepen in samenwerken zonder bureau-sturing</span>
                  <span className="mt-1 block text-xs font-normal text-slate-300">
                    Voor professionals die autonomie ook in de praktijk dragen.
                  </span>
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">Contact & transparantie</p>
            <p className="mt-2 text-sm text-slate-200">
              Vragen of een scenario bespreken? Neem contact op via{' '}
              <a className="underline hover:text-white" href="mailto:info@prosafetymatch.nl">
                info@prosafetymatch.nl
              </a>
              . Reageertijden zijn afhankelijk van drukte.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
