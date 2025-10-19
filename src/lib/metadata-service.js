// Metadata service for dynamic SEO
export class MetadataService {
  constructor() {
    this.baseUrl = 'https://moradabadnews.com'
    this.defaultMetadata = {
      title: 'Moradabad News - Latest News & Updates',
      description: 'Get the latest news, current affairs, and updates from Moradabad and surrounding areas.',
      keywords: 'moradabad news, latest news, current affairs, breaking news, moradabad updates',
      ogTitle: 'Moradabad News - Latest News & Updates',
      ogDescription: 'Get the latest news, current affairs, and updates from Moradabad and surrounding areas.',
      ogImage: `${this.baseUrl}/logo-192x192.png`,
      twitterCard: 'summary_large_image'
    }
  }

  // Generate metadata for article pages
  async getArticleMetadata(category, slug, articleData = null) {
    const title = articleData?.title || `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Moradabad News`
    const description = articleData?.description || `Read the latest news about ${slug.replace(/-/g, ' ')} from Moradabad. Stay updated with current affairs and breaking news.`
    const keywords = `${category}, ${slug.replace(/-/g, ' ')}, moradabad news, latest news, current affairs`
    const ogImage = articleData?.image || `${this.baseUrl}/logo-192x192.png`
    const url = `${this.baseUrl}/news/${category}/${slug}`

    return {
      ...this.defaultMetadata,
      title,
      description,
      keywords,
      ogTitle: title,
      ogDescription: description,
      ogImage,
      ogUrl: url,
      canonical: url,
      article: {
        publishedTime: articleData?.publishedTime || new Date().toISOString(),
        modifiedTime: articleData?.modifiedTime || new Date().toISOString(),
        author: articleData?.author || 'Moradabad News',
        section: category,
        tags: [category, 'moradabad', 'news']
      }
    }
  }

  // Generate metadata for category pages
  async getCategoryMetadata(category) {
    const title = `${category.charAt(0).toUpperCase() + category.slice(1)} News - Moradabad News`
    const description = `Latest ${category} news and updates from Moradabad. Stay informed with current affairs and breaking news.`
    const keywords = `${category}, moradabad news, latest news, current affairs, ${category} updates`
    const url = `${this.baseUrl}/news/${category}`

    return {
      ...this.defaultMetadata,
      title,
      description,
      keywords,
      ogTitle: title,
      ogDescription: description,
      ogUrl: url,
      canonical: url
    }
  }

  // Generate metadata for static pages
  getPageMetadata(page) {
    const pageMetadata = {
      '/': {
        title: 'Moradabad News - Latest News & Updates',
        description: 'Get the latest news, current affairs, and updates from Moradabad and surrounding areas.',
        keywords: 'moradabad news, latest news, current affairs, breaking news, moradabad updates'
      },
      '/about': {
        title: 'About Us - Moradabad News',
        description: 'Learn about Moradabad News - your trusted source for latest news, current affairs, and updates from Moradabad.',
        keywords: 'about moradabad news, news website, moradabad updates, about us'
      },
      '/contact': {
        title: 'Contact Us - Moradabad News',
        description: 'Get in touch with Moradabad News team. Contact us for news tips, feedback, or any inquiries.',
        keywords: 'contact moradabad news, news tips, feedback, contact us'
      },
      '/careers': {
        title: 'Careers - Moradabad News',
        description: 'Join our team at Moradabad News. Explore career opportunities in journalism and media.',
        keywords: 'careers, jobs, journalism, media jobs, moradabad news jobs, employment'
      },
      '/services': {
        title: 'Services - Moradabad News',
        description: 'Explore our services at Moradabad News including news coverage, advertising, and media services.',
        keywords: 'services, advertising, media services, news coverage, business services'
      },
      '/current-affairs': {
        title: 'Current Affairs - Moradabad News',
        description: 'Stay updated with the latest current affairs and political news from Moradabad and India.',
        keywords: 'current affairs, political news, moradabad politics, latest updates, politics'
      },
      '/news/trending': {
        title: 'Trending News - Moradabad News',
        description: 'Check out the most trending and popular news stories from Moradabad and surrounding areas.',
        keywords: 'trending news, popular news, viral news, moradabad trending, hot news'
      },
      '/search': {
        title: 'Search - Moradabad News',
        description: 'Search for news articles, stories, and updates on Moradabad News.',
        keywords: 'search news, find articles, news search, search moradabad news'
      }
    }

    const metadata = pageMetadata[page] || this.defaultMetadata
    const url = `${this.baseUrl}${page}`

    return {
      ...this.defaultMetadata,
      ...metadata,
      ogUrl: url,
      canonical: url
    }
  }

  // Generate structured data for articles
  generateArticleStructuredData(articleData, category, slug) {
    return {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": articleData?.title || `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      "description": articleData?.description || `Latest news about ${slug.replace(/-/g, ' ')} from Moradabad`,
      "image": articleData?.image || `${this.baseUrl}/logo-192x192.png`,
      "author": {
        "@type": "Organization",
        "name": "Moradabad News"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Moradabad News",
        "logo": {
          "@type": "ImageObject",
          "url": `${this.baseUrl}/logo-192x192.png`
        }
      },
      "datePublished": articleData?.publishedTime || new Date().toISOString(),
      "dateModified": articleData?.modifiedTime || new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/news/${category}/${slug}`
      }
    }
  }

  // Generate structured data for organization
  generateOrganizationStructuredData() {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Moradabad News",
      "url": this.baseUrl,
      "logo": `${this.baseUrl}/logo-192x192.png`,
      "description": "Latest news, current affairs, and updates from Moradabad and surrounding areas",
      "sameAs": [
        // Add your social media URLs here
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXX-XXXXXX",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "Hindi, English"
      }
    }
  }

  // Generate breadcrumb structured data
  generateBreadcrumbStructuredData(breadcrumbs) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${this.baseUrl}${crumb.url}`
      }))
    }
  }
}

export const metadataService = new MetadataService()
