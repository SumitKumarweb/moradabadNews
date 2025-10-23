// Enhanced Sitemap Generator for Moradabad News
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { db } from './firebase'

const SITE_URL = 'https://moradabads.com'
const SITEMAP_PRIORITIES = {
  home: 1.0,
  category: 0.8,
  article: 0.7,
  page: 0.6,
  search: 0.3
}
const CHANGE_FREQUENCIES = {
  home: 'daily',
  category: 'daily',
  article: 'weekly',
  page: 'monthly',
  search: 'never'
}

// Generate XML sitemap
function generateSitemapXML(urls) {
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  const footer = '</urlset>'
  
  const urlEntries = urls.map(url => {
    const lastmod = url.lastmod ? new Date(url.lastmod).toISOString() : new Date().toISOString()
    return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  }).join('\n')
  
  return header + urlEntries + '\n' + footer
}

// Generate sitemap index
function generateSitemapIndex(sitemaps) {
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  const footer = '</sitemapindex>'
  
  const sitemapEntries = sitemaps.map(sitemap => {
    return `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  }).join('\n')
  
  return header + sitemapEntries + '\n' + footer
}

// Get all articles from Firebase
export async function getAllArticlesForSitemap() {
  try {
    if (!db) {
      console.error('Firebase not initialized')
      return []
    }
    
    const articlesRef = collection(db, 'articles')
    const q = query(articlesRef, where('status', '==', 'published'), orderBy('publishedAt', 'desc'))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      slug: doc.data().slug || doc.id
    }))
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
    return []
  }
}

// Get all categories from Firebase
export async function getAllCategoriesForSitemap() {
  try {
    if (!db) {
      console.error('Firebase not initialized')
      return []
    }
    
    const categoriesRef = collection(db, 'categories')
    const q = query(categoriesRef, where('status', '==', 'active'), orderBy('name', 'asc'))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      slug: doc.data().slug || doc.id
    }))
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
    return []
  }
}

// Generate main sitemap
export async function generateMainSitemap() {
  const urls = [
    // Homepage
    {
      loc: SITE_URL,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.home,
      priority: SITEMAP_PRIORITIES.home
    },
    // Static pages
    {
      loc: `${SITE_URL}/about`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/contact`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/privacy-policy`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/terms-of-service`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/careers`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/services`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/trending`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.category,
      priority: SITEMAP_PRIORITIES.category
    },
    {
      loc: `${SITE_URL}/current-affairs`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.category,
      priority: SITEMAP_PRIORITIES.category
    }
  ]
  
  return generateSitemapXML(urls)
}

// Generate articles sitemap
export async function generateArticlesSitemap() {
  const articles = await getAllArticlesForSitemap()
  
  const urls = articles.map(article => ({
    loc: `${SITE_URL}/article/${article.slug}`,
    lastmod: article.modifiedAt || article.publishedAt,
    changefreq: CHANGE_FREQUENCIES.article,
    priority: SITEMAP_PRIORITIES.article
  }))
  
  return generateSitemapXML(urls)
}

// Generate categories sitemap
export async function generateCategoriesSitemap() {
  const categories = await getAllCategoriesForSitemap()
  
  const urls = categories.map(category => ({
    loc: `${SITE_URL}/category/${category.slug}`,
    lastmod: category.updatedAt || new Date().toISOString(),
    changefreq: CHANGE_FREQUENCIES.category,
    priority: SITEMAP_PRIORITIES.category
  }))
  
  return generateSitemapXML(urls)
}

// Generate pages sitemap
export function generatePagesSitemap() {
  const urls = [
    {
      loc: `${SITE_URL}/about`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/contact`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/privacy-policy`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/terms-of-service`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/careers`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    },
    {
      loc: `${SITE_URL}/services`,
      lastmod: new Date().toISOString(),
      changefreq: CHANGE_FREQUENCIES.page,
      priority: SITEMAP_PRIORITIES.page
    }
  ]
  
  return generateSitemapXML(urls)
}

// Generate sitemap index
export function generateSitemapIndex() {
  const sitemaps = [
    {
      loc: `${SITE_URL}/sitemap.xml`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${SITE_URL}/sitemap-articles.xml`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${SITE_URL}/sitemap-categories.xml`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${SITE_URL}/sitemap-pages.xml`,
      lastmod: new Date().toISOString()
    }
  ]
  
  return generateSitemapIndex(sitemaps)
}

// Generate all sitemaps
export async function generateAllSitemaps() {
  try {
    const [mainSitemap, articlesSitemap, categoriesSitemap, pagesSitemap] = await Promise.all([
      generateMainSitemap(),
      generateArticlesSitemap(),
      generateCategoriesSitemap(),
      generatePagesSitemap()
    ])
    
    const sitemapIndex = generateSitemapIndex()
    
    return {
      main: mainSitemap,
      articles: articlesSitemap,
      categories: categoriesSitemap,
      pages: pagesSitemap,
      index: sitemapIndex
    }
  } catch (error) {
    console.error('Error generating sitemaps:', error)
    throw error
  }
}

// Generate sitemap for specific content type
export async function generateSitemapByType(type) {
  switch (type) {
    case 'main':
      return generateMainSitemap()
    case 'articles':
      return generateArticlesSitemap()
    case 'categories':
      return generateCategoriesSitemap()
    case 'pages':
      return generatePagesSitemap()
    case 'index':
      return generateSitemapIndex()
    default:
      throw new Error(`Unknown sitemap type: ${type}`)
  }
}

export default {
  generateMainSitemap,
  generateArticlesSitemap,
  generateCategoriesSitemap,
  generatePagesSitemap,
  generateSitemapIndex,
  generateAllSitemaps,
  generateSitemapByType
}
