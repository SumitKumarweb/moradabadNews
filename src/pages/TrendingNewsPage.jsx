import { useState, useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import BreadcrumbNav from '../components/BreadcrumbNav'
import { NewsCard } from '../components/NewsCard'
import SEO from '../components/SEO'
import { getTrendingArticles } from '../lib/firebase-service'
import { TrendingUp } from 'lucide-react'

export default function TrendingNewsPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      const data = await getTrendingArticles()
      setArticles(data)
      setLoading(false)
    }
    loadArticles()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Trending News"
        description="Most popular and trending stories right now. Stay updated with the hottest news from Moradabad, UP, India and around the world."
        keywords="trending news, popular news, viral news, hot news, most viewed news"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: "Trending News" }]} />

          <div className="mb-8 flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-red-600" />
            <div>
              <h1 className="font-serif text-4xl font-bold text-foreground">Trending News</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Most popular and trending stories right now
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : articles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              No trending articles available at the moment.
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

