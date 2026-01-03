import type { Metadata } from 'next'
import Link from 'next/link'

import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/aanmelden')

export default function AanmeldenPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-2xl font-semibold">Interesse voor de verkenningsfase</h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          Deze aanmelding is bedoeld voor zelfstandigen die willen onderzoeken
          of directe samenwerking zonder bureau bij hen past. Het platform biedt
          geen garantie op inzet. Niet iedere aanmelding leidt tot deelname.
        </p>

        <div className="mt-10 rounded-xl border border-slate-800 p-6">
          <h2 className="text-lg font-semibold">Wat je wel krijgt</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>Updates over pilots en testmomenten</li>
            <li>Uitnodigingen voor feedback (vrijblijvend)</li>
            <li>Heldere uitleg over de opzet en uitgangspunten</li>
          </ul>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 p-6">
          <h2 className="text-lg font-semibold">Wat je niet krijgt</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>Geen garantie op inzet of inkomensbelofte</li>
            <li>Geen planning, aansturing of bemiddeling</li>
            <li>Geen instroom = toegang: selectie kan per fase verschillen</li>
          </ul>
        </div>

        <div className="mt-10 rounded-xl border border-slate-800 p-6">
          <p className="text-sm text-slate-300">
            <strong>Formulier hier</strong> (jouw component/flow).
          </p>

          <p className="mt-4 text-xs text-slate-400">
            Door je interesse door te geven bevestig je dat je begrijpt dat
            ProBrandwacht een orienterend platform is en geen bureau of
            bemiddelaar. Deelname is vrijwillig en contextafhankelijk.
          </p>
        </div>

        <div className="mt-8">
          <Link href="/over-ons" className="btn-secondary">
            Lees de uitgangspunten
          </Link>
        </div>
      </section>
    </main>
  )
}
