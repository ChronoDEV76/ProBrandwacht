import type { Metadata } from 'next'
import { baseMeta } from '@/app/(site)/shared-metadata'

export const metadata: Metadata = {
  ...baseMeta,
  title: 'Voor zzp-brandwachten | ProBrandwacht',
  description: 'Werk 1-op-1 met opdrachtgevers, beheer opdrachten en leg tariefafspraken helder vast.',
  alternates: {
    canonical: '/zzp',
    languages: { 'nl-NL': '/zzp' },
  },
}

export { default } from '@/app/_shared/SectionLayout'
