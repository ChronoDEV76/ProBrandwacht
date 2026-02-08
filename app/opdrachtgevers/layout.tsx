import type { Metadata } from 'next'
import { baseMeta } from '@/app/(site)/shared-metadata'

export const metadata: Metadata = {
  ...baseMeta,
  title: 'Voor opdrachtgevers | ProBrandwacht',
  description:
    'Context voor samenwerking met zelfstandige brandwachten, met focus op rolverdeling, beslislijnen en uitvoerbaarheid.',
  alternates: {
    canonical: '/opdrachtgevers',
    languages: { 'nl-NL': '/opdrachtgevers' },
  },
}

export { default } from '@/app/_shared/SectionLayout'
