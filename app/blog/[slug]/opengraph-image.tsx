/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

import { getPostBySlug } from '@/lib/blog'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage({
  params,
}: {
  params: { slug: string }
}) {
  let title = 'Kennisbank'
  let subtitle = 'Duidelijke afspraken. Minder ruis.'
  let imageUrl: string | null = null

  try {
    const { frontmatter } = await getPostBySlug(params.slug)
    const rawTitle = frontmatter?.title as string | undefined
    const excerpt = frontmatter?.excerpt as string | undefined
    const description = frontmatter?.description as string | undefined
    const ogImage = frontmatter?.ogImage as string | undefined
    const image = frontmatter?.image as string | undefined

    if (rawTitle) title = rawTitle
    if (excerpt || description) {
      subtitle = excerpt ?? description ?? subtitle
    }
    const resolvedImage = ogImage ?? image
    if (resolvedImage) {
      imageUrl = toAbsoluteUrl(resolvedImage)
    }
  } catch {
    // fallback ok
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(180deg, #020617 0%, #0f172a 55%, #020617 100%)',
          color: 'white',
          padding: 64,
          justifyContent: 'space-between',
          flexDirection: 'column',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.35,
            }}
          />
        ) : null}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(2,6,23,0.65) 0%, rgba(15,23,42,0.7) 55%, rgba(2,6,23,0.75) 100%)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px solid rgba(52, 211, 153, 0.35)',
              background: 'rgba(52, 211, 153, 0.10)',
              color: 'rgba(167, 243, 208, 1)',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
            }}
          >
            ProBrandwacht - Kennisbank
          </div>

          <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            {title}
          </div>

          <div
            style={{
              fontSize: 24,
              lineHeight: 1.35,
              color: 'rgba(226, 232, 240, 0.92)',
              maxWidth: 980,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'rgba(148, 163, 184, 1)',
            fontSize: 18,
            position: 'relative',
          }}
        >
          <div>Toetsbaar vooraf. Rustig in uitvoering.</div>
          <div>probrandwacht.nl</div>
        </div>
      </div>
    ),
    { ...size }
  )
}

function toAbsoluteUrl(url: string) {
  const trimmed = url.trim()
  if (!trimmed) return null
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `https://www.probrandwacht.nl${normalized}`
}
