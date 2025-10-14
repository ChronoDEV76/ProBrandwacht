import type { Metadata } from 'next'

export const baseMeta: Metadata = {
  metadataBase: new URL('https://www.probrandwacht.nl'),
  applicationName: 'ProBrandwacht.nl',
  openGraph: {
    type: 'website',
    siteName: 'ProBrandwacht.nl',
  },
  alternates: {
    languages: {
      'nl-NL': '/',
    },
  },
}
