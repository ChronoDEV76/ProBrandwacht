import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import DisclaimerContent from '@/components/disclaimer-content'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/disclaimer')

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-5xl px-4 pb-10 pt-14">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
              Disclaimer
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Juridische positie en verantwoordelijkheid in context.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is een onafhankelijk kennisplatform over brandwacht-inzet, rollen en
              verantwoordelijkheden. Het biedt context en praktische kaders zodat samenwerking beter
              voorbereid is.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/belangen" className="route-link">
                Intentie & afbakening
              </Link>
              <Link href="/contact" className="route-link">
                Verkennend contact
              </Link>
            </div>
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="panel p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Definitieve disclaimer</h2>
          <DisclaimerContent className="mt-4" />

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-200">
            <p className="font-semibold text-slate-100">Vaste rolafbakening (woord voor woord)</p>
            <p className="mt-2 text-xs text-slate-400">
              Deze opsomming is definitief en wordt niet herschreven.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>ProBrandwacht is geen bureau</li>
              <li>ProBrandwacht is geen werkgever</li>
              <li>ProBrandwacht is geen contractpartij</li>
              <li>ProBrandwacht stuurt niet op inzet, tarief of uitkomst</li>
              <li>ProBrandwacht biedt geen garanties</li>
              <li>ProBrandwacht is geen compliance-instrument</li>
            </ul>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Meer context? Bekijk de{' '}
            <Link href="/faq" className="underline underline-offset-4">
              FAQ
            </Link>{' '}
            over de werkwijze.
          </p>
        </div>
      </section>
    </main>
  )
}
