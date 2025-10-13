import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import CurrentAffairsPage from './pages/CurrentAffairsPage'
import TrendingNewsPage from './pages/TrendingNewsPage'
import CategoryPage from './pages/CategoryPage'
import ArticlePage from './pages/ArticlePage'
import NotFoundPage from './pages/NotFoundPage'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPosts from './pages/admin/AdminPosts'
import AdminCategories from './pages/admin/AdminCategories'
import AdminCareers from './pages/admin/AdminCareers'
import AdminApplications from './pages/admin/AdminApplications'
import AdminMessages from './pages/admin/AdminMessages'
import AdminHeaders from './pages/admin/AdminHeaders'
import AdminVideos from './pages/admin/AdminVideos'
import AdminQuiz from './pages/admin/AdminQuiz'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminSettings from './pages/admin/AdminSettings'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="moradabad-news-theme">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/current-affairs" element={<CurrentAffairsPage />} />
          <Route path="/news/trending" element={<TrendingNewsPage />} />
          <Route path="/news/:category" element={<CategoryPage />} />
          <Route path="/news/:category/:id" element={<ArticlePage />} />

          {/* Admin Routes */}
          <Route path="/nimda" element={<AdminLogin />} />
          <Route path="/nimda/dashboard" element={<AdminDashboard />} />
          <Route path="/nimda/posts" element={<AdminPosts />} />
          <Route path="/nimda/categories" element={<AdminCategories />} />
          <Route path="/nimda/careers" element={<AdminCareers />} />
          <Route path="/nimda/applications" element={<AdminApplications />} />
          <Route path="/nimda/messages" element={<AdminMessages />} />
          <Route path="/nimda/headers" element={<AdminHeaders />} />
          <Route path="/nimda/videos" element={<AdminVideos />} />
          <Route path="/nimda/quiz" element={<AdminQuiz />} />
          <Route path="/nimda/analytics" element={<AdminAnalytics />} />
          <Route path="/nimda/settings" element={<AdminSettings />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  )
}

export default App

