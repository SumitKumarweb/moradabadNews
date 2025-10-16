import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { generateArticleUrl } from "../lib/utils"

export function HeroSection({ articles }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (articles.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [articles.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length)
  }

  if (articles.length === 0) return null

  const currentArticle = articles[currentIndex]

  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-black md:h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentArticle.image || "/placeholder.svg?height=600&width=1200"}
          alt={currentArticle.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full items-end px-4 pb-12">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <span className="rounded bg-primary px-2 py-1 text-xs font-semibold uppercase text-primary-foreground">
              Featured
            </span>
            <span>{formatDistanceToNow(new Date(currentArticle.publishedAt), { addSuffix: true })}</span>
          </div>

          <Link to={generateArticleUrl(currentArticle)}>
            <h1 className="font-serif text-3xl font-bold leading-tight text-white md:text-5xl hover:text-white/90 transition-colors">
              {currentArticle.title}
            </h1>
          </Link>

          <p className="text-lg leading-relaxed text-white/90 line-clamp-2">{currentArticle.summary}</p>

          <div className="flex items-center gap-4">
            <Link to={generateArticleUrl(currentArticle)}>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Read More
              </Button>
            </Link>
            <span className="text-sm text-white/70">By {currentArticle.author}</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {articles.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous article</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next article</span>
          </Button>
        </>
      )}

      {/* Indicators */}
      {articles.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {articles.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

