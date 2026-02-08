import type { Metadata } from 'next'

export const baseMeta: Metadata = {
  metadataBase: new URL('https://www.probrandwacht.nl'),
  applicationName: 'ProBrandwacht',
  openGraph: {
    type: 'website',
    siteName: 'ProBrandwacht',
  },
  alternates: {
    languages: {
      'nl-NL': '/',
    },
  },
}
