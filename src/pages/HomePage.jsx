import { useState, useEffect, useRef, useCallback } from 'react'
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
  
  // Lazy loading states
  const [loadedSections, setLoadedSections] = useState({
    hero: false,
    trending: false,
    moradabad: false,
    up: false,
    india: false,
    video: false,
    global: false,
    cta: false,
    local: false
  })
  
  // Refs for intersection observer
  const sectionRefs = useRef({})
  const observerRef = useRef(null)

  // Track homepage visit
  useAnalytics({ pageType: 'home' })

  // Intersection Observer for lazy loading
  const setupIntersectionObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.dataset.section
            if (sectionName && !loadedSections[sectionName]) {
              setLoadedSections(prev => ({ ...prev, [sectionName]: true }))
              
              // Load data for specific section
              loadSectionData(sectionName)
            }
          }
        })
      },
      {
        rootMargin: '100px 0px', // Load 100px before section comes into view
        threshold: 0.1
      }
    )

    // Observe all section refs
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref)
      }
    })
  }, [loadedSections])

  // Load data for specific section
  const loadSectionData = useCallback(async (sectionName) => {
    try {
      switch (sectionName) {
        case 'trending':
          if (trendingArticles.length === 0) {
            const trending = await getTrendingArticles()
            setTrendingArticles(trending)
          }
          break
        case 'moradabad':
          if (moradabadNews.length === 0) {
            const moradabad = await getArticlesByCategory("moradabad")
            setMoradabadNews(moradabad.slice(0, 4))
          }
          break
        case 'up':
          if (upNews.length === 0) {
            const up = await getArticlesByCategory("up")
            setUpNews(up.slice(0, 4))
          }
          break
        case 'india':
          if (indiaNews.length === 0) {
            const india = await getArticlesByCategory("india")
            setIndiaNews(india.slice(0, 4))
          }
          break
        case 'video':
          if (!activeVideo) {
            const video = await getActiveVideo()
            setActiveVideo(video)
          }
          break
        case 'global':
          if (globalNews.length === 0) {
            const global = await getArticlesByCategory("global")
            setGlobalNews(global.slice(0, 4))
          }
          break
      }
    } catch (error) {
      console.error(`Error loading ${sectionName} data:`, error)
    }
  }, [trendingArticles.length, moradabadNews.length, upNews.length, indiaNews.length, activeVideo, globalNews.length])

  useEffect(() => {
    // Load only critical data first (hero section)
    loadCriticalData()
    
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
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Setup intersection observer when refs are ready
  useEffect(() => {
    if (Object.keys(sectionRefs.current).length > 0) {
      setupIntersectionObserver()
    }
  }, [setupIntersectionObserver])

  // Load only critical data for initial render
  async function loadCriticalData() {
    setLoading(true)
    try {
      // Load only hero section data and banners
      const [featured, banners] = await Promise.all([
        getFeaturedArticles(),
        getActiveHeaderBanners(),
      ])

      setFeaturedArticles(featured)
      setHeaderBanners(banners)
      
      // Mark hero section as loaded
      setLoadedSections(prev => ({ ...prev, hero: true }))
    } catch (error) {
      console.error("Error loading critical data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Legacy function for backward compatibility
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
        <HeroSection />
 

        {/* Enhanced Statistics Section */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Moradabad News in Numbers</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Your trusted source for local and regional news</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center group">
                <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl dark:shadow-slate-900/50 transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Daily Readers</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl dark:shadow-slate-900/50 transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Articles Daily</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl dark:shadow-slate-900/50 transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">News Updates</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl dark:shadow-slate-900/50 transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending News - Lazy Loaded */}
        <section 
          ref={el => sectionRefs.current.trending = el}
          data-section="trending"
          className="container mx-auto px-4 py-12"
        >
          {loadedSections.trending ? (
            trendingArticles.length > 0 ? (
              <TrendingNews articles={trendingArticles} />
            ) : (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading trending news...</p>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <div className="h-32 bg-muted/30 rounded-lg animate-pulse"></div>
            </div>
          )}
        </section>

        {/* Moradabad News - Lazy Loaded */}
        <section 
          ref={el => sectionRefs.current.moradabad = el}
          data-section="moradabad"
          className="container mx-auto px-4 py-12"
        >
          {loadedSections.moradabad ? (
            moradabadNews.length > 0 ? (
              <NewsByCategory
                title="Moradabad News"
                category="moradabad"
                articles={moradabadNews}
              />
            ) : (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading Moradabad news...</p>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <div className="h-32 bg-muted/30 rounded-lg animate-pulse"></div>
            </div>
          )}
        </section>

        {/* UP News - Lazy Loaded */}
        <section 
          ref={el => sectionRefs.current.up = el}
          data-section="up"
          className="bg-muted/30 py-12"
        >
          <div className="container mx-auto px-4">
            {loadedSections.up ? (
              upNews.length > 0 ? (
                <NewsByCategory 
                  title="UP News" 
                  category="up" 
                  articles={upNews} 
                />
              ) : (
                <div className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading UP news...</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <div className="h-32 bg-muted/30 rounded-lg animate-pulse"></div>
              </div>
            )}
          </div>
        </section>

        {/* India News - Lazy Loaded */}
        <section 
          ref={el => sectionRefs.current.india = el}
          data-section="india"
          className="container mx-auto px-4 py-12"
        >
          {loadedSections.india ? (
            indiaNews.length > 0 ? (
              <NewsByCategory 
                title="India News" 
                category="india" 
                articles={indiaNews} 
              />
            ) : (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading India news...</p>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <div className="h-32 bg-muted/30 rounded-lg animate-pulse"></div>
            </div>
          )}
        </section>

        {/* Video Section - Lazy Loaded */}
        <section 
          ref={el => sectionRefs.current.video = el}
          data-section="video"
          className="bg-muted/30 py-12"
        >
          <div className="container mx-auto px-4">
            {loadedSections.video ? (
              activeVideo ? (
                <VideoSection video={activeVideo} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No video content available</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <div className="h-32 bg-muted/30 rounded-lg animate-pulse"></div>
              </div>
            )}
          </div>
        </section>

        {/* Global News - Lazy Loaded */}
        <section 
          ref={el => sectionRefs.current.global = el}
          data-section="global"
          className="container mx-auto px-4 py-12"
        >
          {loadedSections.global ? (
            globalNews.length > 0 ? (
              <NewsByCategory 
                title="Global News" 
                category="global" 
                articles={globalNews} 
              />
            ) : (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading global news...</p>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <div className="h-32 bg-muted/30 rounded-lg animate-pulse"></div>
            </div>
          )}
        </section>

        {/* Call-to-Action Section - Lazy Loaded */}
        <section 
          ref={el => sectionRefs.current.cta = el}
          data-section="cta"
          className="bg-primary text-primary-foreground py-16"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Moradabad News</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest breaking news and updates delivered directly to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background/10 border border-primary-foreground/20 placeholder:text-primary-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </div>
        </section>

        {/* Local SEO Content - Lazy Loaded */}
        <section 
          ref={el => sectionRefs.current.local = el}
          data-section="local"
          className="py-16 bg-muted/30 dark:bg-slate-800/50"
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <MapPin className="h-5 w-5 text-primary" />
                    About Moradabad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground dark:text-slate-300">
                    Moradabad, known as the "Brass City of India," is a major industrial and commercial center in Uttar Pradesh. 
                    Our news coverage includes local politics, business developments, cultural events, and community updates 
                    that matter to the residents of Moradabad and surrounding areas.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <Newspaper className="h-5 w-5 text-primary" />
                    Our Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200">Local Politics</Badge>
                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200">Business News</Badge>
                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200">Education</Badge>
                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200">Health</Badge>
                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200">Sports</Badge>
                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200">Culture</Badge>
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
