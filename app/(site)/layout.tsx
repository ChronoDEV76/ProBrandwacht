import type { Metadata } from 'next'
import '@/styles/globals.css'
import SiteHeader from '@/components/site-header'

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
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      </body>
    </html>
  )
}
