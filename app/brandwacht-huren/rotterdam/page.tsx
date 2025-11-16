import type { Metadata } from 'next'
import { getRouteMetadata } from '@/lib/seo/metadata'
export { default, generateMetadata } from '../[city]/page'
export const metadata: Metadata = getRouteMetadata('/brandwacht-huren/rotterdam');

