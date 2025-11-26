import type { Metadata } from 'next'
import { BrandwachtStubPage, buildMetadata, type BrandwachtStubConfig } from '../common'
import { getRouteMetadata } from '@/lib/seo/metadata'

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
      'We borgen tijdige betalingen, werken uitsluitend met gecertificeerde brandwachten en leggen de tariefopbouw vooraf vast. Voor heetwerktoezicht zet je direct een brandwacht in en bij incidenten staat er een vakvolwassen veiligheidsprofessional voor je klaar.',
  },
  headingSlot: (
    <h1 className="text-3xl font-semibold tracking-tight">Brandwacht haven &amp; industrie</h1>
  ),
  bullets: [
    {
      heading: 'Wanneer inzetbaar',
      items: [
        'Brandwacht voor heet werk inhuren bij terminals en raffinaderijen',
        '24/7 ploegendiensten tijdens turnarounds en nachtbeveiliging tijdelijk',
        'Brandwacht voor laden/lossen van gevaarlijke stoffen',
      ],
    },
    {
      heading: 'Certificaten & checks',
      items: ['VCA VOL, BHV, ademlucht, brandwacht, gascertificaat', 'Documentcontrole en iDIN-verificatie per professional', 'Auditlog met certificaatstatus voor compliance'],
    },
    {
      heading: 'Werken zonder tussenlaag',
      items: ['Direct contract tussen opdrachtgever en brandwacht', 'Betaalafspraken garanderen uitbetaling na uitvoering', 'Heldere 10% platformfee voor tooling & support'],
    },
  ],
}
export const metadata: Metadata = getRouteMetadata('/brandwacht/haven-industrie');



export default function Page() {
  return <BrandwachtStubPage {...config} />
}


{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/probrandwacht-direct" className="underline">ProBrandwacht Direct</a>.
</div>
{/* SEO-UPGRADE END */}
