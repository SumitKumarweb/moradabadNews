// Environment Configuration Example
// Copy this file to env.js and update with your actual values

export const env = {
  // Google Analytics
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  
  // Site Configuration
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://moradabadnews.com',
  SITE_NAME: import.meta.env.VITE_SITE_NAME || 'Moradabad News',
  
  // Environment
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  
  // Firebase (if using)
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Usage example:
// import { env } from './config/env.js'
// const gaId = env.GA_MEASUREMENT_ID
