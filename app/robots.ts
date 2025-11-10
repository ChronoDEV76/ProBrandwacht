import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.probrandwacht.nl'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 10,
      },
    ],
    host: BASE_URL,
    sitemap: [`${BASE_URL}/sitemap.xml`],
  }
}
