/** @type {import('next-sitemap').IConfig} */
module.exports = {
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
    // Hier verwijs je expliciet naar je extra steden-sitemap
    // Let op: je moet wel een route hebben op /sitemap-cities.xml
    additionalSitemaps: [
      'https://www.probrandwacht.nl/sitemap-cities.xml',
    ],
  },
};

