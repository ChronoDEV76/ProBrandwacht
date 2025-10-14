import type { Metadata } from 'next'
import { baseMeta } from '@/app/(site)/shared-metadata'

export const metadata: Metadata = {
  ...baseMeta,
  title: 'Voor zzp-brandwachten | ProBrandwacht.nl',
  description: 'Bereken je kostendekkend tarief, beheer opdrachten en werk direct met opdrachtgevers.',
  alternates: {
    canonical: '/zzp',
    languages: { 'nl-NL': '/zzp' },
  },
}

export { default } from '@/app/_shared/SectionLayout'
