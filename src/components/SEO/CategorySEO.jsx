import { Helmet } from 'react-helmet-async'
import { generateStructuredData, generateDynamicTitle, generateDynamicDescription, generateDynamicKeywords } from '../../lib/seo-utils'

export default function CategorySEO({ 
  category, 
  articles = [],
  breadcrumbs = [],
  pagination = null
}) {
  const {
    name,
    slug,
    description,
    image,
    articleCount = 0
  } = category

  // Generate SEO data
  const seoTitle = generateDynamicTitle({ category: name }, 'category')
  const seoDescription = generateDynamicDescription({ category: name }, 'category')
  const seoKeywords = generateDynamicKeywords({ category: name }, 'category')
  
  // Generate structured data
  const categoryStructuredData = generateStructuredData({ category: name }, 'category')
  
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

  // Article list structured data
  const articleListStructuredData = articles.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${name} News Articles`,
    "description": `Latest ${name} news from Moradabad`,
    "numberOfItems": articles.length,
    "itemListElement": articles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": article.title,
        "url": article.url,
        "image": article.image,
        "datePublished": article.publishedAt,
        "author": {
          "@type": "Person",
          "name": article.author || "Moradabad News"
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
  const categoryUrl = `${baseUrl}/category/${slug}`
  const categoryImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/logo.svg`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="Moradabad News" />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="1 days" />
      
      {/* Geographic Meta Tags for Local SEO */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Moradabad" />
      <meta name="geo.position" content="28.8381;78.7733" />
      <meta name="ICBM" content="28.8381, 78.7733" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={categoryUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={categoryImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${name} News from Moradabad`} />
      <meta property="og:site_name" content="Moradabad News" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={categoryUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={categoryImage} />
      <meta name="twitter:image:alt" content={`${name} News from Moradabad`} />
      <meta name="twitter:site" content="@moradabadnews" />
      <meta name="twitter:creator" content="@moradabadnews" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={categoryUrl} />
      
      {/* Pagination meta tags */}
      {pagination && (
        <>
          {pagination.prev && <link rel="prev" href={pagination.prev} />}
          {pagination.next && <link rel="next" href={pagination.next} />}
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Moradabad News" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(categoryStructuredData)}
      </script>
      
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
      
      {articleListStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(articleListStructuredData)}
        </script>
      )}
    </Helmet>
  )
}