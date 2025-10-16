import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Search, Filter, Calendar, User, TrendingUp, Clock, Newspaper } from 'lucide-react'
import SearchSEO from '../components/SEO/SearchSEO'
import StaticSEO from '../components/SEO/StaticSEO'
import { useSearchWithFilters } from '../hooks/use-search'
import searchService from '../lib/search-service'
import { format } from 'date-fns'
import { generateArticleUrl } from '../lib/utils'

// Search results will be fetched dynamically from Firebase via search service

const searchCategories = [
  { id: 'all', name: 'All Results' },
  { id: 'news', name: 'News' },
  { id: 'technology', name: 'Technology' },
  { id: 'politics', name: 'Politics' },
  { id: 'business', name: 'Business' },
  { id: 'education', name: 'Education' },
  { id: 'weather', name: 'Weather' }
]

const sortOptions = [
  { id: 'relevance', name: 'Most Relevant' },
  { id: 'date', name: 'Latest First' },
  { id: 'popular', name: 'Most Popular' },
  { id: 'views', name: 'Most Viewed' }
]

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    searchResults,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    hasSearched,
    filters,
    updateFilters,
    performSearch
  } = useSearchWithFilters()

  // Extract filter values
  const selectedCategory = filters.category
  const sortBy = filters.sortBy
  const filteredResults = searchResults // Use searchResults directly since filtering is handled by the hook

  // Get search query from URL
  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchQuery(query)
    if (query.trim()) {
      performSearch(query)
    }
  }, [searchParams, performSearch])

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() })
      performSearch(searchQuery.trim())
    }
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Get search suggestions
  const getSearchSuggestions = () => {
    return searchService.getTrendingSearches()
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Static SEO for server-side rendering */}
      {searchQuery && (
        <StaticSEO
          title={`Search Results for "${searchQuery}" - Moradabad News`}
          description={`Search results for "${searchQuery}" on Moradabad News. Find the latest news, articles, and updates about Moradabad, Uttar Pradesh, India.`}
          keywords={`search results, ${searchQuery}, Moradabad news, UP news, local search`}
          image="/images/search-og.jpg"
          type="website"
          noindex={true}
          url={`/search?q=${encodeURIComponent(searchQuery)}`}
        />
      )}
      
      {/* Dynamic SEO for client-side */}
      <SearchSEO 
        query={searchQuery}
        results={searchResults}
        totalResults={searchResults.length}
      />
      <SiteHeader />
      
      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Search Results
              </h1>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search news, articles, and more..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-10 text-lg"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" size="lg" className="md:w-auto">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </div>
              </form>

              {/* Search Suggestions */}
              {!hasSearched && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {getSearchSuggestions().map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(suggestion)
                          setSearchParams({ q: suggestion })
                          performSearch(suggestion)
                        }}
                        className="text-sm"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Search Results */}
        {hasSearched && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="lg:w-64 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <Select value={selectedCategory} onValueChange={(value) => updateFilters({ category: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {searchCategories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Sort By</label>
                        <Select value={sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sortOptions.map(option => (
                              <SelectItem key={option.id} value={option.id}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Results */}
                <div className="flex-1">
                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {isLoading ? 'Searching...' : `${filteredResults.length} results found`}
                      </h2>
                      {searchQuery && (
                        <p className="text-muted-foreground">
                          Results for "<span className="font-semibold">{searchQuery}</span>"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Loading State */}
                  {isLoading && (
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <Card key={i} className="animate-pulse">
                          <CardContent className="p-6">
                            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                            <div className="h-3 bg-muted rounded w-full mb-2"></div>
                            <div className="h-3 bg-muted rounded w-2/3"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Results List */}
                  {!isLoading && filteredResults.length > 0 && (
                    <div className="space-y-6">
                      {filteredResults.map((result) => (
                        <Card key={result.id} className="group hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                <img 
                                  src={result.image} 
                                  alt={result.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.src = '/images/placeholder-news.jpg'
                                  }}
                                />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="secondary">{result.category}</Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {result.type}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {result.readTime}
                                  </Badge>
                                </div>
                                
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                  <Link to={generateArticleUrl(result)}>
                                    {result.title}
                                  </Link>
                                </h3>
                                
                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                  {result.excerpt}
                                </p>
                                
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                      <User className="h-4 w-4" />
                                      <span>{result.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>{format(new Date(result.publishedAt), 'MMM dd, yyyy')}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                      <TrendingUp className="h-4 w-4" />
                                      <span>{result.views} views</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span>❤️ {result.likes}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* No Results */}
                  {!isLoading && filteredResults.length === 0 && hasSearched && (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No results found</h3>
                        <p className="text-muted-foreground mb-4">
                          We couldn't find any results for "<span className="font-semibold">{searchQuery}</span>"
                        </p>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Try:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Using different keywords</li>
                            <li>• Checking your spelling</li>
                            <li>• Using more general terms</li>
                            <li>• Trying related terms</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <SiteFooter />
    </div>
  )
}
