import type { MetadataRoute } from 'next'

import { CITY_SLUGS } from '@/lib/city-data'
import { SPOED_ROUTE_ENABLED } from '@/lib/featureFlags'
import { getPostBySlug, getPostSlugs } from '@/lib/blog'

const BASE_URL = 'https://www.probrandwacht.nl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/blog',
    '/over-ons',
    '/faq',
    '/zzp/aanmelden',
    '/opdrachtgevers',
    '/voor-brandwachten',
    ...(SPOED_ROUTE_ENABLED ? ['/probrandwacht-direct', '/probrandwacht-direct-spoed'] : []),
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified: new Date(),
  }))

  const cityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/steden/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
    lastModified: new Date(),
  }))

  const slugs = await getPostSlugs()
  const blogEntries = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter } = await getPostBySlug(slug)
      const lastModified = frontmatter.date ? new Date(frontmatter.date) : undefined
      return {
        url: `${BASE_URL}/blog/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        lastModified,
      }
    }),
  )

  return [...staticRoutes, ...cityRoutes, ...blogEntries]
}
