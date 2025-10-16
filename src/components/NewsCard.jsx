import { Link } from "react-router-dom"
import { Clock, Eye } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { generateArticleUrl } from "../lib/utils"

export function NewsCard({ article, compact = false }) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={generateArticleUrl(article)}>
        <CardHeader className="p-0">
          <div className={`relative overflow-hidden ${compact ? "h-48" : "h-56"}`}>
            <img
              src={article.image || "/placeholder.svg?height=300&width=400"}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {article.isTrending && (
              <Badge className="absolute right-2 top-2 bg-red-600 hover:bg-red-700">Trending</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="capitalize">
              {article.category.replace("-", " ")}
            </Badge>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
          </div>

          <h3
            className={`font-serif font-bold leading-tight text-foreground group-hover:text-red-600 transition-colors ${compact ? "text-lg line-clamp-2" : "text-xl line-clamp-3"}`}
          >
            {article.title}
          </h3>

          {!compact && <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{article.summary}</p>}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <span>By {article.author}</span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {article.views.toLocaleString()}
          </span>
        </CardFooter>
      </Link>
    </Card>
  )
}

