// app/sitemap.ts
import type { MetadataRoute } from 'next'

import { CITY_SLUGS } from '@/lib/city-data'
import { SPOED_ROUTE_ENABLED } from '@/lib/featureFlags'
import { getPostBySlug, getPostSlugs } from '@/lib/blog'

const BASE_URL = 'https://www.probrandwacht.nl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    '/',
    '/blog',
    '/contact',
    '/privacy',
    '/platform',
    '/missie',
    '/over-ons',
    '/faq',
    '/brandwacht-inhuren',
    '/opdrachtgevers',
    '/voor-brandwachten',
    '/belangen',
    '/steden',
    ...(SPOED_ROUTE_ENABLED ? ['/probrandwacht-direct', '/probrandwacht-direct-spoed'] : []),
  ]

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const cityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/steden/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const brandwachtCityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/brandwacht-inhuren/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const slugs = await getPostSlugs()
  const blogEntries = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter } = await getPostBySlug(slug)
      const lastModifiedRaw = frontmatter.updated ?? frontmatter.date
      const lastModified = lastModifiedRaw ? new Date(lastModifiedRaw) : undefined
      return {
        url: `${BASE_URL}/blog/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        lastModified,
      }
    }),
  )

  return [...staticRoutes, ...cityRoutes, ...brandwachtCityRoutes, ...blogEntries]
}
