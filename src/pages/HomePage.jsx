import { useState, useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSection } from '../components/HeroSection'
import { TrendingNews } from '../components/TrendingNews'
import { NewsByCategory } from '../components/NewsByCategory'
import { VideoSection } from '../components/VideoSection'
import { HeaderBanner } from '../components/HeaderBanner'
import SEO from '../components/SEO'
import useAnalytics from '../hooks/use-analytics'
import { 
  getFeaturedArticles, 
  getTrendingArticles,
  getArticlesByCategory,
  getActiveVideo,
  getActiveHeaderBanners,
} from '../lib/firebase-service'
import { Loader2 } from 'lucide-react'

export default function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState([])
  const [trendingArticles, setTrendingArticles] = useState([])
  const [moradabadNews, setMoradabadNews] = useState([])
  const [upNews, setUpNews] = useState([])
  const [indiaNews, setIndiaNews] = useState([])
  const [globalNews, setGlobalNews] = useState([])
  const [activeVideo, setActiveVideo] = useState(null)
  const [headerBanners, setHeaderBanners] = useState([])
  const [loading, setLoading] = useState(true)

  // Track homepage visit
  useAnalytics({ pageType: 'home' })

  useEffect(() => {
    loadAllData()
  }, [])

  async function loadAllData() {
    setLoading(true)
    try {
      const [featured, trending, moradabad, up, india, global, video, banners] = await Promise.all([
        getFeaturedArticles(),
        getTrendingArticles(),
        getArticlesByCategory("moradabad"),
        getArticlesByCategory("up"),
        getArticlesByCategory("india"),
        getArticlesByCategory("global"),
        getActiveVideo(),
        getActiveHeaderBanners(),
      ])

      setFeaturedArticles(featured)
      setTrendingArticles(trending)
      setMoradabadNews(moradabad.slice(0, 4))
      setUpNews(up.slice(0, 4))
      setIndiaNews(india.slice(0, 4))
      setGlobalNews(global.slice(0, 4))
      setActiveVideo(video)
      setHeaderBanners(banners)
    } catch (error) {
      console.error("Error loading homepage data:", error)
    } finally {
      setLoading(false)
    }
  }

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
      <SEO />
      {headerBanners.length > 0 && <HeaderBanner banners={headerBanners} />}
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section with Featured News */}
        {featuredArticles.length > 0 && <HeroSection articles={featuredArticles} />}

        {/* Trending News */}
        {trendingArticles.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <TrendingNews articles={trendingArticles} />
          </section>
        )}

        {/* Moradabad News */}
        {moradabadNews.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <NewsByCategory
              title="Moradabad News"
              category="moradabad"
              articles={moradabadNews}
            />
          </section>
        )}

        {/* UP News */}
        {upNews.length > 0 && (
          <section className="bg-muted/30 py-12">
            <div className="container mx-auto px-4">
              <NewsByCategory 
                title="UP News" 
                category="up" 
                articles={upNews} 
              />
            </div>
          </section>
        )}

        {/* India News */}
        {indiaNews.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <NewsByCategory 
              title="India News" 
              category="india" 
              articles={indiaNews} 
            />
          </section>
        )}

        {/* Video Section - Controlled by Firebase */}
        {activeVideo && (
          <section className="bg-muted/30 py-12">
            <div className="container mx-auto px-4">
              <VideoSection video={activeVideo} />
            </div>
          </section>
        )}

        {/* Global News */}
        {globalNews.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <NewsByCategory 
              title="Global News" 
              category="global" 
              articles={globalNews} 
            />
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
