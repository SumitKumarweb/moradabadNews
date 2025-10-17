// Dynamic Sitemap Generator for Moradabad News
import { getAllArticles } from './firebase-service'
import { generateArticleUrl } from './utils'

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

// Generate XML sitemap
export async function generateSitemap() {
  try {
    // Get all articles from Firebase
    const articles = await getAllArticles()
    
    // Generate sitemap XML
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
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return basic sitemap with static pages only
    return generateBasicSitemap()
  }
}

// Generate basic sitemap with static pages only (fallback)
function generateBasicSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  })

  categoryPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  })

  sitemap += `
</urlset>`

  return sitemap
}

// Generate robots.txt content
export function generateRobotsTxt() {
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

// Generate sitemap index for multiple sitemaps (if needed for large sites)
export async function generateSitemapIndex() {
  const sitemap = await generateSitemap()
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`
}
