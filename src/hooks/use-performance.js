import { useEffect, useCallback, useRef } from 'react'

// Hook for performance optimization
export function usePerformance() {
  const performanceRef = useRef({
    startTime: Date.now(),
    metrics: {
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null
    }
  })

  // Measure Core Web Vitals
  const measureCoreWebVitals = useCallback(() => {
    // LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        performanceRef.current.metrics.lcp = lastEntry.startTime
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry) => {
          performanceRef.current.metrics.fid = entry.processingStart - entry.startTime
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // CLS (Cumulative Layout Shift)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            performanceRef.current.metrics.cls = clsValue
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }
  }, [])

  // Measure TTFB (Time to First Byte)
  const measureTTFB = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0]
      if (navigation) {
        performanceRef.current.metrics.ttfb = navigation.responseStart - navigation.requestStart
      }
    }
  }, [])

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    const criticalResources = [
      '/logo.svg',
      '/favicon.ico',
      '/fonts/inter-var.woff2'
    ]

    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource
      link.as = resource.endsWith('.woff2') ? 'font' : 'image'
      if (resource.endsWith('.woff2')) {
        link.crossOrigin = 'anonymous'
      }
      document.head.appendChild(link)
    })
  }, [])

  // Optimize images
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img[data-src]')
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })

    images.forEach(img => imageObserver.observe(img))
  }, [])

  // Defer non-critical JavaScript
  const deferNonCriticalJS = useCallback(() => {
    const scripts = document.querySelectorAll('script[data-defer]')
    scripts.forEach(script => {
      if (script.dataset.defer === 'true') {
        script.defer = true
      }
    })
  }, [])

  // Initialize performance monitoring
  useEffect(() => {
    measureCoreWebVitals()
    measureTTFB()
    preloadCriticalResources()
    optimizeImages()
    deferNonCriticalJS()

    // Report performance metrics
    const reportMetrics = () => {
      const metrics = performanceRef.current.metrics
      console.log('Performance Metrics:', metrics)
      
      // Send to analytics if available
      if (typeof gtag !== 'undefined') {
        if (metrics.lcp) {
          gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'LCP',
            value: Math.round(metrics.lcp)
          })
        }
        if (metrics.fid) {
          gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'FID',
            value: Math.round(metrics.fid)
          })
        }
        if (metrics.cls) {
          gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'CLS',
            value: Math.round(metrics.cls * 1000)
          })
        }
      }
    }

    // Report metrics after page load
    window.addEventListener('load', reportMetrics)
    
    return () => {
      window.removeEventListener('load', reportMetrics)
    }
  }, [measureCoreWebVitals, measureTTFB, preloadCriticalResources, optimizeImages, deferNonCriticalJS])

  return {
    metrics: performanceRef.current.metrics,
    measureCoreWebVitals,
    measureTTFB,
    preloadCriticalResources,
    optimizeImages
  }
}

// Hook for lazy loading sections
export function useLazyLoading() {
  const [loadedSections, setLoadedSections] = useState({})
  const observerRef = useRef(null)

  const setupIntersectionObserver = useCallback((sections, onLoad) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.dataset.section
            if (sectionName && !loadedSections[sectionName]) {
              setLoadedSections(prev => ({ ...prev, [sectionName]: true }))
              onLoad(sectionName)
            }
          }
        })
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    )

    sections.forEach(section => {
      if (section && observerRef.current) {
        observerRef.current.observe(section)
      }
    })
  }, [loadedSections])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return {
    loadedSections,
    setupIntersectionObserver
  }
}

// Hook for resource preloading
export function useResourcePreloading() {
  const preloadedResources = useRef(new Set())

  const preloadResource = useCallback((url, type = 'image') => {
    if (preloadedResources.current.has(url)) {
      return
    }

    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    link.as = type
    
    if (type === 'font') {
      link.crossOrigin = 'anonymous'
    }

    document.head.appendChild(link)
    preloadedResources.current.add(url)
  }, [])

  const preloadCriticalImages = useCallback((images) => {
    images.forEach(image => {
      preloadResource(image, 'image')
    })
  }, [preloadResource])

  const preloadCriticalFonts = useCallback((fonts) => {
    fonts.forEach(font => {
      preloadResource(font, 'font')
    })
  }, [preloadResource])

  return {
    preloadResource,
    preloadCriticalImages,
    preloadCriticalFonts
  }
}

export default usePerformance
