// Category-specific SEO component
import SEO from '../SEO'
import { 
  generateDynamicTitle, 
  generateDynamicDescription, 
  generateDynamicKeywords,
  generateOpenGraphData,
  generateTwitterCardData,
  generateStructuredData,
  generateBreadcrumbData
} from '../../lib/seo-utils'

export default function CategorySEO({ category, articles = [], breadcrumbs = [] }) {
  if (!category) return null

  const categoryData = {
    category: category,
    title: `${category} News`,
    description: `Latest ${category} news from Moradabad, UP, India`,
    articles: articles,
    url: typeof window !== 'undefined' ? window.location.href : undefined
  }

  // Generate dynamic metadata
  const title = generateDynamicTitle(categoryData, 'category')
  const description = generateDynamicDescription(categoryData, 'category')
  const keywords = generateDynamicKeywords(categoryData, 'category')
  
  // Generate Open Graph data
  const ogData = generateOpenGraphData(categoryData, 'category')
  
  // Generate Twitter Card data
  const twitterData = generateTwitterCardData(categoryData, 'category')
  
  // Generate structured data
  const structuredData = generateStructuredData(categoryData, 'category')
  
  // Generate breadcrumb structured data
  const breadcrumbData = breadcrumbs.length > 0 ? generateBreadcrumbData(breadcrumbs) : null
  
  // Combine all structured data
  const allStructuredData = breadcrumbData ? [structuredData, breadcrumbData] : [structuredData]

  return (
    <SEO
      title={title}
      description={description}
      keywords={keywords}
      image={`/images/categories/${category}.jpg`}
      url={categoryData.url}
      type="website"
      category={category}
      structuredData={allStructuredData}
      // Additional category-specific props
      ogData={ogData}
      twitterData={twitterData}
    />
  )
}
