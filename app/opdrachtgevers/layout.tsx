import type { Metadata } from 'next'
import { baseMeta } from '@/app/(site)/shared-metadata'

export const metadata: Metadata = {
  ...baseMeta,
  title: 'Voor opdrachtgevers | ProBrandwacht.nl',
  description: 'Transparant inhuren met escrow, eerlijke tariefopbouw en DBA-proof documentatie.',
  alternates: {
    canonical: '/opdrachtgevers',
    languages: { 'nl-NL': '/opdrachtgevers' },
  },
}

export { default } from '@/app/_shared/SectionLayout'
