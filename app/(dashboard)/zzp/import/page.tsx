import type { Metadata } from 'next'
import ImportClient from './ImportClient'
import { getRouteMetadata } from '@/lib/seo/metadata'

const description =
  'Upload het JSON-profiel uit het aanmeldformulier en importeer gegevens veilig in het dashboard.';

export const metadata = {
  title: 'Importeer ZZP-profielen | ProBrandwacht',
  description,
  openGraph: {
    title: 'Importeer ZZP-profielen | ProBrandwacht',
    description,
  },
};

export default function ZzpImportPage() {
  const heading = <h1 className="text-2xl font-bold">Importeer ZZP-profiel (JSON)</h1>
  return <ImportClient heading={heading} />
}
