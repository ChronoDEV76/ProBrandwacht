// app/sitemap.ts
import type { MetadataRoute } from 'next'

import { getPostBySlug, getPostSlugs } from '@/lib/blog'

const BASE_URL = 'https://www.probrandwacht.nl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    '/',
    '/blog',
    '/contact',
    '/disclaimer',
    '/privacy',
    '/voorwaarden',
    '/platform',
    '/over-ons',
    '/faq',
    '/opdrachtgevers',
    '/voor-brandwachten',
    '/belangen',
    '/veiligheidskundig-kader',
    '/steden',
    '/waarom-wij-soms-nee-zeggen',
  ]

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'weekly',
    priority: 0.8,
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

  return [...staticRoutes, ...blogEntries]
}
