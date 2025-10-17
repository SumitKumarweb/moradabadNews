# Dynamic Sitemap System for Moradabad News

## Overview

This system automatically generates SEO-friendly sitemaps for your news website with dynamic URLs that include both Hindi and English content.

## Features

- ✅ **Automatic Sitemap Generation**: No manual URL management needed
- ✅ **Dynamic URLs**: Uses slug-based URLs (`/news/category/title-slug`)
- ✅ **Hindi Support**: Preserves Hindi characters in URLs
- ✅ **SEO Optimized**: Proper XML structure with lastmod, changefreq, and priority
- ✅ **Build Integration**: Generates sitemap during build process
- ✅ **Firebase Ready**: Can integrate with Firebase for real article data

## How It Works

### 1. URL Structure
- **Static Pages**: `/`, `/about`, `/contact`, etc.
- **Category Pages**: `/news/moradabad`, `/news/up`, etc.
- **Article Pages**: `/news/category/title-slug`

### 2. Examples

| **Article Title** | **Generated URL** |
|-------------------|-------------------|
| `Breaking News: Police Arrest` | `/news/moradabad/breaking-news-police-arrest` |
| `मुरादाबाद में बड़ी खबर` | `/news/moradabad/मरदबद-म-बड-खबर` |
| `UP Government नई योजना` | `/news/up/up-government-नई-यजन` |

## Usage

### 1. Generate Sitemap
```bash
# Generate sitemap with sample data
npm run generate-sitemap

# Build with sitemap generation
npm run build:with-sitemap

# Deploy with sitemap
npm run deploy:build
```

### 2. Files Generated
- `public/sitemap.xml` - Main sitemap file
- `public/robots.txt` - Robots.txt with sitemap reference

### 3. Sitemap Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://moradabads.com/</loc>
    <lastmod>2025-01-10T10:30:00Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- More URLs... -->
</urlset>
```

## Integration with Firebase

### 1. Update Firebase Integration
Edit `scripts/generate-sitemap-firebase.js`:

```javascript
async function loadArticlesFromFirebase() {
  try {
    // Initialize Firebase
    const { initializeApp } = await import('firebase/app')
    const { getFirestore, collection, getDocs } = await import('firebase/firestore')
    
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    
    // Get all articles
    const articlesRef = collection(db, 'articles')
    const snapshot = await getDocs(articlesRef)
    const articles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return articles
  } catch (error) {
    console.error('Firebase error:', error)
    return []
  }
}
```

### 2. Add Firebase Config
Create `scripts/firebase-config.js`:
```javascript
export const firebaseConfig = {
  // Your Firebase config
}
```

## SEO Benefits

### 1. Search Engine Discovery
- **Google**: Automatically discovers new articles
- **Bing**: Indexes all pages efficiently
- **Yahoo**: Better crawling and indexing

### 2. URL Structure Benefits
- **Readable URLs**: Users can understand content from URL
- **Language Preservation**: Hindi URLs stay in Hindi
- **SEO Friendly**: Search engines prefer clean URLs

### 3. Performance
- **Fast Loading**: Static XML files load quickly
- **Cached**: CDNs can cache sitemap files
- **Compressed**: Gzip compression reduces file size

## Advanced Configuration

### 1. Custom Priorities
Edit `scripts/generate-sitemap.js`:
```javascript
// Set different priorities for different content types
const getPriority = (article) => {
  if (article.isFeatured) return '0.9'
  if (article.isTrending) return '0.8'
  return '0.6'
}
```

### 2. Custom Change Frequencies
```javascript
const getChangeFreq = (article) => {
  const daysSincePublished = (Date.now() - new Date(article.publishedAt)) / (1000 * 60 * 60 * 24)
  if (daysSincePublished < 7) return 'daily'
  if (daysSincePublished < 30) return 'weekly'
  return 'monthly'
}
```

### 3. Multiple Sitemaps
For large sites, create sitemap index:
```javascript
// Generate sitemap index
function generateSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-articles.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`
}
```

## Troubleshooting

### 1. Common Issues
- **Firebase Connection**: Check Firebase configuration
- **File Permissions**: Ensure write permissions for public directory
- **Build Errors**: Check Node.js version compatibility

### 2. Debug Mode
```bash
# Run with debug output
DEBUG=true npm run generate-sitemap
```

### 3. Validation
- **XML Validation**: Use online XML validators
- **Sitemap Testing**: Use Google Search Console
- **URL Testing**: Check all generated URLs work

## Best Practices

### 1. Regular Updates
- Run sitemap generation after publishing new articles
- Set up automated builds with sitemap generation
- Monitor sitemap size (max 50MB, 50,000 URLs)

### 2. Performance
- Generate sitemap during build time
- Use CDN for sitemap delivery
- Compress sitemap files

### 3. SEO
- Submit sitemap to Google Search Console
- Monitor indexing status
- Update sitemap when content changes

## Support

For issues or questions:
1. Check the generated sitemap.xml file
2. Verify Firebase connection
3. Test URLs manually
4. Check build logs for errors

---

**Note**: This system automatically handles both Hindi and English content, ensuring your multilingual news site is properly indexed by search engines.
