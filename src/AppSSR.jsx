import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import ServicesPage from './pages/ServicesPage'
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
import AdminServices from './pages/admin/AdminServices'
import AdminSettings from './pages/admin/AdminSettings'
import AdminUsers from './pages/admin/AdminUsers'

// Components
import ProtectedRoute from './components/admin/ProtectedRoute'

function AppSSR() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="moradabad-news-theme">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/current-affairs" element={<CurrentAffairsPage />} />
        <Route path="/news/trending" element={<TrendingNewsPage />} />
        <Route path="/news/:category" element={<CategoryPage />} />
        <Route path="/news/:category/:slug" element={<ArticlePage />} />
        <Route path="/search" element={<SearchPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/posts" element={<ProtectedRoute><AdminPosts /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
        <Route path="/admin/careers" element={<ProtectedRoute><AdminCareers /></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute><AdminApplications /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        <Route path="/admin/headers" element={<ProtectedRoute><AdminHeaders /></ProtectedRoute>} />
        <Route path="/admin/videos" element={<ProtectedRoute><AdminVideos /></ProtectedRoute>} />
        <Route path="/admin/quiz" element={<ProtectedRoute><AdminQuiz /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default AppSSR
