// Search results SEO component
import SEO from '../SEO'
import { 
  generateDynamicTitle, 
  generateDynamicDescription, 
  generateDynamicKeywords,
  generateOpenGraphData,
  generateTwitterCardData,
  generateStructuredData,
  generateRobotsContent
} from '../../lib/seo-utils'

export default function SearchSEO({ query, results = [], totalResults = 0 }) {
  const searchData = {
    query: query,
    title: `Search Results for "${query}"`,
    description: `Find the latest news and articles related to "${query}" on Moradabad News`,
    results: results,
    totalResults: totalResults,
    url: typeof window !== 'undefined' ? window.location.href : undefined
  }

  // Generate dynamic metadata
  const title = generateDynamicTitle(searchData, 'search')
  const description = generateDynamicDescription(searchData, 'search')
  const keywords = generateDynamicKeywords(searchData, 'search')
  
  // Generate Open Graph data
  const ogData = generateOpenGraphData(searchData, 'search')
  
  // Generate Twitter Card data
  const twitterData = generateTwitterCardData(searchData, 'search')
  
  // Generate structured data
  const structuredData = generateStructuredData(searchData, 'search')
  
  // Search pages should not be indexed
  const robots = generateRobotsContent('search', false)

  return (
    <SEO
      title={title}
      description={description}
      keywords={keywords}
      image="/images/search-og.jpg"
      url={searchData.url}
      type="website"
      noindex={true}
      structuredData={[structuredData]}
      // Additional search-specific props
      ogData={ogData}
      twitterData={twitterData}
    />
  )
}
