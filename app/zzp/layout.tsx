import type { Metadata } from 'next'
import { baseMeta } from '@/app/(site)/shared-metadata'

export const metadata: Metadata = {
  ...baseMeta,
  title: 'Voor zzp-brandwachten | ProBrandwacht',
  description:
    'Context voor zelfstandig werken als brandwacht, met focus op rolafbakening, verantwoordelijkheid en uitvoerbaarheid.',
  alternates: {
    canonical: '/zzp',
    languages: { 'nl-NL': '/zzp' },
  },
}

export { default } from '@/app/_shared/SectionLayout'
