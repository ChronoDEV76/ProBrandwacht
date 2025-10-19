import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { getPostSlugs, getPostBySlug, readingTime } from '@/lib/blog'
import { coreCities } from '@/lib/cities'
import { CATEGORY_LABELS, CITY_FILTERS, normalizeCategory, normalizeCity, resolveDate } from '@/lib/blog-index'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'

export const metadata = {
  title: 'Blog over brandveiligheid & zzp-brandwachten | ProBrandwacht.nl',
  description:
    'Artikelen over tarieven, DBA, wetgeving en praktijkcases voor bouw, evenementen en industrie. Eerlijk geschreven voor zzp-brandwachten en opdrachtgevers.',
  alternates: { canonical: 'https://www.probrandwacht.nl/blog' },
  openGraph: {
    title: 'Blog over brandveiligheid & zzp-brandwachten | ProBrandwacht.nl',
    description:
      'Artikelen over tarieven, DBA, wetgeving en praktijkcases voor bouw, evenementen en industrie. Eerlijk geschreven voor zzp-brandwachten en opdrachtgevers.',
    url: 'https://www.probrandwacht.nl/blog',
    type: 'website',
  },
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

export default async function BlogIndexPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const cat = (searchParams?.cat as (typeof CATEGORIES)[number]) || 'Alle'
  const city = (searchParams?.city as (typeof CITIES)[number]) || 'Alle'

  const slugs = await getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async slug => {
      const { frontmatter, content } = await getPostBySlug(slug)
      const minutes = Math.max(1, Math.ceil(readingTime(content).minutes))
      const category = normalizeCategory(frontmatter.category)
      const mappedCity = normalizeCity(frontmatter.city)
      const image = normalizeImageSrc(frontmatter.image as string | undefined)
      const imageAlt = (frontmatter.imageAlt as string | undefined) ?? frontmatter.title ?? slug
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
    }),
  )

  const postsSorted = posts.sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime())

  const filtered = postsSorted.filter(post => {
    const matchCategory = cat === 'Alle' || post.category === cat
    const matchCity = city === 'Alle' || post.city === city
    return matchCategory && matchCity
  })

  const articleSchema = filtered.map(post => ({
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

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Blog', url: 'https://www.probrandwacht.nl/blog' },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalPlatformFaq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <main className="mx-auto w-full min-h-full max-w-6xl space-y-10 px-4 py-10">
      <StructuredBreadcrumbs items={breadcrumbItems} />
      <JSONLD data={{ '@context': 'https://schema.org', '@graph': articleSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Kennis uit de frontlinie van brandveilig werken</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          We ontleden tarieven, DBA, wetgeving en praktijkcases zodat jij morgen al slimmer, veiliger en eerlijker kunt samenwerken.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/opdrachtgevers/brandwacht-inhuren"
            className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-brand-700/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700/40"
          >
            Brandwacht aanvragen
          </Link>
          <Link
            href="/zzp/aanmelden"
            className="inline-flex items-center rounded-md border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
          >
            Meld je aan als zzp-brandwacht
          </Link>
        </div>
      </header>

      <section className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Categorie</span>
          <nav className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
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
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Stad</span>
          <nav className="flex flex-wrap gap-2">
            {CITIES.map(c => (
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

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <div className="rounded-2xl border p-6 text-slate-600">Geen artikelen gevonden voor deze filters.</div>
        )}
        {filtered.map(post => (
          <article
            key={post.slug}
            className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
          >
            {post.image ? (
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                />
              </div>
            ) : (
              <div className="h-40 w-full bg-slate-100" />
            )}
            <div className="p-5">
              <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{post.category}</span>
                {post.city && <span className="rounded-full bg-slate-100 px-2 py-0.5">{post.city}</span>}
                <span>{formatDate(post.dateIso)}</span>
                <span>· {post.minutes} min leestijd</span>
              </div>
              <h2 className="line-clamp-2 text-lg font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-700">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-brand-700 hover:underline">
                  Lees hoe wij de norm verschuiven →
                </Link>
                <a
                  href="/zzp/aanmelden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:underline"
                >
                  Word onderdeel van de ploeg
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900">Stadspagina’s met actuele tariefvoorbeelden</h3>
        <p className="mt-2 text-sm text-slate-600">
          Bekijk per stad hoe je tarieven samenstelt inclusief 10% platformfee en 1–2% escrowkosten.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {cityLinks.map(city => (
            <li key={city.slug}>
              <Link
                href={`/brandwacht-inhuren/${city.slug}`}
                className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
              >
                Brandwacht inhuren {city.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/steden/amsterdam"
              className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
            >
              Bekijk calculator →
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/60 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-brand-800">Autoritaire bronnen</h3>
        <p className="mt-2 text-sm text-slate-700">
          Al onze artikelen verwijzen naar dezelfde officiële bronnen: CBS voor cao-lonen, KVK voor het berekenen van een
          zzp-tarief, Belastingdienst voor Wet DBA en FNV voor cao Veiligheidsregio’s.
        </p>
        <Link
          href="/seo-resources"
          className="inline-flex items-center rounded-md border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
        >
          Bekijk alle autoritaire bronnen →
        </Link>
      </section>

      <section className="mt-10 rounded-2xl bg-slate-50 p-6 text-center">
        <h3 className="text-xl font-semibold">Klaar voor eerlijk samenwerken?</h3>
        <p className="mt-2 text-slate-700">
          Sluit je aan bij de eerste lichting brandwachten of meld je als opdrachtgever aan voor de wachtlijst.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/zzp/aanmelden"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-brand-700 px-5 py-3 text-white hover:bg-brand-500"
          >
            Sluit je aan bij de ploeg die de norm herschrijft
          </a>
          <Link href="/opdrachtgevers" className="rounded-2xl border px-5 py-3 hover:bg-white">
            Info voor opdrachtgevers
          </Link>
        </div>
      </section>
    </main>
  )
}

function FilterChip({ href, active, children }: { href: string; active?: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={[
        'rounded-full border px-3 py-1 text-sm',
        active ? 'border-brand-200 bg-brand-50 text-brand-700' : 'hover:bg-slate-50',
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
