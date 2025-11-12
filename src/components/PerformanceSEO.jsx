import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'

export default function PerformanceSEO({ 
  preloadImages = [],
  preloadFonts = [],
  preloadScripts = [],
  criticalCSS = '',
  lazyLoadImages = true,
  enableWebP = true,
  enableAVIF = true
}) {
  useEffect(() => {
    // Lazy load images
    if (lazyLoadImages && typeof window !== 'undefined') {
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
    }
  }, [lazyLoadImages])

  // Generate preload links
  const generatePreloadLinks = () => {
    const links = []
    
    // Preload critical images
    preloadImages.forEach(image => {
      links.push(
        <link
          key={`preload-image-${image}`}
          rel="preload"
          as="image"
          href={image}
          type={image.includes('.webp') ? 'image/webp' : image.includes('.avif') ? 'image/avif' : 'image/jpeg'}
        />
      )
    })
    
    // Preload critical fonts
    preloadFonts.forEach(font => {
      links.push(
        <link
          key={`preload-font-${font}`}
          rel="preload"
          as="font"
          href={font}
          type="font/woff2"
          crossOrigin="anonymous"
        />
      )
    })
    
    // Preload critical scripts
    preloadScripts.forEach(script => {
      links.push(
        <link
          key={`preload-script-${script}`}
          rel="preload"
          as="script"
          href={script}
        />
      )
    })
    
    return links
  }

  // Generate resource hints
  const generateResourceHints = () => {
    return (
      <>
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        
        {/* Prefetch next page */}
        <link rel="prefetch" href="/trending" />
        <link rel="prefetch" href="/current-affairs" />
      </>
    )
  }

  // Generate performance meta tags
  const generatePerformanceMeta = () => {
    return (
      <>
        {/* Performance hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Critical rendering path optimization */}
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        
        {/* Image optimization hints */}
        {enableWebP && <meta name="image-format" content="webp" />}
        {enableAVIF && <meta name="image-format" content="avif" />}
        
        {/* Performance budget hints */}
        <meta name="performance-budget" content="lcp:2.5s,cls:0.1,fid:100ms" />
      </>
    )
  }

  // Generate critical CSS
  const generateCriticalCSS = () => {
    if (!criticalCSS) return null
    
    return (
      <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
    )
  }

  // Generate service worker registration
  const generateServiceWorker = () => {
    if (typeof window === 'undefined') return null
    
    return (
      <script dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                  console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                  console.log('SW registration failed: ', registrationError);
                });
            });
          }
        `
      }} />
    )
  }

  // Generate performance monitoring
  const generatePerformanceMonitoring = () => {
    if (typeof window === 'undefined') return null
    
    return (
      <script dangerouslySetInnerHTML={{
        __html: `
          // Core Web Vitals monitoring
          function sendToAnalytics(metric) {
            if (typeof gtag !== 'undefined') {
              gtag('event', metric.name, {
                event_category: 'Web Vitals',
                event_label: metric.id,
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                non_interaction: true,
              });
            }
          }
          
          // LCP monitoring
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              sendToAnalytics({ name: 'LCP', value: entry.startTime, id: entry.id });
            }
          }).observe({ entryTypes: ['largest-contentful-paint'] });
          
          // FID monitoring
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              sendToAnalytics({ name: 'FID', value: entry.processingStart - entry.startTime, id: entry.id });
            }
          }).observe({ entryTypes: ['first-input'] });
          
          // CLS monitoring
          let clsValue = 0;
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                sendToAnalytics({ name: 'CLS', value: clsValue, id: entry.id });
              }
            }
          }).observe({ entryTypes: ['layout-shift'] });
        `
      }} />
    )
  }

  return (
    <Helmet>
      {/* Performance Meta Tags */}
      {generatePerformanceMeta()}
      
      {/* Resource Hints */}
      {generateResourceHints()}
      
      {/* Preload Critical Resources */}
      {generatePreloadLinks()}
      
      {/* Critical CSS */}
      {generateCriticalCSS()}
      
      {/* Service Worker */}
      {generateServiceWorker()}
      
      {/* Performance Monitoring */}
      {generatePerformanceMonitoring()}
      
      {/* Additional Performance Optimizations */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      
      {/* Image optimization */}
      <meta name="image-optimization" content="lazy-loading,webp,avif" />
      
      {/* Font optimization - only if font exists */}
      {/* <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
      
      {/* Critical resource preloading */}
      <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
      <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
    </Helmet>
  )
}
