import type { MetadataRoute } from 'next'
import { getPostSlugs } from '@/lib/blog'
import { coreCities } from '@/lib/cities'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.probrandwacht.nl'
  const staticRoutes = ['/', '/blog', '/manifest', '/faq'].map(p => ({
    url: base + p,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  const cityRoutes = coreCities.map(c => ({
    url: `${base}/brandwacht-inhuren/${c}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  const slugs = await getPostSlugs()
  const blogRoutes = slugs.map(s => ({
    url: `${base}/blog/${s}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  return [...staticRoutes, ...cityRoutes, ...blogRoutes]
}
