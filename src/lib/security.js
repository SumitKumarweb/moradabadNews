// Security Enhancement Service
class SecurityEnhancer {
  constructor() {
    this.cspViolations = []
    this.securityHeaders = {
      'Content-Security-Policy': this.generateCSP(),
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': this.generatePermissionsPolicy(),
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    }
  }

  // Initialize security measures
  init() {
    this.setupCSPReporting()
    this.setupSecurityHeaders()
    this.setupInputSanitization()
    this.setupXSSProtection()
    this.setupCSRFProtection()
    this.setupRateLimiting()
    this.setupSecureStorage()
    this.setupContentValidation()
  }

  // Generate Content Security Policy
  generateCSP() {
    const isProduction = import.meta.env.PROD
    const baseUrl = window.location.origin
    
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self' https:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://firebase.googleapis.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      isProduction ? "upgrade-insecure-requests" : "",
      "block-all-mixed-content"
    ].filter(Boolean).join('; ')
  }

  // Generate Permissions Policy
  generatePermissionsPolicy() {
    return [
      'camera=()',
      'microphone=()',
      'geolocation=(self)',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()',
      'ambient-light-sensor=()',
      'autoplay=()',
      'battery=()',
      'bluetooth=()',
      'display-capture=()',
      'document-domain=()',
      'encrypted-media=()',
      'fullscreen=(self)',
      'gamepad=()',
      'midi=()',
      'notifications=()',
      'persistent-storage=()',
      'picture-in-picture=()',
      'publickey-credentials-get=()',
      'screen-wake-lock=()',
      'speaker-selection=()',
      'sync-xhr=()',
      'unoptimized-images=()',
      'unsized-media=()',
      'vertical-scroll=()',
      'web-share=()',
      'xr-spatial-tracking=()'
    ].join(', ')
  }

  // Setup CSP violation reporting
  setupCSPReporting() {
    if (typeof window === 'undefined') return

    // Report CSP violations
    document.addEventListener('securitypolicyviolation', (event) => {
      const violation = {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy,
        sourceFile: event.sourceFile,
        lineNumber: event.lineNumber,
        columnNumber: event.columnNumber,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }

      this.cspViolations.push(violation)
      
      // Send to analytics (in production)
      if (import.meta.env.PROD) {
        this.reportSecurityViolation('CSP', violation)
      }
    })
  }

  // Setup security headers
  setupSecurityHeaders() {
    // Note: In a real application, these would be set by the server
    // This is for client-side security enhancements
    console.log('Security headers configured:', this.securityHeaders)
  }

  // Setup input sanitization
  setupInputSanitization() {
    // Sanitize user inputs
    const originalCreateElement = document.createElement
    document.createElement = function(tagName) {
      const element = originalCreateElement.call(this, tagName)
      
      // Add input sanitization for form elements
      if (['input', 'textarea', 'select'].includes(tagName.toLowerCase())) {
        element.addEventListener('input', (event) => {
          this.sanitizeInput(event.target)
        })
      }
      
      return element
    }
  }

  // Sanitize input values
  sanitizeInput(input) {
    if (!input.value) return

    // Remove potentially dangerous characters
    const sanitized = input.value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/<iframe\b[^>]*>/gi, '') // Remove iframe tags
      .replace(/<object\b[^>]*>/gi, '') // Remove object tags
      .replace(/<embed\b[^>]*>/gi, '') // Remove embed tags
      .replace(/<link\b[^>]*>/gi, '') // Remove link tags
      .replace(/<meta\b[^>]*>/gi, '') // Remove meta tags
      .trim()

    if (sanitized !== input.value) {
      input.value = sanitized
      console.warn('Input sanitized:', input.name || input.id)
    }
  }

  // Setup XSS protection
  setupXSSProtection() {
    // Escape HTML in text content
    const escapeHTML = (text) => {
      const div = document.createElement('div')
      div.textContent = text
      return div.innerHTML
    }

    // Override innerHTML to prevent XSS
    const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML')
    Object.defineProperty(Element.prototype, 'innerHTML', {
      set: function(value) {
        // Only allow safe HTML or escape it
        if (this.dataset.allowHtml === 'true') {
          originalInnerHTML.set.call(this, value)
        } else {
          originalInnerHTML.set.call(this, escapeHTML(value))
        }
      },
      get: originalInnerHTML.get
    })
  }

  // Setup CSRF protection
  setupCSRFProtection() {
    // Generate CSRF token
    const csrfToken = this.generateCSRFToken()
    sessionStorage.setItem('csrf-token', csrfToken)

    // Add CSRF token to all forms
    document.addEventListener('DOMContentLoaded', () => {
      const forms = document.querySelectorAll('form')
      forms.forEach(form => {
        if (!form.querySelector('input[name="csrf-token"]')) {
          const csrfInput = document.createElement('input')
          csrfInput.type = 'hidden'
          csrfInput.name = 'csrf-token'
          csrfInput.value = csrfToken
          form.appendChild(csrfInput)
        }
      })
    })

    // Validate CSRF token on form submission
    document.addEventListener('submit', (event) => {
      const form = event.target
      const csrfInput = form.querySelector('input[name="csrf-token"]')
      const storedToken = sessionStorage.getItem('csrf-token')
      
      if (csrfInput && csrfInput.value !== storedToken) {
        event.preventDefault()
        console.error('CSRF token mismatch')
        this.reportSecurityViolation('CSRF', { form: form.action })
      }
    })
  }

  // Generate CSRF token
  generateCSRFToken() {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  // Setup rate limiting
  setupRateLimiting() {
    const rateLimits = new Map()
    const maxRequests = 100 // per minute
    const timeWindow = 60000 // 1 minute

    // Track requests
    const trackRequest = (endpoint) => {
      const now = Date.now()
      const key = `${endpoint}-${Math.floor(now / timeWindow)}`
      
      if (!rateLimits.has(key)) {
        rateLimits.set(key, 0)
      }
      
      const count = rateLimits.get(key) + 1
      rateLimits.set(key, count)
      
      if (count > maxRequests) {
        this.reportSecurityViolation('RATE_LIMIT', { endpoint, count })
        return false
      }
      
      return true
    }

    // Override fetch to add rate limiting
    const originalFetch = window.fetch
    window.fetch = async (url, options = {}) => {
      if (!trackRequest(url)) {
        throw new Error('Rate limit exceeded')
      }
      return originalFetch(url, options)
    }
  }

  // Setup secure storage
  setupSecureStorage() {
    // Encrypt sensitive data before storing
    const encrypt = async (data) => {
      const key = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      )
      
      const iv = crypto.getRandomValues(new Uint8Array(12))
      const encoded = new TextEncoder().encode(JSON.stringify(data))
      
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoded
      )
      
      return {
        encrypted: Array.from(new Uint8Array(encrypted)),
        iv: Array.from(iv),
        key: await crypto.subtle.exportKey('raw', key)
      }
    }

    // Decrypt data after retrieval
    const decrypt = async (encryptedData) => {
      const key = await crypto.subtle.importKey(
        'raw',
        new Uint8Array(encryptedData.key),
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      )
      
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(encryptedData.iv) },
        key,
        new Uint8Array(encryptedData.encrypted)
      )
      
      return JSON.parse(new TextDecoder().decode(decrypted))
    }

    // Secure storage wrapper
    window.secureStorage = {
      setItem: async (key, value) => {
        const encrypted = await encrypt(value)
        localStorage.setItem(key, JSON.stringify(encrypted))
      },
      
      getItem: async (key) => {
        const encrypted = localStorage.getItem(key)
        if (!encrypted) return null
        
        try {
          return await decrypt(JSON.parse(encrypted))
        } catch (error) {
          console.error('Failed to decrypt data:', error)
          return null
        }
      },
      
      removeItem: (key) => {
        localStorage.removeItem(key)
      }
    }
  }

  // Setup content validation
  setupContentValidation() {
    // Validate URLs
    const isValidURL = (url) => {
      try {
        const urlObj = new URL(url)
        return ['http:', 'https:'].includes(urlObj.protocol)
      } catch {
        return false
      }
    }

    // Validate email addresses
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    // Validate phone numbers
    const isValidPhone = (phone) => {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      return phoneRegex.test(phone.replace(/\s/g, ''))
    }

    // Add validation to forms
    document.addEventListener('DOMContentLoaded', () => {
      const forms = document.querySelectorAll('form')
      forms.forEach(form => {
        form.addEventListener('submit', (event) => {
          const inputs = form.querySelectorAll('input, textarea, select')
          let isValid = true

          inputs.forEach(input => {
            const value = input.value.trim()
            const type = input.type.toLowerCase()
            const name = input.name.toLowerCase()

            // Email validation
            if (type === 'email' || name.includes('email')) {
              if (value && !isValidEmail(value)) {
                this.showValidationError(input, 'Please enter a valid email address')
                isValid = false
              }
            }

            // URL validation
            if (type === 'url' || name.includes('url')) {
              if (value && !isValidURL(value)) {
                this.showValidationError(input, 'Please enter a valid URL')
                isValid = false
              }
            }

            // Phone validation
            if (type === 'tel' || name.includes('phone')) {
              if (value && !isValidPhone(value)) {
                this.showValidationError(input, 'Please enter a valid phone number')
                isValid = false
              }
            }

            // Required field validation
            if (input.hasAttribute('required') && !value) {
              this.showValidationError(input, 'This field is required')
              isValid = false
            }
          })

          if (!isValid) {
            event.preventDefault()
          }
        })
      })
    })
  }

  // Show validation error
  showValidationError(input, message) {
    // Remove existing error
    const existingError = input.parentNode.querySelector('.validation-error')
    if (existingError) {
      existingError.remove()
    }

    // Add new error
    const errorDiv = document.createElement('div')
    errorDiv.className = 'validation-error text-red-500 text-sm mt-1'
    errorDiv.textContent = message
    input.parentNode.appendChild(errorDiv)

    // Highlight input
    input.classList.add('border-red-500')
    
    // Remove error after user starts typing
    input.addEventListener('input', () => {
      errorDiv.remove()
      input.classList.remove('border-red-500')
    }, { once: true })
  }

  // Report security violations
  reportSecurityViolation(type, data) {
    const violation = {
      type,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    }

    console.warn('Security violation detected:', violation)

    // Send to analytics in production
    if (import.meta.env.PROD) {
      // Send to security monitoring service
      fetch('/api/security-violations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': sessionStorage.getItem('csrf-token')
        },
        body: JSON.stringify(violation)
      }).catch(error => {
        console.error('Failed to report security violation:', error)
      })
    }
  }

  // Get security status
  getSecurityStatus() {
    return {
      cspViolations: this.cspViolations.length,
      securityHeaders: this.securityHeaders,
      isSecure: this.isSecureContext(),
      hasCSRFProtection: !!sessionStorage.getItem('csrf-token'),
      hasSecureStorage: !!window.secureStorage
    }
  }

  // Check if context is secure
  isSecureContext() {
    return window.isSecureContext && location.protocol === 'https:'
  }

  // Cleanup
  cleanup() {
    this.cspViolations = []
    sessionStorage.removeItem('csrf-token')
  }
}

// Create singleton instance
const securityEnhancer = new SecurityEnhancer()

// Auto-initialize
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => securityEnhancer.init())
  } else {
    securityEnhancer.init()
  }
}

export default securityEnhancer

// Export individual methods
export const {
  generateCSP,
  generateCSRFToken,
  sanitizeInput,
  isValidURL,
  isValidEmail,
  isValidPhone,
  getSecurityStatus
} = securityEnhancer
