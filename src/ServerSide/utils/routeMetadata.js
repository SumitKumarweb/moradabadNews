/**
 * Route Metadata Resolver
 * Determines metadata based on the request route
 */

import { generateCanonicalUrl, SITE_CONFIG } from '../../lib/seo-utils.js';
import { db } from '../../lib/firebase.js';
import { collection, query, where, getDocs, doc, getDoc, limit, orderBy } from 'firebase/firestore';

/**
 * Extract metadata from route
 */
export function getRouteMetadata(req) {
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
      return {
        ...metadata,
        title: 'Article',
        description: `Read the latest article on ${SITE_CONFIG.name}`,
        category: params?.category,
        slug: params?.slug || params?.id,
        id: params?.slug || params?.id,
        // TODO: Fetch actual article data from Firebase/database
        // This will be enhanced when integrating with data source
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
    if (!db) {
      console.warn('Firebase not initialized for server-side');
      return null;
    }

    const articlesRef = collection(db, 'articles');
    
    // Try to find article by slug and category
    // Note: Firestore requires index for compound queries, so we'll filter status after fetching
    let articleQuery = query(
      articlesRef,
      where('category', '==', category),
      where('slug', '==', slug),
      limit(1)
    );
    
    let snapshot = await getDocs(articleQuery);
    
    // Filter by status if needed (after fetching to avoid index requirement)
    if (!snapshot.empty) {
      const articleDoc = snapshot.docs[0];
      const data = articleDoc.data();
      // Check if article is published (if status field exists)
      if (data.status && data.status !== 'published') {
        // Article exists but not published, return null
        return null;
      }
    }
    
    // If not found by slug, try by ID (slug might be the document ID)
    if (snapshot.empty) {
      try {
        const docRef = doc(db, 'articles', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Verify category matches and article is published (if status field exists)
          if (data.category === category && (!data.status || data.status === 'published')) {
            return {
              id: docSnap.id,
              ...data,
              publishedAt: data.publishedAt?.toDate?.()?.toISOString() || data.publishedAt,
              modifiedAt: data.modifiedAt?.toDate?.()?.toISOString() || data.modifiedAt
            };
          }
        }
      } catch (error) {
        console.warn('Error fetching article by ID:', error);
      }
    } else {
      // Found by slug
      const articleDoc = snapshot.docs[0];
      const data = articleDoc.data();
      return {
        id: articleDoc.id,
        ...data,
        publishedAt: data.publishedAt?.toDate?.()?.toISOString() || data.publishedAt,
        modifiedAt: data.modifiedAt?.toDate?.()?.toISOString() || data.modifiedAt
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching article data from Firebase:', error);
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

