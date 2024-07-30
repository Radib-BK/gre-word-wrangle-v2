/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://wordwrangle.vercel.app', // Replace with your actual domain
    generateRobotsTxt: true, // Generate robots.txt file
    robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    },
    changefreq: 'weekly', // Frequency of page changes
    priority: 0.7, // Default priority of URLs
  }
  