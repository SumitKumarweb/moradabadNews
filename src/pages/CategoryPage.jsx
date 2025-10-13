import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import BreadcrumbNav from '../components/BreadcrumbNav'
import { NewsCard } from '../components/NewsCard'
import SEO from '../components/SEO'
import { getArticlesByCategory } from '../lib/firebase-service'
import { Loader2 } from 'lucide-react'

const categoryNames = {
  moradabad: "Moradabad News",
  up: "UP News",
  india: "India News",
  global: "Global News",
  "current-affairs": "Current Affairs",
}

export default function CategoryPage() {
  const { category } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadArticles() {
      if (!isMounted) return
      setLoading(true)
      try {
        const data = await getArticlesByCategory(category)
        if (isMounted) {
          setArticles(data)
          setLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error loading articles:", error)
          setLoading(false)
        }
      }
    }

    if (category) {
      loadArticles()
    }

    return () => {
      isMounted = false
    }
  }, [category])

  const categoryName = categoryNames[category] || category

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

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={categoryName}
        description={`Latest updates and breaking stories from ${categoryName.toLowerCase()}. Stay informed with the most recent news and developments.`}
        keywords={`${categoryName}, latest news, breaking news, updates, ${category} news`}
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: categoryName, href: `/news/${category}` }]} />

          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground">{categoryName}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Latest updates and breaking stories from {categoryName.toLowerCase()}
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              No articles available in this category.
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

