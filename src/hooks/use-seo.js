import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  generateDynamicTitle, 
  generateDynamicDescription, 
  generateDynamicKeywords,
  generateStructuredData,
  generateOpenGraphData,
  generateTwitterCardData,
  generateCanonicalUrl,
  generateRobotsContent,
  extractKeywordsFromContent
} from '../lib/seo-utils'

export function useSEO({
  pageType = 'page',
  title,
  description,
  keywords,
  image,
  author,
  publishedAt,
  modifiedAt,
  category,
  tags = [],
  content,
  breadcrumbs = [],
  faqs = [],
  relatedArticles = [],
  noindex = false,
  customStructuredData = null
}) {
  const location = useLocation()
  
  // Generate SEO data
  const seoData = useMemo(() => {
    const data = {
      title,
      description,
      keywords,
      image,
      author,
      publishedAt,
      modifiedAt,
      category,
      tags,
      content,
      pageType
    }
    
    return {
      title: generateDynamicTitle(data, pageType),
      description: generateDynamicDescription(data, pageType),
      keywords: keywords || generateDynamicKeywords(data, pageType),
      canonicalUrl: generateCanonicalUrl(location.pathname),
      robots: generateRobotsContent(pageType, !noindex),
      openGraph: generateOpenGraphData(data, pageType),
      twitter: generateTwitterCardData(data, pageType),
      structuredData: customStructuredData || generateStructuredData(data, pageType)
    }
  }, [
    pageType,
    title,
    description,
    keywords,
    image,
    author,
    publishedAt,
    modifiedAt,
    category,
    tags,
    content,
    location.pathname,
    noindex,
    customStructuredData
  ])
  
  // Extract keywords from content if not provided
  const extractedKeywords = useMemo(() => {
    if (keywords || !content) return null
    return extractKeywordsFromContent(content, 10).join(', ')
  }, [content, keywords])
  
  // Generate breadcrumb structured data
  const breadcrumbStructuredData = useMemo(() => {
    if (breadcrumbs.length === 0) return null
    
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
  }, [breadcrumbs])
  
  // Generate FAQ structured data
  const faqStructuredData = useMemo(() => {
    if (faqs.length === 0) return null
    
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
  }, [faqs])
  
  // Generate related articles structured data
  const relatedStructuredData = useMemo(() => {
    if (relatedArticles.length === 0) return null
    
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Related Articles",
      "description": "Articles related to this story",
      "itemListElement": relatedArticles.map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": article.title,
          "url": article.url,
          "image": article.image,
          "datePublished": article.publishedAt
        }
      }))
    }
  }, [relatedArticles])
  
  // Update document title and meta tags
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = seoData.title
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', seoData.description)
      } else {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        metaDescription.setAttribute('content', seoData.description)
        document.head.appendChild(metaDescription)
      }
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaKeywords) {
        metaKeywords.setAttribute('content', seoData.keywords)
      } else {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        metaKeywords.setAttribute('content', seoData.keywords)
        document.head.appendChild(metaKeywords)
      }
      
      // Update canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]')
      if (canonicalLink) {
        canonicalLink.setAttribute('href', seoData.canonicalUrl)
      } else {
        canonicalLink = document.createElement('link')
        canonicalLink.setAttribute('rel', 'canonical')
        canonicalLink.setAttribute('href', seoData.canonicalUrl)
        document.head.appendChild(canonicalLink)
      }
      
      // Update robots meta
      let robotsMeta = document.querySelector('meta[name="robots"]')
      if (robotsMeta) {
        robotsMeta.setAttribute('content', seoData.robots)
      } else {
        robotsMeta = document.createElement('meta')
        robotsMeta.setAttribute('name', 'robots')
        robotsMeta.setAttribute('content', seoData.robots)
        document.head.appendChild(robotsMeta)
      }
    }
  }, [seoData])
  
  return {
    ...seoData,
    extractedKeywords,
    breadcrumbStructuredData,
    faqStructuredData,
    relatedStructuredData
  }
}

// Hook for article-specific SEO
export function useArticleSEO(article, options = {}) {
  return useSEO({
    pageType: 'article',
    title: article.title,
    description: article.excerpt,
    keywords: article.tags?.join(', '),
    image: article.image,
    author: article.author,
    publishedAt: article.publishedAt,
    modifiedAt: article.modifiedAt,
    category: article.category,
    tags: article.tags,
    content: article.content,
    ...options
  })
}

// Hook for category-specific SEO
export function useCategorySEO(category, options = {}) {
  return useSEO({
    pageType: 'category',
    title: `${category.name} News`,
    description: `Get the latest ${category.name} news from Moradabad, UP, India`,
    keywords: `${category.name}, news, Moradabad, UP, India`,
    ...options
  })
}

// Hook for search-specific SEO
export function useSearchSEO(query, options = {}) {
  return useSEO({
    pageType: 'search',
    title: `Search Results for "${query}"`,
    description: `Search results for "${query}" on Moradabad News`,
    keywords: `${query}, search, Moradabad news`,
    noindex: true,
    ...options
  })
}

// Hook for homepage SEO
export function useHomepageSEO(options = {}) {
  return useSEO({
    pageType: 'home',
    title: 'Moradabad News - Latest News from Moradabad, UP, India & World',
    description: 'Get the latest news from Moradabad, Uttar Pradesh, India and around the world. Stay updated with trending news, current affairs, and breaking stories.',
    keywords: 'Moradabad news, UP news, India news, breaking news, current affairs, trending news',
    ...options
  })
}

export default useSEO
