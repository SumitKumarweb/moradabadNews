import { TrendingUp } from "lucide-react"
import { NewsCard } from "@/components/NewsCard"

export function TrendingNews({ articles }) {
  if (articles.length === 0) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-red-600" />
        <h2 className="font-serif text-3xl font-bold text-foreground">Trending News</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

