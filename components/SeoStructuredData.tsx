type FAQ = { question: string; answer: string }

type OrganizationOverrides = {
  name?: string
  url?: string
  logo?: string
  sameAs?: string[]
  contactPoint?: {
    '@type': 'ContactPoint'
    email: string
    contactType: string
    areaServed?: string
    availableLanguage?: string
  }[]
}

interface SeoStructuredDataProps {
  includeOrganization?: boolean
  organization?: OrganizationOverrides
  website?: {
    name: string
    url: string
    searchAction?: {
      target: string
      queryInput?: string
    }
  }
  article?: {
    title: string
    description: string
    url: string
    datePublished?: string
    dateModified?: string
    image?: string
    author?: string
  }
  faqs?: FAQ[]
  breadcrumbs?: { name: string; item: string }[]
}

const DEFAULT_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ProBrandwacht.nl',
  url: 'https://www.probrandwacht.nl',
  logo: 'https://www.probrandwacht.nl/og.jpg',
  sameAs: [
    'https://www.linkedin.com/company/probrandwacht',
    'https://twitter.com/ProBrandwacht',
    'https://www.instagram.com/probrandwacht',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'info@prosafetymatch.nl',
      contactType: 'customer support',
      areaServed: 'NL',
      availableLanguage: 'Dutch',
    },
  ],
} as const

export default function SeoStructuredData({
  includeOrganization = true,
  organization,
  website,
  article,
  faqs,
  breadcrumbs,
}: SeoStructuredDataProps) {
  const schemas: unknown[] = []

  if (includeOrganization) {
    const orgSchema = {
      ...DEFAULT_ORGANIZATION,
      ...organization,
      sameAs: organization?.sameAs ?? DEFAULT_ORGANIZATION.sameAs,
      contactPoint: organization?.contactPoint ?? DEFAULT_ORGANIZATION.contactPoint,
    }
    schemas.push(orgSchema)
  }

  if (website) {
    const websiteSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: website.name,
      url: website.url,
      inLanguage: 'nl-NL',
    }

    if (website.searchAction) {
      websiteSchema.potentialAction = {
        '@type': 'SearchAction',
        target: website.searchAction.target,
        'query-input': website.searchAction.queryInput ?? 'required name=search_term_string',
      }
    }

    schemas.push(websiteSchema)
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: b.name,
        item: b.item,
      })),
    })
  }

  if (article) {
    const authorName = article.author ?? DEFAULT_ORGANIZATION.name
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      author: { '@type': 'Organization', name: authorName },
      publisher: {
        '@type': 'Organization',
        name: DEFAULT_ORGANIZATION.name,
        logo: {
          '@type': 'ImageObject',
          url: organization?.logo ?? DEFAULT_ORGANIZATION.logo,
        },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': article.url },
      datePublished: article.datePublished ?? new Date().toISOString(),
      dateModified: article.dateModified ?? new Date().toISOString(),
      image: article.image ?? 'https://www.probrandwacht.nl/og-home.webp',
    })
  }

  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    })
  }

  return schemas.map((schema, index) => (
    <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  ))
}
