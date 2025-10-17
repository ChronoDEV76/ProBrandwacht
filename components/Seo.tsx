'use client'

import { NextSeo, ArticleJsonLd, FAQPageJsonLd, OrganizationJsonLd } from 'next-seo'

type FAQ = { question: string; answer: string }

type ArticleMeta = {
  url: string
  datePublished?: string
  dateModified?: string
  images?: string[]
  authorName?: string | string[]
}

type SeoProps = {
  title: string
  description: string
  canonical?: string
  image?: string
  type?: 'article' | 'website'
  noindex?: boolean
  article?: ArticleMeta
  faqs?: FAQ[]
  includeOrganization?: boolean
}

const SITE_URL = 'https://www.probrandwacht.nl'
const abs = (url?: string) => {
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  try {
    return new URL(url, SITE_URL).toString()
  } catch {
    return undefined
  }
}

export default function Seo({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex,
  article,
  faqs,
  includeOrganization = true,
}: SeoProps) {
  const canonicalUrl = abs(canonical)
  const imageUrl = abs(image)

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonicalUrl}
        noindex={noindex}
        openGraph={{
          url: canonicalUrl,
          title,
          description,
          type,
          images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : undefined,
          siteName: 'ProBrandwacht',
        }}
        twitter={{ cardType: 'summary_large_image' }}
      />

      {includeOrganization && (
        <OrganizationJsonLd
          type="Organization"
          id={`${SITE_URL}#organization`}
          name="ProBrandwacht"
          url={SITE_URL}
          logo={`${SITE_URL}/logo.png`}
          sameAs={['https://www.linkedin.com/company/probrandwacht', 'https://x.com/ProBrandwacht']}
        />
      )}

      {article && (() => {
        const published = article.datePublished ?? new Date().toISOString()
        const modified = article.dateModified ?? published
        const normalized = (article.images ?? []).map(abs).filter(Boolean) as string[]
        const images = normalized.length > 0 ? normalized : [imageUrl || `${SITE_URL}/og-home.jpg`]

        return (
          <ArticleJsonLd
            type="Article"
            url={abs(article.url)!}
            title={title}
            images={images}
            datePublished={published}
            dateModified={modified}
            authorName={article.authorName || 'ProBrandwacht'}
            description={description}
            isAccessibleForFree
            publisherName="ProBrandwacht"
            publisherLogo={`${SITE_URL}/logo.png`}
          />
        )
      })()}

      {faqs && faqs.length > 0 && (
        <FAQPageJsonLd
          mainEntity={faqs.map(faq => ({
            questionName: faq.question,
            acceptedAnswerText: faq.answer,
          }))}
        />
      )}
    </>
  )
}
