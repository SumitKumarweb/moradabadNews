import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  category,
  tags = [],
  noindex = false,
  structuredData,
  ogData,
  twitterData,
  breadcrumbs = [],
  faqs = [],
  organization = false,
}) {
  const siteName = 'Moradabad News'
  const siteUrl = 'https://moradabads.com'
  
  // Enhanced keyword research for Moradabad news niche
  const primaryKeywords = [
    'Moradabad news',
    'Moradabad latest news',
    'Moradabad breaking news',
    'UP news',
    'Uttar Pradesh news',
    'Moradabad current affairs',
    'Moradabad local news',
    'Moradabad city news'
  ]
  
  const secondaryKeywords = [
    'India news',
    'Hindi news',
    'breaking news India',
    'current affairs',
    'trending news',
    'latest news today',
    'news Moradabad UP',
    'Moradabad updates'
  ]
  
  const localKeywords = [
    'Moradabad weather',
    'Moradabad traffic',
    'Moradabad events',
    'Moradabad business news',
    'Moradabad politics',
    'Moradabad sports news',
    'Moradabad education news'
  ]
  
  const defaultDescription = 'Get the latest news from Moradabad, Uttar Pradesh, India and around the world. Stay updated with trending news, current affairs, and breaking stories. Your trusted source for Moradabad local news.'
  const defaultKeywords = [...primaryKeywords, ...secondaryKeywords, ...localKeywords].join(', ')
  const defaultImage = '/favicon.svg'
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : siteUrl

  // Optimize title length (under 60 characters)
  const finalTitle = title ? 
    (title.length > 50 ? `${title} - ${siteName}` : `${title} | ${siteName}`) : 
    `${siteName} - Latest News from Moradabad, UP, India & World`
  
  // Optimize description length (under 160 characters)
  const finalDescription = description || defaultDescription
  const optimizedDescription = finalDescription.length > 155 ? 
    finalDescription.substring(0, 152) + '...' : 
    finalDescription
    
  const finalKeywords = keywords || defaultKeywords
  const finalImage = image || defaultImage
  const finalUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl)
  const absoluteImage = finalImage.startsWith('http') ? finalImage : `${baseUrl}${finalImage}`

  // Generate structured data for better SEO
  const generateStructuredData = () => {
    // If custom structured data is provided, use it
    if (structuredData) {
      return Array.isArray(structuredData) ? structuredData : [structuredData]
    }

    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "url": siteUrl,
      "description": optimizedDescription,
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/favicon.svg`
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }

    if (type === 'article' && title) {
      return [{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": title,
        "description": optimizedDescription,
        "image": absoluteImage,
        "author": {
          "@type": "Person",
          "name": author || siteName
        },
        "publisher": {
          "@type": "Organization",
          "name": siteName,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/favicon.svg`
          }
        },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": finalUrl
        }
      }]
    }

    return [baseStructuredData]
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author || siteName} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="googlebot" content="index,follow" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="1 days" />
      
      {/* Geographic Meta Tags for Local SEO */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Moradabad" />
      <meta name="geo.position" content="28.8381;78.7733" />
      <meta name="ICBM" content="28.8381, 78.7733" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />
      
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {category && <meta property="article:section" content={category} />}
      {tags.length > 0 && tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:site" content="@moradabadnews" />
      <meta name="twitter:creator" content="@moradabadnews" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Structured Data */}
      {generateStructuredData().map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  )
}

