import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import type { Metadata } from 'next'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/probrandwacht-direct');


export default function ProbrandwachtDirectPage() {
  const canonical = 'https://www.probrandwacht.nl/probrandwacht-direct'

  return (
    <main />
  )
}
