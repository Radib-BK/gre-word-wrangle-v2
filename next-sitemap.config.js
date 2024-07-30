/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://wordwrangle.vercel.app', // Replace with your actual domain
    generateRobotsTxt: true, // Generate robots.txt file
    sitemapSize: 5000, // Maximum entries per sitemap file
    changefreq: 'weekly', // Frequency of page changes
    priority: 0.7, // Default priority of URLs
  }
  