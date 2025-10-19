import fs from 'node:fs/promises'
import express from 'express'
import compression from 'compression'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import React from 'react'

const __dirname = dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const root = process.cwd()

async function createServer() {
  const app = express()
  
  // Add compression middleware
  app.use(compression())
  
  // Serve static files from dist/client
  app.use(express.static(resolve('dist/client'), {
    index: false,
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript')
      } else if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css')
      } else if (path.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json')
      } else if (path.endsWith('.webmanifest')) {
        res.setHeader('Content-Type', 'application/manifest+json')
      } else if (path.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml')
      } else if (path.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png')
      } else if (path.endsWith('.ico')) {
        res.setHeader('Content-Type', 'image/x-icon')
      }
    }
  }))

  // Import metadata service
  const { metadataService } = await import('./src/lib/metadata-service.js')

  // Dynamic metadata service
  const getMetadata = async (url) => {
    console.log('Generating metadata for URL:', url)
    
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
    
    return metadata
  }

  // Generate HTML template with dynamic metadata
  const generateHTML = async (url, appHtml) => {
    console.log('Generating HTML for URL:', url)
    const metadata = await getMetadata(url)
    console.log('Generated metadata:', metadata.title)
    
    // Generate structured data
    let structuredData = []
    
    // Add organization structured data
    structuredData.push(metadataService.generateOrganizationStructuredData())
    
    // Add article structured data for article pages
    if (url.includes('/news/') && url.split('/').length === 4) {
      const [, , category, slug] = url.split('/')
      structuredData.push(metadataService.generateArticleStructuredData({}, category, slug))
    }
    
    // Add breadcrumb structured data
    const breadcrumbs = generateBreadcrumbs(url)
    if (breadcrumbs.length > 1) {
      structuredData.push(metadataService.generateBreadcrumbStructuredData(breadcrumbs))
    }
    
    const structuredDataScript = structuredData.length > 0 
      ? `<script type="application/ld+json">${JSON.stringify(structuredData.length === 1 ? structuredData[0] : structuredData)}</script>`
      : ''
    
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
    
    <!-- Structured Data -->
    ${structuredDataScript}
    
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
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/assets/main-BDywMeid.js" as="script" />
    <link rel="preload" href="/assets/main-BBmaOTab.css" as="style" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/main-BDywMeid.js"></script>
  </body>
</html>`
  }

  // Generate breadcrumbs for structured data
  const generateBreadcrumbs = (url) => {
    const breadcrumbs = [{ name: 'Home', url: '/' }]
    
    if (url === '/') return breadcrumbs
    
    const segments = url.split('/').filter(Boolean)
    
    if (segments.includes('news')) {
      breadcrumbs.push({ name: 'News', url: '/news' })
      
      if (segments.length >= 2) {
        const category = segments[1]
        breadcrumbs.push({ 
          name: category.charAt(0).toUpperCase() + category.slice(1), 
          url: `/news/${category}` 
        })
        
        if (segments.length >= 3) {
          const slug = segments[2]
          breadcrumbs.push({ 
            name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
            url: `/news/${category}/${slug}` 
          })
        }
      }
    } else {
      // For other pages, add them to breadcrumbs
      segments.forEach((segment, index) => {
        const url = '/' + segments.slice(0, index + 1).join('/')
        const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
        breadcrumbs.push({ name, url })
      })
    }
    
    return breadcrumbs
  }

  // Handle static assets - this should come BEFORE the catch-all route
  app.use('/assets', express.static(resolve('dist/client/assets'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript')
      } else if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css')
      }
    }
  }))

  // Handle all routes
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      // Use empty root div - let client-side handle rendering
      const appHtml = ''

      const html = await generateHTML(url, appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.error('Server Error:', e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app }
}
createServer().then(({ app }) => {
  const port = process.env.PORT || process.argv.find(arg => arg.startsWith('--port='))?.split('=')[1] || 3001
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`)
  })
})
