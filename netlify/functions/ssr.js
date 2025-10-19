import { createServer } from 'http'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { metadataService } from '../../src/lib/metadata-service.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Simple HTML template for Netlify Functions
const generateHTML = async (url, appHtml) => {
  let metadata
  
  if (url.includes('/news/') && url.split('/').length === 4) {
    const [, , category, slug] = url.split('/')
    metadata = await metadataService.getArticleMetadata(category, slug)
  } else if (url.includes('/news/') && url.split('/').length === 3) {
    const [, , category] = url.split('/')
    metadata = await metadataService.getCategoryMetadata(category)
  } else {
    metadata = await metadataService.getPageMetadata(url)
  }
  
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>${metadata.title}</title>
    <meta name="title" content="${metadata.title}" />
    <meta name="description" content="${metadata.description}" />
    <meta name="keywords" content="${metadata.keywords}" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="author" content="Moradabad News" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${url.includes('/news/') && url.split('/').length === 4 ? 'article' : 'website'}" />
    <meta property="og:url" content="${metadata.ogUrl}" />
    <meta property="og:title" content="${metadata.ogTitle}" />
    <meta property="og:description" content="${metadata.ogDescription}" />
    <meta property="og:image" content="${metadata.ogImage}" />
    <meta property="og:site_name" content="Moradabad News" />
    <meta property="og:locale" content="en_IN" />
    
    <!-- Article specific meta tags -->
    ${metadata.article ? `
    <meta property="article:published_time" content="${metadata.article.publishedTime}" />
    <meta property="article:modified_time" content="${metadata.article.modifiedTime}" />
    <meta property="article:author" content="${metadata.article.author}" />
    <meta property="article:section" content="${metadata.article.section}" />
    ${metadata.article.tags.map(tag => `<meta property="article:tag" content="${tag}" />`).join('\n    ')}
    ` : ''}
    
    <!-- Twitter -->
    <meta property="twitter:card" content="${metadata.twitterCard}" />
    <meta property="twitter:url" content="${metadata.ogUrl}" />
    <meta property="twitter:title" content="${metadata.ogTitle}" />
    <meta property="twitter:description" content="${metadata.ogDescription}" />
    <meta property="twitter:image" content="${metadata.ogImage}" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${metadata.canonical}" />
    
    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    
    <!-- Theme Script -->
    <script>
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
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/main-BDywMeid.js"></script>
    <link rel="stylesheet" href="/assets/main-BBmaOTab.css">
  </body>
</html>`
}

export const handler = async (event, context) => {
  try {
    const url = event.path
    console.log('Handling SSR request for:', url)
    
    const html = await generateHTML(url, '<div id="root"></div>')
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=0, must-revalidate'
      },
      body: html
    }
  } catch (error) {
    console.error('SSR Error:', error)
    return {
      statusCode: 500,
      body: 'Server Error'
    }
  }
}
