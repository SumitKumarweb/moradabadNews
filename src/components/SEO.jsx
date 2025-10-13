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
}) {
  const siteName = 'Moradabad News'
  const defaultDescription = 'Get the latest news from Moradabad, Uttar Pradesh, India and around the world. Stay updated with trending news, current affairs, and breaking stories.'
  const defaultKeywords = 'Moradabad news, UP news, India news, breaking news, current affairs'
  const defaultImage = '/favicon.svg'
  const baseUrl = window.location.origin

  const finalTitle = title ? `${title} - ${siteName}` : `${siteName} - Latest News from Moradabad, UP, India & World`
  const finalDescription = description || defaultDescription
  const finalKeywords = keywords || defaultKeywords
  const finalImage = image || defaultImage
  const finalUrl = url || window.location.href
  const absoluteImage = finalImage.startsWith('http') ? finalImage : `${baseUrl}${finalImage}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content={siteName} />
      
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={absoluteImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
    </Helmet>
  )
}

