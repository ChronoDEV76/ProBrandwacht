import type { Metadata } from 'next'
import { baseMeta } from '@/app/(site)/shared-metadata'

export const metadata: Metadata = {
  ...baseMeta,
  title: 'Voor opdrachtgevers | ProBrandwacht',
  description: 'Context en uitleg voor samenwerking met zelfstandige brandwachten, met focus op rol en verantwoordelijkheid.',
  alternates: {
    canonical: '/opdrachtgevers',
    languages: { 'nl-NL': '/opdrachtgevers' },
  },
}

export { default } from '@/app/_shared/SectionLayout'
