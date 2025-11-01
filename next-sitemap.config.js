/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.probrandwacht.nl',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'], // deze worden niet in sitemap opgenomen
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://www.probrandwacht.nl/sitemap.xml',
    ],
  },
}

