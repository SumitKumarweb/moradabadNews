import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

export default function LocalSEO({ 
  businessName = "Moradabad News",
  businessType = "News Website",
  address = "Moradabad, Uttar Pradesh, India",
  phone = "+91-8791447027",
  email = "contact@moradabadnews.com",
  coordinates = { lat: 28.8381, lng: 78.7733 },
  openingHours = "24/7",
  socialMedia = {},
  additionalInfo = {}
}) {
  
  // Generate structured data for local business
  const generateLocalBusinessSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      "name": businessName,
      "description": "Your trusted source for latest news from Moradabad, Uttar Pradesh, India. Breaking news, current affairs, and local updates.",
      "url": window.location.origin,
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/favicon.svg`
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address,
        "addressLocality": "Moradabad",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": coordinates.lat,
        "longitude": coordinates.lng
      },
      "telephone": phone,
      "email": email,
      "openingHours": openingHours,
      "sameAs": Object.values(socialMedia).filter(Boolean),
      "areaServed": {
        "@type": "City",
        "name": "Moradabad",
        "containedInPlace": {
          "@type": "State",
          "name": "Uttar Pradesh",
          "containedInPlace": {
            "@type": "Country",
            "name": "India"
          }
        }
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": coordinates.lat,
          "longitude": coordinates.lng
        },
        "geoRadius": "50000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "News Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Local News Coverage",
              "description": "Comprehensive coverage of Moradabad local news and events"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Breaking News Updates",
              "description": "Real-time breaking news from Moradabad and surrounding areas"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Current Affairs Analysis",
              "description": "In-depth analysis of current affairs affecting Moradabad"
            }
          }
        ]
      },
      "foundingDate": "2020",
      "founder": {
        "@type": "Person",
        "name": "Moradabad News Team"
      },
      "award": [
        "Trusted Local News Source",
        "Community Journalism Excellence"
      ],
      "knowsAbout": [
        "Moradabad News",
        "Uttar Pradesh Politics",
        "Local Business Updates",
        "Community Events",
        "Educational News",
        "Health Updates",
        "Sports News",
        "Cultural Events"
      ],
      ...additionalInfo
    }
  }

  // Generate FAQ schema for local SEO
  const generateFAQSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Moradabad News?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Moradabad News is your trusted local news source covering the latest happenings in Moradabad, Uttar Pradesh, India. We provide breaking news, current affairs, and in-depth analysis of local events."
          }
        },
        {
          "@type": "Question",
          "name": "How often is the news updated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We update our news content 24/7 to bring you the latest breaking news and updates from Moradabad and surrounding areas as they happen."
          }
        },
        {
          "@type": "Question",
          "name": "What type of news do you cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We cover local news, politics, business, education, health, sports, technology, and cultural events in Moradabad and Uttar Pradesh."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact Moradabad News?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can contact us via email at contact@moradabadnews.com or call us at +91-8791447027. We're also active on social media platforms."
          }
        }
      ]
    }
  }

  // Generate breadcrumb schema
  const generateBreadcrumbSchema = (breadcrumbs) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    }
  }

  // Generate article schema for news articles
  const generateArticleSchema = (article) => {
    return {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": article.title,
      "description": article.description,
      "image": article.image,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": businessName,
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/favicon.svg`
        }
      },
      "datePublished": article.publishedAt,
      "dateModified": article.updatedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": article.url
      },
      "articleSection": article.category,
      "keywords": article.tags?.join(', '),
      "about": {
        "@type": "Place",
        "name": "Moradabad",
        "containedInPlace": {
          "@type": "State",
          "name": "Uttar Pradesh"
        }
      }
    }
  }

  // Setup local SEO optimizations
  useEffect(() => {
    // Add local business schema
    const localBusinessSchema = generateLocalBusinessSchema()
    const faqSchema = generateFAQSchema()
    
    // Create script elements for structured data
    const localBusinessScript = document.createElement('script')
    localBusinessScript.type = 'application/ld+json'
    localBusinessScript.textContent = JSON.stringify(localBusinessSchema)
    localBusinessScript.id = 'local-business-schema'
    
    const faqScript = document.createElement('script')
    faqScript.type = 'application/ld+json'
    faqScript.textContent = JSON.stringify(faqSchema)
    faqScript.id = 'faq-schema'
    
    // Remove existing schemas if they exist
    const existingLocalBusiness = document.getElementById('local-business-schema')
    const existingFAQ = document.getElementById('faq-schema')
    
    if (existingLocalBusiness) existingLocalBusiness.remove()
    if (existingFAQ) existingFAQ.remove()
    
    // Add new schemas
    document.head.appendChild(localBusinessScript)
    document.head.appendChild(faqScript)
    
    // Add local SEO meta tags
    const metaTags = [
      { name: 'geo.region', content: 'IN-UP' },
      { name: 'geo.placename', content: 'Moradabad' },
      { name: 'geo.position', content: `${coordinates.lat};${coordinates.lng}` },
      { name: 'ICBM', content: `${coordinates.lat}, ${coordinates.lng}` },
      { name: 'distribution', content: 'local' },
      { name: 'audience', content: 'local' },
      { name: 'target', content: 'Moradabad, Uttar Pradesh' }
    ]
    
    metaTags.forEach(meta => {
      let metaElement = document.querySelector(`meta[name="${meta.name}"]`)
      if (!metaElement) {
        metaElement = document.createElement('meta')
        metaElement.name = meta.name
        document.head.appendChild(metaElement)
      }
      metaElement.content = meta.content
    })
    
    // Add local business information to page
    const businessInfo = document.createElement('div')
    businessInfo.className = 'sr-only'
    businessInfo.innerHTML = `
      <h1>${businessName}</h1>
      <p>${businessType} in Moradabad, Uttar Pradesh</p>
      <address>
        ${address}<br>
        Phone: ${phone}<br>
        Email: ${email}
      </address>
    `
    document.body.appendChild(businessInfo)
    
    return () => {
      // Cleanup on unmount
      const localBusiness = document.getElementById('local-business-schema')
      const faq = document.getElementById('faq-schema')
      if (localBusiness) localBusiness.remove()
      if (faq) faq.remove()
      if (businessInfo) businessInfo.remove()
    }
  }, [businessName, businessType, address, phone, email, coordinates])

  return (
    <Helmet>
      {/* Local SEO Meta Tags */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Moradabad" />
      <meta name="geo.position" content={`${coordinates.lat};${coordinates.lng}`} />
      <meta name="ICBM" content={`${coordinates.lat}, ${coordinates.lng}`} />
      <meta name="distribution" content="local" />
      <meta name="audience" content="local" />
      <meta name="target" content="Moradabad, Uttar Pradesh" />
      
      {/* Local Business Meta Tags */}
      <meta name="business:contact_data:street_address" content={address} />
      <meta name="business:contact_data:locality" content="Moradabad" />
      <meta name="business:contact_data:region" content="Uttar Pradesh" />
      <meta name="business:contact_data:country_name" content="India" />
      <meta name="business:contact_data:phone_number" content={phone} />
      <meta name="business:contact_data:email" content={email} />
      
      {/* Local Keywords */}
      <meta name="keywords" content="Moradabad news, Moradabad local news, UP news, Uttar Pradesh news, Moradabad breaking news, Moradabad current affairs, local news Moradabad" />
      
      {/* Open Graph for Local Business */}
      <meta property="og:type" content="business.business" />
      <meta property="og:business:contact_data:street_address" content={address} />
      <meta property="og:business:contact_data:locality" content="Moradabad" />
      <meta property="og:business:contact_data:region" content="Uttar Pradesh" />
      <meta property="og:business:contact_data:country_name" content="India" />
      <meta property="og:business:contact_data:phone_number" content={phone} />
      <meta property="og:business:contact_data:email" content={email} />
      
      {/* Twitter Card for Local Business */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${businessName} - Local News in Moradabad, UP`} />
      <meta name="twitter:description" content="Your trusted source for latest news from Moradabad, Uttar Pradesh. Breaking news, current affairs, and local updates." />
    </Helmet>
  )
}

// Export utility functions for use in other components
export const generateLocalBusinessSchema = (businessData) => {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": businessData.name,
    "description": businessData.description,
    "url": businessData.url,
    "logo": businessData.logo,
    "address": businessData.address,
    "geo": businessData.geo,
    "telephone": businessData.phone,
    "email": businessData.email,
    "openingHours": businessData.openingHours,
    "sameAs": businessData.socialMedia,
    "areaServed": businessData.areaServed,
    "serviceArea": businessData.serviceArea
  }
}

export const generateLocalKeywords = (baseKeywords = []) => {
  const localKeywords = [
    'Moradabad news',
    'Moradabad local news',
    'Moradabad breaking news',
    'Moradabad current affairs',
    'UP news',
    'Uttar Pradesh news',
    'Moradabad politics',
    'Moradabad business news',
    'Moradabad sports news',
    'Moradabad education news',
    'Moradabad health news',
    'Moradabad weather',
    'Moradabad events',
    'Moradabad traffic',
    'Moradabad jobs',
    'Moradabad real estate',
    'Moradabad restaurants',
    'Moradabad shopping',
    'Moradabad tourism',
    'Moradabad culture'
  ]
  
  return [...baseKeywords, ...localKeywords]
}

export const generateLocalBreadcrumbs = (currentPage) => {
  const baseBreadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Moradabad News', url: '/news/moradabad' }
  ]
  
  if (currentPage) {
    baseBreadcrumbs.push(currentPage)
  }
  
  return baseBreadcrumbs
}
