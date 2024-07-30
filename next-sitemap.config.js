/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://wordwrangle.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }
    ],
    additionalSitemaps: [
      'https://wordwrangle.vercel.app/sitemap-0.xml'
    ]
  },
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  additionalPaths: async (config) => [
    { loc: '/', changefreq: 'daily', priority: 1 },
    { loc: '/game', changefreq: 'weekly', priority: 0.7 },
    { loc: '/instructions', changefreq: 'monthly', priority: 0.5 },
    { loc: '/profile', changefreq: 'weekly', priority: 0.8 },
  ],
}