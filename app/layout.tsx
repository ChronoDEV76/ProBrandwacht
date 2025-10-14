import '@/styles/globals.css'
import type { Metadata } from 'next'
import SeoStructuredData from '@/components/SeoStructuredData'

export const metadata: Metadata = {
  title: 'ProBrandwacht.nl | Brandwacht inhuren & transparante tarieven',
  description:
    'Huur een brandwacht in zonder tussenbureau. ProBrandwacht.nl – transparante tarieven, DBA-proof samenwerking en escrow-betaling via ProSafetyMatch.',
  metadataBase: new URL('https://www.probrandwacht.nl'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="bg-white text-slate-900">
        {/* 🧠 Globale SEO-schema’s */}
        <SeoStructuredData
          website={{ name: 'ProBrandwacht.nl', url: 'https://www.probrandwacht.nl' }}
          breadcrumbs={[
            { name: 'Home', item: 'https://www.probrandwacht.nl/' },
            { name: 'Tools', item: 'https://www.probrandwacht.nl/tools' },
            { name: 'Tarieven', item: 'https://www.probrandwacht.nl/tools/tarieven' },
          ]}
        />
        {children}
      </body>
    </html>
  )
}
