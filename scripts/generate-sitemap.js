#!/usr/bin/env node

// Build-time sitemap generator
// This script generates a dynamic sitemap.xml during the build process

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_URL = 'https://moradabadnews.com'

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

// Sample articles for demonstration (in production, this would come from Firebase)
const sampleArticles = [
  {
    id: '1',
    title: 'Breaking News: मुरादाबाद में बड़ी खबर',
    category: 'moradabad',
    publishedAt: '2025-01-10T10:30:00Z'
  },
  {
    id: '2',
    title: 'UP Government Announces New Scheme',
    category: 'up',
    publishedAt: '2025-01-10T09:15:00Z'
  },
  {
    id: '3',
    title: 'Political Changes in India',
    category: 'india',
    publishedAt: '2025-01-10T08:00:00Z'
  },
  {
    id: '4',
    title: 'Global Economic Update',
    category: 'global',
    publishedAt: '2025-01-09T18:45:00Z'
  },
  {
    id: '5',
    title: 'Current Affairs: Important Updates',
    category: 'current-affairs',
    publishedAt: '2025-01-09T16:30:00Z'
  }
]

// Generate slug from title (simplified version)
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

// Generate sitemap XML
function generateSitemap() {
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
  sampleArticles.forEach(article => {
    const articleUrl = generateArticleUrl(article)
    const lastmod = article.publishedAt
    
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

// Main execution
function main() {
  try {
    console.log('🚀 Generating dynamic sitemap...')
    
    // Generate sitemap
    const sitemap = generateSitemap()
    
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
