// Dynamic Sitemap Page Component
import { useEffect, useState } from 'react'
import { generateSitemap } from '../lib/sitemap-generator'

export default function SitemapPage() {
  const [sitemap, setSitemap] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSitemap() {
      try {
        const sitemapContent = await generateSitemap()
        setSitemap(sitemapContent)
        
        // Set proper content type for XML
        document.documentElement.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
        
        // If this is a direct sitemap.xml request, we should serve it as XML
        if (window.location.pathname === '/sitemap.xml') {
          // Create a download link for the XML
          const blob = new Blob([sitemapContent], { type: 'application/xml' })
          const url = URL.createObjectURL(blob)
          
          // Auto-download or redirect to XML content
          const link = document.createElement('a')
          link.href = url
          link.download = 'sitemap.xml'
          link.click()
          
          URL.revokeObjectURL(url)
        }
      } catch (error) {
        console.error('Error loading sitemap:', error)
        setSitemap('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>')
      } finally {
        setLoading(false)
      }
    }

    loadSitemap()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Generating sitemap...</p>
        </div>
      </div>
    )
  }

  // If this is a sitemap.xml request, return the XML directly
  if (window.location.pathname === '/sitemap.xml') {
    return (
      <div style={{ display: 'none' }}>
        <pre>{sitemap}</pre>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">XML Sitemap</h2>
            <p className="text-muted-foreground mb-4">
              This sitemap is automatically generated and includes all published articles with their dynamic URLs.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{sitemap}</pre>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Last updated: {new Date().toLocaleString()}</p>
              <p>This sitemap is automatically updated when new articles are published.</p>
            </div>
            <div className="mt-4">
              <a 
                href="/sitemap.xml" 
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                download="sitemap.xml"
              >
                Download XML Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
