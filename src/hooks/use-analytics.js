import { useEffect } from 'react'
import { trackPageView } from '../lib/analytics-service'

/**
 * Hook to automatically track page views
 * @param {Object} pageData - Page information to track
 * @param {string} pageData.pageType - Type of page (article, category, home, etc.)
 * @param {string} pageData.articleId - Article ID (if applicable)
 * @param {string} pageData.articleTitle - Article title (if applicable)
 * @param {string} pageData.category - Category (if applicable)
 */
export function useAnalytics(pageData = {}) {
  useEffect(() => {
    // Track page view when component mounts
    const track = async () => {
      await trackPageView(pageData)
    }
    
    // Small delay to ensure page is loaded
    const timer = setTimeout(track, 1000)
    
    return () => clearTimeout(timer)
  }, [pageData.pageUrl, pageData.articleId]) // Re-track if URL or article changes
}

export default useAnalytics

