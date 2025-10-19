// Service Worker for Moradabad News
const CACHE_NAME = 'moradabad-news-v1.0.0'
const STATIC_CACHE = 'static-v1.0.0'
const DYNAMIC_CACHE = 'dynamic-v1.0.0'
const IMAGE_CACHE = 'images-v1.0.0'

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/css/critical.css',
  '/js/critical.js'
]

// Static assets to cache
const STATIC_ASSETS = [
  '/css/main.css',
  '/js/main.js',
  '/fonts/inter.woff2',
  '/images/logo.svg',
  '/images/placeholder-news.jpg'
]

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching critical resources')
        return cache.addAll(CRITICAL_RESOURCES)
      })
      .then(() => {
        console.log('Service Worker: Critical resources cached')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache critical resources', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }
  
  event.respondWith(
    handleRequest(request)
  )
})

// Handle different types of requests
async function handleRequest(request) {
  const url = new URL(request.url)
  
  try {
    // Handle images with cache-first strategy
    if (isImageRequest(request)) {
      return await handleImageRequest(request)
    }
    
    // Handle API requests with network-first strategy
    if (isAPIRequest(request)) {
      return await handleAPIRequest(request)
    }
    
    // Handle static assets with cache-first strategy
    if (isStaticAsset(request)) {
      return await handleStaticAsset(request)
    }
    
    // Handle HTML pages with network-first strategy
    if (isHTMLRequest(request)) {
      return await handleHTMLRequest(request)
    }
    
    // Default to network-first for other requests
    return await networkFirst(request)
    
  } catch (error) {
    console.error('Service Worker: Error handling request', error)
    return await getOfflineResponse(request)
  }
}

// Check if request is for an image
function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(request.url)
}

// Check if request is for API
function isAPIRequest(request) {
  return request.url.includes('/api/') || 
         request.url.includes('firebase') ||
         request.url.includes('analytics')
}

// Check if request is for static asset
function isStaticAsset(request) {
  return request.destination === 'style' ||
         request.destination === 'script' ||
         request.destination === 'font' ||
         /\.(css|js|woff2?|ttf|eot)$/i.test(request.url)
}

// Check if request is for HTML
function isHTMLRequest(request) {
  return request.destination === 'document' ||
         request.headers.get('accept')?.includes('text/html')
}

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE)
  const cachedResponse = await cache.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // Return placeholder image if network fails
    return await getPlaceholderImage()
  }
}

// Handle API requests with network-first strategy
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE)
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

// Handle static asset requests with cache-first strategy
async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE)
  const cachedResponse = await cache.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    throw error
  }
}

// Handle HTML requests with network-first strategy
async function handleHTMLRequest(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE)
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page for HTML requests
    return await getOfflinePage()
  }
}

// Network-first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE)
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

// Get offline response
async function getOfflineResponse(request) {
  if (isHTMLRequest(request)) {
    return await getOfflinePage()
  }
  
  if (isImageRequest(request)) {
    return await getPlaceholderImage()
  }
  
  return new Response('Offline', {
    status: 503,
    statusText: 'Service Unavailable'
  })
}

// Get offline page
async function getOfflinePage() {
  const cache = await caches.open(STATIC_CACHE)
  const offlinePage = await cache.match('/offline.html')
  
  if (offlinePage) {
    return offlinePage
  }
  
  // Create a simple offline page
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Moradabad News</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          margin: 0;
          padding: 2rem;
          background: #f5f5f5;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
          color: #2563eb;
          margin-bottom: 1rem;
        }
        p {
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .retry-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        .retry-btn:hover {
          background: #1d4ed8;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>You're Offline</h1>
        <p>It looks like you're not connected to the internet. Please check your connection and try again.</p>
        <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
      </div>
    </body>
    </html>
  `
  
  return new Response(offlineHTML, {
    headers: { 'Content-Type': 'text/html' }
  })
}

// Get placeholder image
async function getPlaceholderImage() {
  const cache = await caches.open(STATIC_CACHE)
  const placeholder = await cache.match('/images/placeholder-news.jpg')
  
  if (placeholder) {
    return placeholder
  }
  
  // Create a simple placeholder image
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f0f0f0"/>
      <text x="200" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#666">
        Image not available
      </text>
    </svg>
  `
  
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' }
  })
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered')
  
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics())
  }
  
  if (event.tag === 'newsletter-sync') {
    event.waitUntil(syncNewsletter())
  }
})

// Sync analytics data when back online
async function syncAnalytics() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    const requests = await cache.keys()
    
    for (const request of requests) {
      if (request.url.includes('analytics')) {
        try {
          await fetch(request)
          await cache.delete(request)
        } catch (error) {
          console.error('Failed to sync analytics:', error)
        }
      }
    }
  } catch (error) {
    console.error('Analytics sync failed:', error)
  }
}

// Sync newsletter subscriptions when back online
async function syncNewsletter() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    const requests = await cache.keys()
    
    for (const request of requests) {
      if (request.url.includes('newsletter')) {
        try {
          await fetch(request)
          await cache.delete(request)
        } catch (error) {
          console.error('Failed to sync newsletter:', error)
        }
      }
    }
  } catch (error) {
    console.error('Newsletter sync failed:', error)
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received')
  
  const options = {
    body: event.data ? event.data.text() : 'New news update available',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'news-update',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Read Now'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Moradabad News', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')
  
  event.notification.close()
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Message handling
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CACHE_URL') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then(cache => {
        return cache.add(event.data.url)
      })
    )
  }
})

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent())
  }
})

// Sync content in background
async function syncContent() {
  try {
    // Fetch latest news content
    const response = await fetch('/api/latest-news')
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      await cache.put('/api/latest-news', response.clone())
    }
  } catch (error) {
    console.error('Content sync failed:', error)
  }
}

console.log('Service Worker: Loaded successfully')
