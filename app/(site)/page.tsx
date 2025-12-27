import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import SeoStructuredData from '@/components/SeoStructuredData'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/')

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 3)} />

      {/* HERO */}
      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-14 pt-10">
          <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
            Werkbaar model voor samenwerking
          </span>

          <h1 className="max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl">
            Samenwerken in brandveiligheid werkt alleen
            <br className="hidden md:block" />
            als rollen, tarieven en verantwoordelijkheden vooraf vastliggen.
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht is opgezet als een rationeel samenwerkingsmodel voor zelfstandige
            brandwachten en opdrachtgevers. Geen tussenlaag die besluitvorming overneemt,
            geen onzichtbare schakels en geen beloftes — maar duidelijke afspraken die vooraf kloppen en uitlegbaar blijven.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/voor-brandwachten"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Route voor brandwachten
            </Link>

            <Link
              href="/opdrachtgevers"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Route voor opdrachtgevers
            </Link>

            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Waarom dit werkt
            </Link>
          </div>

          <p className="text-xs text-slate-400">
            ProSafetyMatch is in ontwikkeling als technische laag om afspraken, planning en
            documentatie later digitaal te ondersteunen — zonder extra schakels toe te voegen.
          </p>
        </div>
      </HeroBackground>

      {/* WAAROM DIT NODIG IS */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold md:text-3xl">
                Waar samenwerking vaak vastloopt
              </h2>

              <p className="text-sm leading-relaxed text-slate-200 md:text-base">
                In de praktijk ontstaan problemen niet door onwil, maar door onduidelijke
                afspraken. Tarieven zijn afgeleid, verantwoordelijkheden verschuiven en
                verwachtingen worden achteraf ingevuld.
              </p>

              <p className="text-sm leading-relaxed text-slate-200 md:text-base">
                Dat leidt tot discussie, juridisch risico en verlies van vertrouwen — voor
                zelfstandigen, opdrachtgevers en bemiddelende partijen.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Gevolg in de praktijk
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>– Onduidelijkheid over rol en verantwoordelijkheid</li>
                <li>– Discussie over tarief en inzet achteraf</li>
                <li>– Verhoogd DBA- en aansprakelijkheidsrisico</li>
                <li>– Afhankelijkheid zonder expliciete afspraken</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HET MODEL */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
            Hoe ProBrandwacht dit anders inricht
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-emerald-300">
                1. Directe relatie
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                De zelfstandige brandwacht werkt rechtstreeks met de opdrachtgever.
                Er is geen onzichtbare laag die beslissingen of marges overneemt.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-sky-300">
                2. Afspraken vooraf vastgelegd
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Rol, inzet, tarief en verantwoordelijkheden worden vooraf afgestemd
                en blijven inzichtelijk voor beide partijen.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-violet-300">
                3. Autonomie blijft intact
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Geen exclusiviteit, geen tariefsturing en geen planning namens de
                professional. De zzp’er blijft ondernemer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VOOR WIE */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
            Voor wie dit model werkt
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-emerald-300">
                Zelfstandige brandwachten
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Voor professionals die zelfstandig willen blijven werken, maar
                behoefte hebben aan duidelijke kaders en uitlegbare afspraken.
              </p>
              <Link
                href="/voor-brandwachten"
                className="mt-4 inline-block text-sm font-semibold text-emerald-200 hover:text-emerald-100"
              >
                Bekijk de route →
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-sky-300">
                Opdrachtgevers & bureaus
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Voor partijen die professioneel willen samenwerken met zelfstandigen
                en behoefte hebben aan duidelijkheid, compliance en rust in uitvoering.
              </p>
              <Link
                href="/opdrachtgevers"
                className="mt-4 inline-block text-sm font-semibold text-sky-200 hover:text-sky-100"
              >
                Bekijk de route →
              </Link>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm leading-relaxed text-slate-200">
              ProBrandwacht is geen platform dat overtuigt, maar een systeem dat standhoudt.
              Als samenwerking klopt, hoeft die niet verkocht te worden.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
