// Comprehensive SEO Configuration for Moradabad News
export const SEO_CONFIG = {
  // Site Information
  site: {
    name: 'Moradabad News',
    url: 'https://moradabads.com',
    description: 'Get the latest news from Moradabad, Uttar Pradesh, India and around the world. Stay updated with trending news, current affairs, and breaking stories.',
    logo: 'https://moradabads.com/logo.svg',
    favicon: 'https://moradabads.com/favicon.ico',
    language: 'en',
    locale: 'en_IN',
    alternateLocale: 'hi_IN'
  },
  
  // Geographic Information
  geography: {
    city: 'Moradabad',
    state: 'Uttar Pradesh',
    country: 'India',
    region: 'IN-UP',
    coordinates: {
      latitude: 28.8381,
      longitude: 78.7733
    },
    postalCode: '244001',
    timezone: 'Asia/Kolkata'
  },
  
  // Contact Information
  contact: {
    email: 'contact@moradabads.com',
    phone: '+91-XXXX-XXXXXX',
    address: {
      street: 'Moradabad',
      city: 'Moradabad',
      state: 'Uttar Pradesh',
      postalCode: '244001',
      country: 'India'
    }
  },
  
  // Social Media
  social: {
    facebook: 'https://facebook.com/moradabadnews',
    twitter: 'https://twitter.com/moradabadnews',
    instagram: 'https://instagram.com/moradabadnews',
    youtube: 'https://youtube.com/moradabadnews',
    linkedin: 'https://linkedin.com/company/moradabadnews'
  },
  
  // Keywords Configuration
  keywords: {
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
      'Moradabad education news',
      'Moradabad crime news',
      'Moradabad development news'
    ],
    categories: {
      news: ['news', 'breaking news', 'latest news', 'current affairs'],
      technology: ['technology', 'tech news', 'digital', 'innovation'],
      politics: ['politics', 'government', 'election', 'political news'],
      business: ['business', 'economy', 'finance', 'market'],
      education: ['education', 'school', 'college', 'university'],
      weather: ['weather', 'climate', 'forecast', 'temperature'],
      sports: ['sports', 'cricket', 'football', 'athletics'],
      health: ['health', 'medical', 'healthcare', 'wellness'],
      crime: ['crime', 'police', 'law', 'safety'],
      development: ['development', 'infrastructure', 'construction', 'projects']
    }
  },
  
  // SEO Settings
  seo: {
    titleLength: 60,
    descriptionLength: 160,
    keywordsLimit: 20,
    imageWidth: 1200,
    imageHeight: 630,
    robots: {
      home: 'index,follow',
      article: 'index,follow',
      category: 'index,follow',
      search: 'noindex,follow',
      page: 'index,follow'
    }
  },
  
  // Performance Settings
  performance: {
    coreWebVitals: {
      lcp: 2.5, // seconds
      fid: 100, // milliseconds
      cls: 0.1 // score
    },
    imageOptimization: {
      webp: true,
      avif: true,
      lazyLoading: true,
      responsive: true
    },
    fontOptimization: {
      preload: true,
      display: 'swap',
      fallback: 'system-ui, -apple-system, sans-serif'
    }
  },
  
  // Structured Data Templates
  structuredData: {
    organization: {
      "@type": "Organization",
      "name": "Moradabad News",
      "url": "https://moradabads.com",
      "logo": "https://moradabads.com/logo.svg",
      "description": "Get the latest news from Moradabad, Uttar Pradesh, India and around the world.",
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
    },
    
    website: {
      "@type": "WebSite",
      "name": "Moradabad News",
      "url": "https://moradabads.com",
      "description": "Get the latest news from Moradabad, Uttar Pradesh, India and around the world.",
      "publisher": {
        "@type": "Organization",
        "name": "Moradabad News",
        "url": "https://moradabads.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://moradabads.com/logo.svg",
          "width": 200,
          "height": 60
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://moradabads.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    
    localBusiness: {
      "@type": "LocalBusiness",
      "name": "Moradabad News",
      "description": "Local news source for Moradabad, Uttar Pradesh",
      "url": "https://moradabads.com",
      "telephone": "+91-XXXX-XXXXXX",
      "email": "contact@moradabads.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Moradabad",
        "addressLocality": "Moradabad",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "244001",
        "addressCountry": "India"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.8381,
        "longitude": 78.7733
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Monday",
          "opens": "00:00",
          "closes": "23:59"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Tuesday",
          "opens": "00:00",
          "closes": "23:59"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Wednesday",
          "opens": "00:00",
          "closes": "23:59"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Thursday",
          "opens": "00:00",
          "closes": "23:59"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Friday",
          "opens": "00:00",
          "closes": "23:59"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "00:00",
          "closes": "23:59"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Moradabad"
        },
        {
          "@type": "City",
          "name": "Rampur"
        },
        {
          "@type": "City",
          "name": "Bareilly"
        },
        {
          "@type": "City",
          "name": "Meerut"
        }
      ]
    }
  },
  
  // Sitemap Configuration
  sitemap: {
    priorities: {
      home: 1.0,
      category: 0.8,
      article: 0.7,
      page: 0.6,
      search: 0.3
    },
    changeFrequencies: {
      home: 'daily',
      category: 'daily',
      article: 'weekly',
      page: 'monthly',
      search: 'never'
    },
    maxUrls: 50000,
    maxFileSize: 50 * 1024 * 1024 // 50MB
  },
  
  // Analytics Configuration
  analytics: {
    googleAnalytics: 'G-7MDBN4HRGB',
    googleTagManager: 'GTM-XXXXXXX',
    facebookPixel: 'XXXXXXXXXXXXXXX',
    hotjar: 'XXXXXXXXXX'
  },
  
  // AdSense Configuration
  adsense: {
    client: 'ca-pub-8141314854363213',
    adSlots: {
      header: '1234567890',
      sidebar: '0987654321',
      footer: '1122334455',
      inArticle: '5566778899',
      betweenArticles: '9988776655'
    }
  }
}

export default SEO_CONFIG
