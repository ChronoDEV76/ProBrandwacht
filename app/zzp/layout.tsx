import type { Metadata } from 'next'
import { baseMeta } from '@/app/(site)/shared-metadata'

export const metadata: Metadata = {
  ...baseMeta,
  title: 'Voor zzp-brandwachten | ProBrandwacht',
  description: 'Context en duiding voor zelfstandig werken als brandwacht, met aandacht voor rol en verantwoordelijkheid.',
  alternates: {
    canonical: '/zzp',
    languages: { 'nl-NL': '/zzp' },
  },
}

export { default } from '@/app/_shared/SectionLayout'
