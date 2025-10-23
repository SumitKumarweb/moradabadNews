import { Helmet } from 'react-helmet-async'
import { generateStructuredData, generateDynamicTitle, generateDynamicDescription, generateDynamicKeywords } from '../../lib/seo-utils'

export default function StaticSEO({ 
  pageType,
  title,
  description,
  keywords,
  image,
  breadcrumbs = [],
  faqs = []
}) {
  // Generate SEO data
  const seoTitle = title || generateDynamicTitle({}, pageType)
  const seoDescription = description || generateDynamicDescription({}, pageType)
  const seoKeywords = keywords || generateDynamicKeywords({}, pageType)
  
  // Generate structured data
  const pageStructuredData = generateStructuredData({ title, description }, pageType)
  
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

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://moradabads.com'
  const pageUrl = typeof window !== 'undefined' ? window.location.href : baseUrl
  const pageImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/logo.svg`

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
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || 'Moradabad News'} />
      <meta property="og:site_name" content="Moradabad News" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:alt" content={title || 'Moradabad News'} />
      <meta name="twitter:site" content="@moradabadnews" />
      <meta name="twitter:creator" content="@moradabadnews" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Moradabad News" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(pageStructuredData)}
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
    </Helmet>
  )
}