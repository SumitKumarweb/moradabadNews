import { useState, useEffect, useCallback } from 'react'
import searchService from '../lib/search-service'

// Custom hook for search functionality
export function useSearch() {
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  // Perform search
  const performSearch = useCallback(async (query, options = {}) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([])
      setHasSearched(false)
      return
    }

    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const results = await searchService.search(query, options)
      setSearchResults(results.results || [])
    } catch (err) {
      setError(err.message)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Get search suggestions
  const getSuggestions = useCallback((query) => {
    return searchService.getSearchSuggestions(query)
  }, [])

  // Get trending searches
  const getTrendingSearches = useCallback(() => {
    return searchService.getTrendingSearches()
  }, [])

  // Get search history
  const getSearchHistory = useCallback(() => {
    return searchService.getSearchHistory()
  }, [])

  // Clear search history
  const clearSearchHistory = useCallback(() => {
    searchService.clearSearchHistory()
  }, [])

  // Get auto-complete suggestions
  const getAutoComplete = useCallback((query) => {
    return searchService.getAutoCompleteSuggestions(query)
  }, [])

  // Get related searches
  const getRelatedSearches = useCallback((query) => {
    return searchService.getRelatedSearches(query)
  }, [])

  // Get search analytics
  const getSearchAnalytics = useCallback(() => {
    return searchService.getSearchAnalytics()
  }, [])

  return {
    searchResults,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    hasSearched,
    performSearch,
    getSuggestions,
    getTrendingSearches,
    getSearchHistory,
    clearSearchHistory,
    getAutoComplete,
    getRelatedSearches,
    getSearchAnalytics
  }
}

// Hook for search with filters
export function useSearchWithFilters() {
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'relevance',
    limit: 20,
    offset: 0
  })
  
  const {
    searchResults,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    hasSearched,
    performSearch: basePerformSearch
  } = useSearch()

  // Perform search with current filters
  const performSearch = useCallback((query) => {
    return basePerformSearch(query, filters)
  }, [basePerformSearch, filters])

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      category: 'all',
      sortBy: 'relevance',
      limit: 20,
      offset: 0
    })
  }, [])

  // Re-search with new filters
  useEffect(() => {
    if (searchQuery && hasSearched) {
      performSearch(searchQuery)
    }
  }, [filters, searchQuery, hasSearched, performSearch])

  return {
    searchResults,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    hasSearched,
    filters,
    updateFilters,
    resetFilters,
    performSearch
  }
}

// Hook for search suggestions
export function useSearchSuggestions(query) {
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query || query.length < 1) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    
    // Debounce the search
    const timeoutId = setTimeout(() => {
      try {
        const autoComplete = searchService.getAutoCompleteSuggestions(query)
        setSuggestions(autoComplete)
      } catch (error) {
        console.error('Error getting suggestions:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  return { suggestions, isLoading }
}

// Hook for search analytics
export function useSearchAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = searchService.getSearchAnalytics()
        setAnalytics(data)
      } catch (error) {
        console.error('Error loading search analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  return { analytics, isLoading }
}

export default useSearch
