import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostSlugs, getPostBySlug, readingTime, formatReadingTime } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | ProBrandwacht.nl',
  description: 'Nieuws en gidsen over brandwacht inzet, tarieven en veiligheid.',
  alternates: { canonical: '/blog', languages: { 'nl-NL': '/blog' } },
  other: { hreflang: 'nl-NL' },
}

export const revalidate = 60 * 60 // 1h ISR

function niceCity(slug: string) {
  return slug
    .split('-')
    .map(s => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(' ')
}

export default async function BlogIndexPage() {
  const slugs = await getPostSlugs()
  if (!slugs.length) {
    return (
      <section className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Blog & kennisbank</h1>
          <p className="text-slate-600 max-w-2xl">
            Gidsen, tarieven en praktische tips voor evenementen, bouw en industrie.
          </p>
        </header>
        <p className="text-slate-600">Er zijn nog geen artikelen gepubliceerd.</p>
        <Link href="/" className="underline">
          Terug naar home
        </Link>
      </section>
    )
  }

  const posts = (
    await Promise.all(
      slugs.map(async slug => {
        const { frontmatter, content } = await getPostBySlug(slug)
        const date = frontmatter.date ? new Date(frontmatter.date) : undefined
        const rt = readingTime(content)
        return {
          slug,
          title: frontmatter.title ?? slug,
          description: (frontmatter.description as string | undefined) ?? undefined,
          date,
          readMins: rt.minutes,
        }
      }),
    )
  ).sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.getTime() - a.date.getTime()
  })

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Blog & kennisbank</h1>
        <p className="text-slate-600 max-w-2xl">
          Gidsen, tarieven en praktische tips voor evenementen, bouw en industrie.
        </p>
        <div className="flex flex-wrap gap-2">
          {['amsterdam', 'rotterdam', 'den-haag', 'utrecht'].map(c => (
            <Link
              key={c}
              href={`/brandwacht-inhuren/${c}`}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              {niceCity(c)}
            </Link>
          ))}
        </div>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2">
        {posts.map(p => {
          const now = new Date()
          const isNew = p.date ? now.getTime() - p.date.getTime() < 1000 * 60 * 60 * 24 * 30 : false
          const excerpt =
            p.description && p.description.length > 140
              ? `${p.description.slice(0, 140)}…`
              : p.description
          return (
            <li key={p.slug} className="rounded-xl border p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <Link href={`/blog/${p.slug}`} className="font-medium hover:underline">
                  {p.title}
                </Link>
                <div className="flex items-center gap-2">
                  {typeof p.readMins === 'number' ? (
                    <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 text-xs px-2 py-0.5">
                      {formatReadingTime(p.readMins, 'nl-NL')}
                    </span>
                  ) : null}
                  {isNew ? (
                    <span className="inline-flex items-center rounded-full bg-brand-50 text-brand-700 text-xs px-2 py-0.5">
                      Nieuw
                    </span>
                  ) : null}
                </div>
              </div>
              {p.date ? (
                <time
                  className="text-xs text-slate-500 mt-1 block"
                  dateTime={p.date.toISOString().slice(0, 10)}
                >
                  {p.date.toLocaleDateString('nl-NL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              ) : null}
              {excerpt ? <p className="text-sm text-slate-600 mt-2">{excerpt}</p> : null}
              <div className="mt-3">
                <Link href={`/blog/${p.slug}`} className="text-sm text-brand-700 hover:underline">
                  Lees artikel →
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
