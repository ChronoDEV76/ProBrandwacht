import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import { getPostSlugs } from '@/lib/blog'
import { getPostBySlug } from '@/lib/mdx'
import { coreCities } from '@/lib/cities'
import { getSignupUrl } from '@/lib/config'

import Prose from '@/components/prose'
import SeoStructuredData from '@/components/SeoStructuredData'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'

const ShareBar = dynamic(() => import('@/components/share-bar'), { ssr: false })

// ISR
export const revalidate = 60 * 60 // 1 uur
export const dynamicParams = true

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
    const description =
      (post.frontmatter.tldr as string | undefined) ??
      (post.frontmatter.description as string | undefined) ??
      'Brandwacht blog – ProBrandwacht.nl'
    const canonical = `https://www.probrandwacht.nl/blog/${params.slug}`
    const og = (post.frontmatter.ogImage || post.frontmatter.image || '/og-home.webp') as string
    const ogAbs = toAbsoluteUrl(og)

    return {
      title,
      description,
      alternates: { canonical, languages: { 'nl-NL': canonical } },
      openGraph: {
        url: canonical,
        type: 'article',
        title,
        description,
        images: [{ url: ogAbs, width: 1200, height: 630, alt: title }],
      },
      twitter: { card: 'summary_large_image', title, description, images: [ogAbs] },
    }
  } catch {
    const canonical = `https://www.probrandwacht.nl/blog/${params.slug}`
    return {
      title: 'Artikel niet gevonden | ProBrandwacht.nl',
      description: 'Het opgevraagde artikel bestaat niet (meer).',
      alternates: { canonical, languages: { 'nl-NL': canonical } },
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
  const opdrachtgeverSignupUrl = getSignupUrl()
  const publishedDate = parseFrontmatterDate(post.frontmatter.date)
  const articleImage = toAbsoluteUrl(
    (post.frontmatter.ogImage as string | undefined) || (post.frontmatter.image as string | undefined) || '/og-home.webp',
  )
  const description =
    (post.frontmatter.tldr as string | undefined) ??
    (post.frontmatter.description as string | undefined) ??
    ''
  const heroImage = toAbsoluteUrl(
    (post.frontmatter.image as string | undefined) || (post.frontmatter.ogImage as string | undefined) || '/og-home.webp',
  )
  const heroImageSrc = heroImage.startsWith('https://www.probrandwacht.nl')
    ? heroImage.replace('https://www.probrandwacht.nl', '') || '/og-home.webp'
    : heroImage
  const heroAlt = (post.frontmatter.imageAlt as string | undefined) ?? post.frontmatter.title ?? params.slug
  const highlights = Array.isArray(post.frontmatter.highlights)
    ? post.frontmatter.highlights.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : []
  const readingTimeValue = post.frontmatter.readingTime
  const readingTimeLabel =
    typeof readingTimeValue === 'string'
      ? readingTimeValue
      : typeof readingTimeValue === 'number'
        ? `${Math.max(1, Math.round(readingTimeValue))} min`
        : 'ca. 5 min'
  const categoryLabel = typeof post.frontmatter.category === 'string' && post.frontmatter.category.trim().length > 0
    ? post.frontmatter.category
    : 'Algemeen'
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Blog', url: 'https://www.probrandwacht.nl/blog' },
    { name: post.frontmatter.title ?? params.slug, url: pageUrl },
  ]
  const structuredArticle = {
    title: post.frontmatter.title ?? params.slug,
    description,
    url: pageUrl,
    datePublished: publishedDate?.toISOString(),
    dateModified: publishedDate?.toISOString(),
    image: articleImage,
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-50">
      <StructuredBreadcrumbs items={breadcrumbItems} />
      <SeoStructuredData article={structuredArticle} breadcrumbs={breadcrumbItems.map(item => ({ name: item.name, item: item.url }))} faqs={generalPlatformFaq} />
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-50">{post.frontmatter.title ?? params.slug}</h1>
      </header>

      <figure className="mb-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <Image
          src={heroImageSrc}
          alt={heroAlt}
          width={900}
          height={450}
          sizes="(max-width:768px) 100vw, 768px"
          className="h-auto w-full max-h-[320px] object-cover"
          style={{ objectPosition: 'center 45%' }}
          loading="lazy"
        />
        <figcaption className="flex flex-wrap items-center gap-3 border-t border-slate-800 px-4 py-3 text-xs text-slate-300">
          <span>Geplaatst: {publishedDate ? publishedDate.toLocaleDateString('nl-NL') : 'Onbekend'}</span>
          <span>Leestijd: {readingTimeLabel}</span>
          <span>Type: {categoryLabel}</span>
        </figcaption>
      </figure>

      {highlights.length > 0 ? (
        <section className="mb-6 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-5 text-sm text-amber-50">
          <h2 className="text-base font-semibold text-amber-100">Belangrijkste punten</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-50">
            {highlights.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* MDX-uitvoer uit compileMDX (geleverd door lib/mdx) */}
      <Prose>
        {post.compiled}
      </Prose>

      {/* Share */}
      <p className="mt-6 text-sm text-slate-300">Deel dit artikel:</p>
      <ShareBar url={pageUrl} title={post.frontmatter.title ?? 'ProBrandwacht.nl'} utmCampaign="blog_share" />

      {/* CTA */}
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={opdrachtgeverSignupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-emerald-400 px-5 py-3 text-sm font-medium text-slate-950 hover:bg-emerald-300"
        >
          Zet de nieuwe standaard: meld je aan als opdrachtgever
        </a>
      </div>

      {/* Stadspagina-links */}
      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold text-slate-50">Direct naar een stadspagina</h2>
        <p className="mt-1 text-sm text-slate-200">
          Bekijk hoe tarieven uitpakken in jouw regio en deel dezelfde fee- en kostenberekening met opdrachtgevers.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {coreCities.map((city) => (
            <li key={city.slug}>
              <Link
                href="/opdrachtgevers"
                prefetch={false}
                className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-100 transition hover:border-emerald-300 hover:text-emerald-200"
              >
                Brandwacht inhuren {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </article>
  )
}

// helpers
function toAbsoluteUrl(url: string) {
  const trimmed = url.trim()
  if (!trimmed) return 'https://www.probrandwacht.nl/og-home.webp'
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `https://www.probrandwacht.nl${normalized}`
}
function parseFrontmatterDate(value: unknown) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  const parsed = new Date(trimmed)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}
