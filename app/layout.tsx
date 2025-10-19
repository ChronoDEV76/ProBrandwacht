import '@/styles/globals.css'
import type { Metadata } from 'next'
import SeoStructuredData from '@/components/SeoStructuredData'
import { headers } from 'next/headers'

const SITE_BASE_URL = 'https://www.probrandwacht.nl'

const SEGMENT_LABELS: Record<string, string> = {
  tools: 'Tools',
  tarieven: 'Tarieven',
  steden: 'Regio tarieven',
  missie: 'Missie',
  blog: 'Blog',
  faq: 'FAQ',
  opdrachtgevers: 'Opdrachtgevers',
  brandwacht: 'Brandwacht',
  'brandwacht-inhuren': 'Brandwacht inhuren',
  zzp: 'ZZP',
  aanmelding: 'Aanmelding',
  aanmelden: 'Aanmelden',
  seo: 'SEO',
  'seo-resources': 'SEO resources',
}

function buildBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: { name: string; item: string }[] = [
    { name: 'Home', item: `${SITE_BASE_URL}/` },
  ]

  let cumulativePath = ''
  segments.forEach(segment => {
    cumulativePath += `/${segment}`
    const normalizedSegment = segment.toLowerCase()
    const label = SEGMENT_LABELS[normalizedSegment] ?? titleizeSegment(normalizedSegment)
    breadcrumbs.push({ name: label, item: `${SITE_BASE_URL}${cumulativePath}` })
  })

  return breadcrumbs
}

function titleizeSegment(segment: string) {
  if (!segment) return segment
  return segment
    .split('-')
    .map(part => {
      if (!part) return part
      if (part.length <= 3) {
        return part.toUpperCase()
      }
      return part.charAt(0).toUpperCase() + part.slice(1)
    })
    .join(' ')
}

export const metadata: Metadata = {
  title: 'ProBrandwacht.nl | Brandwacht inhuren & transparante tarieven',
  description:
    'Huur een brandwacht in zonder tussenbureau. ProBrandwacht.nl – transparante tarieven, DBA-proof samenwerking en escrow-betaling via ProSafetyMatch.',
  metadataBase: new URL('https://www.probrandwacht.nl'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = headers()
  const nextUrl = headerList.get('next-url') ?? '/'
  const currentUrl = new URL(nextUrl, SITE_BASE_URL)
  const breadcrumbs = buildBreadcrumbs(currentUrl.pathname)

  return (
    <html lang="nl">
      <body className="bg-white text-slate-900">
        {/* 🧠 Globale SEO-schema’s */}
        <SeoStructuredData
          website={{ name: 'ProBrandwacht.nl', url: SITE_BASE_URL }}
          breadcrumbs={breadcrumbs}
        />
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
