import { useState, useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSection } from '../components/HeroSection'
import { TrendingNews } from '../components/TrendingNews'
import { NewsByCategory } from '../components/NewsByCategory'
import { VideoSection } from '../components/VideoSection'
import { HeaderBanner } from '../components/HeaderBanner'
import SEO from '../components/SEO'
import StaticSEO from '../components/SEO/StaticSEO'
import LocalSEO from '../components/LocalSEO'
import useAnalytics from '../hooks/use-analytics'
import googleAnalytics from '../lib/google-analytics'
import performanceOptimizer from '../lib/performance-optimization'
import searchIntegration from '../lib/search-integration'
import { 
  getFeaturedArticles, 
  getTrendingArticles,
  getArticlesByCategory,
  getActiveVideo,
  getActiveHeaderBanners,
} from '../lib/firebase-service'
import { Loader2, TrendingUp, Users, Eye, Clock, Star, ArrowRight, Newspaper, Globe, MapPin } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

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
    
    // Initialize performance optimizations
    performanceOptimizer.init()
    
    // Track page view with Google Analytics
    googleAnalytics.trackPageView({
      page_title: 'Moradabad News - Latest News from Moradabad, UP, India',
      page_path: '/',
      content_group1: 'Homepage',
      content_group2: 'Main'
    })
    
    // Initialize search integration for real-time updates
    searchIntegration.startListening()
    
    // Track scroll depth
    let maxScroll = 0
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        if (maxScroll % 25 === 0) { // Track every 25%
          googleAnalytics.trackScrollDepth(maxScroll)
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Track time on page
    const startTime = Date.now()
    const trackTimeOnPage = () => {
      const timeSpent = (Date.now() - startTime) / 1000
      googleAnalytics.trackTimeOnPage(timeSpent)
    }
    
    // Track time when user leaves page
    window.addEventListener('beforeunload', trackTimeOnPage)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', trackTimeOnPage)
    }
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
      {/* Static SEO for server-side rendering */}
      <StaticSEO
        title="Moradabad News - Latest Breaking News from Moradabad, UP, India"
        description="Get the latest breaking news, current affairs, and updates from Moradabad, Uttar Pradesh, India. Your trusted source for local news, politics, business, and community events in Moradabad."
        keywords="Moradabad news, UP news, breaking news Moradabad, Moradabad current affairs, local news Moradabad, Uttar Pradesh news, Moradabad politics, Moradabad business news"
        type="website"
        category="news"
        tags={["Moradabad", "UP", "India", "breaking news", "current affairs"]}
        url="/"
      />
      
      {/* Dynamic SEO for client-side */}
      <SEO 
        title="Moradabad News - Latest Breaking News from Moradabad, UP, India"
        description="Get the latest breaking news, current affairs, and updates from Moradabad, Uttar Pradesh, India. Your trusted source for local news, politics, business, and community events in Moradabad."
        keywords="Moradabad news, UP news, breaking news Moradabad, Moradabad current affairs, local news Moradabad, Uttar Pradesh news, Moradabad politics, Moradabad business news"
        type="website"
        category="news"
        tags={["Moradabad", "UP", "India", "breaking news", "current affairs"]}
      />
      <LocalSEO />
      
      {headerBanners.length > 0 && <HeaderBanner banners={headerBanners} />}
      <SiteHeader />
      
      <main className="flex-1" id="main-content">
        {/* Hero Section with Featured and Recent News */}
        <HeroSection articles={[...featuredArticles, ...trendingArticles]} />

        {/* Statistics Section */}
        <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Daily Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Articles Daily</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">News Updates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

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

        {/* Call-to-Action Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Moradabad News</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest breaking news and updates delivered directly to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
                style={{ color: 'black' }}
              />
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </div>
        </section>

        {/* Local SEO Content */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    About Moradabad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Moradabad, known as the "Brass City of India," is a major industrial and commercial center in Uttar Pradesh. 
                    Our news coverage includes local politics, business developments, cultural events, and community updates 
                    that matter to the residents of Moradabad and surrounding areas.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" />
                    Our Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="secondary">Local Politics</Badge>
                    <Badge variant="secondary">Business News</Badge>
                    <Badge variant="secondary">Education</Badge>
                    <Badge variant="secondary">Health</Badge>
                    <Badge variant="secondary">Sports</Badge>
                    <Badge variant="secondary">Culture</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <SiteFooter />
    </div>
  )
}
