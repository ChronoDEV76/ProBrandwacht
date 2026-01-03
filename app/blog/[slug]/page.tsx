import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import HeroBackground from '@/components/HeroBackground'
import SeoStructuredData from '@/components/SeoStructuredData'
import Prose from '@/components/prose'
import { getRouteMetadata } from '@/lib/seo/metadata'
import { getPostSlugs } from '@/lib/blog'
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
    const title = rawTitle ? `${rawTitle} | ProBrandwacht` : 'Kennisbank | ProBrandwacht'
    const canonical = `${BASE_URL}/blog/${params.slug}`
    const description =
      (frontmatter.tldr as string | undefined) ??
      (frontmatter.excerpt as string | undefined) ??
      (frontmatter.description as string | undefined) ??
      'Praktische kennis voor zelfstandige brandwachten en opdrachtgevers: afspraken, rolverdeling en uitvoering.'

    return {
      ...base,
      title,
      description,
      alternates: { canonical, languages: { 'nl-NL': canonical } },
      openGraph: { ...(base.openGraph ?? {}), title, description, url: canonical },
      twitter: { ...(base.twitter ?? {}), title, description },
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
  const author = (frontmatter.author as string | undefined) ?? 'ProBrandwacht Redactie'
  const readingTime = frontmatter.readingTime as string | number | undefined
  const pageUrl = `${BASE_URL}/blog/${params.slug}`
  const publishedDate = parseFrontmatterDate(frontmatter.date)
  const updatedDate = parseFrontmatterDate(frontmatter.updated) ?? publishedDate
  const description =
    (frontmatter.tldr as string | undefined) ??
    (frontmatter.excerpt as string | undefined) ??
    (frontmatter.description as string | undefined) ??
    'Praktische kennis voor zelfstandige brandwachten en opdrachtgevers: afspraken, rolverdeling en uitvoering.'
  const articleImage = toAbsoluteUrl(
    (frontmatter.ogImage as string | undefined) ??
      (frontmatter.image as string | undefined) ??
      '/og-home.webp'
  )
  const breadcrumbItems = [
    { name: 'Home', item: 'https://www.probrandwacht.nl/' },
    { name: 'Kennisbank', item: 'https://www.probrandwacht.nl/blog' },
    { name: title, item: pageUrl },
  ]


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
            <Link href="/blog" className="font-semibold text-emerald-200 hover:text-emerald-100">
              Kennisbank
            </Link>
            <span>-&gt;</span>
            <span className="text-slate-200">{title}</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>Door {author} · Kennisbank</span>
            {date ? <span>• Geplaatst: {formatDate(date)}</span> : null}
            {updated ? <span>• Laatst bijgewerkt: {formatDate(updated)}</span> : null}
            {readingTime ? <span>• {readingTime}</span> : null}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/voor-brandwachten"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Route voor brandwachten
            </Link>
            <Link
              href="/opdrachtgevers"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Route voor opdrachtgevers
            </Link>
            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kaders & richtlijnen
            </Link>
          </div>
        </div>
      </HeroBackground>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        <article className="rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)] md:p-8">
          <Prose>{post.compiled}</Prose>
        </article>

        {/* FOOTER CTA */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Volgende stap</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            Als je dit artikel herkent: leg de afspraken vooraf vast. Dat maakt uitvoering rustiger en samenwerking sterker.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/zzp/aanmelden"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Ik wil verkennen als brandwacht
            </Link>
            <Link
              href="/opdrachtgevers/aanmelden"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ik wil verkennen als opdrachtgever
            </Link>
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
