// SEO Utilities for Dynamic Metadata Generation
import { format } from 'date-fns'

// Site configuration
export const SITE_CONFIG = {
  name: 'Moradabad News',
  url: 'https://moradabads.com',
  description: 'Get the latest news from Moradabad, Uttar Pradesh, India and around the world. Stay updated with trending news, current affairs, and breaking stories.',
  defaultImage: '/logo.svg',
  logo: {
    url: '/logo.svg',
    width: 200,
    height: 60
  },
  twitterHandle: '@moradabadnews',
  facebookAppId: '123456789', // Replace with actual Facebook App ID
  googleAnalyticsId: 'G-7MDBN4HRGB', // Replace with actual GA ID
}

// Keyword categories for different content types
export const KEYWORD_CATEGORIES = {
  primary: [
    'Moradabad news',
    'Moradabad latest news',
    'Moradabad breaking news',
    'UP news',
    'Uttar Pradesh news',
    'Moradabad current affairs',
    'Moradabad local news',
    'Moradabad city news'
  ],
  secondary: [
    'India news',
    'Hindi news',
    'breaking news India',
    'current affairs',
    'trending news',
    'latest news today',
    'news Moradabad UP',
    'Moradabad updates'
  ],
  local: [
    'Moradabad weather',
    'Moradabad traffic',
    'Moradabad events',
    'Moradabad business news',
    'Moradabad politics',
    'Moradabad sports news',
    'Moradabad education news'
  ],
  categories: {
    news: ['news', 'breaking news', 'latest news', 'current affairs'],
    technology: ['technology', 'tech news', 'digital', 'innovation'],
    politics: ['politics', 'government', 'election', 'political news'],
    business: ['business', 'economy', 'finance', 'market'],
    education: ['education', 'school', 'college', 'university'],
    weather: ['weather', 'climate', 'forecast', 'temperature'],
    sports: ['sports', 'cricket', 'football', 'athletics'],
    health: ['health', 'medical', 'healthcare', 'wellness']
  }
}

// Generate dynamic title based on content type and data
export function generateDynamicTitle(data, pageType = 'article') {
  const { title, category, author, publishedAt } = data
  
  switch (pageType) {
    case 'article':
      return title ? `${title} | ${SITE_CONFIG.name}` : `${SITE_CONFIG.name} - Latest News`
    
    case 'category':
      const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1) || 'News'
      return `${categoryName} News - ${SITE_CONFIG.name}`
    
    case 'search':
      const query = data.query || 'Search'
      return `Search Results for "${query}" - ${SITE_CONFIG.name}`
    
    case 'home':
      return `${SITE_CONFIG.name} - Latest News from Moradabad, UP, India & World`
    
    case 'about':
      return `About ${SITE_CONFIG.name} - Your Trusted News Source`
    
    case 'contact':
      return `Contact ${SITE_CONFIG.name} - Get in Touch`
    
    default:
      return title || `${SITE_CONFIG.name} - Latest News`
  }
}

// Generate dynamic description based on content
export function generateDynamicDescription(data, pageType = 'article') {
  const { title, excerpt, content, category, author, publishedAt } = data
  
  switch (pageType) {
    case 'article':
      if (excerpt) {
        return excerpt.length > 155 ? excerpt.substring(0, 152) + '...' : excerpt
      }
      if (content) {
        const cleanContent = content.replace(/<[^>]*>/g, '').substring(0, 150)
        return cleanContent + '...'
      }
      return `Read the latest news about ${title || 'Moradabad'} on ${SITE_CONFIG.name}. Stay updated with breaking news, current affairs, and trending stories.`
    
    case 'category':
      const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1) || 'News'
      return `Get the latest ${categoryName.toLowerCase()} news from Moradabad, UP, India. Stay updated with ${categoryName.toLowerCase()} updates, breaking news, and current affairs on ${SITE_CONFIG.name}.`
    
    case 'search':
      const query = data.query || 'news'
      return `Search results for "${query}" on ${SITE_CONFIG.name}. Find the latest news, articles, and updates about ${query} from Moradabad, Uttar Pradesh, India.`
    
    case 'home':
      return SITE_CONFIG.description
    
    case 'about':
      return `Learn more about ${SITE_CONFIG.name}, your trusted source for latest news from Moradabad, Uttar Pradesh, India. Stay informed with breaking news, current affairs, and local updates.`
    
    case 'contact':
      return `Contact ${SITE_CONFIG.name} for news tips, feedback, or inquiries. Get in touch with our team for the latest news from Moradabad, UP, India.`
    
    default:
      return SITE_CONFIG.description
  }
}

// Generate dynamic keywords based on content
export function generateDynamicKeywords(data, pageType = 'article') {
  const { title, category, tags = [], author } = data
  let keywords = [...KEYWORD_CATEGORIES.primary]
  
  // Add category-specific keywords
  if (category && KEYWORD_CATEGORIES.categories[category]) {
    keywords = [...keywords, ...KEYWORD_CATEGORIES.categories[category]]
  }
  
  // Add content-specific keywords
  if (title) {
    const titleWords = title.toLowerCase().split(' ').filter(word => word.length > 3)
    keywords = [...keywords, ...titleWords]
  }
  
  // Add tags
  if (tags.length > 0) {
    keywords = [...keywords, ...tags]
  }
  
  // Add local keywords
  keywords = [...keywords, ...KEYWORD_CATEGORIES.local]
  
  // Remove duplicates and limit to reasonable number
  return [...new Set(keywords)].slice(0, 20).join(', ')
}

// Generate Open Graph data
export function generateOpenGraphData(data, pageType = 'article') {
  const { title, image, category, author, publishedAt, modifiedAt } = data
  
  return {
    type: pageType === 'article' ? 'article' : 'website',
    title: generateDynamicTitle(data, pageType),
    description: generateDynamicDescription(data, pageType),
    image: image || SITE_CONFIG.defaultImage,
    url: typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'en_IN',
    ...(pageType === 'article' && {
      article: {
        author: author || SITE_CONFIG.name,
        publishedTime: publishedAt,
        modifiedTime: modifiedAt || publishedAt,
        section: category,
        tags: data.tags || []
      }
    })
  }
}

// Generate Twitter Card data
export function generateTwitterCardData(data, pageType = 'article') {
  const { title, image, author } = data
  
  return {
    card: 'summary_large_image',
    site: SITE_CONFIG.twitterHandle,
    creator: author || SITE_CONFIG.twitterHandle,
    title: generateDynamicTitle(data, pageType),
    description: generateDynamicDescription(data, pageType),
    image: image || SITE_CONFIG.defaultImage
  }
}

// Generate structured data for different page types
export function generateStructuredData(data, pageType = 'article') {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : SITE_CONFIG.url
  
  switch (pageType) {
    case 'article':
      return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": data.title,
        "description": generateDynamicDescription(data, pageType),
        "image": data.image || SITE_CONFIG.defaultImage,
        "author": {
          "@type": "Person",
          "name": data.author || SITE_CONFIG.name
        },
        "publisher": {
          "@type": "Organization",
          "name": SITE_CONFIG.name,
          "url": SITE_CONFIG.url,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.svg`,
            "width": 200,
            "height": 60
          }
        },
        "datePublished": data.publishedAt,
        "dateModified": data.modifiedAt || data.publishedAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.url
        },
        "articleSection": data.category,
        "keywords": data.tags?.join(', ') || ''
      }
    
    case 'category':
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${data.category} News`,
        "description": generateDynamicDescription(data, pageType),
        "url": typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.url,
        "mainEntity": {
          "@type": "ItemList",
          "name": `${data.category} News Articles`,
          "description": `Latest ${data.category} news from Moradabad`
        }
      }
    
    case 'search':
      return {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "name": `Search Results for "${data.query}"`,
        "description": generateDynamicDescription(data, pageType),
        "url": typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.url
      }
    
    case 'home':
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": SITE_CONFIG.name,
        "url": SITE_CONFIG.url,
        "description": SITE_CONFIG.description,
        "publisher": {
          "@type": "Organization",
          "name": SITE_CONFIG.name,
          "url": SITE_CONFIG.url,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.svg`,
            "width": 200,
            "height": 60
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${SITE_CONFIG.url}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    
    default:
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": generateDynamicTitle(data, pageType),
        "description": generateDynamicDescription(data, pageType),
        "url": typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.url
      }
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbData(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

// Generate FAQ structured data
export function generateFAQData(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

// Generate organization structured data
export function generateOrganizationData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": `${typeof window !== 'undefined' ? window.location.origin : SITE_CONFIG.url}/favicon.svg`,
    "description": SITE_CONFIG.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Moradabad",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@moradabads.com"
    },
    "sameAs": [
      "https://facebook.com/moradabadnews",
      "https://twitter.com/moradabadnews",
      "https://instagram.com/moradabadnews"
    ]
  }
}

// Utility to extract keywords from content
export function extractKeywordsFromContent(content, maxKeywords = 10) {
  if (!content) return []
  
  // Remove HTML tags and get clean text
  const cleanContent = content.replace(/<[^>]*>/g, ' ').toLowerCase()
  
  // Common stop words to ignore
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ])
  
  // Extract words and filter
  const words = cleanContent
    .split(/\s+/)
    .filter(word => 
      word.length > 3 && 
      !stopWords.has(word) && 
      /^[a-zA-Z]+$/.test(word)
    )
  
  // Count word frequency
  const wordCount = {}
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1
  })
  
  // Sort by frequency and return top keywords
  return Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word)
}

// Generate meta robots content based on page type
export function generateRobotsContent(pageType, isIndexed = true) {
  if (!isIndexed) return 'noindex,nofollow'
  
  switch (pageType) {
    case 'article':
      return 'index,follow'
    case 'category':
      return 'index,follow'
    case 'search':
      return 'noindex,follow'
    case 'home':
      return 'index,follow'
    default:
      return 'index,follow'
  }
}

// Generate canonical URL
export function generateCanonicalUrl(path = '') {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : SITE_CONFIG.url
  return `${baseUrl}${path}`
}

// Generate sitemap data
export function generateSitemapData(pages) {
  const baseUrl = SITE_CONFIG.url
  
  return pages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastmod: page.lastModified || new Date().toISOString(),
    changefreq: page.changeFrequency || 'daily',
    priority: page.priority || 0.5
  }))
}

export default {
  generateDynamicTitle,
  generateDynamicDescription,
  generateDynamicKeywords,
  generateOpenGraphData,
  generateTwitterCardData,
  generateStructuredData,
  generateBreadcrumbData,
  generateFAQData,
  generateOrganizationData,
  extractKeywordsFromContent,
  generateRobotsContent,
  generateCanonicalUrl,
  generateSitemapData
}
