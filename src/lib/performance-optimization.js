// Performance Optimization Service
class PerformanceOptimizer {
  constructor() {
    this.imageCache = new Map()
    this.preloadQueue = []
    this.intersectionObserver = null
    this.resourceHints = new Set()
  }

  // Initialize performance optimizations
  init() {
    this.setupImageLazyLoading()
    this.setupResourcePreloading()
    this.setupServiceWorker()
    this.optimizeCriticalResources()
    this.setupPerformanceMonitoring()
  }

  // Lazy loading for images
  setupImageLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target
              this.loadImage(img)
              this.intersectionObserver.unobserve(img)
            }
          })
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.1
        }
      )

      // Observe all lazy images
      document.addEventListener('DOMContentLoaded', () => {
        const lazyImages = document.querySelectorAll('img[data-src]')
        lazyImages.forEach(img => this.intersectionObserver.observe(img))
      })
    }
  }

  // Load image with optimization
  loadImage(img) {
    const src = img.dataset.src
    if (!src) return

    // Check cache first
    if (this.imageCache.has(src)) {
      img.src = this.imageCache.get(src)
      img.classList.add('loaded')
      return
    }

    // Create optimized image URL
    const optimizedSrc = this.optimizeImageUrl(src)
    
    const imageLoader = new Image()
    imageLoader.onload = () => {
      img.src = optimizedSrc
      img.classList.add('loaded')
      this.imageCache.set(src, optimizedSrc)
    }
    imageLoader.onerror = () => {
      img.src = '/images/placeholder-news.jpg'
      img.classList.add('error')
    }
    imageLoader.src = optimizedSrc
  }

  // Optimize image URLs for different devices
  optimizeImageUrl(originalUrl, options = {}) {
    const {
      width = 800,
      height = 600,
      quality = 85,
      format = 'webp'
    } = options

    // If it's already an optimized URL, return as is
    if (originalUrl.includes('w_') || originalUrl.includes('h_')) {
      return originalUrl
    }

    // For external images, use a proxy service
    if (originalUrl.startsWith('http')) {
      return `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl)}&w=${width}&h=${height}&q=${quality}&f=${format}`
    }

    // For local images, add optimization parameters
    const url = new URL(originalUrl, window.location.origin)
    url.searchParams.set('w', width.toString())
    url.searchParams.set('h', height.toString())
    url.searchParams.set('q', quality.toString())
    url.searchParams.set('f', format)
    
    return url.toString()
  }

  // Preload critical resources
  setupResourcePreloading() {
    const criticalResources = [
      { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      { href: '/css/critical.css', as: 'style' },
      { href: '/js/critical.js', as: 'script' }
    ]

    criticalResources.forEach(resource => {
      this.preloadResource(resource)
    })
  }

  // Preload a single resource
  preloadResource({ href, as, type, crossorigin }) {
    if (this.resourceHints.has(href)) return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    
    if (type) link.type = type
    if (crossorigin) link.crossOrigin = crossorigin
    
    document.head.appendChild(link)
    this.resourceHints.add(href)
  }

  // Setup service worker for caching
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered:', registration)
          })
          .catch(error => {
            console.log('Service Worker registration failed:', error)
          })
      })
    }
  }

  // Optimize critical rendering path
  optimizeCriticalResources() {
    // Inline critical CSS
    this.inlineCriticalCSS()
    
    // Defer non-critical JavaScript
    this.deferNonCriticalJS()
    
    // Optimize font loading
    this.optimizeFontLoading()
  }

  // Inline critical CSS
  inlineCriticalCSS() {
    const criticalCSS = `
      /* Critical CSS for above-the-fold content */
      body { font-family: system-ui, -apple-system, sans-serif; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
      .header { position: sticky; top: 0; z-index: 50; }
      .hero { min-height: 60vh; display: flex; align-items: center; }
    `
    
    const style = document.createElement('style')
    style.textContent = criticalCSS
    document.head.insertBefore(style, document.head.firstChild)
  }

  // Defer non-critical JavaScript
  deferNonCriticalJS() {
    const scripts = document.querySelectorAll('script[data-defer]')
    scripts.forEach(script => {
      script.defer = true
    })
  }

  // Optimize font loading
  optimizeFontLoading() {
    // Preload font files
    const fontFiles = [
      '/fonts/inter-regular.woff2',
      '/fonts/inter-bold.woff2'
    ]
    
    fontFiles.forEach(font => {
      this.preloadResource({
        href: font,
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous'
      })
    })
  }

  // Setup performance monitoring
  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    this.monitorCoreWebVitals()
    
    // Monitor resource loading
    this.monitorResourceLoading()
    
    // Monitor user interactions
    this.monitorUserInteractions()
  }

  // Monitor Core Web Vitals
  monitorCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('LCP:', lastEntry.startTime)
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (FID)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime)
      })
    }).observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      console.log('CLS:', clsValue)
    }).observe({ entryTypes: ['layout-shift'] })
  }

  // Monitor resource loading
  monitorResourceLoading() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0]
      console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart)
      
      const resources = performance.getEntriesByType('resource')
      const slowResources = resources.filter(resource => resource.duration > 1000)
      if (slowResources.length > 0) {
        console.warn('Slow resources detected:', slowResources)
      }
    })
  }

  // Monitor user interactions
  monitorUserInteractions() {
    let interactionCount = 0
    const startTime = Date.now()
    
    const trackInteraction = () => {
      interactionCount++
      if (interactionCount === 1) {
        const timeToInteractive = Date.now() - startTime
        console.log('Time to Interactive:', timeToInteractive)
      }
    }
    
    document.addEventListener('click', trackInteraction)
    document.addEventListener('keydown', trackInteraction)
    document.addEventListener('scroll', trackInteraction)
  }

  // Optimize images for different screen sizes
  getResponsiveImageSrc(originalSrc, breakpoint = 'default') {
    const breakpoints = {
      mobile: { width: 400, height: 300, quality: 80 },
      tablet: { width: 800, height: 600, quality: 85 },
      desktop: { width: 1200, height: 800, quality: 90 },
      default: { width: 800, height: 600, quality: 85 }
    }
    
    const config = breakpoints[breakpoint] || breakpoints.default
    return this.optimizeImageUrl(originalSrc, config)
  }

  // Prefetch next page resources
  prefetchPage(url) {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    document.head.appendChild(link)
  }

  // Optimize bundle splitting
  optimizeBundleSplitting() {
    // Dynamic imports for code splitting
    const loadComponent = async (componentName) => {
      try {
        const module = await import(`../components/${componentName}.jsx`)
        return module.default
      } catch (error) {
        console.error(`Failed to load component ${componentName}:`, error)
        return null
      }
    }
    
    return loadComponent
  }

  // Compress and optimize assets
  optimizeAssets() {
    // Enable gzip compression
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data.type === 'CACHE_URL') {
          // Handle asset caching
          this.cacheAsset(event.data.url)
        }
      })
    }
  }

  // Cache asset
  cacheAsset(url) {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        // Store in IndexedDB for offline access
        this.storeInIndexedDB(url, blob)
      })
      .catch(error => {
        console.error('Failed to cache asset:', error)
      })
  }

  // Store in IndexedDB
  storeInIndexedDB(url, blob) {
    const request = indexedDB.open('AssetCache', 1)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains('assets')) {
        db.createObjectStore('assets', { keyPath: 'url' })
      }
    }
    
    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction(['assets'], 'readwrite')
      const store = transaction.objectStore('assets')
      store.put({ url, blob, timestamp: Date.now() })
    }
  }

  // Get performance metrics
  getPerformanceMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0]
    const paint = performance.getEntriesByType('paint')
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      totalTime: navigation.loadEventEnd - navigation.fetchStart
    }
  }

  // Cleanup
  cleanup() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
    }
    this.imageCache.clear()
    this.preloadQueue = []
    this.resourceHints.clear()
  }
}

// Create singleton instance
const performanceOptimizer = new PerformanceOptimizer()

// Auto-initialize
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => performanceOptimizer.init())
  } else {
    performanceOptimizer.init()
  }
}

export default performanceOptimizer

// Export individual methods
export const {
  optimizeImageUrl,
  getResponsiveImageSrc,
  prefetchPage,
  optimizeBundleSplitting,
  getPerformanceMetrics
} = performanceOptimizer
