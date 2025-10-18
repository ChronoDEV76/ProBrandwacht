import type { Metadata } from 'next'
import ClientPage from './client-page'

const ogImage = 'https://www.probrandwacht.nl/og-home.jpg'
const canonicalUrl = 'https://www.probrandwacht.nl/zzp/aanmelden'

export const metadata: Metadata = {
  title: 'ZZP Brandwacht aanmelden – gratis profiel & directe opdrachten | ProBrandwacht',
  description:
    'Meld je gratis aan als ZZP brandwacht. Direct contact met opdrachtgevers, eerlijke tarieven en facturatie zonder verborgen kosten.',
  alternates: {
    canonical: canonicalUrl,
    languages: { 'nl-NL': canonicalUrl },
  },
  openGraph: {
    title: 'ZZP Brandwacht aanmelden – gratis profiel & directe opdrachten | ProBrandwacht',
    description:
      'Meld je gratis aan als ZZP brandwacht. Direct contact met opdrachtgevers, eerlijke tarieven en facturatie zonder verborgen kosten.',
    url: canonicalUrl,
    siteName: 'ProBrandwacht.nl',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'ZZP brandwacht aanmelden via ProBrandwacht.nl',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProBrandwacht',
    creator: '@ProBrandwacht',
    title: 'ZZP Brandwacht aanmelden – gratis profiel & directe opdrachten | ProBrandwacht',
    description:
      'Meld je gratis aan als ZZP brandwacht. Direct contact met opdrachtgevers, eerlijke tarieven en facturatie zonder verborgen kosten.',
    images: [ogImage],
  },
}

export default function Page() {
  return <ClientPage />
}
