// Google Analytics 4 Integration
class GoogleAnalytics {
  constructor() {
    // Get measurement ID from environment or use default
    this.measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'
    this.isInitialized = false
    this.gtag = null
    this.isEnabled = this.measurementId !== 'G-XXXXXXXXXX'
  }

  // Initialize Google Analytics
  init() {
    if (this.isInitialized || typeof window === 'undefined' || !this.isEnabled) return

    try {
      // Load Google Analytics script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      this.gtag = function() {
        window.dataLayer.push(arguments)
      }
      window.gtag = this.gtag

      // Configure Google Analytics
      this.gtag('js', new Date())
      this.gtag('config', this.measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: false, // We'll send page views manually
      })

      this.isInitialized = true
      console.log('Google Analytics initialized with ID:', this.measurementId)
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error)
    }
  }

  // Track page view
  trackPageView(pageData = {}) {
    if (!this.isInitialized || !this.gtag || !this.isEnabled) return

    const {
      page_title = document.title,
      page_location = window.location.href,
      page_path = window.location.pathname,
      content_group1 = 'News',
      content_group2 = pageData.category || 'General',
      custom_parameters = {}
    } = pageData

    this.gtag('event', 'page_view', {
      page_title,
      page_location,
      page_path,
      content_group1,
      content_group2,
      ...custom_parameters
    })
  }

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized || !this.gtag || !this.isEnabled) return

    this.gtag('event', eventName, {
      event_category: parameters.category || 'User Interaction',
      event_label: parameters.label,
      value: parameters.value,
      ...parameters
    })
  }

  // Track article views
  trackArticleView(articleData) {
    this.trackEvent('article_view', {
      category: 'Content',
      label: articleData.title,
      article_id: articleData.id,
      article_category: articleData.category,
      article_author: articleData.author,
      content_group1: 'Article',
      content_group2: articleData.category
    })
  }

  // Track search queries
  trackSearch(searchQuery, resultsCount = 0) {
    this.trackEvent('search', {
      category: 'User Engagement',
      label: searchQuery,
      search_term: searchQuery,
      results_count: resultsCount
    })
  }

  // Track newsletter subscriptions
  trackNewsletterSignup(email) {
    this.trackEvent('newsletter_signup', {
      category: 'Lead Generation',
      label: 'Newsletter Subscription',
      email_domain: email.split('@')[1]
    })
  }

  // Track social media clicks
  trackSocialClick(platform, url) {
    this.trackEvent('social_click', {
      category: 'Social Media',
      label: platform,
      social_platform: platform,
      social_url: url
    })
  }

  // Track video interactions
  trackVideoInteraction(action, videoData) {
    this.trackEvent('video_interaction', {
      category: 'Video',
      label: action,
      video_title: videoData.title,
      video_duration: videoData.duration,
      video_action: action
    })
  }

  // Track form submissions
  trackFormSubmission(formName, success = true) {
    this.trackEvent('form_submission', {
      category: 'User Engagement',
      label: formName,
      form_name: formName,
      success: success
    })
  }

  // Track scroll depth
  trackScrollDepth(depth) {
    this.trackEvent('scroll_depth', {
      category: 'User Engagement',
      label: `${depth}%`,
      scroll_depth: depth
    })
  }

  // Track time on page
  trackTimeOnPage(timeSpent) {
    this.trackEvent('time_on_page', {
      category: 'User Engagement',
      label: `${Math.round(timeSpent)}s`,
      time_spent: Math.round(timeSpent)
    })
  }

  // Track outbound clicks
  trackOutboundClick(url, linkText) {
    this.trackEvent('outbound_click', {
      category: 'External Links',
      label: linkText,
      outbound_url: url,
      link_text: linkText
    })
  }

  // Track user engagement
  trackEngagement(action, details = {}) {
    this.trackEvent('user_engagement', {
      category: 'User Engagement',
      label: action,
      engagement_action: action,
      ...details
    })
  }

  // Set user properties
  setUserProperties(properties) {
    if (!this.isInitialized || !this.gtag) return

    this.gtag('config', this.measurementId, {
      user_properties: properties
    })
  }

  // Track conversions
  trackConversion(conversionName, value = 0, currency = 'INR') {
    this.trackEvent('conversion', {
      category: 'Conversion',
      label: conversionName,
      conversion_name: conversionName,
      value: value,
      currency: currency
    })
  }

  // Enhanced ecommerce tracking
  trackPurchase(transactionData) {
    this.gtag('event', 'purchase', {
      transaction_id: transactionData.id,
      value: transactionData.value,
      currency: transactionData.currency || 'INR',
      items: transactionData.items
    })
  }

  // Track custom dimensions
  trackCustomDimension(dimensionName, value) {
    this.trackEvent('custom_dimension', {
      category: 'Custom',
      label: dimensionName,
      [dimensionName]: value
    })
  }
}

// Create singleton instance
const googleAnalytics = new GoogleAnalytics()

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => googleAnalytics.init())
  } else {
    googleAnalytics.init()
  }
}

export default googleAnalytics

// Export individual methods for convenience
export const {
  trackPageView,
  trackEvent,
  trackArticleView,
  trackSearch,
  trackNewsletterSignup,
  trackSocialClick,
  trackVideoInteraction,
  trackFormSubmission,
  trackScrollDepth,
  trackTimeOnPage,
  trackOutboundClick,
  trackEngagement,
  setUserProperties,
  trackConversion,
  trackPurchase,
  trackCustomDimension
} = googleAnalytics
