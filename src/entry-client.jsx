import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Check if we need to hydrate or render fresh
const rootElement = document.getElementById('root')
if (rootElement && rootElement.innerHTML.trim() === '<h1>Moradabad News</h1><p>Loading...</p>') {
  // Fresh render if we have loading content
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  // Hydrate if content was server-rendered
  ReactDOM.hydrateRoot(rootElement, <App />)
}
