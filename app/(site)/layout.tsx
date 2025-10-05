import type { Metadata } from 'next'
import '@/styles/globals.css' // Ensure this is present
import { Inter } from 'next/font/google'
import SiteHeader from '@/components/site-header'
import dynamic from 'next/dynamic'

const AnalyticsScripts = dynamic(() => import('@/components/analytics'), { ssr: false })

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.probrandwacht.nl'),
  title: 'ProBrandwacht.nl – Het alternatieve brandwachtplatform', // Ensure this is descriptive
  description:
    'Het alternatieve brandwachtplatform: gecertificeerde professionals, duidelijke tarieven en veilige betaling.',
  keywords: [
    'brandwacht inhuren',
    'brandwacht tarieven',
    'brandveiligheid evenementen',
    'industriële brandwacht',
    'brandwacht platform',
    'probrandwacht',
  ],
  alternates: { canonical: '/' },
  other: {
    hreflang: 'nl-NL',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.probrandwacht.nl',
    siteName: 'ProBrandwacht.nl',
    title: 'ProBrandwacht.nl – Het alternatieve brandwachtplatform',
    description: 'Brandwacht inhuren in Nederland – alternatief, eerlijk en veilig.',
    images: [{ url: '/og-home.jpg', width: 1200, height: 630, alt: 'ProBrandwacht platform - A visual representation of our services' }], // Ensure alt text is descriptive
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProBrandwacht',
    creator: '@ProBrandwacht',
    images: ['/og-home.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <h1 className="sr-only">ProBrandwacht.nl</h1> // Add a hidden heading for accessibility
      <SiteHeader />
      {/* Site-level JSON-LD for LocalBusiness */}
      {[organizationJsonLd, websiteJsonLd].map((schema, index) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <AnalyticsScripts />
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
    </div>
  )
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ProBrandwacht.nl',
  url: 'https://www.probrandwacht.nl',
  serviceType: 'Brandwacht diensten',
  areaServed: {
    '@type': 'Country',
    name: 'Nederland',
  },
  logo: 'https://www.probrandwacht.nl/og.jpg',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ProBrandwacht.nl',
  url: 'https://www.probrandwacht.nl',
}
