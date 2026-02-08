import type { Metadata } from 'next'
import { baseMeta } from '@/app/(site)/shared-metadata'

export const metadata: Metadata = {
  ...baseMeta,
  title: 'Dashboard | ProBrandwacht',
  description: 'Beheeromgeving voor aanvragen, afstemming en opvolging.',
  alternates: {
    canonical: '/dashboard',
    languages: { 'nl-NL': '/dashboard' },
  },
}

export { default } from '@/app/_shared/SectionLayout'
