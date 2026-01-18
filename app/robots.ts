// app/robots.ts
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.probrandwacht.nl'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/dashboard',
          '/reports',
          '/api',
          '/opdrachtgevers/thank-you',
          '/aanmelden',
          '/zzp/aanmelden',
          '/voor-brandwachten/aanmelden',
          '/opdrachtgevers/aanmelden',
        ],
      },
    ],
    host: BASE_URL,
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
