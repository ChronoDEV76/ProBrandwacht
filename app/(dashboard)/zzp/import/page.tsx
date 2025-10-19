import type { Metadata } from 'next'
import ImportClient from './ImportClient'

export const metadata: Metadata = {
  title: 'Importeer ZZP-profielen | ProBrandwacht',
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

export default function ZzpImportPage() {
  return <ImportClient />
}
