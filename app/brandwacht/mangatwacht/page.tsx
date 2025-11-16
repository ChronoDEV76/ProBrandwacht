import type { Metadata } from 'next'
import { BrandwachtStubPage, buildMetadata, type BrandwachtStubConfig } from '../common'
import { getRouteMetadata } from '@/lib/seo/metadata'

const config: BrandwachtStubConfig = {
  slug: 'mangatwacht',
  title: 'Mangatwacht & buitenwacht | ProBrandwacht',
  description:
    'Zorg voor veilige toegang tot besloten ruimten met gecertificeerde mangatwachten. Helder tariefinzicht, gasmeting en poort-QR logging inbegrepen.',
  canonical: 'https://www.probrandwacht.nl/brandwacht/mangatwacht',
  hero: {
    badge: 'Besloten ruimten',
    heading: 'Mangatwacht en buitenwacht inhuren',
    intro:
      'Voor besloten ruimten heb je controle over gasmetingen, toegangsregistratie en reddingsmiddelen nodig. Onze buitenwachten werken met poort-QR, incidentenlogs en vooraf afgestemde betaalafspraken.',
  },
  headingSlot: (
    <h1 className="text-3xl font-semibold tracking-tight">Mangatwacht en buitenwacht inhuren</h1>
  ),
  bullets: [
    {
      heading: 'Takenpakket',
      items: ['Toegangscontrole en gasvrij-verklaringen', 'Registratie van in- en uitstappers via poort-QR', 'Reddingsplan en communicatieprotocol gereed'],
    },
    {
      heading: 'Controle & middelen',
      items: ['Gasmetingen Ex-Ox-Tox met kalibratiecertificaten', 'Beschikbare reddingsmiddelen en communicatie sets', 'Adembescherming en ATEX-training beschikbaar'],
    },
    {
      heading: 'Samenwerking',
      items: ['Tarief en planning bepaal je direct met de professional', 'Betaalafspraken vastgelegd voor zekerheid bij 24/7 diensten', 'Rapportage voor audits en evaluaties'],
    },
  ],
}
export const metadata: Metadata = getRouteMetadata('/brandwacht/mangatwacht');



export default function Page() {
  return <BrandwachtStubPage {...config} />
}


{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/probrandwacht-direct" className="underline">ProBrandwacht Direct</a>.
</div>
{/* SEO-UPGRADE END */}
