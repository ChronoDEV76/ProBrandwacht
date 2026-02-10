import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Cta } from '@/components/Cta'
import BlogNeutralNote from '@/components/BlogNeutralNote'
import HeroBackground from '@/components/HeroBackground'
import SeoStructuredData from '@/components/SeoStructuredData'
import Prose from '@/components/prose'
import TrustBand from '@/components/trust-band'
import { getRouteMetadata } from '@/lib/seo/metadata'
import { getPostBySlug as getPostBySlugRaw, getPostSlugs } from '@/lib/blog'
import { getPostBySlug } from '@/lib/mdx'

const BASE_URL = 'https://www.probrandwacht.nl'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

function formatDate(date?: string) {
  if (!date) return null
  try {
    return new Intl.DateTimeFormat('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(new Date(date))
  } catch {
    return date
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const base = getRouteMetadata('/blog/[slug]')

  try {
    const { frontmatter } = await getPostBySlug(params.slug)

    const rawTitle = frontmatter.title as string | undefined
    const category =
      typeof frontmatter.category === 'string' ? frontmatter.category.toLowerCase() : undefined
    const isSafetyFramework = category === 'veiligheidskundig kader'
    const title = rawTitle
      ? isSafetyFramework
        ? `${rawTitle} — veiligheidskundig kader | ProBrandwacht`
        : `${rawTitle} | ProBrandwacht`
      : 'Kennisbank | ProBrandwacht'
    const canonical = `${BASE_URL}/blog/${params.slug}`
    const safetyFrameworkDescription =
      'Een veiligheidskundige beschouwing over rol, verantwoordelijkheid en systeemwerking binnen brandveiligheid. Uitleg en context voor bewuste keuzes.'
    const description = isSafetyFramework
      ? safetyFrameworkDescription
      : (frontmatter.tldr as string | undefined) ??
        (frontmatter.excerpt as string | undefined) ??
        (frontmatter.description as string | undefined) ??
        'Beschrijvende kennis over brandwacht-inzet: rolverdeling, afspraken en uitvoerbaarheid in de praktijk.'
    const ogImage = toAbsoluteUrl(
      (frontmatter.ogImage as string | undefined) ??
        (frontmatter.image as string | undefined) ??
        '/og-home.webp'
    )

    return {
      ...base,
      title,
      description,
      alternates: { canonical, languages: { 'nl-NL': canonical } },
      openGraph: {
        ...(base.openGraph ?? {}),
        title,
        description,
        url: canonical,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: rawTitle ?? 'ProBrandwacht',
          },
        ],
      },
      twitter: { ...(base.twitter ?? {}), title, description, images: [ogImage] },
    }
  } catch {
    return {
      ...base,
      title: 'Artikel niet gevonden | ProBrandwacht',
      robots: { index: false, follow: false },
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: any

  try {
    post = await getPostBySlug(params.slug)
  } catch {
    return notFound()
  }

  const frontmatter = post.frontmatter ?? {}
  const title = (frontmatter.title as string | undefined) ?? 'Artikel'
  const date = (frontmatter.date as string | undefined) ?? undefined
  const updated = (frontmatter.updated as string | undefined) ?? undefined
  const author = (frontmatter.author as string | undefined) ?? 'ProBrandwacht'
  const readingTime = frontmatter.readingTime as string | number | undefined
  const pageUrl = `${BASE_URL}/blog/${params.slug}`
  const publishedDate = parseFrontmatterDate(frontmatter.date)
  const updatedDate = parseFrontmatterDate(frontmatter.updated) ?? publishedDate
  const description =
    (frontmatter.tldr as string | undefined) ??
    (frontmatter.excerpt as string | undefined) ??
    (frontmatter.description as string | undefined) ??
    'Beschrijvende kennis over brandwacht-inzet: rolverdeling, afspraken en uitvoerbaarheid in de praktijk.'
  const articleImage = toAbsoluteUrl(
    (frontmatter.ogImage as string | undefined) ??
      (frontmatter.image as string | undefined) ??
      '/og-home.webp'
  )
  const heroImage =
    (frontmatter.image as string | undefined) ??
    (frontmatter.ogImage as string | undefined) ??
    undefined
  const heroImageAlt =
    (frontmatter.imageAlt as string | undefined) ?? title
  const heroImagePosition =
    (frontmatter.imagePosition as string | undefined) ?? 'center 60%'
  const isSystemArticle =
    frontmatter.category === 'Veiligheidskundig kader' ||
    frontmatter.pillar === '/veiligheidskundig-kader'
  const categoryLabel =
    typeof frontmatter.category === 'string' && frontmatter.category.trim()
      ? frontmatter.category
      : 'Kennisbank'
  const breadcrumbItems = [
    { name: 'Home', item: 'https://www.probrandwacht.nl/' },
    { name: 'Kennisbank', item: 'https://www.probrandwacht.nl/blog' },
    { name: title, item: pageUrl },
  ]

  const related = await getRelatedPosts({
    currentSlug: params.slug,
    currentCategory: frontmatter.category as string | undefined,
    currentPillar: frontmatter.pillar as string | undefined,
    currentTags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
  })


  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData
        article={{
          title,
          description,
          url: pageUrl,
          datePublished: publishedDate?.toISOString(),
          dateModified: updatedDate?.toISOString(),
          image: articleImage,
          author,
        }}
        breadcrumbs={breadcrumbItems}
      />
      {/* HERO */}
      <HeroBackground>
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 pb-10 pt-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <Link href="/blog" className="font-semibold text-amber-200 hover:text-amber-100">
              Kennisbank
            </Link>
            <span>-&gt;</span>
            <span className="text-slate-200">{title}</span>
          </div>

          <div className="flex flex-col gap-2 border-l border-amber-200/40 pl-3 text-xs text-slate-300">
            <div className="uppercase tracking-[0.2em] text-amber-200">
              Kennisbank • {isSystemArticle ? 'Veiligheidskundig kader' : categoryLabel}
            </div>
            <div className="text-[11px] text-slate-400">
              Analyse en beschrijving – gericht op begrip en rolhelderheid
            </div>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>Door {author} · Kennisbank</span>
            {date ? <span>• Geplaatst: {formatDate(date)}</span> : null}
            {updated ? <span>• Laatst bijgewerkt: {formatDate(updated)}</span> : null}
            {readingTime ? <span>• {readingTime}</span> : null}
          </div>

          {heroImage ? (
            <div className="mt-4 max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover"
                  style={{ objectPosition: heroImagePosition }}
                />
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-2">
            <Cta id="secondary_kader_overview" />
            <Cta id="secondary_afbakening" className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5" />
            <Cta id="secondary_checklist_info" className="border-white/20" />
          </div>
        </div>
      </HeroBackground>

      <TrustBand className="mt-6" />

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        <article className="rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)] md:p-8">
          <Prose>{post.compiled}</Prose>
        </article>

        <BlogNeutralNote />

        {related.length > 0 ? (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Gerelateerd</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`} className="text-emerald-200 hover:text-emerald-100">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Kernpunten</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            Neutrale checklist om rolafbakening en uitvoering uitlegbaar te houden.
          </p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-200 md:grid-cols-2">
            <li>Context: welke werkzaamheden, risico&apos;s en randvoorwaarden gelden er?</li>
            <li>Rol: wat is expliciet de taak van de brandwacht en wat niet?</li>
            <li>Bevoegdheid: wie beslist bij afwijkingen, escalatie of stop?</li>
            <li>Stopcriteria: wanneer en hoe wordt werk onderbroken bij onveiligheid?</li>
          </ul>
        </div>

        {/* FOOTER CTA */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Meer context</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            Lees de context en de afbakening om dit artikel in de juiste context te plaatsen.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Cta id="secondary_kader_overview" />
            <Cta id="secondary_afbakening" className="rounded-2xl px-5 py-2.5" />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Bronnen & redactie</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            Artikelen worden gebaseerd op praktijkervaring en controleerbare bronnen. Bekijk de bronverzameling en
            achtergrond van ProBrandwacht.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Cta id="secondary_seo_resources" />
            <Cta id="secondary_over_ons" />
          </div>
        </div>
      </section>
    </main>
  )
}

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

type RelatedInput = {
  currentSlug: string
  currentCategory?: string
  currentPillar?: string
  currentTags: string[]
}

type RelatedPost = {
  slug: string
  title: string
  date?: string
}

async function getRelatedPosts({
  currentSlug,
  currentCategory,
  currentPillar,
  currentTags,
}: RelatedInput): Promise<RelatedPost[]> {
  const slugs = await getPostSlugs()
  const candidates = await Promise.all(
    slugs
      .filter((slug) => slug !== currentSlug)
      .map(async (slug) => {
        const { frontmatter } = await getPostBySlugRaw(slug)
        return {
          slug,
          title: (frontmatter.title as string | undefined) ?? slug,
          category: frontmatter.category as string | undefined,
          pillar: frontmatter.pillar as string | undefined,
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          date: frontmatter.updated ?? frontmatter.date,
        }
      })
  )

  const scored = candidates.map((post) => {
    let score = 0
    if (currentPillar && post.pillar === currentPillar) score += 3
    if (currentCategory && post.category === currentCategory) score += 2
    const sharedTags = post.tags.filter((tag) =>
      currentTags.some((t) => String(t).toLowerCase() === String(tag).toLowerCase())
    ).length
    score += sharedTags
    return { ...post, score }
  })

  const sorted = scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })
    .slice(0, 3)

  return sorted.map(({ slug, title, date }) => ({ slug, title, date }))
}
