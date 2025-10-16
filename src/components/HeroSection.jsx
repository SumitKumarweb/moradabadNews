
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Eye, TrendingUp, Star, ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { formatDistanceToNow } from 'date-fns'
import { generateArticleUrl } from '../lib/utils'

export function HeroSection({ articles , exculdeTrendingArticle}) {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  console.log(articles , 'articles')

  // Separate featured and latest articles
  const featuredArticles = articles.filter(article => article.isFeatured).slice(0, 3)
  const latestArticles = articles
    .filter(article => !article.isFeatured)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 6)
  const moradabadNewsExculdeTrending =  exculdeTrendingArticle
  .filter(article => !article.isFeatured && !article.isTrending)
  
  // Auto-rotate featured articles
  useEffect(() => {
    if (!isAutoPlaying || isHovered || featuredArticles.length <= 1) return

    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev + 1) % featuredArticles.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered, featuredArticles.length])

  const handlePrev = () => {
    setCurrentFeaturedIndex((prev) => 
      prev === 0 ? featuredArticles.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredArticles.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  if (articles.length === 0) {
    return (
      <section className="relative min-h-[70vh] from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Moradabad News</h1>
          <p className="text-xl opacity-90">Loading latest news...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[70vh]   from-gray-900  to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <div className="hidden md:block lg:col-span-2">
            {featuredArticles.length > 0 && (
              <div 
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Card className="overflow-hidden border-0 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 group-hover:scale-[1.02] shadow-2xl">
                  <div className="relative h-[500px] overflow-hidden">
                    <img
                      src={featuredArticles[currentFeaturedIndex]?.image || "/placeholder.svg?height=500&width=800"}
                      alt={featuredArticles[currentFeaturedIndex]?.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Featured badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-3 py-1 shadow-lg">
                        <Star className="w-4 h-4 mr-1" />
                        Featured
                      </Badge>
                    </div>

                    {/* Auto-play controls */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={toggleAutoPlay}
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>

                    {/* Navigation arrows */}
                    {featuredArticles.length > 1 && (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={handlePrev}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={handleNext}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </>
                    )}

                    {/* Article content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline" className="border-white/30 text-white bg-white/10">
                          {featuredArticles[currentFeaturedIndex]?.category?.replace("-", " ")}
                        </Badge>
                        <span className="flex items-center gap-1 text-sm opacity-90">
                          <Clock className="w-4 h-4" />
                          {formatDistanceToNow(new Date(featuredArticles[currentFeaturedIndex]?.publishedAt), { addSuffix: true })}
                        </span>
                        <span className="flex items-center gap-1 text-sm opacity-90">
                          <Eye className="w-4 h-4" />
                          {featuredArticles[currentFeaturedIndex]?.views?.toLocaleString() || 0}
                        </span>
                      </div>
                      
                      <Link to={generateArticleUrl(featuredArticles[currentFeaturedIndex])}>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-red-300 transition-colors duration-300">
                          {featuredArticles[currentFeaturedIndex]?.title}
                        </h1>
                        <p className="text-lg opacity-90 mb-4 line-clamp-2">
                          {featuredArticles[currentFeaturedIndex]?.summary}
                        </p>
                        <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors duration-300">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </Card>

                {/* Dots indicator */}
                {featuredArticles.length > 1 && (
                  <div className="flex justify-center mt-4 gap-2">
                    {featuredArticles.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFeaturedIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentFeaturedIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* Small News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mt-11">
              {moradabadNewsExculdeTrending.slice(0, 3).map((article, index) => (
                <Link key={article.id} to={generateArticleUrl(article)}>
                  <Card className="group overflow-hidden border-0 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] shadow-lg h-full">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg?height=128&width=200"}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {article.isTrending && (
                        <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-xs px-2 py-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {article.category?.replace("-", " ")}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {article.title}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {article.summary}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>By {article.author}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views?.toLocaleString() || 0}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

     

          {/* Latest News Sidebar */}
          <div className="space-y-4 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Latest News</h2>
            </div>

            {latestArticles.map((article, index) => (
              <Link key={article.id} to={generateArticleUrl(article)}>
                <Card className="group overflow-hidden border-0 bg-white/5 backdrop-blur-md hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] shadow-lg">
                  <div className="flex gap-4 p-4">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={article.image || "/placeholder.svg?height=80&width=80"}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {article.isTrending && (
                        <Badge className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-xs px-1 py-0">
                          <TrendingUp className="w-3 h-3" />
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {article.category?.replace("-", " ")}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {article.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>By {article.author}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views?.toLocaleString() || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}

            {/* View All Latest News Button */}
            <div className="pt-4">
              <Link to="/news/moradabad">
              <Button 
                variant="outline" 
                className="w-full"
              >
                  View All Moradabad News
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

