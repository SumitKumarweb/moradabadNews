import express from 'express'
import compression from 'compression'
import { createServer as createViteServer } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { metadataService } from './src/lib/metadata-service.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(compression())

// Create Vite server in middleware mode
let vite
const createVite = async () => {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    ssr: {
      noExternal: ['react', 'react-dom', 'react-router-dom', 'firebase', 'react-helmet-async']
    }
  })
  app.use(vite.middlewares)
}

// Simple HTML template
const generateHTML = async (url, appHtml) => {
  console.log('Generating HTML for URL:', url)
  
  let metadata
  if (url.includes('/news/') && url.split('/').length === 4) {
    const [, , category, slug] = url.split('/')
    console.log('Article pattern matched - Category:', category, 'Slug:', slug)
    metadata = await metadataService.getArticleMetadata(category, slug)
    console.log('Article metadata generated:', metadata.title)
  } else if (url.includes('/news/') && url.split('/').length === 3) {
    const [, , category] = url.split('/')
    console.log('Category pattern matched - Category:', category)
    metadata = await metadataService.getCategoryMetadata(category)
    console.log('Category metadata generated:', metadata.title)
  } else {
    console.log('Page pattern matched')
    metadata = await metadataService.getPageMetadata(url)
    console.log('Page metadata generated:', metadata.title)
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
    <script type="module" src="/@vite/client"></script>
    <script type="module" src="/src/entry-client.jsx"></script>
  </body>
</html>`
}

// Handle static assets first - don't process them through SSR
app.use((req, res, next) => {
  // Skip SSR for static assets
  if (req.path.includes('.js') || 
      req.path.includes('.css') || 
      req.path.includes('.png') || 
      req.path.includes('.jpg') || 
      req.path.includes('.svg') || 
      req.path.includes('.ico') || 
      req.path.includes('.webmanifest') ||
      req.path.includes('@vite') ||
      req.path.includes('/src/') ||
      req.path.includes('/assets/')) {
    return next()
  }
  next()
})

// Handle all routes
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl
    console.log('Handling request for:', url)
    
    let appHtml = '<div id="root"><h1>Moradabad News</h1><p>Loading...</p></div>'
    
    try {
      // Try to render the React app
      console.log('Attempting SSR render for URL:', url)
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
      console.log('SSR module loaded successfully')
      appHtml = render(url)
      console.log('SSR render successful, HTML length:', appHtml.length)
    } catch (ssrError) {
      console.error('SSR failed with error:', ssrError)
      console.error('Error stack:', ssrError.stack)
      // Use fallback HTML if SSR fails
    }
    
    const html = await generateHTML(url, appHtml)
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    console.error('Error:', e)
    res.status(500).end('Server Error: ' + e.message)
  }
})

// Initialize Vite and start server
createVite().then(() => {
  const port = process.env.PORT || process.argv.find(arg => arg.startsWith('--port='))?.split('=')[1] || 3000
  app.listen(port, () => {
    console.log(`🚀 SSR server with Vite running at http://localhost:${port}`)
    console.log('✅ Both UI and metadata should work now!')
  })
})
