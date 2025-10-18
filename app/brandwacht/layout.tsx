import type { Metadata } from 'next'

const canonicalBase = 'https://www.probrandwacht.nl/brandwacht'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.probrandwacht.nl'),
}

export default function BrandwachtLayout({ children }: { children: React.ReactNode }) {
  return children
}
