import type { Metadata } from 'next'
import ClientPage from './client-page'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

const ogImage = 'https://www.probrandwacht.nl/og-home.webp'
const canonicalUrl = 'https://www.probrandwacht.nl/zzp/aanmelden'
const description =
  'Verkennende intake voor zelfstandige brandwachten. Geen inschrijving en geen garanties, wel toetsen of samenwerking past bij rol, verantwoordelijkheid en uitvoerbaarheid.'

export const metadata = {
  title: 'Verkennende intake voor zelfstandige brandwachten | ProBrandwacht',
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
    title: 'Verkennende intake voor zelfstandige brandwachten | ProBrandwacht',
    description,
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'ProBrandwacht.nl' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verkennende intake voor zelfstandige brandwachten | ProBrandwacht',
    description,
    images: [ogImage],
  },
  robots: { index: false, follow: false },
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

  const heading = (
    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
      Verkennende intake voor zelfstandige brandwachten
    </h1>
  )

  return (
    <>
      <ClientPage heading={heading} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
