import {
  getPostBySlug,
  getPostSlugs,
  readingTime,
  formatReadingTime,
  type BlogFrontmatter,
  type BlogFaq,
  type BlogHowTo,
  type BlogHowToStep,
} from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Prose from '@/components/prose'
import ShareBar from '@/components/share-bar'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { frontmatter } = await getPostBySlug(params.slug)
  const title = frontmatter.title ?? params.slug
  const description = frontmatter.description ?? 'Brandwacht blog – ProBrandwacht.nl'
  const url = `/blog/${params.slug}`
  const keywords = Array.isArray(frontmatter.keywords)
    ? (frontmatter.keywords as string[])
    : [
        'brandwacht blog',
        'brandveiligheid',
        'brandwacht inhuren',
        title,
      ]
  const rawOgImage =
    typeof frontmatter.ogImage === 'string' && frontmatter.ogImage.trim().length
      ? frontmatter.ogImage.trim()
      : '/og-home.jpg'
  const ogImage = rawOgImage.startsWith('http')
    ? rawOgImage
    : `https://www.probrandwacht.nl${rawOgImage}`
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url, languages: { 'nl-NL': url } },
    other: { hreflang: 'nl-NL' },
    openGraph: {
      url,
      title,
      description,
      type: 'article',
      locale: 'nl_NL',
      publishedTime: frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ProBrandwacht',
      creator: '@ProBrandwacht',
      title,
      description,
      images: [ogImage],
    },
  }
}

export const revalidate = 60 * 60 // 1h ISR

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let content: string
  let frontmatter: BlogFrontmatter
  try {
    const data = await getPostBySlug(params.slug)
    content = data.content
    frontmatter = data.frontmatter
  } catch {
    return notFound()
  }
  const rt = readingTime(content)
  const pageUrl = `https://www.probrandwacht.nl/blog/${params.slug}`
  const faqs: BlogFaq[] = Array.isArray(frontmatter.faq)
    ? frontmatter.faq.filter((faq): faq is BlogFaq => {
        if (!faq || typeof faq !== 'object') return false
        const candidate = faq as Partial<BlogFaq>
        return typeof candidate.q === 'string' && typeof candidate.a === 'string'
      })
    : []

  const howtoSource: BlogHowTo | undefined = frontmatter.howto
  const rawSteps = Array.isArray(howtoSource?.steps) ? (howtoSource.steps as unknown[]) : []
  const howtoSteps: BlogHowToStep[] = rawSteps.filter((step): step is BlogHowToStep => {
    if (!step || typeof step !== 'object') return false
    const candidate = step as { name?: unknown; text?: unknown }
    return (
      typeof candidate.name === 'string' &&
      (candidate.text === undefined || typeof candidate.text === 'string')
    )
  })
  const howto = howtoSteps.length
    ? {
        name: howtoSource?.name || frontmatter.title || params.slug,
        steps: howtoSteps,
        totalTime: howtoSource?.totalTime,
      }
    : null
  const datePublishedIso = parseIso(frontmatter.date)
  const articleImage = toAbsoluteUrl(
    typeof frontmatter.ogImage === 'string'
      ? frontmatter.ogImage
      : (frontmatter.image as string | undefined),
  )
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title ?? params.slug,
    description: frontmatter.description ?? '',
    datePublished: datePublishedIso,
    dateModified: datePublishedIso,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    image: articleImage ? [articleImage] : undefined,
    author: { '@type': 'Organization', name: 'ProBrandwacht' },
    publisher: {
      '@type': 'Organization',
      name: 'ProBrandwacht',
      url: 'https://www.probrandwacht.nl',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.probrandwacht.nl/og.jpg',
      },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.probrandwacht.nl/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.probrandwacht.nl/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: frontmatter.title ?? params.slug,
        item: pageUrl,
      },
    ],
  }
  return (
    <article>
      <h1 className="mb-2 text-3xl font-semibold">{frontmatter.title}</h1>
      <div className="text-xs text-slate-600 mb-4 flex gap-2 items-center">
        {frontmatter.date ? (
          <time dateTime={new Date(frontmatter.date).toISOString().slice(0, 10)}>
            {new Date(frontmatter.date).toLocaleDateString('nl-NL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        ) : null}
        <span>•</span>
        <span>{formatReadingTime(rt.minutes, 'nl-NL')}</span>
      </div>
      <Prose>
        <MDXRemote source={content} />
      </Prose>
      <p className="mt-6 text-sm text-slate-600">Deel dit artikel:</p>
      <div>
        <ShareBar
          url={pageUrl}
          title={frontmatter.title ?? 'ProBrandwacht.nl'}
          utmCampaign="blog_share"
        />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://forms.gle/fAChpLDNSJWRBHDC7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black"
        >
          Meld je aan (gratis) en kom straks met je profiel op ProSafetyMatch
        </a>
      </div>
      {howto ? (
        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">Stappenplan</h2>
          <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
            {howto.steps.map((s, i) => (
              <li key={i}>
                <span className="font-medium">{s.name}</span>
                {s.text ? <span className="ml-1 text-slate-600">— {s.text}</span> : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}
      {faqs.length ? (
        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">Veelgestelde vragen</h2>
          <ul className="space-y-3">
            {faqs.map((f, i) => (
              <li key={i}>
                <p className="font-medium">{f.q}</p>
                <p className="text-sm text-slate-600">{f.a}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqs.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
      ) : null}
      {howto ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: howto.name,
              totalTime: howto.totalTime,
              step: howto.steps.map(s => ({ '@type': 'HowToStep', name: s.name, text: s.text })),
            }),
          }}
        />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </article>
  )
}

function parseIso(value: unknown) {
  if (typeof value !== 'string') return undefined
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return undefined
  return parsed.toISOString()
}

function toAbsoluteUrl(url: string | undefined) {
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://www.probrandwacht.nl${url}`
}
