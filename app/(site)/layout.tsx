import localFont from 'next/font/local'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import SiteHeader from '@/components/site-header'

const roboto = localFont({
  src: [{ path: '../../public/fonts/Roboto-Regular.ttf', weight: '400', style: 'normal' }],
  display: 'swap',
})

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
    images: [{ url: '/og-home.webp', width: 1200, height: 630, alt: 'ProBrandwacht platform - A visual representation of our services' }], // Ensure alt text is descriptive
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProBrandwacht',
    creator: '@ProBrandwacht',
    images: ['/og-home.webp'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = headers()
  const currentPath = headerList.get('next-url') ?? '/'
  const isHome = currentPath === '/'

  return (
    <div className={`${roboto.className} relative flex min-h-screen flex-1 flex-col text-slate-50`}>
      <span className="sr-only">ProBrandwacht.nl</span>
      <SiteHeader />
      {/* Site-level JSON-LD for LocalBusiness */}
      {[organizationJsonLd, websiteJsonLd].map((schema, index: number) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <main
        className={`flex-1 w-full ${
          isHome ? 'max-w-none px-0 py-0' : 'mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8'
        }`}
      >
        {children}
      </main>
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
