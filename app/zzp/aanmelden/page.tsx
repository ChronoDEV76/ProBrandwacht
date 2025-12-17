import type { Metadata } from 'next'
import ClientPage from './client-page'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

const ogImage = 'https://www.probrandwacht.nl/og-home.webp'
const canonicalUrl = 'https://www.probrandwacht.nl/zzp/aanmelden'
const description =
  'Werk als een professional. Ondernemend en vrij. Meld je gratis aan als zzp-brandwacht, bepaal je tarief en kies opdrachten die bij je passen — DBA-bewust en eerlijk.'

export const metadata = {
  title: 'ZZP brandwacht aanmelden | ProBrandwacht',
  description,
  keywords: [
    'brandwacht',
    'brandwacht inhuren',
    'brandwacht huren',
    'wet dba brandwacht',
    'brandwacht tarieven',
  ],
  alternates: {
    canonical: canonicalUrl,
    languages: { 'nl-NL': canonicalUrl },
  },
  openGraph: {
    title: 'ZZP brandwacht aanmelden | ProBrandwacht',
    description,
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'ProBrandwacht.nl' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZZP brandwacht aanmelden | ProBrandwacht',
    description,
    images: [ogImage],
  },
};

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

  return (
    <>
      <ClientPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
