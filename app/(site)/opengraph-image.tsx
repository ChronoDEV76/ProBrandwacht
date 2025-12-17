import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og'

export const runtime = 'nodejs'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function OgImage() {
  const title = 'ProBrandwacht — Eerlijke Tarieven, Eerlijke Afspraken'
  return createOgImage(title)
}
