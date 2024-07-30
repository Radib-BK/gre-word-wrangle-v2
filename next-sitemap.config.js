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
}