import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

// Suppress Firebase AbortError warnings (expected behavior)
if (typeof window !== 'undefined') {
  const originalError = console.error
  console.error = (...args) => {
    // Filter out AbortError from Firebase
    if (args[0]?.includes?.('AbortError') || 
        args[0]?.message?.includes?.('aborted') ||
        args[0]?.name === 'AbortError') {
      return // Suppress AbortError
    }
    originalError.apply(console, args)
  }

  // Suppress unhandled promise rejections for AbortError
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason?.name === 'AbortError' || 
        event.reason?.message?.includes?.('aborted')) {
      event.preventDefault() // Suppress the error
    }
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)

