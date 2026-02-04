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
        ],
      },
    ],
    host: BASE_URL,
    sitemap: [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/sitemap-cities.xml`],
  }
}
