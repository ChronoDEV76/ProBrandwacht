import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import SeoStructuredData from '@/components/SeoStructuredData'
import type { Metadata } from 'next'
import { getRouteMetadata } from '@/lib/seo/metadata'

const canonicalUrl = 'https://www.probrandwacht.nl/disclaimer'

export const metadata: Metadata = getRouteMetadata('/disclaimer')

export default function DisclaimerPage() {
  const title = 'Disclaimer | ProBrandwacht'
  const description =
    'Lees hoe informatie en rekenvoorbeelden op ProBrandwacht.nl bedoeld zijn: indicatief, ter bewustwording en zonder garanties.'

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Disclaimer', url: canonicalUrl },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData
        article={{
          title,
          description,
          url: canonicalUrl,
        }}
      />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <StructuredBreadcrumbs items={breadcrumbItems} />

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 md:p-10">
          <div className="space-y-4 text-sm text-gray-800">
            <h1 className="text-3xl font-semibold text-slate-900">
              Disclaimer
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Transparantie is belangrijk. Deze disclaimer verduidelijkt hoe informatie op
              ProBrandwacht.nl bedoeld is.
            </p>

            <h2 className="mt-6 text-lg font-semibold">Informatie en voorbeelden</h2>
            <p>
              Alle informatie, tarieven, rekenvoorbeelden en scenario’s op ProBrandwacht.nl zijn
              indicatief. Ze zijn bedoeld ter bewustwording en voorbereiding, niet als advies of
              garantie.
            </p>

            <h2 className="mt-6 text-lg font-semibold">Geen juridisch of fiscaal advies</h2>
            <p>
              ProBrandwacht verstrekt geen juridisch, fiscaal of financieel advies. Voor
              specifieke situaties raden wij aan een deskundige te raadplegen.
            </p>

            <h2 className="mt-6 text-lg font-semibold">Wet DBA</h2>
            <p>
              ProBrandwacht werkt DBA-bewust: we stimuleren heldere afspraken en rolverdeling.
              De uiteindelijke beoordeling van arbeidsrelaties blijft altijd contextafhankelijk
              en ligt bij de samenwerkende partijen en bevoegde instanties.
            </p>

            <h2 className="mt-6 text-lg font-semibold">Aansprakelijkheid</h2>
            <p>
              ProBrandwacht en Chrono4Solutions zijn niet aansprakelijk voor directe of indirecte
              schade die voortvloeit uit het gebruik van deze website of de daarop gepubliceerde
              informatie.
            </p>

            <h2 className="mt-6 text-lg font-semibold">Externe links</h2>
            <p>
              Verwijzingen naar externe websites zijn uitsluitend ter informatie. Wij zijn niet
              verantwoordelijk voor de inhoud of werking van externe bronnen.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
