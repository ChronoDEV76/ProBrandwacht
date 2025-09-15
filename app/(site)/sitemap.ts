import type { MetadataRoute } from 'next'
import { cities } from '@/lib/cities'
import { getPostSlugs } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.probrandwacht.nl'
  const staticRoutes = ['/', '/blog'].map(p => ({
    url: base + p,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  const cityRoutes = cities.map(c => ({
    url: `${base}/brandwacht-inhuren/${c}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
  const slugs = await getPostSlugs()
  const blogRoutes = slugs.map(s => ({
    url: `${base}/blog/${s}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))
  return [...staticRoutes, ...cityRoutes, ...blogRoutes]
}
