import { Helmet } from 'react-helmet-async'
import { generateStructuredData, generateDynamicTitle, generateDynamicDescription, generateDynamicKeywords } from '../../lib/seo-utils'

export default function SearchSEO({ 
  query, 
  results = [],
  totalResults = 0,
  currentPage = 1,
  breadcrumbs = []
}) {
  // Generate SEO data
  const seoTitle = generateDynamicTitle({ query }, 'search')
  const seoDescription = generateDynamicDescription({ query }, 'search')
  const seoKeywords = generateDynamicKeywords({ query }, 'search')
  
  // Generate structured data
  const searchStructuredData = generateStructuredData({ query }, 'search')
  
  // Breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null

  // Search results structured data
  const searchResultsStructuredData = results.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Search Results for "${query}"`,
    "description": `Search results for "${query}" on Moradabad News`,
    "numberOfItems": results.length,
    "itemListElement": results.map((result, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": result.title,
        "url": result.url,
        "image": result.image,
        "datePublished": result.publishedAt,
        "description": result.excerpt,
        "author": {
          "@type": "Person",
          "name": result.author || "Moradabad News"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Moradabad News",
          "logo": {
            "@type": "ImageObject",
            "url": "https://moradabads.com/logo.svg"
          }
        }
      }
    }))
  } : null

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://moradabads.com'
  const searchUrl = `${baseUrl}/search?q=${encodeURIComponent(query)}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="Moradabad News" />
      <meta name="robots" content="noindex,follow" />
      <meta name="googlebot" content="noindex,follow" />
      <meta name="language" content="en" />
      
      {/* Geographic Meta Tags for Local SEO */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Moradabad" />
      <meta name="geo.position" content="28.8381;78.7733" />
      <meta name="ICBM" content="28.8381, 78.7733" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={searchUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content="https://moradabads.com/logo.svg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Moradabad News Logo" />
      <meta property="og:site_name" content="Moradabad News" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={searchUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content="https://moradabads.com/logo.svg" />
      <meta name="twitter:image:alt" content="Moradabad News Logo" />
      <meta name="twitter:site" content="@moradabadnews" />
      <meta name="twitter:creator" content="@moradabadnews" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={searchUrl} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Moradabad News" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(searchStructuredData)}
      </script>
      
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
      
      {searchResultsStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(searchResultsStructuredData)}
        </script>
      )}
    </Helmet>
  )
}