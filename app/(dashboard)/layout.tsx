import type { Metadata } from 'next'
import { baseMeta } from '@/app/(site)/shared-metadata'

export const metadata: Metadata = {
  ...baseMeta,
  title: 'Dashboard | ProBrandwacht',
  description: 'Beheer je profiel en opdrachten met helder inzicht via ProBrandwacht.',
  alternates: {
    canonical: '/dashboard',
    languages: { 'nl-NL': '/dashboard' },
  },
}

export { default } from '@/app/_shared/SectionLayout'
