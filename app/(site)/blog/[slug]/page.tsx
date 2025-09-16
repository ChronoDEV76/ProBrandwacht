import { getPostBySlug, getPostSlugs, readingTime, formatReadingTime } from '@/lib/blog'
import { getSignupUrl } from '@/lib/config'
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
  return {
    title,
    description,
    alternates: { canonical: url, languages: { 'nl-NL': url } },
    other: { hreflang: 'nl-NL' },
    openGraph: {
      url,
      title,
      description,
      images: ['/og.jpg'],
      type: 'article',
      locale: 'nl_NL',
      publishedTime: frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined,
    },
  }
}

export const revalidate = 60 * 60 // 1h ISR

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let content: string
  let frontmatter: any
  try {
    const data = await getPostBySlug(params.slug)
    content = data.content
    frontmatter = data.frontmatter
  } catch {
    return notFound()
  }
  const signupUrl = getSignupUrl()
  const rt = readingTime(content)
  const faqs: Array<{ q: string; a: string }> = Array.isArray(frontmatter.faq)
    ? frontmatter.faq.filter((f: any) => f && f.q && f.a)
    : []
  const howto =
    frontmatter.howto && Array.isArray(frontmatter.howto.steps)
      ? {
          name: (frontmatter.howto.name as string) || (frontmatter.title as string) || params.slug,
          steps: frontmatter.howto.steps as Array<{ name: string; text?: string }>,
          totalTime: frontmatter.howto.totalTime as string | undefined,
        }
      : null
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
      <div className="mt-6">
        <ShareBar
          url={`https://www.probrandwacht.nl/blog/${params.slug}`}
          title={frontmatter.title ?? 'ProBrandwacht.nl'}
          utmCampaign="blog_share"
        />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black"
        >
          Meld je aan en kom straks met je profiel op ProSafetyMatch
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
    </article>
  )
}
