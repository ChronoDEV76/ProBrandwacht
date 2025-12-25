/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.probrandwacht.nl',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,

  // Deze routes wil je NIET in je sitemap (geen SEO-doel)
  exclude: [
    '/admin/*',
    '/api/*',
    '/(dashboard)/*',
    '/reports/*',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}

export default config
