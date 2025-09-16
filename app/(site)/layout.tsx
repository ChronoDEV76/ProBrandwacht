import type { Metadata } from 'next'
import '@/styles/globals.css'
import SiteHeader from '@/components/site-header'
import { Inter } from 'next/font/google'
import AnalyticsScripts from '@/components/analytics'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.probrandwacht.nl'),
  title: 'ProBrandwacht.nl – Brandwacht inhuren (NL)',
  description:
    'Transparant brandwachtplatform: gecertificeerde professionals, eerlijke tarieven en veilige betaling.',
  alternates: { canonical: '/' },
  other: {
    hreflang: 'nl-NL',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.probrandwacht.nl',
    siteName: 'ProBrandwacht.nl',
    title: 'ProBrandwacht.nl',
    description: 'Brandwacht inhuren in Nederland – transparant en veilig.',
    images: ['/og.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`bg-gradient-to-b from-brand-50 to-white text-slate-800 ${inter.className}`}>
        <AnalyticsScripts />
        <SiteHeader />
        {/* Site-level JSON-LD for LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'ProBrandwacht.nl',
              url: 'https://www.probrandwacht.nl',
              areaServed: 'NL',
            }),
          }}
        />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      </body>
    </html>
  )
}
