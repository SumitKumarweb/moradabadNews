import { collection, addDoc, getDocs, query, orderBy, limit, where, Timestamp, onSnapshot } from "firebase/firestore"
import { db } from "./firebase"

// Generate a simple session ID
function generateSessionId() {
  const stored = sessionStorage.getItem('sessionId')
  if (stored) return stored
  
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  sessionStorage.setItem('sessionId', sessionId)
  return sessionId
}

// Hash IP address for privacy (simple hash)
function hashIP(ip) {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16)
}

// Get device type
function getDeviceType() {
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

// Get browser name
function getBrowser() {
  const ua = navigator.userAgent
  if (ua.indexOf('Firefox') > -1) return 'Firefox'
  if (ua.indexOf('Chrome') > -1) return 'Chrome'
  if (ua.indexOf('Safari') > -1) return 'Safari'
  if (ua.indexOf('Edge') > -1) return 'Edge'
  if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) return 'IE'
  return 'Other'
}

// Fetch IP and Location data
async function getIPAndLocation() {
  try {
    // First get IP
    const ipResponse = await fetch('https://api.ipify.org?format=json')
    const ipData = await ipResponse.json()
    const ip = ipData.ip
    
    // Then get location from IP
    const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`)
    const locationData = await locationResponse.json()
    
    return {
      ip: ip,
      ipHash: hashIP(ip),
      city: locationData.city || 'Unknown',
      country: locationData.country_name || 'Unknown',
      countryCode: locationData.country_code || 'XX',
      region: locationData.region || 'Unknown',
      timezone: locationData.timezone || 'Unknown',
    }
  } catch (error) {
    console.error('Error fetching IP/Location:', error)
    return {
      ip: 'Unknown',
      ipHash: 'unknown',
      city: 'Unknown',
      country: 'Unknown',
      countryCode: 'XX',
      region: 'Unknown',
      timezone: 'Unknown',
    }
  }
}

// Track page view
export async function trackPageView(pageData = {}) {
  try {
    const {
      pageUrl = window.location.pathname,
      pageTitle = document.title,
      pageType = 'page',
      articleId = null,
      articleTitle = null,
      category = null,
    } = pageData

    // Get IP and location data
    const locationData = await getIPAndLocation()
    
    // Prepare analytics data
    const analyticsData = {
      // IP and Session
      ip: locationData.ip,
      ipHash: locationData.ipHash,
      sessionId: generateSessionId(),
      
      // Location
      city: locationData.city,
      country: locationData.country,
      countryCode: locationData.countryCode,
      region: locationData.region,
      timezone: locationData.timezone,
      
      // Page Info
      pageUrl,
      pageTitle,
      pageType,
      articleId,
      articleTitle,
      category,
      
      // Device Info
      deviceType: getDeviceType(),
      browser: getBrowser(),
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      
      // Additional Info
      referrer: document.referrer || 'Direct',
      language: navigator.language || 'en',
      
      // Timestamp
      timestamp: Timestamp.now(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD for easy filtering
    }

    // Save to Firebase
    await addDoc(collection(db, 'analytics'), analyticsData)
    
    return true
  } catch (error) {
    console.error('Error tracking page view:', error)
    return false
  }
}

// Get analytics data for admin (one-time fetch)
export async function getAnalytics(filters = {}) {
  try {
    const analyticsRef = collection(db, 'analytics')
    
    // Build query without combining orderBy and where on different fields
    let q = query(analyticsRef, orderBy('timestamp', 'desc'), limit(filters.limit || 100))
    
    const snapshot = await getDocs(q)
    let results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp
    }))
    
    // Apply filters client-side to avoid index requirements
    if (filters.startDate) {
      results = results.filter(item => item.date >= filters.startDate)
    }
    if (filters.endDate) {
      results = results.filter(item => item.date <= filters.endDate)
    }
    if (filters.articleId) {
      results = results.filter(item => item.articleId === filters.articleId)
    }
    if (filters.country) {
      results = results.filter(item => item.country === filters.country)
    }
    if (filters.deviceType) {
      results = results.filter(item => item.deviceType === filters.deviceType)
    }
    
    return results
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return []
  }
}

// Real-time analytics listener
export function subscribeToAnalytics(callback, filters = {}) {
  try {
    const analyticsRef = collection(db, 'analytics')
    let q = query(analyticsRef, orderBy('timestamp', 'desc'), limit(filters.limit || 100))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp
      }))
      
      // Apply filters client-side
      if (filters.startDate) {
        results = results.filter(item => item.date >= filters.startDate)
      }
      if (filters.endDate) {
        results = results.filter(item => item.date <= filters.endDate)
      }
      if (filters.articleId) {
        results = results.filter(item => item.articleId === filters.articleId)
      }
      if (filters.country) {
        results = results.filter(item => item.country === filters.country)
      }
      if (filters.deviceType) {
        results = results.filter(item => item.deviceType === filters.deviceType)
      }
      
      callback(results)
    }, (error) => {
      console.error('Error in real-time analytics:', error)
      callback([])
    })
    
    return unsubscribe
  } catch (error) {
    console.error('Error setting up analytics listener:', error)
    return () => {}
  }
}

// Get analytics summary/stats
export async function getAnalyticsSummary(days = 30) {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    const startDateString = startDate.toISOString().split('T')[0]
    
    const data = await getAnalytics({ startDate: startDateString })
    
    // Calculate statistics
    const uniqueVisitors = new Set(data.map(item => item.ipHash)).size
    const totalPageViews = data.length
    const uniqueSessions = new Set(data.map(item => item.sessionId)).size
    
    // Homepage specific statistics
    const homepageVisits = data.filter(item => 
      item.pageUrl === '/' || 
      item.pageUrl === '/home' || 
      item.pageType === 'home' ||
      item.pageTitle?.includes('Moradabad News - Latest')
    )
    const homepageVisitors = new Set(homepageVisits.map(item => item.ipHash)).size
    const homepagePageViews = homepageVisits.length
    
    // Count by country
    const byCountry = {}
    data.forEach(item => {
      byCountry[item.country] = (byCountry[item.country] || 0) + 1
    })
    
    // Count by device
    const byDevice = {}
    data.forEach(item => {
      byDevice[item.deviceType] = (byDevice[item.deviceType] || 0) + 1
    })
    
    // Top articles
    const articleViews = {}
    data.forEach(item => {
      if (item.articleId && item.articleTitle) {
        if (!articleViews[item.articleId]) {
          articleViews[item.articleId] = {
            id: item.articleId,
            title: item.articleTitle,
            views: 0
          }
        }
        articleViews[item.articleId].views++
      }
    })
    
    const topArticles = Object.values(articleViews)
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)
    
    return {
      totalPageViews,
      uniqueVisitors,
      uniqueSessions,
      homepageVisitors,
      homepagePageViews,
      byCountry,
      byDevice,
      topArticles,
      period: `Last ${days} days`
    }
  } catch (error) {
    console.error('Error fetching analytics summary:', error)
    return {
      totalPageViews: 0,
      uniqueVisitors: 0,
      uniqueSessions: 0,
      homepageVisitors: 0,
      homepagePageViews: 0,
      byCountry: {},
      byDevice: {},
      topArticles: [],
      period: `Last ${days} days`
    }
  }
}

// Get today's statistics
export async function getTodayStats() {
  try {
    const today = new Date().toISOString().split('T')[0]
    const data = await getAnalytics({ startDate: today, endDate: today })
    
    // Homepage specific stats for today
    const todayHomepageVisits = data.filter(item => 
      item.pageUrl === '/' || 
      item.pageUrl === '/home' || 
      item.pageType === 'home' ||
      item.pageTitle?.includes('Moradabad News - Latest')
    )
    const todayHomepageVisitors = new Set(todayHomepageVisits.map(item => item.ipHash)).size
    
    return {
      todayVisitors: new Set(data.map(item => item.ipHash)).size,
      todayPageViews: data.length,
      todaySessions: new Set(data.map(item => item.sessionId)).size,
      todayHomepageVisitors,
      todayHomepagePageViews: todayHomepageVisits.length,
    }
  } catch (error) {
    console.error('Error fetching today stats:', error)
    return {
      todayVisitors: 0,
      todayPageViews: 0,
      todaySessions: 0,
      todayHomepageVisitors: 0,
      todayHomepagePageViews: 0,
    }
  }
}

// Get homepage visitor statistics with conditions
export async function getHomepageVisitorStats(days = 30) {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    const startDateString = startDate.toISOString().split('T')[0]
    
    const data = await getAnalytics({ startDate: startDateString })
    
    // Filter homepage visits with multiple conditions
    const homepageVisits = data.filter(item => {
      const isHomepage = 
        item.pageUrl === '/' || 
        item.pageUrl === '/home' || 
        item.pageType === 'home' ||
        item.pageTitle?.includes('Moradabad News - Latest') ||
        item.pageTitle?.includes('Latest Breaking News from Moradabad') ||
        (item.pageUrl === '' && item.pageType === 'page') ||
        item.pageUrl === '/index.html'
      
      return isHomepage
    })
    
    // Calculate unique visitors to homepage
    const uniqueHomepageVisitors = new Set(homepageVisits.map(item => item.ipHash)).size
    const totalHomepagePageViews = homepageVisits.length
    
    // Get visitor conditions/characteristics
    const visitorConditions = {
      byCountry: {},
      byDevice: {},
      byBrowser: {},
      byTimeOfDay: {},
      byReferrer: {},
      returningVisitors: 0,
      newVisitors: 0
    }
    
    homepageVisits.forEach(item => {
      // Country distribution
      visitorConditions.byCountry[item.country] = (visitorConditions.byCountry[item.country] || 0) + 1
      
      // Device distribution
      visitorConditions.byDevice[item.deviceType] = (visitorConditions.byDevice[item.deviceType] || 0) + 1
      
      // Browser distribution
      visitorConditions.byBrowser[item.browser] = (visitorConditions.byBrowser[item.browser] || 0) + 1
      
      // Time of day analysis
      const hour = new Date(item.timestamp).getHours()
      const timeSlot = hour < 6 ? 'Night (12AM-6AM)' : 
                      hour < 12 ? 'Morning (6AM-12PM)' : 
                      hour < 18 ? 'Afternoon (12PM-6PM)' : 'Evening (6PM-12AM)'
      visitorConditions.byTimeOfDay[timeSlot] = (visitorConditions.byTimeOfDay[timeSlot] || 0) + 1
      
      // Referrer analysis
      const referrer = item.referrer === 'Direct' ? 'Direct' : 
                      item.referrer.includes('google') ? 'Google' :
                      item.referrer.includes('facebook') ? 'Facebook' :
                      item.referrer.includes('twitter') ? 'Twitter' : 'Other'
      visitorConditions.byReferrer[referrer] = (visitorConditions.byReferrer[referrer] || 0) + 1
    })
    
    // Calculate returning vs new visitors (simplified)
    const visitorCounts = {}
    homepageVisits.forEach(item => {
      visitorCounts[item.ipHash] = (visitorCounts[item.ipHash] || 0) + 1
    })
    
    Object.values(visitorCounts).forEach(count => {
      if (count > 1) {
        visitorConditions.returningVisitors++
      } else {
        visitorConditions.newVisitors++
      }
    })
    
    return {
      uniqueHomepageVisitors,
      totalHomepagePageViews,
      visitorConditions,
      period: `Last ${days} days`,
      averagePageViewsPerVisitor: uniqueHomepageVisitors > 0 ? (totalHomepagePageViews / uniqueHomepageVisitors).toFixed(2) : 0
    }
  } catch (error) {
    console.error('Error fetching homepage visitor stats:', error)
    return {
      uniqueHomepageVisitors: 0,
      totalHomepagePageViews: 0,
      visitorConditions: {
        byCountry: {},
        byDevice: {},
        byBrowser: {},
        byTimeOfDay: {},
        byReferrer: {},
        returningVisitors: 0,
        newVisitors: 0
      },
      period: `Last ${days} days`,
      averagePageViewsPerVisitor: 0
    }
  }
}

