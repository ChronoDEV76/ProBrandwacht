import type { Metadata } from 'next'
import { BrandwachtStubPage, buildMetadata, type BrandwachtStubConfig } from '../common'

const config: BrandwachtStubConfig = {
  slug: 'haven-industrie',
  title: 'Brandwacht haven & industrie | ProBrandwacht',
  description:
    'Vraag gecertificeerde brandwachten voor haven- en industrieprojecten aan. Transparante tarieven, directe contracten en escrow-betalingen zonder verborgen marges.',
  canonical: 'https://www.probrandwacht.nl/brandwacht/haven-industrie',
  hero: {
    badge: 'Haven & zware industrie',
    heading: 'Brandwacht haven & industrie',
    intro:
      'Escrow-betalingen, gecertificeerde brandwachten en transparante tariefopbouw. Ideaal voor laden/lossen, tankonderhoud en petrochemische stops in Rotterdam, Moerdijk en Terneuzen.',
  },
  bullets: [
    {
      heading: 'Wanneer inzetbaar',
      items: ['Heetwerk en onderhoud in terminals en raffinaderijen', '24/7 ploegendiensten tijdens turnarounds', 'Extra toezicht bij laden/lossen van gevaarlijke stoffen'],
    },
    {
      heading: 'Certificaten & checks',
      items: ['VCA VOL, BHV, ademlucht, mangatwacht/gasmeting', 'Documentcontrole en iDIN-verificatie per professional', 'Auditlog met certificaatstatus voor compliance'],
    },
    {
      heading: 'Werken zonder tussenlaag',
      items: ['Direct contract tussen opdrachtgever en brandwacht', 'Escrow garandeert uitbetaling na uitvoering', 'Transparante 10% platformfee voor tooling & support'],
    },
  ],
}

export const metadata: Metadata = buildMetadata(config)

export default function Page() {
  return <BrandwachtStubPage {...config} />
}
