import type { Metadata } from 'next'

import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/disclaimer')

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen space-y-8 bg-slate-950 px-6 py-24 text-slate-50">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-semibold">Juridische positie</h1>

        <p className="text-slate-200">
          ProBrandwacht is een informatief en verkennend platform.
          Wij zijn geen bemiddelaar, geen opdrachtgever en geen opdrachtnemer.
        </p>

        <p className="text-slate-200">
          Alle afspraken, verantwoordelijkheden en samenwerkingen komen
          rechtstreeks tot stand tussen betrokken partijen.
        </p>

        <p className="text-slate-200">
          We baseren onze uitleg op ervaring in de praktijk met inzet,
          rolverdeling en DBA-bewuste samenwerking in de sector.
        </p>

        <p className="text-sm text-slate-400">
          De uiteindelijke beoordeling van arbeidsrelaties blijft
          contextafhankelijk en ligt bij de betrokken partijen en bevoegde instanties.
        </p>
      </div>
    </main>
  )
}
