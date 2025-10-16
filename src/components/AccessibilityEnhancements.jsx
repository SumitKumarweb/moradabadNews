import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Type, 
  Contrast, 
  ZoomIn, 
  ZoomOut,
  RotateCcw,
  Settings,
  Accessibility
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { Label } from './ui/label'

export default function AccessibilityEnhancements() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: false,
    focusIndicator: true,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0,
    colorBlind: 'none'
  })

  // Apply accessibility settings
  useEffect(() => {
    const root = document.documentElement
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Large text mode
    if (settings.largeText) {
      root.style.fontSize = '18px'
    } else {
      root.style.fontSize = '16px'
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms')
      root.style.setProperty('--animation-iteration-count', '1')
    } else {
      root.style.removeProperty('--animation-duration')
      root.style.removeProperty('--animation-iteration-count')
    }
    
    // Screen reader optimizations
    if (settings.screenReader) {
      root.classList.add('screen-reader-optimized')
    } else {
      root.classList.remove('screen-reader-optimized')
    }
    
    // Keyboard navigation
    if (settings.keyboardNavigation) {
      root.classList.add('keyboard-navigation')
    } else {
      root.classList.remove('keyboard-navigation')
    }
    
    // Focus indicators
    if (settings.focusIndicator) {
      root.classList.add('focus-indicators')
    } else {
      root.classList.remove('focus-indicators')
    }
    
    // Font size
    root.style.setProperty('--base-font-size', `${settings.fontSize}px`)
    
    // Line height
    root.style.setProperty('--line-height', settings.lineHeight.toString())
    
    // Letter spacing
    root.style.setProperty('--letter-spacing', `${settings.letterSpacing}px`)
    
    // Color blind support
    if (settings.colorBlind !== 'none') {
      root.classList.add(`colorblind-${settings.colorBlind}`)
    } else {
      root.classList.remove('colorblind-protanopia', 'colorblind-deuteranopia', 'colorblind-tritanopia')
    }
    
  }, [settings])

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!settings.keyboardNavigation) return
      
      // Skip to main content
      if (e.key === 'Tab' && e.ctrlKey) {
        e.preventDefault()
        const main = document.querySelector('main')
        if (main) main.focus()
      }
      
      // Skip to navigation
      if (e.key === 'Tab' && e.shiftKey && e.ctrlKey) {
        e.preventDefault()
        const nav = document.querySelector('nav')
        if (nav) nav.focus()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [settings.keyboardNavigation])

  // Announce page changes to screen readers
  useEffect(() => {
    if (settings.screenReader) {
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.id = 'page-announcement'
      document.body.appendChild(announcement)
      
      return () => {
        const existing = document.getElementById('page-announcement')
        if (existing) existing.remove()
      }
    }
  }, [settings.screenReader])

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings({
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: false,
      focusIndicator: true,
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: 0,
      colorBlind: 'none'
    })
  }

  return (
    <>
      {/* Accessibility Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 bg-background/95 backdrop-blur shadow-lg"
        onClick={() => setIsOpen(true)}
        title="Accessibility Options"
        aria-label="Open accessibility options"
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {/* Accessibility Panel */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-96">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              Accessibility Options
            </SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 mt-6">
            {/* Visual Enhancements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Visual Enhancements</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="flex items-center gap-2">
                    <Contrast className="h-4 w-4" />
                    High Contrast Mode
                  </Label>
                  <Switch
                    id="high-contrast"
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="large-text" className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Large Text
                  </Label>
                  <Switch
                    id="large-text"
                    checked={settings.largeText}
                    onCheckedChange={(checked) => updateSetting('largeText', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="focus-indicator" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Enhanced Focus Indicators
                  </Label>
                  <Switch
                    id="focus-indicator"
                    checked={settings.focusIndicator}
                    onCheckedChange={(checked) => updateSetting('focusIndicator', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Motion & Animation */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Motion & Animation</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduced-motion" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reduce Motion
                  </Label>
                  <Switch
                    id="reduced-motion"
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Typography</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="font-size" className="flex items-center gap-2 mb-2">
                    <ZoomIn className="h-4 w-4" />
                    Font Size: {settings.fontSize}px
                  </Label>
                  <Slider
                    id="font-size"
                    min={12}
                    max={24}
                    step={1}
                    value={[settings.fontSize]}
                    onValueChange={([value]) => updateSetting('fontSize', value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="line-height" className="flex items-center gap-2 mb-2">
                    Line Height: {settings.lineHeight}
                  </Label>
                  <Slider
                    id="line-height"
                    min={1.2}
                    max={2.0}
                    step={0.1}
                    value={[settings.lineHeight]}
                    onValueChange={([value]) => updateSetting('lineHeight', value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="letter-spacing" className="flex items-center gap-2 mb-2">
                    Letter Spacing: {settings.letterSpacing}px
                  </Label>
                  <Slider
                    id="letter-spacing"
                    min={-1}
                    max={3}
                    step={0.1}
                    value={[settings.letterSpacing]}
                    onValueChange={([value]) => updateSetting('letterSpacing', value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Navigation</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="keyboard-nav" className="flex items-center gap-2">
                    Keyboard Navigation
                  </Label>
                  <Switch
                    id="keyboard-nav"
                    checked={settings.keyboardNavigation}
                    onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="screen-reader" className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Screen Reader Optimized
                  </Label>
                  <Switch
                    id="screen-reader"
                    checked={settings.screenReader}
                    onCheckedChange={(checked) => updateSetting('screenReader', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Color Blind Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Color Vision</h3>
              
              <div>
                <Label htmlFor="color-blind" className="mb-2 block">
                  Color Blind Support
                </Label>
                <select
                  id="color-blind"
                  value={settings.colorBlind}
                  onChange={(e) => updateSetting('colorBlind', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="none">None</option>
                  <option value="protanopia">Protanopia (Red-blind)</option>
                  <option value="deuteranopia">Deuteranopia (Green-blind)</option>
                  <option value="tritanopia">Tritanopia (Blue-blind)</option>
                </select>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                onClick={resetSettings}
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Skip Links for Screen Readers */}
      {settings.screenReader && (
        <div className="sr-only">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <a href="#navigation" className="skip-link">
            Skip to navigation
          </a>
          <a href="#footer" className="skip-link">
            Skip to footer
          </a>
        </div>
      )}
    </>
  )
}
