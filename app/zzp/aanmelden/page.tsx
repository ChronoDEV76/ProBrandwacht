import type { Metadata } from 'next'
import ClientPage from './client-page'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'

const ogImage = 'https://www.probrandwacht.nl/og-home.webp'
const canonicalUrl = 'https://www.probrandwacht.nl/zzp/aanmelden'
const description =
  'Meld je gratis aan als zzp-brandwacht. Direct contact met opdrachtgevers, eerlijke tarieven en facturatie zonder verborgen kosten.'

export const metadata: Metadata = {
  title: 'ZZP brandwacht aanmelden | ProBrandwacht',
  description,
  keywords: ['brandwacht', 'brandwacht inhuren', 'brandwacht huren', 'DBA-proof brandwacht', 'brandwacht tarieven'],
  alternates: {
    canonical: canonicalUrl,
    languages: { 'nl-NL': canonicalUrl },
  },
  openGraph: {
    title: 'ZZP brandwacht aanmelden | ProBrandwacht',
    description,
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
    title: 'ZZP brandwacht aanmelden | ProBrandwacht',
    description,
    images: [ogImage],
  },
}



export default function Page() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalPlatformFaq.slice(0, 4).map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const heading = (
    <h1 className="text-3xl font-bold text-gray-900">Direct beschikbaar? Dan hoor jij erbij.</h1>
  )

  return (
    <>
      <ClientPage heading={heading} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
