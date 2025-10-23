import { useEffect, useRef } from 'react'

export function PerformanceOptimizer() {
  const observerRef = useRef(null)

  useEffect(() => {
    // Optimize images with intersection observer
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]')
      
      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target
                img.src = img.dataset.src
                img.removeAttribute('data-src')
                observerRef.current.unobserve(img)
              }
            })
          },
          { rootMargin: '50px' }
        )
      }

      images.forEach((img) => {
        observerRef.current.observe(img)
      })
    }

    // Debounced scroll handler
    let scrollTimeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // Optimize scroll performance
        document.body.style.scrollBehavior = 'smooth'
      }, 16)
    }

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Only preload critical above-the-fold images
      const heroImages = document.querySelectorAll('.hero-section img[data-priority="true"]')
      heroImages.forEach((img) => {
        if (img.src && !img.complete && img.dataset.priority === 'true') {
          const link = document.createElement('link')
          link.rel = 'preload'
          link.as = 'image'
          link.href = img.src
          link.crossOrigin = 'anonymous'
          document.head.appendChild(link)
        }
      })
    }

    // Initialize optimizations
    optimizeImages()
    preloadCriticalResources()
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}

// Resource hints component
export function ResourceHints() {
  useEffect(() => {
    // Only add resource hints if they don't already exist
    const existingHints = new Set(
      Array.from(document.querySelectorAll('link[rel="preconnect"], link[rel="dns-prefetch"]'))
        .map(link => link.href)
    )

    // Preconnect to external domains
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://pagead2.googlesyndication.com'
    ]

    domains.forEach((domain) => {
      if (!existingHints.has(domain)) {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = domain
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      }
    })

    // DNS prefetch for performance
    const dnsDomains = [
      '//fonts.googleapis.com',
      '//www.google-analytics.com',
      '//pagead2.googlesyndication.com'
    ]

    dnsDomains.forEach((domain) => {
      if (!existingHints.has(domain)) {
        const link = document.createElement('link')
        link.rel = 'dns-prefetch'
        link.href = domain
        document.head.appendChild(link)
      }
    })
  }, [])

  return null
}

// Critical resource loader
export function CriticalResourceLoader() {
  useEffect(() => {
    // Load critical CSS first
    const loadCriticalCSS = () => {
      const criticalCSS = `
        .hero-section { min-height: 70vh; position: relative; }
        .loading-spinner { 
          width: 40px; height: 40px; border: 4px solid #f3f3f3; 
          border-top: 4px solid #3498db; border-radius: 50%; 
          animation: spin 1s linear infinite; 
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `
      
      const style = document.createElement('style')
      style.textContent = criticalCSS
      document.head.insertBefore(style, document.head.firstChild)
    }

    // Preload critical fonts
    const preloadFonts = () => {
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
      fontLink.crossOrigin = 'anonymous'
      document.head.appendChild(fontLink)
    }

    loadCriticalCSS()
    preloadFonts()
  }, [])

  return null
}
