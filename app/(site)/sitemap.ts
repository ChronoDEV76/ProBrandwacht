import type { MetadataRoute } from 'next'
import { getPostSlugs, getPostBySlug } from '@/lib/blog'
import { cities } from '@/lib/cities'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.probrandwacht.nl'
  const staticRoutes = ['/', '/blog', '/manifest', '/faq'].map(p => ({
    url: base + p,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  const cityRoutes = cities.map(c => ({
    url: `${base}/brandwacht-inhuren/${c}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  const slugs = await getPostSlugs()
  const blogRoutes = await Promise.all(
    slugs.map(async s => {
      const { frontmatter } = await getPostBySlug(s)
      const lastModified = frontmatter.date ? new Date(frontmatter.date) : undefined
      return {
        url: `${base}/blog/${s}`,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        lastModified,
      }
    }),
  )
  return [...staticRoutes, ...cityRoutes, ...blogRoutes]
}
