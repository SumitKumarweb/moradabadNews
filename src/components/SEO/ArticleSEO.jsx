// Article-specific SEO component
import SEO from '../SEO'
import { 
  generateDynamicTitle, 
  generateDynamicDescription, 
  generateDynamicKeywords,
  generateOpenGraphData,
  generateTwitterCardData,
  generateStructuredData,
  generateBreadcrumbData,
  generateRobotsContent
} from '../../lib/seo-utils'

export default function ArticleSEO({ article, breadcrumbs = [] }) {
  if (!article) return null

  const articleData = {
    title: article.title,
    excerpt: article.summary || article.excerpt,
    content: article.content,
    category: article.category,
    tags: article.tags || [],
    author: article.author,
    publishedAt: article.publishedAt,
    modifiedAt: article.modifiedAt,
    image: article.image,
    url: typeof window !== 'undefined' ? window.location.href : undefined
  }

  // Generate dynamic metadata
  const title = generateDynamicTitle(articleData, 'article')
  const description = generateDynamicDescription(articleData, 'article')
  const keywords = generateDynamicKeywords(articleData, 'article')
  
  // Generate Open Graph data
  const ogData = generateOpenGraphData(articleData, 'article')
  
  // Generate Twitter Card data
  const twitterData = generateTwitterCardData(articleData, 'article')
  
  // Generate structured data
  const structuredData = generateStructuredData(articleData, 'article')
  
  // Generate breadcrumb structured data
  const breadcrumbData = breadcrumbs.length > 0 ? generateBreadcrumbData(breadcrumbs) : null
  
  // Combine all structured data
  const allStructuredData = breadcrumbData ? [structuredData, breadcrumbData] : [structuredData]

  return (
    <SEO
      title={title}
      description={description}
      keywords={keywords}
      image={articleData.image}
      url={articleData.url}
      type="article"
      author={articleData.author}
      publishedTime={articleData.publishedAt}
      modifiedTime={articleData.modifiedAt}
      category={articleData.category}
      tags={articleData.tags}
      structuredData={allStructuredData}
      // Additional article-specific props
      ogData={ogData}
      twitterData={twitterData}
    />
  )
}
