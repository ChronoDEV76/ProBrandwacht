import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPostSlugs, getPostBySlug } from '@/lib/mdx' // <-- Option A loader (compileMDX)
import { coreCities } from '@/lib/cities'
import { getSignupUrl } from '@/lib/config'

import Prose from '@/components/prose'
import ShareBar from '@/components/share-bar'

// ISR
export const revalidate = 60 * 60 // 1 uur

// SSG params
export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Metadata per artikel
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug)
    const title = post.frontmatter.title ?? params.slug
    const description = post.frontmatter.description ?? 'Brandwacht blog – ProBrandwacht.nl'
    const url = `/blog/${params.slug}`
    const og = (post.frontmatter.ogImage || post.frontmatter.image || '/og-home.jpg') as string
    const ogAbs = og.startsWith('http') ? og : `https://www.probrandwacht.nl${og}`

    return {
      title,
      description,
      alternates: { canonical: url, languages: { 'nl-NL': url } },
      openGraph: {
        url,
        type: 'article',
        title,
        description,
        images: [{ url: ogAbs, width: 1200, height: 630, alt: title }],
      },
      twitter: { card: 'summary_large_image', title, description, images: [ogAbs] },
    }
  } catch {
    const url = `/blog/${params.slug}`
    return {
      title: 'Artikel niet gevonden | ProBrandwacht.nl',
      description: 'Het opgevraagde artikel bestaat niet (meer).',
      alternates: { canonical: url, languages: { 'nl-NL': url } },
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: Awaited<ReturnType<typeof getPostBySlug>>
  try {
    post = await getPostBySlug(params.slug)
  } catch {
    return notFound()
  }

  const pageUrl = `https://www.probrandwacht.nl/blog/${params.slug}`
  const pub = post.frontmatter.date ? new Date(post.frontmatter.date) : null
  const opdrachtgeverSignupUrl = getSignupUrl()

  // JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title ?? params.slug,
    description: post.frontmatter.description ?? '',
    datePublished: toIso(post.frontmatter.date),
    dateModified: toIso(post.frontmatter.date),
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    image: post.frontmatter.ogImage
      ? [toAbsoluteUrl(post.frontmatter.ogImage as string)]
      : undefined,
    author: { '@type': 'Organization', name: 'ProBrandwacht' },
    publisher: {
      '@type': 'Organization',
      name: 'ProBrandwacht',
      url: 'https://www.probrandwacht.nl',
      logo: { '@type': 'ImageObject', url: 'https://www.probrandwacht.nl/og.jpg' },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.probrandwacht.nl/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.probrandwacht.nl/blog' },
      { '@type': 'ListItem', position: 3, name: post.frontmatter.title ?? params.slug, item: pageUrl },
    ],
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">{post.frontmatter.title ?? params.slug}</h1>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
          {pub && (
            <time
              suppressHydrationWarning
              dateTime={pub.toISOString().slice(0, 10)}
            >
              {new Date(`${post.frontmatter.date}T00:00:00Z`).toLocaleDateString('nl-NL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC',
              })}
            </time>
          )}
        </div>
      </header>

      {/* MDX-uitvoer uit compileMDX (geleverd door lib/mdx) */}
      <Prose>
        {post.compiled}
      </Prose>

      {/* Share */}
      <p className="mt-6 text-sm text-slate-600">Deel dit artikel:</p>
      <ShareBar url={pageUrl} title={post.frontmatter.title ?? 'ProBrandwacht.nl'} utmCampaign="blog_share" />

      {/* CTA */}
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={opdrachtgeverSignupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-black"
        >
          Zet de nieuwe standaard: meld je aan als opdrachtgever
        </a>
      </div>

      {/* Stadspagina-links */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Direct naar een stadspagina</h2>
        <p className="mt-1 text-sm text-slate-600">
          Bekijk hoe tarieven uitpakken in jouw regio en deel dezelfde fee- en escrowberekening met opdrachtgevers.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {coreCities.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/brandwacht-inhuren/${city.slug}`}
                className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
              >
                Brandwacht inhuren {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </article>
  )
}

// helpers
function toIso(value: unknown) {
  if (typeof value !== 'string') return undefined
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString()
}
function toAbsoluteUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://www.probrandwacht.nl${url}`
}

