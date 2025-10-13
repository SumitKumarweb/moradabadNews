import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { subscribeToAnalytics, getAnalyticsSummary, getTodayStats } from '../../lib/analytics-service'
import { Users, Eye, Activity, Globe, Smartphone, Monitor, Tablet, RefreshCw, Radio } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState([])
  const [summary, setSummary] = useState(null)
  const [todayStats, setTodayStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    limit: 100,
    country: '',
    deviceType: 'all',
  })

  const loadSummaryData = async () => {
    try {
      const [summaryData, todayData] = await Promise.all([
        getAnalyticsSummary(30),
        getTodayStats()
      ])
      setSummary(summaryData)
      setTodayStats(todayData)
    } catch (error) {
      console.error('Error loading summary:', error)
    }
  }

  // Real-time analytics listener
  useEffect(() => {
    setLoading(true)
    
    // Prepare filters, converting 'all' to empty string
    const preparedFilters = {
      ...filters,
      deviceType: filters.deviceType === 'all' ? '' : filters.deviceType
    }
    
    // Subscribe to real-time updates
    const unsubscribe = subscribeToAnalytics((data) => {
      setAnalytics(data)
      setLoading(false)
    }, preparedFilters)
    
    // Load summary data
    loadSummaryData()
    
    // Auto-refresh summary every 30 seconds
    const summaryInterval = setInterval(loadSummaryData, 30000)
    
    // Cleanup
    return () => {
      unsubscribe()
      clearInterval(summaryInterval)
    }
  }, [filters.limit, filters.deviceType, filters.country])

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'mobile': return <Smartphone className="h-4 w-4" />
      case 'tablet': return <Tablet className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  const getDeviceColor = (type) => {
    switch (type) {
      case 'mobile': return 'bg-blue-500'
      case 'tablet': return 'bg-purple-500'
      default: return 'bg-green-500'
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-muted-foreground">Track visitor activity and engagement</p>
              <Badge variant="outline" className="flex items-center gap-1">
                <Radio className="h-3 w-3 text-green-500 animate-pulse" />
                Live
              </Badge>
            </div>
          </div>
          <Button onClick={loadSummaryData} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Stats
          </Button>
        </div>

        {/* Today's Stats */}
        {todayStats && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Visitors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayStats.todayVisitors}</div>
                <p className="text-xs text-muted-foreground">Unique visitors today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayStats.todayPageViews}</div>
                <p className="text-xs text-muted-foreground">Total page views today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayStats.todaySessions}</div>
                <p className="text-xs text-muted-foreground">Browsing sessions today</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 30-Day Summary */}
        {summary && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.totalPageViews}</div>
                <p className="text-xs text-muted-foreground">{summary.period}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.uniqueVisitors}</div>
                <p className="text-xs text-muted-foreground">{summary.period}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Desktop Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.byDevice.desktop || 0}</div>
                <p className="text-xs text-muted-foreground">Desktop views</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Mobile Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.byDevice.mobile || 0}</div>
                <p className="text-xs text-muted-foreground">Mobile views</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Top Articles */}
        {summary && summary.topArticles && summary.topArticles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top Articles</CardTitle>
              <CardDescription>Most viewed articles in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summary.topArticles.map((article, index) => (
                  <div key={article.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                      <div>
                        <p className="font-medium text-sm">{article.title}</p>
                        <p className="text-xs text-muted-foreground">{article.views} views</p>
                      </div>
                    </div>
                    <Badge>{article.views}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Visitor Data</CardTitle>
            <CardDescription>Filter and search visitor activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Device Type</Label>
                <Select value={filters.deviceType} onValueChange={(value) => setFilters({ ...filters, deviceType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Devices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Devices</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Results Limit</Label>
                <Select value={filters.limit.toString()} onValueChange={(value) => setFilters({ ...filters, limit: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50 Results</SelectItem>
                    <SelectItem value="100">100 Results</SelectItem>
                    <SelectItem value="200">200 Results</SelectItem>
                    <SelectItem value="500">500 Results</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Country</Label>
                <Input
                  placeholder="e.g., India"
                  value={filters.country}
                  onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visitor Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Visitor Activity</CardTitle>
            <CardDescription>
              Showing {analytics.length} recent visitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : analytics.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No visitor data available yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Time</th>
                      <th className="p-3 text-left font-medium">IP</th>
                      <th className="p-3 text-left font-medium">Location</th>
                      <th className="p-3 text-left font-medium">Article</th>
                      <th className="p-3 text-left font-medium">Device</th>
                      <th className="p-3 text-left font-medium">Session ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.map((visit) => (
                      <tr key={visit.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">
                          <div className="text-xs text-muted-foreground">
                            {visit.timestamp ? formatDistanceToNow(new Date(visit.timestamp), { addSuffix: true }) : 'N/A'}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-mono text-xs">{visit.ip || 'N/A'}</div>
                          <div className="text-xs text-muted-foreground">Hash: {visit.ipHash?.substring(0, 8)}...</div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            <span className="font-medium">{visit.city}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{visit.country}</div>
                        </td>
                        <td className="p-3 max-w-xs">
                          {visit.articleTitle ? (
                            <div>
                              <div className="font-medium truncate">{visit.articleTitle}</div>
                              <div className="text-xs text-muted-foreground">ID: {visit.articleId}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs">{visit.pageUrl || 'Homepage'}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${getDeviceColor(visit.deviceType)}`}>
                              {getDeviceIcon(visit.deviceType)}
                            </div>
                            <div>
                              <div className="text-xs font-medium capitalize">{visit.deviceType}</div>
                              <div className="text-xs text-muted-foreground">{visit.browser}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-mono text-xs">{visit.sessionId?.substring(0, 20)}...</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Country Distribution */}
        {summary && Object.keys(summary.byCountry).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Visitors by Country</CardTitle>
              <CardDescription>Geographic distribution of visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(summary.byCountry)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 10)
                  .map(([country, count]) => (
                    <div key={country} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(count / summary.totalPageViews) * 100}%` }}
                          />
                        </div>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

