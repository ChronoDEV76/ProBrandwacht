// next-seo.config.ts
import type { NextSeoProps } from 'next-seo'

const config: NextSeoProps = {
  titleTemplate: '%s | ProBrandwacht',
  defaultTitle: 'ProBrandwacht — Duiding in de brandwachtenmarkt',
  openGraph: {
    siteName: 'ProBrandwacht',
    type: 'website',
    locale: 'nl_NL',
    images: [
      {
        url: 'https://www.probrandwacht.nl/og-home.webp',
        width: 1200,
        height: 630,
        alt: 'ProBrandwacht',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
}
export default config
