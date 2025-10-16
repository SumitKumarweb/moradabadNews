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
import SearchPage from './pages/SearchPage'
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
import AdminUsers from './pages/admin/AdminUsers'

// Components
import ProtectedRoute from './components/admin/ProtectedRoute'

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
          <Route path="/news/:category/:slug" element={<ArticlePage />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Admin Routes */}
          <Route path="/nimda" element={<AdminLogin />} />
          <Route path="/nimda/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/nimda/posts" element={<ProtectedRoute><AdminPosts /></ProtectedRoute>} />
          <Route path="/nimda/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
          <Route path="/nimda/careers" element={<ProtectedRoute><AdminCareers /></ProtectedRoute>} />
          <Route path="/nimda/applications" element={<ProtectedRoute><AdminApplications /></ProtectedRoute>} />
          <Route path="/nimda/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
          <Route path="/nimda/headers" element={<ProtectedRoute><AdminHeaders /></ProtectedRoute>} />
          <Route path="/nimda/videos" element={<ProtectedRoute><AdminVideos /></ProtectedRoute>} />
          <Route path="/nimda/quiz" element={<ProtectedRoute><AdminQuiz /></ProtectedRoute>} />
          <Route path="/nimda/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/nimda/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
          <Route path="/nimda/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  )
}

export default App

