import { getPostBySlug } from '@/lib/blog'
import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og'

export const runtime = 'nodejs'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function OgImage({ params }: { params: { slug: string } }) {
  const { frontmatter } = await getPostBySlug(params.slug)
  const title = (frontmatter.title as string) || params.slug

  return createOgImage(title)
}
