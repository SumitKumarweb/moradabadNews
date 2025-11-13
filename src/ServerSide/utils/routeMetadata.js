/**
 * Route Metadata Resolver
 * Determines metadata based on the request route
 */

import { generateCanonicalUrl, SITE_CONFIG } from '../../lib/seo-utils.js';
import { getArticleById, getAllArticles } from '../../lib/firebase-service.js';

/**
 * Extract metadata from route
 */
export async function getRouteMetadata(req) {
  const { path, query } = req;
  const baseUrl = req.protocol + '://' + req.get('host');
  const fullUrl = baseUrl + path;

  // Extract route parameters from path
  const params = extractRouteParams(path);

  // Determine page type from route
  const pageType = determinePageType(path);
  
  // Base metadata
  const metadata = {
    path,
    url: fullUrl,
    pageType,
    baseUrl,
    params
  };

  // Add route-specific metadata
  switch (pageType) {
    case 'home':
      // Home page metadata - can be enhanced with featured article data
      return {
        ...metadata,
        title: `${SITE_CONFIG.name} - Latest News from Moradabad, UP, India & World`,
        description: SITE_CONFIG.description,
        keywords: 'Moradabad news, UP news, India news, breaking news, current affairs, trending news',
        image: `${baseUrl}/logo.svg`
      };

    case 'article':
      // Fetch actual article data from Firebase to get real title
      if (params?.category && params?.slug) {
        const articleData = await fetchArticleData(params.category, params.slug);
        console.log(articleData ,'articleDataarticleData' )
        if (articleData) {
          return {
            ...metadata,
            title: articleData.metaTitle || articleData.title || articleData.englishTitle || 'Article',
            description: articleData.metaDescription || articleData.excerpt || articleData.description || articleData.summary || `Read the latest article on ${SITE_CONFIG.name}`,
            keywords: articleData.metaKeywords || articleData.keywords || (articleData.tags ? articleData.tags.join(', ') : ''),
            image: articleData.ogImage || articleData.image || `${baseUrl}/logo.svg`,
            category: articleData.category || params?.category,
            slug: articleData.slug || params?.slug || params?.id,
            id: articleData.id || params?.slug || params?.id,
            author: articleData.author,
            publishedAt: articleData.publishedAt,
            modifiedAt: articleData.modifiedAt,
            tags: articleData.tags || [],
            content: articleData.content
          };
        }
      }
      // Fallback if article not found
      return {
        ...metadata,
        title: 'Article',
        description: `Read the latest article on ${SITE_CONFIG.name}`,
        category: params?.category,
        slug: params?.slug || params?.id,
        id: params?.slug || params?.id,
      };

    case 'category':
      const categoryName = params?.category 
        ? params.category.charAt(0).toUpperCase() + params.category.slice(1)
        : 'News';
      return {
        ...metadata,
        title: `${categoryName} News - ${SITE_CONFIG.name}`,
        description: `Get the latest ${categoryName.toLowerCase()} news from Moradabad, UP, India. Stay updated with ${categoryName.toLowerCase()} updates, breaking news, and current affairs.`,
        category: params?.category,
        keywords: `${categoryName.toLowerCase()} news, Moradabad ${categoryName.toLowerCase()}, UP ${categoryName.toLowerCase()} news`,
        image: `${baseUrl}/logo.svg`
      };

    case 'search':
      const searchQuery = query.q || query.query || '';
      return {
        ...metadata,
        title: searchQuery ? `Search Results for "${searchQuery}" - ${SITE_CONFIG.name}` : `Search - ${SITE_CONFIG.name}`,
        description: searchQuery 
          ? `Search results for "${searchQuery}" on ${SITE_CONFIG.name}. Find the latest news, articles, and updates.`
          : `Search for news articles on ${SITE_CONFIG.name}`,
        query: searchQuery,
        keywords: searchQuery ? `${searchQuery}, search results, news search` : 'search, news search',
        noindex: true, // Search pages should not be indexed
        image: `${baseUrl}/logo.svg`
      };

    case 'about':
      return {
        ...metadata,
        title: `About ${SITE_CONFIG.name} - Your Trusted News Source`,
        description: `Learn more about ${SITE_CONFIG.name}, your trusted source for latest news from Moradabad, Uttar Pradesh, India.`,
        keywords: 'about, Moradabad News, news source, trusted news',
        image: `${baseUrl}/logo.svg`
      };

    case 'contact':
      return {
        ...metadata,
        title: `Contact ${SITE_CONFIG.name} - Get in Touch`,
        description: `Contact ${SITE_CONFIG.name} for news tips, feedback, or inquiries. Get in touch with our team.`,
        keywords: 'contact, get in touch, news tips, feedback',
        image: `${baseUrl}/logo.svg`
      };

    case 'careers':
      return {
        ...metadata,
        title: `Careers - ${SITE_CONFIG.name}`,
        description: `Join ${SITE_CONFIG.name} team. Explore career opportunities in journalism and media.`,
        keywords: 'careers, jobs, journalism jobs, media jobs, Moradabad jobs',
        image: `${baseUrl}/logo.svg`
      };

    case 'trending':
      return {
        ...metadata,
        title: `Trending News - ${SITE_CONFIG.name}`,
        description: `Stay updated with trending news and viral stories from Moradabad, UP, India and around the world.`,
        keywords: 'trending news, viral news, popular news, breaking news',
        image: `${baseUrl}/logo.svg`
      };

    case 'current-affairs':
      return {
        ...metadata,
        title: `Current Affairs - ${SITE_CONFIG.name}`,
        description: `Get the latest current affairs and important news updates from Moradabad, UP, India.`,
        keywords: 'current affairs, important news, updates, Moradabad current affairs',
        image: `${baseUrl}/logo.svg`
      };

    default:
      return {
        ...metadata,
        title: `${SITE_CONFIG.name} - Latest News`,
        description: SITE_CONFIG.description,
        image: `${baseUrl}/logo.svg`
      };
  }
}

/**
 * Extract route parameters from path
 */
function extractRouteParams(path) {
  const cleanPath = path.replace(/^\/|\/$/g, '');
  const segments = cleanPath.split('/').filter(Boolean);
  const params = {};

  // Article route: /news/:category/:slug
  if (segments[0] === 'news' && segments.length === 3) {
    params.category = segments[1];
    params.slug = segments[2];
    params.id = segments[2];
  }
  // Category route: /news/:category
  else if (segments[0] === 'news' && segments.length === 2) {
    params.category = segments[1];
  }

  return params;
}

/**
 * Determine page type from route path
 */
function determinePageType(path) {
  // Remove leading/trailing slashes and split
  const cleanPath = path.replace(/^\/|\/$/g, '');
  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length === 0) {
    return 'home';
  }

  const [first, second, third] = segments;

  // Article route: /news/:category/:slug
  if (first === 'news' && second && third) {
    // Check if it's trending (special case)
    if (second === 'trending') {
      return 'trending';
    }
    return 'article';
  }

  // Category route: /news/:category
  if (first === 'news' && second && !third) {
    // Check if it's trending
    if (second === 'trending') {
      return 'trending';
    }
    return 'category';
  }

  // Specific routes
  const routeMap = {
    'about': 'about',
    'contact': 'contact',
    'careers': 'careers',
    'search': 'search',
    'current-affairs': 'current-affairs',
    'services': 'services',
    'privacy-policy': 'privacy-policy',
    'terms-of-service': 'terms-of-service',
    'sitemap.xml': 'sitemap'
  };

  const routeKey = segments.join('/');
  return routeMap[routeKey] || routeMap[first] || 'page';
}

/**
 * Fetch article data from Firebase
 */
export async function fetchArticleData(category, slug) {
  try {
    console.log(`🔍 Fetching article: category="${category}", slug="${slug}"`);

    // Strategy 1: Try by document ID first (slug might be the document ID)
    try {
      const articleData = await getArticleById(slug);
      console.log(articleData , 'articlarticleDataeData')
      if (articleData) {
        // Verify category matches (case-insensitive) and article is published
        const articleCategory = (articleData.category || '').toLowerCase();
        const searchCategory = (category || '').toLowerCase();
        
        if (articleCategory === searchCategory && (!articleData.status || articleData.status === 'published')) {
          console.log(`✅ Found article by ID: ${articleData.id}`);
          // Convert Firestore Timestamps to ISO strings if needed
          return {
            ...articleData,
            publishedAt: articleData.publishedAt?.toDate?.()?.toISOString() || articleData.publishedAt,
            modifiedAt: articleData.modifiedAt?.toDate?.()?.toISOString() || articleData.modifiedAt
          };
        } else {
          console.log(`⚠️  Article found but category mismatch: ${articleCategory} !== ${searchCategory}`);
        }
      }
    } catch (error) {
      console.warn('⚠️  Error fetching article by ID:', error.message);
    }
    
    // Strategy 2: If not found by ID, search all articles by slug field
    try {
      const allArticles = await getAllArticles();
      if (allArticles && allArticles.length > 0) {
        // Filter by slug and category
        for (const article of allArticles) {
          const articleSlug = article.slug || article.id;
          const articleCategory = (article.category || '').toLowerCase();
          const searchCategory = (category || '').toLowerCase();
          
          if (articleSlug === slug && 
              articleCategory === searchCategory && 
              (!article.status || article.status === 'published')) {
            console.log(`✅ Found article by slug: ${article.id}`);
            // Convert Firestore Timestamps to ISO strings if needed
            return {
              ...article,
              publishedAt: article.publishedAt?.toDate?.()?.toISOString() || article.publishedAt,
              modifiedAt: article.modifiedAt?.toDate?.()?.toISOString() || article.modifiedAt
            };
          }
        }
      }
    } catch (error) {
      console.warn('⚠️  Error fetching articles by slug:', error.message);
    }
    
    console.log(`❌ Article not found: category="${category}", slug="${slug}"`);
    return null;
  } catch (error) {
    console.error('❌ Error fetching article data from Firebase:', error);
    console.error('Stack:', error.stack);
    return null;
  }
}

/**
 * Fetch category data from Firebase
 */
export async function fetchCategoryData(category) {
  try {
    if (!db) {
      console.warn('Firebase not initialized for server-side');
      return null;
    }

    // Try to get category document
    const categoriesRef = collection(db, 'categories');
    const categoryQuery = query(
      categoriesRef,
      where('slug', '==', category),
      limit(1)
    );
    
    const snapshot = await getDocs(categoryQuery);
    
    if (!snapshot.empty) {
      const categoryDoc = snapshot.docs[0];
      const categoryData = categoryDoc.data();
      
      // Get latest article from this category for metadata
      const articlesRef = collection(db, 'articles');
      const articlesQuery = query(
        articlesRef,
        where('category', '==', category),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc'),
        limit(1)
      );
      
      const articlesSnapshot = await getDocs(articlesQuery);
      let latestArticle = null;
      if (!articlesSnapshot.empty) {
        const articleDoc = articlesSnapshot.docs[0];
        const articleData = articleDoc.data();
        latestArticle = {
          image: articleData.image,
          publishedAt: articleData.publishedAt?.toDate?.()?.toISOString() || articleData.publishedAt
        };
      }
      
      const categoryName = categoryData.name || category.charAt(0).toUpperCase() + category.slice(1);
      
      return {
        title: `${categoryName} News - ${SITE_CONFIG.name}`,
        description: categoryData.description || `Get the latest ${categoryName.toLowerCase()} news from Moradabad, UP, India. Stay updated with ${categoryName.toLowerCase()} updates, breaking news, and current affairs.`,
        keywords: categoryData.keywords || `${categoryName.toLowerCase()} news, Moradabad ${categoryName.toLowerCase()}, UP ${categoryName.toLowerCase()} news`,
        image: latestArticle?.image || `${SITE_CONFIG.url}/logo.svg`
      };
    }
    
    // Fallback: generate metadata from category name
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    return {
      title: `${categoryName} News - ${SITE_CONFIG.name}`,
      description: `Get the latest ${categoryName.toLowerCase()} news from Moradabad, UP, India. Stay updated with ${categoryName.toLowerCase()} updates, breaking news, and current affairs.`,
      keywords: `${categoryName.toLowerCase()} news, Moradabad ${categoryName.toLowerCase()}, UP ${categoryName.toLowerCase()} news`,
      image: `${SITE_CONFIG.url}/logo.svg`
    };
  } catch (error) {
    console.error('Error fetching category data from Firebase:', error);
    // Return fallback metadata
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    return {
      title: `${categoryName} News - ${SITE_CONFIG.name}`,
      description: `Get the latest ${categoryName.toLowerCase()} news from Moradabad, UP, India.`,
      keywords: `${categoryName.toLowerCase()} news, Moradabad ${categoryName.toLowerCase()}`,
      image: `${SITE_CONFIG.url}/logo.svg`
    };
  }
}

export default {
  getRouteMetadata,
  determinePageType,
  fetchArticleData,
  fetchCategoryData
};

