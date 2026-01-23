import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import AfbakeningNote from '@/components/afbakening-note'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/aanmelden')

export default function AanmeldenPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-4xl px-6 pb-10 pt-14">
          <h1 className="text-2xl font-semibold">Verkennende intake</h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Deze intake is bedoeld voor zelfstandigen die willen onderzoeken of
            1-op-1 samenwerking zonder klassiek bureau bij hen past. ProBrandwacht
            geeft context en duiding; het is geen route naar gegarandeerde inzet.
          </p>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-xl border border-slate-800 p-6">
          <h2 className="text-lg font-semibold">Wat je wel krijgt</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>Uitleg over rolafbakening en verantwoordelijkheden</li>
            <li>Context over afspraken die vooraf helder moeten zijn</li>
            <li>Inzicht in hoe zelfstandig samenwerken uitlegbaar blijft</li>
          </ul>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 p-6">
          <h2 className="text-lg font-semibold">Wat je niet krijgt</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>Geen garantie op inzet of beschikbaarheid</li>
            <li>Geen planning, aansturing of tussenlaag</li>
            <li>Geen beloftes over vervolg of timing</li>
          </ul>
        </div>

        <div className="mt-10 rounded-xl border border-slate-800 p-6">
          <p className="text-sm text-slate-300">
            <strong>Formulier hier</strong> (jouw component/flow).
          </p>

          <p className="mt-4 text-xs text-slate-400">
            Door je intake te versturen bevestig je dat je begrijpt dat ProBrandwacht
            een orienterend initiatief is en geen klassiek bureau of tussenlaag.
            Deelname is vrijwillig en contextafhankelijk.
          </p>
        </div>

        <div className="mt-8">
          <Link href="/over-ons" className="btn-secondary">
            Lees de uitgangspunten
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <AfbakeningNote />
      </section>
    </main>
  )
}
