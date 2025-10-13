import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { NewsCard } from "@/components/NewsCard"
import { Button } from "@/components/ui/button"

export function NewsByCategory({ title, category, articles }) {
  if (articles.length === 0) return null

  const viewAllHref = `/news/${category}`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-bold text-foreground">{title}</h2>
        <Link to={viewAllHref}>
          <Button variant="ghost" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} compact />
        ))}
      </div>
    </div>
  )
}

