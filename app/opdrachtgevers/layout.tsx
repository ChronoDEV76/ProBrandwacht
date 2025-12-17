import type { Metadata } from 'next'
import { baseMeta } from '@/app/(site)/shared-metadata'

export const metadata: Metadata = {
  ...baseMeta,
  title: 'Voor opdrachtgevers | ProBrandwacht.nl',
  description: 'Eerlijk samenwerken met duidelijke tariefopbouw en ondersteuning voor werken binnen Wet DBA.',
  alternates: {
    canonical: '/opdrachtgevers',
    languages: { 'nl-NL': '/opdrachtgevers' },
  },
}

export { default } from '@/app/_shared/SectionLayout'
