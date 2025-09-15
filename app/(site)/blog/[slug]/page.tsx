import { getPostBySlug, getPostSlugs, readingTime, formatReadingTime } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Prose from '@/components/prose'
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
    alternates: { canonical: url },
    other: { hreflang: 'nl-NL' },
    openGraph: { url, title, description },
  }
}

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
  const rt = readingTime(content)
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
        {/* @ts-expect-error Async Server Component */}
        <MDXRemote source={content} />
      </Prose>
    </article>
  )
}
