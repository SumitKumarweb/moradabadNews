import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import HomePage from './pages/HomePage'

function AppSSRSimple() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="moradabad-news-theme">
      <HomePage />
    </ThemeProvider>
  )
}

export default AppSSRSimple
