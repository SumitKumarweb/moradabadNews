import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { getAllArticles, getAllQuizQuestions, getQuizCompletionCount } from '../../lib/firebase-service'
import { getAnalyticsSummary, getTodayStats } from '../../lib/analytics-service'
import { FileText, TrendingUp, Eye, HelpCircle, CheckCircle2, Users, Home, Globe, Activity } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    trendingArticles: 0,
    totalViews: 0,
    totalQuizQuestions: 0,
    quizCompletions: 0,
    // Homepage visitor stats
    homepageVisitors: 0,
    todayHomepageVisitors: 0,
    totalVisitors: 0,
    todayVisitors: 0,
    todayPageViews: 0,
    todaySessions: 0,
  })

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      const [articles, quizQuestions, completionCount, analyticsSummary, todayStats] = await Promise.all([
        getAllArticles(),
        getAllQuizQuestions(),
        getQuizCompletionCount(),
        getAnalyticsSummary(30),
        getTodayStats()
      ])

      const totalViews = articles.reduce((sum, article) => sum + article.views, 0)
      const trendingCount = articles.filter((article) => article.isTrending).length

      // Calculate homepage visitors from analytics
      const homepageVisitors = analyticsSummary.uniqueVisitors || 0
      const todayHomepageVisitors = todayStats.todayVisitors || 0

      setStats({
        totalArticles: articles.length,
        trendingArticles: trendingCount,
        totalViews,
        totalQuizQuestions: quizQuestions.length,
        quizCompletions: completionCount,
        // Homepage visitor stats
        homepageVisitors,
        todayHomepageVisitors,
        totalVisitors: analyticsSummary.uniqueVisitors || 0,
        todayVisitors: todayStats.todayVisitors || 0,
        todayPageViews: todayStats.todayPageViews || 0,
        todaySessions: todayStats.todaySessions || 0,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your news website</p>
        </div>

        {/* Homepage Visitor Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Homepage Visitors</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.homepageVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Unique visitors today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayPageViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total page views today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todaySessions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Browsing sessions today</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArticles}</div>
              <p className="text-xs text-muted-foreground">Published articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trending</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.trendingArticles}</div>
              <p className="text-xs text-muted-foreground">Trending articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Article views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Questions</CardTitle>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuizQuestions}</div>
              <p className="text-xs text-muted-foreground">Current affairs quiz</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Completions</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.quizCompletions}</div>
              <p className="text-xs text-muted-foreground">Total completions</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Admin Panel</CardTitle>
            <CardDescription>Manage your news website content from here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use the sidebar to navigate between different sections. You can manage articles, categories, quiz questions,
              and site settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
