import type { Metadata } from 'next'
import { BrandwachtStubPage, buildMetadata, type BrandwachtStubConfig } from '../common'
import { getRouteMetadata } from '@/lib/seo/metadata'

const config: BrandwachtStubConfig = {
  slug: 'turnaround-stop',
  title: 'Brandwacht turnaround & stop | ProBrandwacht',
  description:
    'Zet brandwachtteams in voor turnarounds en onderhoudsstops. Heldere betalingen, ploegendienstplanning en gecertificeerde professionals zonder tussenlaag.',
  canonical: 'https://www.probrandwacht.nl/brandwacht/turnaround-stop',
  hero: {
    badge: 'Turnaround & stop',
    heading: 'Brandwacht turnaround & stop',
    intro:
      'Voor revisies en onderhoudsstops heb je een flexibel, gecertificeerd team nodig. Wij tonen direct tariefopbouw, certificaatstatus en ploegendiensten zodat je veilig kunt opschalen.',
  },
  headingSlot: (
    <h1 className="text-3xl font-semibold tracking-tight">Brandwacht turnaround &amp; stop</h1>
  ),
  bullets: [
    {
      heading: 'Wat regelen we',
      items: [
        'Ploegenroosters voor 24/7 inzet',
        'Realtime ploegwissels en updates in ProBrandwacht Direct',
        'Afgesproken betalingen per ploeg of pakket',
        'Rapportages voor SHEQ & audits',
      ],
    },
    {
      heading: 'Certificering',
      items: ['BHV, VCA VOL, ademlucht', 'Mangatwacht/buitenwacht', 'Heetwerkwacht & gasmeten'],
    },
    {
      heading: 'Samenwerking',
      items: ['Direct contract opdrachtgever ↔ brandwacht', 'Heldere 15% platformfee', 'Realtime status van documenten en pasjes'],
    },
  ],
}
export const metadata: Metadata = getRouteMetadata('/brandwacht/turnaround-stop');



export default function Page() {
  return <BrandwachtStubPage {...config} />
}


{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/probrandwacht-direct" className="underline">ProBrandwacht Direct</a>.
</div>
{/* SEO-UPGRADE END */}
