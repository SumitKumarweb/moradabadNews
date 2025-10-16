import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  Timestamp 
} from 'firebase/firestore'
import { db } from './firebase'

// Search Service for Moradabad News
class SearchService {
  constructor() {
    this.searchIndex = new Map()
    this.searchHistory = []
    this.popularSearches = [
      'Moradabad news',
      'UP politics',
      'weather forecast',
      'business updates',
      'education news',
      'traffic updates',
      'local events',
      'breaking news'
    ]
    this.isInitialized = false
  }

  // Initialize search index with Firebase data
  async initializeSearchIndex() {
    if (this.isInitialized) return

    try {
      // Fetch all articles from Firebase
      const articlesRef = collection(db, 'articles')
      const articlesQuery = query(
        articlesRef,
        orderBy('publishedAt', 'desc'),
        limit(1000) // Limit to prevent memory issues
      )
      
      const articlesSnapshot = await getDocs(articlesQuery)
      const articles = articlesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishedAt: doc.data().publishedAt?.toDate?.()?.toISOString() || doc.data().publishedAt
      }))

      // Index all articles
      articles.forEach(article => {
        this.indexContent(article)
      })

      this.isInitialized = true
      console.log(`Search index initialized with ${articles.length} articles`)
    } catch (error) {
      console.error('Failed to initialize search index:', error)
    }
  }

  // Index content for search
  indexContent(item) {
    const searchableText = [
      item.title,
      item.summary || item.excerpt,
      item.content,
      ...(item.tags || []),
      item.author,
      item.category
    ].join(' ').toLowerCase()

    this.searchIndex.set(item.id, {
      ...item,
      searchableText,
      indexedAt: new Date(),
      // Ensure we have the right field names for Firebase data
      excerpt: item.summary || item.excerpt,
      image: item.image || '/images/placeholder-news.jpg',
      views: item.views || 0,
      likes: item.likes || 0,
      readTime: item.readTime || '5 min read'
    })
  }

  // Perform search
  async search(query, options = {}) {
    const {
      limit = 20,
      offset = 0,
      category = 'all',
      sortBy = 'relevance',
      includeContent = false
    } = options

    if (!query || query.trim().length < 2) {
      return {
        results: [],
        total: 0,
        query,
        suggestions: this.getSearchSuggestions(query)
      }
    }

    const searchQuery = query.toLowerCase().trim()
    
    // Add to search history
    this.addToSearchHistory(searchQuery)

    try {
      // Initialize search index if not done yet
      if (!this.isInitialized) {
        await this.initializeSearchIndex()
      }

      // Get all indexed content
      const allContent = Array.from(this.searchIndex.values())
      
      // Filter by category if specified
      let filteredContent = allContent
      if (category !== 'all') {
        filteredContent = allContent.filter(item => item.category === category)
      }

      // Search and score results
      const scoredResults = filteredContent.map(item => {
        const score = this.calculateRelevanceScore(item, searchQuery)
        return { ...item, relevanceScore: score }
      }).filter(item => item.relevanceScore > 0)

      // Sort results
      const sortedResults = this.sortResults(scoredResults, sortBy)

      // Apply pagination
      const paginatedResults = sortedResults.slice(offset, offset + limit)

      // Remove content if not needed
      const finalResults = includeContent 
        ? paginatedResults 
        : paginatedResults.map(item => {
            const { content, ...rest } = item
            return rest
          })

      return {
        results: finalResults,
        total: scoredResults.length,
        query,
        suggestions: this.getSearchSuggestions(searchQuery),
        relatedSearches: this.getRelatedSearches(searchQuery)
      }
    } catch (error) {
      console.error('Search error:', error)
      return {
        results: [],
        total: 0,
        query,
        error: 'Search failed'
      }
    }
  }

  // Calculate relevance score
  calculateRelevanceScore(item, query) {
    const searchableText = item.searchableText
    const queryWords = query.split(' ').filter(word => word.length > 1)
    
    let score = 0
    
    // Title matches (highest weight)
    if (item.title.toLowerCase().includes(query)) {
      score += 10
    }
    
    // Individual word matches in title
    queryWords.forEach(word => {
      if (item.title.toLowerCase().includes(word)) {
        score += 5
      }
    })
    
    // Excerpt matches
    if (item.excerpt.toLowerCase().includes(query)) {
      score += 3
    }
    
    // Tag matches
    if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query))) {
      score += 4
    }
    
    // Category matches
    if (item.category.toLowerCase().includes(query)) {
      score += 2
    }
    
    // Content matches (lower weight)
    if (item.content && item.content.toLowerCase().includes(query)) {
      score += 1
    }
    
    // Author matches
    if (item.author && item.author.toLowerCase().includes(query)) {
      score += 2
    }
    
    // Exact phrase match bonus
    if (searchableText.includes(query)) {
      score += 2
    }
    
    // Recency bonus (newer content gets slight boost)
    const daysSincePublished = (Date.now() - new Date(item.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
    if (daysSincePublished < 7) {
      score += 1
    }
    
    return Math.min(score, 20) // Cap at 20
  }

  // Sort results
  sortResults(results, sortBy) {
    switch (sortBy) {
      case 'relevance':
        return results.sort((a, b) => b.relevanceScore - a.relevanceScore)
      
      case 'date':
        return results.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      
      case 'popular':
        return results.sort((a, b) => (b.likes || 0) - (a.likes || 0))
      
      case 'views':
        return results.sort((a, b) => (b.views || 0) - (a.views || 0))
      
      default:
        return results
    }
  }

  // Get search suggestions
  getSearchSuggestions(query) {
    if (!query || query.length < 2) {
      return this.popularSearches.slice(0, 5)
    }

    const suggestions = this.popularSearches.filter(search => 
      search.toLowerCase().includes(query.toLowerCase())
    )

    // Add partial matches from search history
    const historyMatches = this.searchHistory.filter(search => 
      search.toLowerCase().includes(query.toLowerCase()) && 
      !suggestions.includes(search)
    )

    return [...suggestions, ...historyMatches].slice(0, 5)
  }

  // Get related searches
  getRelatedSearches(query) {
    const related = {
      'moradabad': ['moradabad news', 'moradabad weather', 'moradabad traffic'],
      'politics': ['UP politics', 'election news', 'government updates'],
      'weather': ['weather forecast', 'rain updates', 'temperature'],
      'business': ['business news', 'economy', 'market updates'],
      'education': ['school news', 'college updates', 'education policy'],
      'sports': ['cricket news', 'sports updates', 'tournament results']
    }

    const queryLower = query.toLowerCase()
    for (const [key, values] of Object.entries(related)) {
      if (queryLower.includes(key)) {
        return values
      }
    }

    return []
  }

  // Add to search history
  addToSearchHistory(query) {
    // Remove if already exists
    this.searchHistory = this.searchHistory.filter(item => item !== query)
    
    // Add to beginning
    this.searchHistory.unshift(query)
    
    // Keep only last 20 searches
    this.searchHistory = this.searchHistory.slice(0, 20)
    
    // Store in localStorage
    try {
      localStorage.setItem('search-history', JSON.stringify(this.searchHistory))
    } catch (error) {
      console.warn('Failed to save search history:', error)
    }
  }

  // Get search history
  getSearchHistory() {
    try {
      const stored = localStorage.getItem('search-history')
      if (stored) {
        this.searchHistory = JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load search history:', error)
    }
    
    return this.searchHistory
  }

  // Clear search history
  clearSearchHistory() {
    this.searchHistory = []
    try {
      localStorage.removeItem('search-history')
    } catch (error) {
      console.warn('Failed to clear search history:', error)
    }
  }

  // Get trending searches
  getTrendingSearches() {
    return [
      'Moradabad news',
      'UP politics',
      'weather forecast',
      'business updates',
      'education news',
      'traffic updates',
      'local events',
      'breaking news',
      'sports news',
      'health updates'
    ]
  }

  // Get search analytics
  getSearchAnalytics() {
    return {
      totalSearches: this.searchHistory.length,
      popularSearches: this.popularSearches,
      recentSearches: this.searchHistory.slice(0, 10),
      indexedContent: this.searchIndex.size
    }
  }

  // Refresh search index (useful when new content is added)
  async refreshSearchIndex() {
    this.isInitialized = false
    this.searchIndex.clear()
    await this.initializeSearchIndex()
  }

  // Add single article to search index
  addArticleToIndex(article) {
    this.indexContent(article)
  }

  // Remove article from search index
  removeArticleFromIndex(articleId) {
    this.searchIndex.delete(articleId)
  }

  // Update article in search index
  updateArticleInIndex(article) {
    this.indexContent(article)
  }

  // Auto-complete suggestions
  getAutoCompleteSuggestions(query) {
    if (!query || query.length < 1) {
      return []
    }

    const allSuggestions = [
      ...this.popularSearches,
      ...this.searchHistory,
      ...Array.from(this.searchIndex.values()).map(item => item.title)
    ]

    const uniqueSuggestions = [...new Set(allSuggestions)]
    
    return uniqueSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8)
  }
}

// Create singleton instance
const searchService = new SearchService()

// Initialize search service with Firebase data
searchService.initializeSearchIndex()

export default searchService

// Export individual methods
export const {
  search,
  getSearchSuggestions,
  getRelatedSearches,
  getSearchHistory,
  clearSearchHistory,
  getTrendingSearches,
  getSearchAnalytics,
  getAutoCompleteSuggestions,
  refreshSearchIndex,
  addArticleToIndex,
  removeArticleFromIndex,
  updateArticleInIndex
} = searchService
