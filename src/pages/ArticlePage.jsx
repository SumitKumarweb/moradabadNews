import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import BreadcrumbNav from '../components/BreadcrumbNav'
import { NewsCard } from '../components/NewsCard'
import SEO from '../components/SEO'
import useAnalytics from '../hooks/use-analytics'
import {
  getArticleById,
  getRecommendedArticles,
  incrementArticleViews,
} from '../lib/firebase-service'
import { Loader2, Calendar, User, Eye } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const categoryNames = {
  moradabad: "Moradabad News",
  up: "UP News",
  india: "India News",
  global: "Global News",
  "current-affairs": "Current Affairs",
}

export default function ArticlePage() {
  const { category, id } = useParams()
  const [article, setArticle] = useState(null)
  const [recommendedArticles, setRecommendedArticles] = useState([])
  const [loading, setLoading] = useState(true)

  // Track article view with analytics
  useAnalytics({
    pageType: 'article',
    articleId: article?.id,
    articleTitle: article?.title,
    category: article?.category,
  })

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      if (!isMounted) return
      setLoading(true)
      try {
        const articleData = await getArticleById(id)

        if (!isMounted) return

        if (!articleData || articleData.category !== category) {
          setArticle(null)
          setLoading(false)
          return
        }

        setArticle(articleData)
        incrementArticleViews(id)

        const recommended = await getRecommendedArticles(id, category)

        if (isMounted) {
          setRecommendedArticles(recommended)
          setLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error loading article:", error)
          setArticle(null)
          setLoading(false)
        }
      }
    }

    if (category && id) {
      loadData()
    }

    return () => {
      isMounted = false
    }
  }, [category, id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Article Not Found</h1>
            <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const categoryName = categoryNames[category]

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={article.metaTitle || article.title}
        description={article.metaDescription || article.summary}
        keywords={article.metaKeywords?.join(', ') || article.tags?.join(', ')}
        image={article.ogImage || article.image}
        type="article"
        author={article.author}
        publishedTime={article.publishedAt}
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav
            items={[
              { label: categoryName, href: `/news/${category}` },
              { label: article.title },
            ]}
          />

          <article className="mx-auto max-w-4xl">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
                {article.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {article.views.toLocaleString()} views
                </span>
              </div>
            </header>

            {/* Featured Image */}
            {article.image && (
              <div className="mb-8 overflow-hidden rounded-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Recommended Articles */}
          {recommendedArticles.length > 0 && (
            <div className="mx-auto mt-16 max-w-6xl">
              <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">Recommended Articles</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendedArticles.map((rec) => (
                  <NewsCard key={rec.id} article={rec} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

