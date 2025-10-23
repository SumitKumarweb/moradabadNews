import { Helmet } from 'react-helmet-async'
import { generateStructuredData, generateOpenGraphData, generateTwitterCardData, generateDynamicTitle, generateDynamicDescription, generateDynamicKeywords } from '../../lib/seo-utils'

export default function ArticleSEO({ 
  article, 
  breadcrumbs = [],
  relatedArticles = [],
  faqs = []
}) {
  const {
    id,
    title,
    excerpt,
    content,
    image,
    author,
    publishedAt,
    modifiedAt,
    category,
    tags = [],
    slug
  } = article

  // Generate SEO data
  const seoTitle = generateDynamicTitle(article, 'article')
  const seoDescription = generateDynamicDescription(article, 'article')
  const seoKeywords = generateDynamicKeywords(article, 'article')
  const ogData = generateOpenGraphData(article, 'article')
  const twitterData = generateTwitterCardData(article, 'article')
  
  // Generate structured data
  const articleStructuredData = generateStructuredData(article, 'article')
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

  // FAQ structured data
  const faqStructuredData = faqs.length > 0 ? {
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
  } : null

  // Related articles structured data
  const relatedStructuredData = relatedArticles.length > 0 ? {
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
  } : null

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://moradabads.com'
  const articleUrl = `${baseUrl}/article/${slug || id}`
  const articleImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/logo.svg`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author || 'Moradabad News'} />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="1 days" />
      
      {/* Article-specific meta tags */}
      <meta name="article:author" content={author || 'Moradabad News'} />
      <meta name="article:published_time" content={publishedAt} />
      <meta name="article:modified_time" content={modifiedAt || publishedAt} />
      <meta name="article:section" content={category} />
      {tags.map(tag => <meta key={tag} name="article:tag" content={tag} />)}
      
      {/* Geographic Meta Tags for Local SEO */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Moradabad" />
      <meta name="geo.position" content="28.8381;78.7733" />
      <meta name="ICBM" content="28.8381, 78.7733" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={articleUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={articleImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Moradabad News" />
      <meta property="og:locale" content="en_IN" />
      <meta property="article:author" content={author || 'Moradabad News'} />
      <meta property="article:published_time" content={publishedAt} />
      <meta property="article:modified_time" content={modifiedAt || publishedAt} />
      <meta property="article:section" content={category} />
      {tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={articleUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={articleImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@moradabadnews" />
      <meta name="twitter:creator" content="@moradabadnews" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={articleUrl} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Moradabad News" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>
      
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
      
      {faqStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      )}
      
      {relatedStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(relatedStructuredData)}
        </script>
      )}
    </Helmet>
  )
}