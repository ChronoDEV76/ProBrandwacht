import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { getPostBySlug, getPostSlugs, readingTime } from '@/lib/blog'
import { CATEGORY_LABELS, CITY_FILTERS, normalizeCategory, normalizeCity, resolveDate } from '@/lib/blog-index'
import { coreCities } from '@/lib/cities'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'

const BASE_URL = 'https://www.probrandwacht.nl'
const TITLE_CORE = 'Blog brandveiligheid & zzp-brandwachten'
const BRAND_SUFFIX = 'ProBrandwacht'
const DEFAULT_TITLE = `${TITLE_CORE} | ${BRAND_SUFFIX}`
const DEFAULT_DESCRIPTION =
  'Praktische inzichten over tarieven, inzet en samenwerking met zzp-brandwachten. Voor opdrachtgevers en professionals die helderheid en voorspelbaarheid willen.'
const DEFAULT_KEYWORDS = [
  'brandwacht',
  'brandwacht inhuren',
  'brandwacht huren',
  'wet dba brandwacht',
  'brandwacht tarieven',
]
const OG_IMAGE = `${BASE_URL}/og-home.webp`

type BlogSearchParams = Record<string, string | string[] | undefined>

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: BlogSearchParams
}): Promise<Metadata> {
  const canonical = `${BASE_URL}/blog`
  const queryKeys = Object.keys(searchParams ?? {})
  const shouldNoindex = queryKeys.length > 0

  const rawCat = typeof searchParams?.cat === 'string' ? searchParams.cat : undefined
  const rawCity = typeof searchParams?.city === 'string' ? searchParams.city : undefined
  const categoryFilter = rawCat && rawCat !== 'Alle' ? rawCat : undefined
  const cityFilter = rawCity && rawCity !== 'Alle' ? rawCity : undefined

  const hasFilters = Boolean(categoryFilter || cityFilter)
  const title = hasFilters
    ? [
        categoryFilter ? `${categoryFilter} artikelen` : null,
        TITLE_CORE,
        cityFilter ? `voor ${cityFilter}` : null,
        BRAND_SUFFIX,
      ]
        .filter(Boolean)
        .join(' | ')
    : DEFAULT_TITLE

  const filterSummary = [
    categoryFilter ? `Categorie: ${categoryFilter.toLowerCase()}` : undefined,
    cityFilter ? `Regio: ${cityFilter}` : undefined,
  ].filter(Boolean)

  const description = filterSummary.length
    ? `${DEFAULT_DESCRIPTION} Focus: ${filterSummary.join(' / ').toLowerCase()}.`
    : DEFAULT_DESCRIPTION

  return {
    title,
    description,
    keywords: DEFAULT_KEYWORDS,
    robots: { index: !shouldNoindex, follow: true },
    alternates: { canonical, languages: { 'nl-NL': canonical } },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'ProBrandwacht blogoverzicht',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  }
}

const CATEGORIES = ['Alle', ...CATEGORY_LABELS] as const
const CITIES = ['Alle', ...CITY_FILTERS] as const
const cityLinks = coreCities

function JSONLD({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

function normalizeImageSrc(src?: string | null) {
  if (!src) return null
  const trimmed = src.trim()
  if (!trimmed) return null
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  const withoutPublicPrefix = trimmed.replace(/^public\//, '')
  return withoutPublicPrefix.startsWith('/') ? withoutPublicPrefix : `/${withoutPublicPrefix}`
}

function normalizeImagePosition(value: unknown) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed ? trimmed : undefined
}

function resolveCardImage(frontmatter: Record<string, unknown>) {
  const candidates = [frontmatter.image, frontmatter.cover, frontmatter.ogImage]
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return normalizeImageSrc(candidate)
    }
  }
  return null
}

function resolveCardAlt(frontmatter: Record<string, unknown>, slug: string) {
  if (typeof frontmatter.imageAlt === 'string' && frontmatter.imageAlt.trim()) {
    return frontmatter.imageAlt.trim()
  }
  if (typeof frontmatter.title === 'string' && frontmatter.title.trim()) {
    return frontmatter.title.trim()
  }
  return slug
}

export default async function BlogIndexPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const cat = (searchParams?.cat as (typeof CATEGORIES)[number]) || 'Alle'
  const city = (searchParams?.city as (typeof CITIES)[number]) || 'Alle'

  const slugs = await getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter, content } = await getPostBySlug(slug)
      const minutes = Math.max(1, Math.ceil(readingTime(content).minutes))
      const category = normalizeCategory(frontmatter.category)
      const mappedCity = normalizeCity(frontmatter.city)
      const image = resolveCardImage(frontmatter)
      const imageAlt = resolveCardAlt(frontmatter, slug)
      const imagePosition = normalizeImagePosition(frontmatter.imagePosition)
      const resolvedDate = resolveDate(frontmatter.date as string | undefined)
      const excerpt =
        (frontmatter.tldr as string | undefined) ??
        (frontmatter.description as string | undefined) ??
        ''

      return {
        slug,
        title: frontmatter.title ?? slug,
        excerpt,
        category,
        city: mappedCity,
        minutes,
        dateIso: resolvedDate.toISOString().slice(0, 10),
        image,
        imageAlt,
        imagePosition,
      }
    })
  )

  const postsSorted = posts.sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime())
  const latestDate = postsSorted[0]?.dateIso
  const filtered = postsSorted.filter((post) => {
    const matchCategory = cat === 'Alle' || post.category === cat
    const matchCity = city === 'Alle' || post.city === city
    return matchCategory && matchCity
  })

  const articleSchema = filtered.map((post) => ({
    '@type': 'Article',
    headline: post.title,
    datePublished: post.dateIso,
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
    mainEntityOfPage: `https://www.probrandwacht.nl/blog/${post.slug}`,
    url: `https://www.probrandwacht.nl/blog/${post.slug}`,
    description: post.excerpt,
  }))

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Brandwacht blogoverzicht',
    itemListElement: filtered.slice(0, 12).map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.title,
      url: `https://www.probrandwacht.nl/blog/${post.slug}`,
    })),
  }

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Blog', url: 'https://www.probrandwacht.nl/blog' },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalPlatformFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <StructuredBreadcrumbs items={breadcrumbItems} />
      <JSONLD data={{ '@context': 'https://schema.org', '@graph': articleSchema }} />
      <JSONLD data={itemListSchema} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10">
          <header className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Kennisbank</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Blog: brandwacht-inzet, DBA-bewust samenwerken en praktische afspraken
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Dit is geen “SEO-blog”. We schrijven vanuit de praktijk: situaties op de vloer, veelgemaakte
              misverstanden, en afspraken die in de regel het verschil maken tussen gedoe en rust. Voorbeelden
              zijn indicatief en contextafhankelijk.
            </p>

            <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Door wie</p>
                <p className="mt-2 text-sm text-slate-200">
                  ProBrandwacht (team) — focus: inzetbaarheid, rolverdeling, DBA-bewuste samenwerking
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Waarom dit bestaat</p>
                <p className="mt-2 text-sm text-slate-200">
                  Omdat papier alleen niet genoeg is: op de vloer telt gedrag, verantwoordelijkheid en
                  uitlegbare afspraken.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Laatst bijgewerkt</p>
                <p className="mt-2 text-sm text-slate-200">{latestDate ? formatDate(latestDate) : ''}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/opdrachtgevers"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Route voor opdrachtgevers
              </Link>
              <Link
                href="/voor-brandwachten"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
              >
                Route voor brandwachten
              </Link>
              <Link
                href="/belangen"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
              >
                Bekijk de kaders
              </Link>
            </div>
          </header>

          <section className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-sm">Categorie</span>
              <nav className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <FilterChip
                    key={c}
                    href={`/blog?cat=${encodeURIComponent(c)}&city=${encodeURIComponent(city)}`}
                    active={cat === c}
                  >
                    {c}
                  </FilterChip>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-sm">Stad</span>
              <nav className="flex flex-wrap gap-2">
                {CITIES.map((c) => (
                  <FilterChip
                    key={c}
                    href={`/blog?cat=${encodeURIComponent(cat)}&city=${encodeURIComponent(c)}`}
                    active={city === c}
                  >
                    {c}
                  </FilterChip>
                ))}
              </nav>
            </div>
          </section>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10">
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-slate-200">
                Geen artikelen gevonden voor deze filters.
              </div>
            )}
            {filtered.map((post) => (
              <article
                key={post.slug}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-emerald-500/20"
              >
                {post.image ? (
                  <div className="relative w-full overflow-hidden px-3 pb-5 pt-3">
                    <div className="relative aspect-[5/3]">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        style={{
                          objectPosition: post.imagePosition ?? 'center 60%',
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-40 w-full bg-slate-800" />
                )}
                <div className="p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-800 px-2 py-0.5">{post.category}</span>
                    <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-emerald-100">
                      {derivePositionTag(post.category)}
                    </span>
                    {post.city && <span className="rounded-full bg-slate-800 px-2 py-0.5">{post.city}</span>}
                    <span>{formatDate(post.dateIso)}</span>
                    <span>- {post.minutes} min leestijd</span>
                  </div>
                  <h2 className="line-clamp-2 text-lg font-semibold text-slate-50">
                    <Link href={`/blog/${post.slug}`} prefetch={false} className="hover:text-emerald-200">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-200">Lees het artikel &rarr;</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <Link
                      href={`/blog/${post.slug}`}
                      prefetch={false}
                      className="font-medium text-emerald-200 hover:text-emerald-100"
                    >
                      Lees hoe wij de norm verschuiven &rarr;
                    </Link>
                    <a
                      href="/zzp/aanmelden"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-emerald-100"
                    >
                      Word onderdeel van de ploeg
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-50">Stadspagina&apos;s met actuele tariefvoorbeelden</h2>
            <p className="mt-2 text-sm text-slate-200">
              Bekijk per stad indicatieve tariefbanden en meld je aan voor aanvragen in jouw regio.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cityLinks.map((cityLink) => (
                <li key={cityLink.slug}>
                  <Link
                    href={`/steden/${cityLink.slug}`}
                    prefetch={false}
                    className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-100 transition hover:border-emerald-300 hover:text-emerald-200"
                  >
                    Brandwacht {cityLink.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-100">Autoritaire bronnen</h3>
            <p className="mt-2 text-sm text-slate-200">
              Al onze artikelen verwijzen naar dezelfde officiele bronnen: CBS voor cao-lonen, KVK voor het berekenen van een
              zzp-tarief, Belastingdienst voor Wet DBA en FNV voor cao Veiligheidsregio&apos;s.
            </p>
            <Link
              href="/seo-resources"
              className="mt-3 inline-flex items-center rounded-md border border-emerald-300 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:border-emerald-200 hover:text-emerald-50"
            >
              Bekijk alle autoritaire bronnen &rarr;
            </Link>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center">
            <h3 className="text-xl font-semibold text-slate-50">Klaar voor eerlijk samenwerken?</h3>
            <p className="mt-2 text-slate-200">
              Toegang voor de eerste lichting is geopend - voor professionals en vooruitstrevende opdrachtgevers.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/zzp/aanmelden"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-emerald-400 px-5 py-3 text-slate-950 hover:bg-emerald-300"
              >
                Sluit je aan bij de ploeg die de norm herschrijft
              </a>
              <Link
                href="/opdrachtgevers"
                className="rounded-2xl border border-slate-700 px-5 py-3 text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
              >
                Info voor opdrachtgevers
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-sm text-slate-200">
            <h4 className="text-base font-semibold text-slate-50">ProSafetyMatch in ontwikkeling</h4>
            <p className="mt-2">
              We werken aan ProSafetyMatch: een directe, DBA-bewuste manier van samenwerken. Wil je op de hoogte blijven?
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}

function FilterChip({ href, active, children }: { href: string; active?: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={[
        'rounded-full border px-3 py-1 text-sm transition',
        active
          ? 'border-emerald-300 bg-emerald-400/10 text-emerald-100'
          : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-emerald-300 hover:text-emerald-100',
      ].join(' ')}
    >
      {children}
    </Link>
  )
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' })
  } catch {
    return ''
  }
}

function derivePositionTag(category: string | undefined) {
  if (!category) return 'Praktijkervaring'
  const lower = category.toLowerCase()
  if (lower.includes('wet')) return 'Wetgeving & handhaving'
  if (lower.includes('opdracht')) return 'Voor opdrachtgevers'
  if (lower.includes('zzp')) return 'Voor zzp-brandwachten'
  return 'Praktijkervaring'
}
