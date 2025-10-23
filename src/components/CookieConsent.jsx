import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { X, Cookie, Settings } from 'lucide-react'

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    advertising: false,
    functional: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      advertising: true,
      functional: true
    }
    localStorage.setItem('cookie-consent', JSON.stringify(allPreferences))
    setShowConsent(false)
    // Initialize analytics and ads
    initializeServices(allPreferences)
  }

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setShowConsent(false)
    setShowSettings(false)
    // Initialize services based on preferences
    initializeServices(preferences)
  }

  const handleRejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      advertising: false,
      functional: false
    }
    localStorage.setItem('cookie-consent', JSON.stringify(minimalPreferences))
    setShowConsent(false)
    setShowSettings(false)
  }

  const initializeServices = (prefs) => {
    if (prefs.analytics && typeof window !== 'undefined') {
      // Initialize Google Analytics
      window.gtag && window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }
    
    if (prefs.advertising && typeof window !== 'undefined') {
      // Initialize Google AdSense
      window.gtag && window.gtag('consent', 'update', {
        'ad_storage': 'granted'
      })
    }
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t">
      <Card className="mx-auto max-w-4xl">
        <CardContent className="p-6">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">We use cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    We use cookies to enhance your browsing experience, serve personalized content, 
                    and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                >
                  Reject All
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                >
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Cookie Preferences</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Necessary Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Required for the website to function properly.
                    </p>
                  </div>
                  <div className="bg-muted px-3 py-1 rounded text-sm text-muted-foreground">
                    Always Active
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <Button
                    variant={preferences.analytics ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                  >
                    {preferences.analytics ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Advertising Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Used to display relevant advertisements.
                    </p>
                  </div>
                  <Button
                    variant={preferences.advertising ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferences(prev => ({ ...prev, advertising: !prev.advertising }))}
                  >
                    {preferences.advertising ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Functional Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Remember your preferences and settings.
                    </p>
                  </div>
                  <Button
                    variant={preferences.functional ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferences(prev => ({ ...prev, functional: !prev.functional }))}
                  >
                    {preferences.functional ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleAcceptSelected}
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
