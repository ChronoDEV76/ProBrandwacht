import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Cta } from '@/components/Cta'
import HeroBackground from '@/components/HeroBackground'
import SeoStructuredData from '@/components/SeoStructuredData'
import Prose from '@/components/prose'
import AfbakeningBanner from '@/components/afbakening-banner'
import TrustBand from '@/components/trust-band'
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
        'Praktische kennis voor zelfstandige brandwachten en opdrachtgevers: afspraken, rolverdeling en uitvoering.'
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
  const heroImage =
    (frontmatter.image as string | undefined) ??
    (frontmatter.ogImage as string | undefined) ??
    undefined
  const heroImageAlt =
    (frontmatter.imageAlt as string | undefined) ?? title
  const heroImagePosition =
    (frontmatter.imagePosition as string | undefined) ?? 'center 60%'
  const tldr = typeof frontmatter.tldr === 'string' ? frontmatter.tldr : undefined
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
              Analyse en duiding – gericht op begrip en rolhelderheid
            </div>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>Door {author} · Kennisbank</span>
            {date ? <span>• Geplaatst: {formatDate(date)}</span> : null}
            {updated ? <span>• Laatst bijgewerkt: {formatDate(updated)}</span> : null}
            {readingTime ? <span>• {readingTime}</span> : null}
          </div>

          {(tldr || isSystemArticle) ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-200">
              {tldr ? (
                <p className="leading-relaxed">
                  <span className="font-semibold text-amber-200">TL;DR:</span> {tldr}
                </p>
              ) : null}
              {isSystemArticle ? (
                <div className={tldr ? 'mt-3 space-y-2' : 'space-y-2'}>
                  <p>
                    Dit artikel richt zich op organisatorische en regelgevende kaders, niet op persoonlijke
                    prestaties of professionele competentie.
                  </p>
                  <p>
                    In dit artikel duiden we systemische factoren zonder commentaar te leveren op individuele
                    professionals; de inzet en deskundigheid van brandwachten blijft essentieel voor veilige uitvoering.
                  </p>
                  <p>
                    Brandwachten leveren waardevolle observaties en kennis; deze tekst onderzoekt hoe
                    systeemfactoren de rolcontext beïnvloeden.
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

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
      <AfbakeningBanner className="mt-6" />

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-200">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-200">
            <span aria-hidden>ℹ️</span>
            {isSystemArticle ? 'Veiligheidskundig kader' : 'Kader & duiding'}
          </div>
          <p className="mt-2">
            Dit artikel biedt context en duiding. Beoordeling en besluitvorming blijven bij de betrokken
            partijen.
          </p>
        </div>
        <article className="rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)] md:p-8">
          <Prose>{post.compiled}</Prose>
        </article>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Wat neem je mee</h2>
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
            Lees het kader en de afbakening om dit artikel in de juiste context te plaatsen.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Cta id="secondary_kader_overview" />
            <Cta id="secondary_afbakening" className="rounded-2xl px-5 py-2.5" />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Bronnen & redactie</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            We baseren artikelen op praktijkervaring en controleerbare bronnen. Bekijk de bronverzameling en
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
