/**
 * Dynamic HTML Template Generator
 * Generates HTML with dynamic metadata based on route and data
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync, readdirSync } from 'fs';

import {
  generateDynamicTitle,
  generateDynamicDescription,
  generateDynamicKeywords,
  generateOpenGraphData,
  generateTwitterCardData,
  generateStructuredData,
  generateOrganizationData,
  generateCanonicalUrl,
  generateRobotsContent,
  SITE_CONFIG
} from '../../lib/seo-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../../..');
const builtIndexPath = join(projectRoot, 'public_html', 'index.html');

/**
 * Get script and link tags from built index.html or use development paths
 */
function getAssetTags() {
  // Try to read built index.html
  if (existsSync(builtIndexPath)) {
    try {
      const builtHtml = readFileSync(builtIndexPath, 'utf-8').trim();
      
      // Only process if the file has content
      if (builtHtml && builtHtml.length > 0) {
        // Extract all link tags (CSS and modulepreload)
        const linkMatches = builtHtml.match(/<link[^>]*>/g) || [];
        // Extract script tags (handle both self-closing and regular closing)
        const scriptMatches = builtHtml.match(/<script[^>]*(?:\/>|><\/script>)/g) || [];
        
        // Process link tags - keep CSS and modulepreload links
        const links = linkMatches
          .map(tag => {
            // Extract href
            const hrefMatch = tag.match(/href="([^"]+)"/);
            if (!hrefMatch) return null;
            const href = hrefMatch[1];
            
            // Skip external links
            if (href.startsWith('http') || href.startsWith('//')) return null;
            
            // Check if it's a stylesheet
            if (tag.includes('stylesheet')) {
              return `<link rel="stylesheet" href="${href}" />`;
            }
            // Check if it's a modulepreload
            if (tag.includes('modulepreload')) {
              return `<link rel="modulepreload" href="${href}" />`;
            }
            
            return null;
          })
          .filter(Boolean);
        
        // Process script tags - keep module scripts
        const scripts = scriptMatches
          .map(tag => {
            const srcMatch = tag.match(/src="([^"]+)"/);
            if (!srcMatch) return null;
            const src = srcMatch[1];
            
            // Skip external scripts
            if (src.startsWith('http') || src.startsWith('//')) return null;
            
            // Preserve the original tag with all attributes (crossorigin, etc.)
            // Just ensure it has type="module"
            if (tag.includes('type="module"')) {
              return tag;
            } else {
              // Add type="module" if missing
              return tag.replace('<script', '<script type="module"');
            }
          })
          .filter(Boolean);
        
        if (scripts.length > 0 || links.length > 0) {
          return [...links, ...scripts].join('\n    ');
        }
      }
    } catch (error) {
      console.warn('Could not read built index.html:', error.message);
    }
  }
  
  // Fallback: Try to find built JS files in assets directory
  const assetsDir = join(projectRoot, 'public_html', 'assets');
  if (existsSync(assetsDir)) {
    try {
      const files = readdirSync(assetsDir);
      const jsFiles = files.filter(f => f.endsWith('.js')).sort();
      const cssFiles = files.filter(f => f.endsWith('.css')).sort();
      
      if (jsFiles.length > 0) {
        // Separate vendor files and main entry point
        // Load order: react-vendor, firebase, ui, then main entry
        const reactVendor = jsFiles.find(f => f.includes('react-vendor'));
        const firebase = jsFiles.find(f => f.includes('firebase'));
        const ui = jsFiles.find(f => f.includes('ui'));
        const mainFile = jsFiles.find(f => f.startsWith('index-') && !f.includes('vendor') && !f.includes('firebase') && !f.includes('ui'));
        
        const orderedFiles = [reactVendor, firebase, ui, mainFile].filter(Boolean);
        
        // If no main file found, use all files in order
        const allScripts = orderedFiles.length > 0 
          ? orderedFiles 
          : jsFiles;
        
        // Add CSS links first
        const cssLinks = cssFiles.map(file => `<link rel="stylesheet" href="/assets/${file}" />`);
        
        // Add modulepreload for vendor chunks
        const modulePreloads = [reactVendor, firebase, ui]
          .filter(Boolean)
          .map(file => `<link rel="modulepreload" href="/assets/${file}" />`);
        
        // Add main script
        const scriptTags = allScripts.map(file => `<script type="module" src="/assets/${file}"></script>`);
        
        return [...cssLinks, ...modulePreloads, ...scriptTags].join('\n    ');
      }
    } catch (error) {
      console.warn('Could not read assets directory:', error.message);
    }
  }
  
  // Final fallback to development path
  return '<script type="module" src="/src/main.jsx"></script>';
}

/**
 * Generate complete HTML with dynamic metadata
 */
export function generateHTML(metadata = {}) {
  const {
    title,
    description,
    keywords,
    image,
    url,
    pageType = 'home',
    author,
    publishedAt,
    modifiedAt,
    category,
    tags = [],
    content,
    noindex = false,
    customStructuredData = null
  } = metadata;

 
  // Generate SEO data
  const seoData = {
    title,
    description,
    keywords,
    image,
    author,
    publishedAt,
    modifiedAt,
    category,
    tags,
    content,
    pageType
  };

  // For articles, use metadata directly from article (no modification)
  // For other pages, use dynamic generation
  const finalTitle = (pageType === 'article' && title) 
    ? title 
    : generateDynamicTitle(seoData, pageType);
  const finalDescription = (pageType === 'article' && description) 
    ? description 
    : generateDynamicDescription(seoData, pageType);
  const finalKeywords = (pageType === 'article' && keywords) 
    ? keywords 
    : (keywords || generateDynamicKeywords(seoData, pageType));
  const canonicalUrl = url || generateCanonicalUrl(metadata.path || '/');
  const robots = generateRobotsContent(pageType, !noindex);
  
  // For articles, use article metadata directly for OG and Twitter
  // For other pages, use dynamic generation
  const ogData = (pageType === 'article' && title && description) 
    ? {
        type: 'article',
        title: finalTitle,
        description: finalDescription,
        image: image || `${SITE_CONFIG.url}${SITE_CONFIG.defaultImage}`,
        article: {
          author: author || SITE_CONFIG.name,
          publishedTime: publishedAt,
          modifiedTime: modifiedAt || publishedAt,
          section: category,
          tags: tags
        }
      }
    : generateOpenGraphData(seoData, pageType);
  
  const twitterData = (pageType === 'article' && title && description)
    ? {
        card: 'summary_large_image',
        title: finalTitle,
        description: finalDescription,
        image: image || `${SITE_CONFIG.url}${SITE_CONFIG.defaultImage}`
      }
    : generateTwitterCardData(seoData, pageType);
  
  const structuredData = customStructuredData || generateStructuredData(seoData, pageType);
  const orgData = generateOrganizationData();

  // Get absolute image URL
  const absoluteImage = image 
    ? (image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`)
    : `${SITE_CONFIG.url}${SITE_CONFIG.defaultImage}`;

  // Generate meta tags HTML
  const metaTags = generateMetaTags({
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    image: absoluteImage,
    url: canonicalUrl,
    robots,
    ogData,
    twitterData,
    author,
    publishedAt,
    modifiedAt,
    category,
    tags
  });

  // Generate structured data scripts
  const structuredDataScripts = [
    JSON.stringify(orgData),
    JSON.stringify(structuredData)
  ].map(data => `<script type="application/ld+json">${data}</script>`).join('\n    ');

  // Return complete HTML
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    
    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    ${metaTags}
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${canonicalUrl}" />
    
    <!-- Preconnect to external domains for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
    
    <!-- DNS Prefetch for performance -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//www.google-analytics.com" />
    <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
    
    <!-- Structured Data -->
    ${structuredDataScripts}
    
    <!-- AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8141314854363213"
     crossorigin="anonymous"></script>
  </head>
  <body>
    <script>
      // Apply theme before React loads to prevent flash
      (function() {
        const theme = localStorage.getItem('moradabad-news-theme') || 'light';
        const root = document.documentElement;
        
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
        }
      })();
    </script>
    <div id="root"></div>
    ${getAssetTags()}
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.googleAnalyticsId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${SITE_CONFIG.googleAnalyticsId}');
    </script>
  </body>
</html>`;
}

/**
 * Generate meta tags HTML string
 */
function generateMetaTags({
  title,
  description,
  keywords,
  image,
  url,
  robots,
  ogData,
  twitterData,
  author,
  publishedAt,
  modifiedAt,
  category,
  tags
}) {
  const metaTags = [];

  // Primary Meta Tags
  metaTags.push(`<title>${escapeHtml(title)}</title>`);
  metaTags.push(`<meta name="description" content="${escapeHtml(description)}" />`);
  metaTags.push(`<meta name="keywords" content="${escapeHtml(keywords)}" />`);
  metaTags.push(`<meta name="author" content="${escapeHtml(author || SITE_CONFIG.name)}" />`);
  metaTags.push(`<meta name="robots" content="${robots}" />`);
  metaTags.push(`<meta name="googlebot" content="index,follow" />`);
  metaTags.push(`<meta name="bingbot" content="index,follow" />`);
  metaTags.push(`<meta name="slurp" content="index,follow" />`);
  metaTags.push(`<meta name="duckduckbot" content="index,follow" />`);
  metaTags.push(`<meta name="baiduspider" content="index,follow" />`);
  metaTags.push(`<meta name="yandexbot" content="index,follow" />`);
  metaTags.push(`<meta name="language" content="English" />`);
  metaTags.push(`<meta name="revisit-after" content="1 days" />`);

  // Geographic Meta Tags
  metaTags.push(`<meta name="geo.region" content="IN-UP" />`);
  metaTags.push(`<meta name="geo.placename" content="Moradabad" />`);
  metaTags.push(`<meta name="geo.position" content="28.8381;78.7733" />`);
  metaTags.push(`<meta name="ICBM" content="28.8381, 78.7733" />`);

  // Open Graph / Facebook
  metaTags.push(`<meta property="og:type" content="${ogData.type}" />`);
  metaTags.push(`<meta property="og:url" content="${url}" />`);
  metaTags.push(`<meta property="og:title" content="${escapeHtml(ogData.title)}" />`);
  metaTags.push(`<meta property="og:description" content="${escapeHtml(ogData.description)}" />`);
  metaTags.push(`<meta property="og:image" content="${image}" />`);
  metaTags.push(`<meta property="og:image:width" content="1200" />`);
  metaTags.push(`<meta property="og:image:height" content="630" />`);
  metaTags.push(`<meta property="og:image:alt" content="${escapeHtml(title)}" />`);
  metaTags.push(`<meta property="og:site_name" content="${SITE_CONFIG.name}" />`);
  metaTags.push(`<meta property="og:locale" content="en_IN" />`);
  metaTags.push(`<meta property="og:locale:alternate" content="hi_IN" />`);

  // Article-specific Open Graph tags
  if (ogData.article) {
    if (ogData.article.author) {
      metaTags.push(`<meta property="article:author" content="${escapeHtml(ogData.article.author)}" />`);
    }
    if (ogData.article.publishedTime) {
      metaTags.push(`<meta property="article:published_time" content="${ogData.article.publishedTime}" />`);
    }
    if (ogData.article.modifiedTime) {
      metaTags.push(`<meta property="article:modified_time" content="${ogData.article.modifiedTime}" />`);
    }
    if (ogData.article.section) {
      metaTags.push(`<meta property="article:section" content="${escapeHtml(ogData.article.section)}" />`);
    }
    if (ogData.article.tags && ogData.article.tags.length > 0) {
      ogData.article.tags.forEach(tag => {
        metaTags.push(`<meta property="article:tag" content="${escapeHtml(tag)}" />`);
      });
    }
  }

  // Twitter Card
  metaTags.push(`<meta name="twitter:card" content="${twitterData.card}" />`);
  metaTags.push(`<meta name="twitter:url" content="${url}" />`);
  metaTags.push(`<meta name="twitter:title" content="${escapeHtml(twitterData.title)}" />`);
  metaTags.push(`<meta name="twitter:description" content="${escapeHtml(twitterData.description)}" />`);
  metaTags.push(`<meta name="twitter:image" content="${image}" />`);
  metaTags.push(`<meta name="twitter:image:alt" content="${escapeHtml(title)}" />`);
  metaTags.push(`<meta name="twitter:site" content="${SITE_CONFIG.twitterHandle}" />`);
  metaTags.push(`<meta name="twitter:creator" content="${twitterData.creator || SITE_CONFIG.twitterHandle}" />`);

  // Additional Meta Tags
  metaTags.push(`<meta name="theme-color" content="#1e40af" />`);
  metaTags.push(`<meta name="msapplication-TileColor" content="#1e40af" />`);
  metaTags.push(`<meta name="apple-mobile-web-app-capable" content="yes" />`);
  metaTags.push(`<meta name="apple-mobile-web-app-status-bar-style" content="default" />`);
  metaTags.push(`<meta name="apple-mobile-web-app-title" content="${SITE_CONFIG.name}" />`);
  metaTags.push(`<meta name="application-name" content="${SITE_CONFIG.name}" />`);
  metaTags.push(`<meta name="mobile-web-app-capable" content="yes" />`);

  return metaTags.join('\n    ');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

export default {
  generateHTML,
  escapeHtml
};

