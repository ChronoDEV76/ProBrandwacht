import Link from 'next/link'
import type { ReactNode } from 'react'
import { getPostSlugs, getPostBySlug, readingTime } from '@/lib/blog'

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

const CATEGORY_MAP: Record<string, 'Tarieven' | 'Wetgeving' | 'Evenementen' | 'Bouw' | 'Industrie' | 'Overig'> = {
  'wat-kost-een-brandwacht-in-2025': 'Tarieven',
  'wanneer-is-een-brandwacht-verplicht-bij-evenementen': 'Wetgeving',
  'bouwplaats-in-den-haag-veilig-gesteld-met-inzet-van-3-brandwachten': 'Bouw',
  'industriele-brandwacht-wat-houdt-het-in': 'Industrie',
  '5-meest-gemaakte-fouten-bij-brandwacht-inhuur': 'Evenementen',
  'trends-in-brandwacht-tarieven-waarom-transparantie-cruciaal-wordt': 'Tarieven',
}

const CITY_MAP: Record<string, 'Amsterdam' | 'Rotterdam' | 'Den Haag' | 'Utrecht' | undefined> = {
  'bouwplaats-in-den-haag-veilig-gesteld-met-inzet-van-3-brandwachten': 'Den Haag',
}

const CATEGORIES = ['Alle', 'Tarieven', 'Wetgeving', 'Evenementen', 'Bouw', 'Industrie', 'Overig'] as const
const CITIES = ['Alle', 'Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht'] as const

function JSONLD({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export default async function BlogIndexPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const cat = (searchParams?.cat as (typeof CATEGORIES)[number]) || 'Alle'
  const city = (searchParams?.city as (typeof CITIES)[number]) || 'Alle'

  const slugs = await getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async slug => {
      const { frontmatter, content } = await getPostBySlug(slug)
      const minutes = Math.max(1, Math.ceil(readingTime(content).minutes))
      const category = CATEGORY_MAP[slug] ?? 'Overig'
      const mappedCity = CITY_MAP[slug]
      const image = (frontmatter.image as string | undefined) ?? null
      const imageAlt = (frontmatter.imageAlt as string | undefined) ?? frontmatter.title ?? slug
      const randomizedDate = randomizeDate(frontmatter.date as string | undefined, slug)
      return {
        slug,
        title: frontmatter.title ?? slug,
        excerpt: (frontmatter.description as string | undefined) ?? '',
        category,
        city: mappedCity,
        minutes,
        dateIso: randomizedDate.toISOString().slice(0, 10),
        image,
        imageAlt,
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
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.dateIso,
    author: { '@type': 'Organization', name: 'ProBrandwacht' },
    publisher: { '@type': 'Organization', name: 'ProBrandwacht', url: 'https://www.probrandwacht.nl' },
    url: `https://www.probrandwacht.nl/blog/${post.slug}`,
    description: post.excerpt,
  }))

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JSONLD data={{ '@graph': articleSchema }} />

      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Blog over brandveiligheid & zzp-brandwachten</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          Artikelen over tarieven, DBA, wetgeving en praktijkcases voor bouw, evenementen en industrie. Eerlijk geschreven voor zzp’ers én opdrachtgevers.
        </p>
      </header>

      <section className="mb-6 flex flex-wrap gap-3">
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
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.image} alt={post.imageAlt} className="h-40 w-full object-cover" loading="lazy" />
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
                  Lees artikel →
                </Link>
                <Link href="/aanmelden" className="text-sm text-slate-500 hover:underline">
                  Meld je aan als zzp’er
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl bg-slate-50 p-6 text-center">
        <h3 className="text-xl font-semibold">Klaar voor eerlijk samenwerken?</h3>
        <p className="mt-2 text-slate-700">
          Sluit je aan bij de eerste lichting brandwachten of meld je als opdrachtgever aan voor de wachtlijst.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href="/aanmelden" className="rounded-2xl bg-brand-700 px-5 py-3 text-white hover:bg-brand-500">
            Meld je aan als zzp’er
          </Link>
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

function randomizeDate(baseIso: string | undefined, seed: string) {
  const base = baseIso ? new Date(baseIso) : new Date('2025-01-01')
  const randomFactor = pseudoRandom(seed)
  const dayOffset = Math.floor(randomFactor * 60) - 30 // spread over roughly ±30 dagen
  const randomized = new Date(base)
  randomized.setDate(base.getDate() + dayOffset)
  const today = new Date()
  if (randomized > today) {
    return today
  }
  return randomized
}

function pseudoRandom(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  const x = Math.sin(hash) * 10000
  return x - Math.floor(x)
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' })
  } catch {
    return ''
  }
}
