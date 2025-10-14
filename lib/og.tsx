import { ImageResponse } from 'next/og'

export const OG_RUNTIME = 'nodejs'
export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const baseStyles = {
  fontSize: 56,
  background: 'linear-gradient(135deg, #0a63ff 0%, #003cc2 60%)',
  color: 'white',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px',
} as const

const titleStyles = {
  maxWidth: 1000,
  lineHeight: 1.2,
  fontWeight: 700,
  letterSpacing: '-0.02em',
} as const

export function createOgImage(title: string) {
  return new ImageResponse(
    (
      <div style={baseStyles}>
        <div style={titleStyles}>{title}</div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
