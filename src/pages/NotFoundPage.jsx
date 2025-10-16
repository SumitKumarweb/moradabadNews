import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { Home, Newspaper } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 leading-none">
                404
              </h1>
            </div>

            {/* Error Message */}
            <div className="mb-8 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Sorry, we couldn't find the page you're looking for. The article may have been moved or deleted.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                to="/" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Home className="h-5 w-5" />
                Go to Homepage
              </Link>
              <Link 
                to="/news/moradabad" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-input bg-transparent rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Newspaper className="h-5 w-5" />
                Browse News
              </Link>
            </div>

            {/* Quick Links */}
            <div className="w-full border-t pt-8">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/news/moradabad" className="text-sm hover:text-primary transition-colors">
                  Moradabad News
                </Link>
                <Link to="/news/up" className="text-sm hover:text-primary transition-colors">
                  UP News
                </Link>
                <Link to="/news/india" className="text-sm hover:text-primary transition-colors">
                  India News
                </Link>
                <Link to="/news/global" className="text-sm hover:text-primary transition-colors">
                  Global News
                </Link>
                <Link to="/news/trending" className="text-sm hover:text-primary transition-colors">
                  Trending
                </Link>
                <Link to="/current-affairs" className="text-sm hover:text-primary transition-colors">
                  Current Affairs
                </Link>
                <Link to="/about" className="text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/services" className="text-sm hover:text-primary transition-colors">Services</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

