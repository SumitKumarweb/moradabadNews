import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, TrendingUp, Clock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { generateArticleUrl } from "../lib/utils"

export function HeroSection({ articles }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Filter and sort articles based on featured status and recency
  const getDisplayArticles = () => {
    const now = new Date()
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    
    return articles
      .filter(article => {
        const publishedDate = new Date(article.publishedAt)
        
        // If article is featured, only show if published within last 24 hours
        if (article.isFeatured) {
          return publishedDate >= twentyFourHoursAgo
        }
        
        // Show all non-featured recent articles
        return true
      })
      .sort((a, b) => {
        // Featured articles first (if within 24 hours)
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        
        // Then sort by most recent
        return new Date(b.publishedAt) - new Date(a.publishedAt)
      })
  }

  const displayArticles = getDisplayArticles()

  // Debug logging
  useEffect(() => {
    console.log('HeroSection - Total articles:', articles.length)
    console.log('HeroSection - Display articles:', displayArticles.length)
    console.log('HeroSection - Featured articles:', articles.filter(a => a.isFeatured).length)
    console.log('HeroSection - Recent articles:', articles.filter(a => !a.isFeatured).length)
  }, [articles, displayArticles])

  useEffect(() => {
    if (displayArticles.length <= 1 || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayArticles.length)
    }, 5000) // 5 seconds for better engagement

    return () => clearInterval(interval)
  }, [displayArticles.length, isAutoPlaying])

  // Reset index when articles change
  useEffect(() => {
    setCurrentIndex(0)
  }, [displayArticles.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + displayArticles.length) % displayArticles.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayArticles.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  // Touch gesture support
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY
    
    const handleTouchEnd = (e) => {
      const touch = e.changedTouches[0]
      const endX = touch.clientX
      const endY = touch.clientY
      
      const deltaX = endX - startX
      const deltaY = endY - startY
      
      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          goToPrevious()
        } else {
          goToNext()
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchend', handleTouchEnd)
  }

  if (displayArticles.length === 0) {
    return (
      <section className="relative w-full overflow-hidden bg-black">
        <div className="relative h-[70vh] min-h-[400px] sm:h-[80vh] md:h-[90vh]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl font-bold text-white mb-4 sm:text-4xl md:text-5xl">
                Welcome to Moradabad News
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Stay updated with the latest news and breaking stories
              </p>
              <div className="flex items-center justify-center gap-2 text-white/60">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Loading latest content...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const currentArticle = displayArticles[currentIndex]

  return (
    <section 
      className="relative w-full overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
    >
      {/* Modern Background with Image */}
      <div className="relative h-[70vh] min-h-[400px] sm:h-[80vh] md:h-[90vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={currentArticle.image || "/placeholder.svg?height=600&width=1200"}
            alt={currentArticle.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full items-end">
          <div className="w-full px-4 pb-8 sm:px-6 sm:pb-12">
            <div className="max-w-4xl">
              {/* Status Badge */}
              <div className="mb-4">
                {currentArticle.isFeatured ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white animate-pulse">
                    <div className="h-2 w-2 rounded-full bg-white animate-ping"></div>
                    FEATURED
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                    <TrendingUp className="h-3 w-3" />
                    LATEST
                  </div>
                )}
              </div>

              {/* Title */}
              <Link to={generateArticleUrl(currentArticle)} className="group block">
                <h1 className="text-2xl font-bold leading-tight text-white transition-all duration-300 group-hover:text-blue-300 sm:text-3xl md:text-4xl lg:text-5xl">
                  {currentArticle.title}
                </h1>
              </Link>

              {/* Summary */}
              <p className="mt-3 text-sm leading-relaxed text-white/80 line-clamp-2 sm:text-base sm:line-clamp-3 md:text-lg">
                {currentArticle.summary}
              </p>

              {/* Author & Time */}
              <div className="mt-4 flex items-center gap-4 text-xs text-white/60 sm:text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{currentArticle.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDistanceToNow(new Date(currentArticle.publishedAt), { addSuffix: true })}</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <Link to={generateArticleUrl(currentArticle)}>
                  <Button 
                    size="sm"
                    className="bg-white text-black hover:bg-white/90 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Navigation Arrows */}
      {displayArticles.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 sm:left-4 sm:h-12 sm:w-12"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Previous article</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 sm:right-4 sm:h-12 sm:w-12"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Next article</span>
          </Button>
        </>
      )}

      {/* Modern Mobile Controls */}
      {displayArticles.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {/* Play/Pause - Desktop only */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 sm:flex"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </Button>
          
          {/* Modern Dots */}
          <div className="flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm px-3 py-2">
            {displayArticles.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-white" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Simple Progress Bar - Hidden on mobile */}
      {displayArticles.length > 1 && (
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/10 hidden sm:block">
          <div 
            className="h-full bg-white/60 transition-all duration-500"
            style={{ 
              width: `${((currentIndex + 1) / displayArticles.length) * 100}%` 
            }}
          />
        </div>
      )}

      {/* Slide Counter - Hidden on mobile */}
      {displayArticles.length > 1 && (
        <div className="absolute top-4 right-4 rounded-full bg-black/20 backdrop-blur-sm px-3 py-1 border border-white/30 hidden sm:block">
          <span className="text-xs font-semibold text-white">
            {currentIndex + 1}/{displayArticles.length}
          </span>
        </div>
      )}
    </section>
  )
}

