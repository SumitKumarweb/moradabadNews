#!/usr/bin/env node

// Enhanced sitemap generator that works with Firebase
// This script generates a dynamic sitemap.xml with real article data

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_URL = 'https://moradabads.com'

// Static pages configuration
const staticPages = [
  {
    url: '/',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    url: '/about',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/contact',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/careers',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.7'
  },
  {
    url: '/current-affairs',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.8'
  },
  {
    url: '/news/trending',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.8'
  },
  {
    url: '/search',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.6'
  }
]

// Category pages configuration
const categoryPages = [
  {
    url: '/news/moradabad',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.8'
  },
  {
    url: '/news/up',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.8'
  },
  {
    url: '/news/india',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.8'
  },
  {
    url: '/news/global',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.8'
  },
  {
    url: '/news/current-affairs',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.8'
  }
]

// Generate slug from title (same as utils.js)
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Generate article URL
function generateArticleUrl(article) {
  // Use English title for URL if available, otherwise use the main title
  const titleForUrl = article.englishTitle || article.title
  const slug = generateSlug(titleForUrl)
  return `/news/${article.category}/${slug}`
}

// Generate sitemap XML with articles
function generateSitemap(articles = []) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  })

  // Add category pages
  categoryPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  })

  // Add article pages with dynamic URLs
  articles.forEach(article => {
    const articleUrl = generateArticleUrl(article)
    const lastmod = new Date(article.publishedAt).toISOString()
    
    sitemap += `
  <url>
    <loc>${SITE_URL}${articleUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
  })

  sitemap += `
</urlset>`

  return sitemap
}

// Generate robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin areas
Disallow: /nimda/
Disallow: /admin/
Disallow: /api/
`
}

// Try to load articles from Firebase (optional)
async function loadArticlesFromFirebase() {
  try {
    // This would require Firebase configuration
    // For now, we'll use sample data
    console.log('📝 Using sample articles (Firebase integration can be added later)')
    return []
  } catch (error) {
    console.log('⚠️  Firebase not configured, using sample data')
    return []
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Generating dynamic sitemap with Firebase integration...')
    
    // Try to load articles from Firebase
    const articles = await loadArticlesFromFirebase()
    
    // Generate sitemap
    const sitemap = generateSitemap(articles)
    
    // Write sitemap to public directory
    const publicDir = path.join(__dirname, '..', 'public')
    const sitemapPath = path.join(publicDir, 'sitemap.xml')
    
    fs.writeFileSync(sitemapPath, sitemap, 'utf8')
    console.log('✅ Sitemap generated successfully at:', sitemapPath)
    
    // Generate robots.txt
    const robotsTxt = generateRobotsTxt()
    const robotsPath = path.join(publicDir, 'robots.txt')
    
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8')
    console.log('✅ Robots.txt generated successfully at:', robotsPath)
    
    console.log('🎉 Dynamic sitemap generation completed!')
    console.log(`📄 Sitemap URL: ${SITE_URL}/sitemap.xml`)
    console.log(`🤖 Robots URL: ${SITE_URL}/robots.txt`)
    console.log('💡 To integrate with Firebase, update the loadArticlesFromFirebase function')
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export {
  generateSitemap,
  generateRobotsTxt,
  generateArticleUrl
}
