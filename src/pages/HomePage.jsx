import { useState, useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSection } from '../components/HeroSection'
import { TrendingNews } from '../components/TrendingNews'
import { NewsByCategory } from '../components/NewsByCategory'
import { VideoSection } from '../components/VideoSection'
import { HeaderBanner } from '../components/HeaderBanner'
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
      
      {headerBanners.length > 0 && <HeaderBanner banners={headerBanners} />}
      <SiteHeader />
      
      <main className="flex-1" id="main-content">
        {/* Hero Section with Featured and Recent News */}
        <HeroSection articles={[...featuredArticles, ...trendingArticles]} exculdeTrendingArticle={[ ...moradabadNews , ...upNews , ...indiaNews , ...globalNews]}/>
 

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
                className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background/10 border border-primary-foreground/20 placeholder:text-primary-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </div>
        </section>

        {/* Local SEO Content */}
        <section className="py-16 bg-muted/30 dark:bg-slate-800/50">
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
