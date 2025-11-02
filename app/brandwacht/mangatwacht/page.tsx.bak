import type { Metadata } from 'next'
import { BrandwachtStubPage, buildMetadata, type BrandwachtStubConfig } from '../common'

const config: BrandwachtStubConfig = {
  slug: 'mangatwacht',
  title: 'Mangatwacht & buitenwacht | ProBrandwacht',
  description:
    'Zorg voor veilige toegang tot besloten ruimten met gecertificeerde mangatwachten. Tarieftransparantie, gasmeting en poort-QR logging inbegrepen.',
  canonical: 'https://www.probrandwacht.nl/brandwacht/mangatwacht',
  hero: {
    badge: 'Besloten ruimten',
    heading: 'Mangatwacht en buitenwacht inhuren',
    intro:
      'Voor besloten ruimten heb je controle over gasmetingen, toegangsregistratie en reddingsmiddelen nodig. Onze buitenwachten werken met poort-QR, incidente logs en escrow voor gegarandeerde uitbetaling.',
  },
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
      items: ['Tarief en planning bepaal je direct met de professional', 'Escrow-betalingen voor zekerheid bij 24/7 diensten', 'Rapportage voor audits en evaluaties'],
    },
  ],
}

export const metadata: Metadata = buildMetadata(config)

export default function Page() {
  return <BrandwachtStubPage {...config} />
}
