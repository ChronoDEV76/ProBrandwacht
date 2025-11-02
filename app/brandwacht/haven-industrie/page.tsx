import type { Metadata } from 'next'
import { BrandwachtStubPage, buildMetadata, type BrandwachtStubConfig } from '../common'

const config: BrandwachtStubConfig = {
  slug: 'haven-industrie',
  title: 'Brandwacht haven & industrie | ProBrandwacht',
  description:
    'Vraag gecertificeerde brandwachten voor haven- en industrieprojecten aan. Eerlijke tarieven, directe contracten en vaste afspraken zonder verborgen marges.',
  canonical: 'https://www.probrandwacht.nl/brandwacht/haven-industrie',
  hero: {
    badge: 'Haven & zware industrie',
    heading: 'Brandwacht haven & industrie',
    intro:
      'Gegarandeerde betalingen, gecertificeerde brandwachten en heldere tariefopbouw. Ideaal voor laden/lossen, tankonderhoud en petrochemische stops in Rotterdam, Moerdijk en Terneuzen.',
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
      items: ['Direct contract tussen opdrachtgever en brandwacht', 'Betaalafspraken garanderen uitbetaling na uitvoering', 'Heldere 10% platformfee voor tooling & support'],
    },
  ],
}

export const metadata: Metadata = buildMetadata(config)

export default function Page() {
  return <BrandwachtStubPage {...config} />
}


{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/chrono-direct" className="underline">Chrono Direct</a>.
</div>
{/* SEO-UPGRADE END */}
