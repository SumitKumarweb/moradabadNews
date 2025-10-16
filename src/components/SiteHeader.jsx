import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, Moon, Sun, Search, User } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const navItems = [
  { name: "Home", to: "/", keywords: "Moradabad news homepage, latest news" },
  { name: "Moradabad News", to: "/news/moradabad", keywords: "Moradabad local news, city news" },
  { name: "UP News", to: "/news/up", keywords: "Uttar Pradesh news, UP current affairs" },
  { name: "India News", to: "/news/india", keywords: "India breaking news, national news" },
  { name: "Global News", to: "/news/global", keywords: "world news, international news" },
  { name: "Current Affairs", to: "/current-affairs", keywords: "current affairs, trending topics" },
  { name: "Services", to: "/services", keywords: "digital services, library management, business solutions" },
  { name: "Careers", to: "/careers", keywords: "jobs Moradabad, career opportunities" },
  { name: "About", to: "/about", keywords: "about Moradabad News, our mission" },
  { name: "Contact", to: "/contact", keywords: "contact us, get in touch" },
]

// Quick search suggestions
const quickSearchItems = [
  { name: "Breaking News", query: "breaking news" },
  { name: "Weather", query: "weather" },
  { name: "Politics", query: "politics" },
  { name: "Business", query: "business" },
  { name: "Sports", query: "sports" },
  { name: "Education", query: "education" }
]

export function SiteHeader() {
  const { setTheme, theme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleTheme = () => {
    // Get current effective theme
    const currentTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme

    // Toggle to opposite theme
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results page using React Router
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false) // Close mobile search if open
    }
  }

  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo with enhanced branding */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">MN</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Moradabad News
            </span>
            <span className="text-xs text-muted-foreground hidden sm:block">
              Latest News & Updates
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with enhanced UX */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.slice(0, 6).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive(item.to)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item.keywords}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pr-10"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Search Button - Mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 md:hidden" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            title="Search"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>


          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9" 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'light' : 'dark'} mode`}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                        isActive(item.to)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Quick Search */}
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-semibold mb-3">Quick Search</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {quickSearchItems.map((item) => (
                      <Button
                        key={item.query}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(item.query)
                          navigate(`/search?q=${encodeURIComponent(item.query)}`)
                        }}
                        className="text-xs justify-start"
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button className="flex-1">
                    Subscribe
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button type="submit" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </header>
  )
}

