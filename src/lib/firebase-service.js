import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  increment,
} from "firebase/firestore"
import { db, auth } from "./firebase"
import { signInWithEmailAndPassword, updatePassword, updateEmail } from "firebase/auth"

// Data shape comments for reference:
// NewsArticle: { id, title, englishTitle?, summary, content, category, image, author, publishedAt, tags, isFeatured, isTrending, views, metaTitle?, metaDescription?, metaKeywords?, ogImage? }
// QuizQuestion: { id, question, options, correctAnswer, explanation?, category, createdAt, batchNumber?, batchDate? }
// Category: { id, name, slug, description?, createdAt }
// FeaturedVideo: { id, videoId, title, description, isActive, createdAt }
// SiteSettings: { id, siteName, siteDescription, contactEmail, socialMedia: {facebook, twitter, instagram, youtube}, seo: {defaultMetaTitle, defaultMetaDescription, keywords[]} }
// ContactMessage: { id, name, email, subject, message, status, createdAt }
// JobPosting: { id, title, department, location, type, description, requirements[], responsibilities[], salary?, isActive, postedAt }
// JobApplication: { id, jobId, jobTitle, name, email, phone, resumeUrl, coverLetter?, status, appliedAt }
// HeaderBanner: { id, title, content, isActive, backgroundColor?, textColor?, createdAt }
// QuizCompletion: { id, totalQuestions, score, percentage, completedAt }

// Site Settings Management Functions
export async function getSiteSettings() {
  try {
    const settingsRef = doc(db, "settings", "site")
    const docSnap = await getDoc(settingsRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return null
  }
}

export async function updateSiteSettings(data) {
  try {
    const settingsRef = doc(db, "settings", "site")
    await updateDoc(settingsRef, data)
    return true
  } catch (error) {
    console.error("Error updating site settings:", error)
    return false
  }
}

// News Articles Functions
export async function getAllArticles() {
  try {
    const articlesRef = collection(db, "articles")
    const snapshot = await getDocs(articlesRef)
    const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

export async function getArticleById(id) {
  try {
    const docRef = doc(db, "articles", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

export async function getArticlesByCategory(category) {
  try {
    const articlesRef = collection(db, "articles")
    const q = query(articlesRef, where("category", "==", category))
    const snapshot = await getDocs(q)
    const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  } catch (error) {
    console.error("Error fetching articles by category:", error)
    return []
  }
}

export async function getFeaturedArticles() {
  try {
    const articlesRef = collection(db, "articles")
    const q = query(articlesRef, where("isFeatured", "==", true))
    const snapshot = await getDocs(q)
    const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 3)
  } catch (error) {
    console.error("Error fetching featured articles:", error)
    return []
  }
}

export async function getTrendingArticles() {
  try {
    const articlesRef = collection(db, "articles")
    const q = query(articlesRef, where("isTrending", "==", true))
    const snapshot = await getDocs(q)
    const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 6)
  } catch (error) {
    console.error("Error fetching trending articles:", error)
    return []
  }
}

export async function getMostSearchedArticles() {
  try {
    const articlesRef = collection(db, "articles")
    const snapshot = await getDocs(articlesRef)
    const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return articles.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
  } catch (error) {
    console.error("Error fetching most searched articles:", error)
    return []
  }
}

export async function getRecommendedArticles(currentArticleId, category) {
  try {
    const articlesRef = collection(db, "articles")
    const q = query(articlesRef, where("category", "==", category))
    const snapshot = await getDocs(q)
    const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return articles
      .filter((article) => article.id !== currentArticleId)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3)
  } catch (error) {
    console.error("Error fetching recommended articles:", error)
    return []
  }
}

// Quiz Functions
export async function getAllQuizQuestions() {
  try {
    const quizRef = collection(db, "quiz")
    const snapshot = await getDocs(quizRef)
    const questions = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return questions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Error fetching quiz questions:", error)
    return []
  }
}

export async function addQuizQuestion(question) {
  try {
    const quizRef = collection(db, "quiz")
    const docRef = await addDoc(quizRef, {
      ...question,
      createdAt: Timestamp.now().toDate().toISOString(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding quiz question:", error)
    return null
  }
}

export async function updateQuizQuestion(id, data) {
  try {
    const docRef = doc(db, "quiz", id)
    await updateDoc(docRef, data)
    return true
  } catch (error) {
    console.error("Error updating quiz question:", error)
    return false
  }
}

export async function deleteQuizQuestion(id) {
  try {
    const docRef = doc(db, "quiz", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting quiz question:", error)
    return false
  }
}

// Category Management Functions
export async function getAllCategories() {
  try {
    const categoriesRef = collection(db, "categories")
    const snapshot = await getDocs(categoriesRef)
    const categories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return categories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function addCategory(category) {
  try {
    const categoriesRef = collection(db, "categories")
    const docRef = await addDoc(categoriesRef, {
      ...category,
      createdAt: Timestamp.now().toDate().toISOString(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding category:", error)
    return null
  }
}

export async function updateCategory(id, data) {
  try {
    const docRef = doc(db, "categories", id)
    await updateDoc(docRef, data)
    return true
  } catch (error) {
    console.error("Error updating category:", error)
    return false
  }
}

export async function deleteCategory(id) {
  try {
    const docRef = doc(db, "categories", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting category:", error)
    return false
  }
}

// Article Management (Admin)
export async function addArticle(article) {
  try {
    const articlesRef = collection(db, "articles")
    const docRef = await addDoc(articlesRef, {
      ...article,
      publishedAt: Timestamp.now().toDate().toISOString(),
      views: 0,
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding article:", error)
    return null
  }
}

export async function updateArticle(id, data) {
  try {
    const docRef = doc(db, "articles", id)
    await updateDoc(docRef, data)
    return true
  } catch (error) {
    console.error("Error updating article:", error)
    return false
  }
}

export async function deleteArticle(id) {
  try {
    const docRef = doc(db, "articles", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting article:", error)
    return false
  }
}

// Video Management Functions
export async function getAllVideos() {
  try {
    const videosRef = collection(db, "videos")
    const snapshot = await getDocs(videosRef)
    const videos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return videos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Error fetching videos:", error)
    return []
  }
}

export async function getActiveVideo() {
  try {
    const videosRef = collection(db, "videos")
    const q = query(videosRef, where("isActive", "==", true))
    const snapshot = await getDocs(q)
    if (!snapshot.empty) {
      const doc = snapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    }
    return null
  } catch (error) {
    console.error("Error fetching active video:", error)
    return null
  }
}

export async function addVideo(video) {
  try {
    const videosRef = collection(db, "videos")
    const docRef = await addDoc(videosRef, {
      ...video,
      createdAt: Timestamp.now().toDate().toISOString(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding video:", error)
    return null
  }
}

export async function updateVideo(id, data) {
  try {
    const docRef = doc(db, "videos", id)
    await updateDoc(docRef, data)
    return true
  } catch (error) {
    console.error("Error updating video:", error)
    return false
  }
}

export async function deleteVideo(id) {
  try {
    const docRef = doc(db, "videos", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting video:", error)
    return false
  }
}

export async function setActiveVideo(id) {
  try {
    // First, deactivate all videos
    const videosRef = collection(db, "videos")
    const snapshot = await getDocs(videosRef)
    const updatePromises = snapshot.docs.map((document) =>
      updateDoc(doc(db, "videos", document.id), { isActive: false }),
    )
    await Promise.all(updatePromises)

    // Then activate the selected video
    const docRef = doc(db, "videos", id)
    await updateDoc(docRef, { isActive: true })
    return true
  } catch (error) {
    console.error("Error setting active video:", error)
    return false
  }
}

// Article Management Functions
export async function incrementArticleViews(id) {
  try {
    const docRef = doc(db, "articles", id)
    await updateDoc(docRef, {
      views: increment(1),
    })
    return true
  } catch (error) {
    console.error("Error incrementing article views:", error)
    return false
  }
}

// Admin Authentication Functions
export async function loginAdmin(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    return true
  } catch (error) {
    console.error("Error logging in admin:", error)
    return false
  }
}

export async function updateAdminEmail(newEmail) {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("No user logged in")
    }
    await updateEmail(user, newEmail)
    return true
  } catch (error) {
    console.error("Error updating admin email:", error)
    return false
  }
}

export async function updateAdminPassword(newPassword) {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("No user logged in")
    }
    await updatePassword(user, newPassword)
    return true
  } catch (error) {
    console.error("Error updating admin password:", error)
    return false
  }
}

export function getCurrentAdmin() {
  return auth.currentUser
}

export function logoutAdmin() {
  return auth.signOut()
}

// Message Management Functions
export async function getAllMessages() {
  try {
    const messagesRef = collection(db, "messages")
    const snapshot = await getDocs(messagesRef)
    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Error fetching messages:", error)
    return []
  }
}

export async function addMessage(message) {
  try {
    const messagesRef = collection(db, "messages")
    const docRef = await addDoc(messagesRef, {
      ...message,
      status: "unread",
      createdAt: Timestamp.now().toDate().toISOString(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding message:", error)
    return null
  }
}

export async function updateMessageStatus(id, status) {
  try {
    const docRef = doc(db, "messages", id)
    await updateDoc(docRef, { status })
    return true
  } catch (error) {
    console.error("Error updating message status:", error)
    return false
  }
}

export async function deleteMessage(id) {
  try {
    const docRef = doc(db, "messages", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting message:", error)
    return false
  }
}

// Job Management Functions
export async function getAllJobs() {
  try {
    const jobsRef = collection(db, "jobs")
    const snapshot = await getDocs(jobsRef)
    const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return jobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return []
  }
}

export async function getActiveJobs() {
  try {
    const jobsRef = collection(db, "jobs")
    const q = query(jobsRef, where("isActive", "==", true))
    const snapshot = await getDocs(q)
    const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return jobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
  } catch (error) {
    console.error("Error fetching active jobs:", error)
    return []
  }
}

export async function addJob(job) {
  try {
    const jobsRef = collection(db, "jobs")
    const docRef = await addDoc(jobsRef, {
      ...job,
      postedAt: Timestamp.now().toDate().toISOString(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding job:", error)
    return null
  }
}

export async function updateJob(id, data) {
  try {
    const docRef = doc(db, "jobs", id)
    await updateDoc(docRef, data)
    return true
  } catch (error) {
    console.error("Error updating job:", error)
    return false
  }
}

export async function deleteJob(id) {
  try {
    const docRef = doc(db, "jobs", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting job:", error)
    return false
  }
}

// Job Application Management Functions
export async function getAllJobApplications() {
  try {
    const applicationsRef = collection(db, "jobApplications")
    const snapshot = await getDocs(applicationsRef)
    const applications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return applications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
  } catch (error) {
    console.error("Error fetching job applications:", error)
    return []
  }
}

export async function addJobApplication(application) {
  try {
    const applicationsRef = collection(db, "jobApplications")
    const docRef = await addDoc(applicationsRef, {
      ...application,
      status: "pending",
      appliedAt: Timestamp.now().toDate().toISOString(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding job application:", error)
    return null
  }
}

export async function updateJobApplicationStatus(id, status) {
  try {
    const docRef = doc(db, "jobApplications", id)
    await updateDoc(docRef, { status })
    return true
  } catch (error) {
    console.error("Error updating job application status:", error)
    return false
  }
}

export async function deleteJobApplication(id) {
  try {
    const docRef = doc(db, "jobApplications", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting job application:", error)
    return false
  }
}

// Resume Upload Function (using Firestore with base64)
export async function uploadResume(file) {
  try {
    if (!file) {
      throw new Error("No file provided")
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type. Please upload PDF, DOC, or DOCX files only.")
    }

    // Validate file size (2MB max for base64 storage)
    const maxSize = 2 * 1024 * 1024 // 2MB in bytes (smaller for base64)
    if (file.size > maxSize) {
      throw new Error("File size exceeds 2MB limit")
    }

    console.log("Converting file to base64:", file.name)

    // Convert file to base64
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result
        resolve(base64)
      }
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })

    const timestamp = Date.now()
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    
    // Store resume data in Firestore
    const resumesRef = collection(db, "resumes")
    const resumeDoc = await addDoc(resumesRef, {
      fileName: sanitizedFileName,
      originalName: file.name,
      fileType: file.type,
      fileSize: file.size,
      base64Data: base64Data,
      uploadedAt: Timestamp.now().toDate().toISOString(),
      timestamp: timestamp,
    })

    console.log("Resume uploaded successfully with ID:", resumeDoc.id)
    
    // Return the document ID which can be used to retrieve the file
    return resumeDoc.id
  } catch (error) {
    console.error("Error uploading resume:", error)
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
    })
    throw error
  }
}

// Function to retrieve resume data
export async function getResume(resumeId) {
  try {
    const docRef = doc(db, "resumes", resumeId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error("Error fetching resume:", error)
    return null
  }
}

// Header Banner Management Functions
export async function getAllHeaderBanners() {
  try {
    const bannersRef = collection(db, "headerBanners")
    const snapshot = await getDocs(bannersRef)
    const banners = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return banners.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Error fetching header banners:", error)
    return []
  }
}

export async function getActiveHeaderBanners() {
  try {
    const bannersRef = collection(db, "headerBanners")
    const q = query(bannersRef, where("isActive", "==", true))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching active header banners:", error)
    return []
  }
}

export async function addHeaderBanner(banner) {
  try {
    const bannersRef = collection(db, "headerBanners")
    const docRef = await addDoc(bannersRef, {
      ...banner,
      createdAt: Timestamp.now().toDate().toISOString(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding header banner:", error)
    return null
  }
}

export async function updateHeaderBanner(id, data) {
  try {
    const docRef = doc(db, "headerBanners", id)
    await updateDoc(docRef, data)
    return true
  } catch (error) {
    console.error("Error updating header banner:", error)
    return false
  }
}

export async function deleteHeaderBanner(id) {
  try {
    const docRef = doc(db, "headerBanners", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting header banner:", error)
    return false
  }
}

export async function setActiveHeaderBanner(id) {
  try {
    // First, deactivate all banners
    const bannersRef = collection(db, "headerBanners")
    const snapshot = await getDocs(bannersRef)
    const updatePromises = snapshot.docs.map((document) =>
      updateDoc(doc(db, "headerBanners", document.id), { isActive: false }),
    )
    await Promise.all(updatePromises)

    // Then activate the selected banner
    const docRef = doc(db, "headerBanners", id)
    await updateDoc(docRef, { isActive: true })
    return true
  } catch (error) {
    console.error("Error setting active header banner:", error)
    return false
  }
}

// Quiz Completion Tracking Functions
export async function addQuizCompletion(completionData) {
  try {
    const completionsRef = collection(db, "quizCompletions")
    const docRef = await addDoc(completionsRef, {
      ...completionData,
      completedAt: Timestamp.now().toDate().toISOString(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding quiz completion:", error)
    return null
  }
}

export async function getAllQuizCompletions() {
  try {
    const completionsRef = collection(db, "quizCompletions")
    const snapshot = await getDocs(completionsRef)
    const completions = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return completions.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
  } catch (error) {
    console.error("Error fetching quiz completions:", error)
    return []
  }
}

export async function getQuizCompletionCount() {
  try {
    const completionsRef = collection(db, "quizCompletions")
    const snapshot = await getDocs(completionsRef)
    return snapshot.size
  } catch (error) {
    console.error("Error fetching quiz completion count:", error)
    return 0
  }
}

// Quiz Batch Management Functions
export async function getNextBatchNumber() {
  try {
    const quizRef = collection(db, "quiz")
    const snapshot = await getDocs(quizRef)
    const questions = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    
    if (questions.length === 0) {
      return 1
    }
    
    const maxBatch = Math.max(...questions.map(q => q.batchNumber || 0))
    return maxBatch + 1
  } catch (error) {
    console.error("Error getting next batch number:", error)
    return 1
  }
}

export async function addQuizQuestionBatch(questions, batchNumber = null) {
  try {
    const batch = batchNumber || await getNextBatchNumber()
    const batchDate = Timestamp.now().toDate().toISOString()
    
    let successCount = 0
    const quizRef = collection(db, "quiz")
    
    for (const q of questions) {
      const questionData = {
        ...q,
        batchNumber: batch,
        batchDate: batchDate,
        createdAt: Timestamp.now().toDate().toISOString(),
      }
      
      const docRef = await addDoc(quizRef, questionData)
      if (docRef.id) {
        successCount++
      }
    }
    
    // Auto-delete old batches if we have more than 30
    await deleteOldBatches()
    
    return { success: true, count: successCount, batchNumber: batch }
  } catch (error) {
    console.error("Error adding quiz question batch:", error)
    return { success: false, count: 0 }
  }
}

export async function getAllBatches() {
  try {
    const quizRef = collection(db, "quiz")
    const snapshot = await getDocs(quizRef)
    const questions = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    
    // Group questions by batch number
    const batches = {}
    questions.forEach(q => {
      const batchNum = q.batchNumber || 0
      if (!batches[batchNum]) {
        batches[batchNum] = {
          batchNumber: batchNum,
          batchDate: q.batchDate || q.createdAt,
          questionCount: 0,
          questions: []
        }
      }
      batches[batchNum].questionCount++
      batches[batchNum].questions.push(q)
    })
    
    return Object.values(batches).sort((a, b) => b.batchNumber - a.batchNumber)
  } catch (error) {
    console.error("Error fetching batches:", error)
    return []
  }
}

export async function getQuestionsByBatch(batchNumber) {
  try {
    const quizRef = collection(db, "quiz")
    const q = query(quizRef, where("batchNumber", "==", batchNumber))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching questions by batch:", error)
    return []
  }
}

export async function getTodaysBatchQuestions() {
  try {
    const batches = await getAllBatches()
    
    if (batches.length === 0) {
      return []
    }
    
    // Calculate which batch to show today
    const totalBatches = batches.length
    
    // Get the first batch date to calculate day offset
    const sortedBatches = batches.sort((a, b) => a.batchNumber - b.batchNumber)
    const firstBatch = sortedBatches[0]
    const firstBatchDate = new Date(firstBatch.batchDate)
    const today = new Date()
    
    // Calculate days since first batch
    const daysSinceStart = Math.floor((today - firstBatchDate) / (1000 * 60 * 60 * 24))
    
    // Calculate which batch to show (cycles every 30 days or based on total batches)
    const batchIndex = daysSinceStart % totalBatches
    const todaysBatch = sortedBatches[batchIndex]
    
    // Get questions from today's batch and shuffle them
    const questions = todaysBatch.questions || []
    return shuffleArray([...questions])
  } catch (error) {
    console.error("Error fetching today's batch questions:", error)
    return []
  }
}

export async function deleteBatch(batchNumber) {
  try {
    const quizRef = collection(db, "quiz")
    const q = query(quizRef, where("batchNumber", "==", batchNumber))
    const snapshot = await getDocs(q)
    
    const deletePromises = snapshot.docs.map((document) =>
      deleteDoc(doc(db, "quiz", document.id))
    )
    
    await Promise.all(deletePromises)
    return true
  } catch (error) {
    console.error("Error deleting batch:", error)
    return false
  }
}

export async function deleteOldBatches(maxBatches = 30) {
  try {
    const batches = await getAllBatches()
    
    if (batches.length <= maxBatches) {
      return { deleted: 0 }
    }
    
    // Sort by batch number and delete oldest ones
    const sortedBatches = batches.sort((a, b) => a.batchNumber - b.batchNumber)
    const batchesToDelete = sortedBatches.slice(0, batches.length - maxBatches)
    
    let deletedCount = 0
    for (const batch of batchesToDelete) {
      const success = await deleteBatch(batch.batchNumber)
      if (success) {
        deletedCount++
      }
    }
    
    return { deleted: deletedCount }
  } catch (error) {
    console.error("Error deleting old batches:", error)
    return { deleted: 0 }
  }
}

// Helper function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
