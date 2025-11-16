import type { Metadata } from 'next'
import ImportClient from './ImportClient'
import { getRouteMetadata } from '@/lib/seo/metadata'

ZZP-profielen | ProBrandwacht',
  description:
    'Upload het JSON-profiel uit het aanmeldformulier en importeer gegevens veilig in het dashboard.',
  openGraph: {
    title: 'Importeer ZZP-profielen | ProBrandwacht',
    description:
      'Upload het JSON-profiel uit het aanmeldformulier en importeer gegevens veilig in het dashboard.',
  },
  twitter: {
    card: 'summary',
    title: 'Importeer ZZP-profielen | ProBrandwacht',
    description:
      'Upload het JSON-profiel uit het aanmeldformulier en importeer gegevens veilig in het dashboard.',
  },
}
export const metadata: Metadata = getRouteMetadata('/zzp/import');



export default function ZzpImportPage() {
  const heading = <h1 className="text-2xl font-bold">Importeer ZZP-profiel (JSON)</h1>
  return <ImportClient heading={heading} />
}
