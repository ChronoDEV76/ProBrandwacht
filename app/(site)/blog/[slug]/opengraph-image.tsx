import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog'

// Use Node.js runtime because we read MDX files from the filesystem
export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: { slug: string } }) {
  const { frontmatter } = await getPostBySlug(params.slug)
  const title = (frontmatter.title as string) || params.slug

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 56,
          background: 'linear-gradient(135deg, #0a63ff 0%, #003cc2 60%)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            lineHeight: 1.2,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size },
  )
}
