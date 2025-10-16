// Search Integration Utilities
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore'
import { db } from './firebase'
import searchService from './search-service'

// Real-time search index updates
class SearchIntegration {
  constructor() {
    this.unsubscribe = null
    this.isListening = false
  }

  // Start listening to Firebase changes for real-time search updates
  startListening() {
    if (this.isListening) return

    try {
      const articlesRef = collection(db, 'articles')
      const articlesQuery = query(
        articlesRef,
        orderBy('publishedAt', 'desc')
      )

      this.unsubscribe = onSnapshot(articlesQuery, (snapshot) => {
        const changes = snapshot.docChanges()
        
        changes.forEach((change) => {
          const article = {
            id: change.doc.id,
            ...change.doc.data(),
            publishedAt: change.doc.data().publishedAt?.toDate?.()?.toISOString() || change.doc.data().publishedAt
          }

          switch (change.type) {
            case 'added':
            case 'modified':
              searchService.addArticleToIndex(article)
              break
            case 'removed':
              searchService.removeArticleFromIndex(article.id)
              break
          }
        })

        console.log(`Search index updated: ${changes.length} changes processed`)
      })

      this.isListening = true
      console.log('Search integration: Started listening to Firebase changes')
    } catch (error) {
      console.error('Failed to start search integration:', error)
    }
  }

  // Stop listening to Firebase changes
  stopListening() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
      this.isListening = false
      console.log('Search integration: Stopped listening to Firebase changes')
    }
  }

  // Manually refresh the entire search index
  async refreshIndex() {
    try {
      await searchService.refreshSearchIndex()
      console.log('Search index manually refreshed')
    } catch (error) {
      console.error('Failed to refresh search index:', error)
    }
  }

  // Get search statistics
  getSearchStats() {
    return {
      isListening: this.isListening,
      indexSize: searchService.getSearchAnalytics().indexedContent,
      searchHistory: searchService.getSearchHistory().length,
      isInitialized: searchService.isInitialized
    }
  }
}

// Create singleton instance
const searchIntegration = new SearchIntegration()

// Auto-start listening in development
if (import.meta.env.DEV) {
  // Start listening after a short delay to ensure Firebase is initialized
  setTimeout(() => {
    searchIntegration.startListening()
  }, 1000)
}

export default searchIntegration

// Export methods
export const {
  startListening,
  stopListening,
  refreshIndex,
  getSearchStats
} = searchIntegration
