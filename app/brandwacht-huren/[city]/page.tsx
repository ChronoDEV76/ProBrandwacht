import type { Metadata } from 'next'

import CityPage, { generateStaticParams } from '@/app/(site)/steden/[city]/page'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Alias van de steden-variant; canonical blijft /steden/[city]
export const metadata: Metadata = getRouteMetadata('/steden/[city]')

export { generateStaticParams }

export default CityPage
