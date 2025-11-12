// Firebase configuration and initialization
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyDtUy1aZZhXMYcQZMPbqnMGAdngEe2f4kU",
  authDomain: "moradabad-83a24.firebaseapp.com",
  projectId: "moradabad-83a24",
  storageBucket: "moradabad-83a24.appspot.com",
  messagingSenderId: "971218055861",
  appId: "1:971218055861:web:06028a9a11ae8c1d6884fc",
  measurementId: "G-FDBSJC6NN2",
}

// Initialize Firebase
let app
let db
let auth
let analytics = null

// Initialize Firebase (works for both client and server-side)
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }

  db = getFirestore(app)
  auth = getAuth(app)

  // Analytics only for client-side
  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app)
    } catch (error) {
      // Analytics might fail in some environments, that's okay
      console.warn('Analytics initialization failed:', error.message)
    }
  }
} catch (error) {
  console.error('Firebase initialization error:', error)
  // Set db to null if initialization fails
  db = null
  auth = null
}

export { app, db, auth, analytics }

