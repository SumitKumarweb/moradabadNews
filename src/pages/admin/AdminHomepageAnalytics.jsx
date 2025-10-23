import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { getHomepageVisitorStats } from '../../lib/analytics-service'
import { 
  Home, 
  Users, 
  Eye, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Clock, 
  TrendingUp,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function AdminHomepageAnalytics() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30')

  const loadHomepageStats = async () => {
    setLoading(true)
    try {
      const data = await getHomepageVisitorStats(parseInt(selectedPeriod))
      setStats(data)
    } catch (error) {
      console.error('Error loading homepage stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHomepageStats()
  }, [selectedPeriod])

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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Homepage Visitor Analytics</h1>
            <p className="text-muted-foreground">Detailed analysis of homepage visitors and their behavior</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadHomepageStats} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Homepage Visitors</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.uniqueHomepageVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Unique visitors to homepage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Homepage Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalHomepagePageViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total homepage views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Views per Visitor</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.averagePageViewsPerVisitor}</div>
              <p className="text-xs text-muted-foreground">Engagement metric</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Returning Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.visitorConditions?.returningVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Repeat visitors</p>
            </CardContent>
          </Card>
        </div>

        {/* Visitor Conditions */}
        {stats?.visitorConditions && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Geographic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Visitors by Country
                </CardTitle>
                <CardDescription>Geographic distribution of homepage visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.visitorConditions.byCountry)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10)
                    .map(([country, count]) => (
                      <div key={country} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{country}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(count / stats.totalHomepagePageViews) * 100}%` }}
                            />
                          </div>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Visitors by Device</CardTitle>
                <CardDescription>Device types used by homepage visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.visitorConditions.byDevice)
                    .sort((a, b) => b[1] - a[1])
                    .map(([device, count]) => (
                      <div key={device} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded ${getDeviceColor(device)}`}>
                            {getDeviceIcon(device)}
                          </div>
                          <span className="font-medium capitalize">{device}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(count / stats.totalHomepagePageViews) * 100}%` }}
                            />
                          </div>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Browser Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Visitors by Browser</CardTitle>
                <CardDescription>Browser preferences of homepage visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.visitorConditions.byBrowser)
                    .sort((a, b) => b[1] - a[1])
                    .map(([browser, count]) => (
                      <div key={browser} className="flex items-center justify-between">
                        <span className="font-medium">{browser}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(count / stats.totalHomepagePageViews) * 100}%` }}
                            />
                          </div>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Time of Day Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Visitors by Time of Day
                </CardTitle>
                <CardDescription>When visitors access the homepage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.visitorConditions.byTimeOfDay)
                    .sort((a, b) => b[1] - a[1])
                    .map(([timeSlot, count]) => (
                      <div key={timeSlot} className="flex items-center justify-between">
                        <span className="font-medium">{timeSlot}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(count / stats.totalHomepagePageViews) * 100}%` }}
                            />
                          </div>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Referrer Analysis */}
        {stats?.visitorConditions?.byReferrer && (
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>How visitors found your homepage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Object.entries(stats.visitorConditions.byReferrer)
                  .sort((a, b) => b[1] - a[1])
                  .map(([source, count]) => (
                    <div key={source} className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-sm text-muted-foreground">{source}</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Visitor Type Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Engagement</CardTitle>
            <CardDescription>New vs returning visitor analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center p-6 border rounded-lg">
                <div className="text-3xl font-bold text-green-600">{stats?.visitorConditions?.newVisitors}</div>
                <div className="text-sm text-muted-foreground">New Visitors</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stats?.uniqueHomepageVisitors > 0 
                    ? `${((stats.visitorConditions.newVisitors / stats.uniqueHomepageVisitors) * 100).toFixed(1)}%`
                    : '0%'
                  } of total visitors
                </div>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{stats?.visitorConditions?.returningVisitors}</div>
                <div className="text-sm text-muted-foreground">Returning Visitors</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stats?.uniqueHomepageVisitors > 0 
                    ? `${((stats.visitorConditions.returningVisitors / stats.uniqueHomepageVisitors) * 100).toFixed(1)}%`
                    : '0%'
                  } of total visitors
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
