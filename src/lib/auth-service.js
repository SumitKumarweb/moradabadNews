import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { db } from "./firebase"

// User Roles
export const ROLES = {
  MASTER: 'master',
  EMPLOYEE: 'employee'
}

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('adminAuth')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

// Check if current user is master
export const isMasterAdmin = () => {
  const user = getCurrentUser()
  return user?.role === ROLES.MASTER
}

// Check if user has permission to access a route
export const hasPermission = (requiredRole) => {
  const user = getCurrentUser()
  if (!user) return false
  
  // Master has access to everything
  if (user.role === ROLES.MASTER) return true
  
  // Check specific role
  return user.role === requiredRole
}

// Login user
export const loginUser = async (email, password) => {
  try {
    // Query users collection
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('email', '==', email))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      throw new Error('Invalid email or password')
    }
    
    const userDoc = snapshot.docs[0]
    const userData = { id: userDoc.id, ...userDoc.data() }
    
    // Check password
    if (userData.password !== password) {
      throw new Error('Invalid email or password')
    }
    
    // Don't store password in localStorage
    const { password: _, ...userWithoutPassword } = userData
    
    // Store user data
    localStorage.setItem('adminAuth', JSON.stringify(userWithoutPassword))
    
    return userWithoutPassword
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('adminAuth')
}

// Create new user (only master can do this)
export const createUser = async (userData) => {
  if (!isMasterAdmin()) {
    throw new Error('Only master admin can create users')
  }
  
  try {
    // Check if email already exists
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('email', '==', userData.email))
    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      throw new Error('User with this email already exists')
    }
    
    // Create user
    const newUser = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      role: userData.role || ROLES.EMPLOYEE,
      password: userData.password,
      createdAt: new Date().toISOString(),
      createdBy: getCurrentUser()?.id
    }
    
    const docRef = await addDoc(usersRef, newUser)
    
    return { id: docRef.id, ...newUser }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Get all users (only master can do this)
export const getAllUsers = async () => {
  if (!isMasterAdmin()) {
    throw new Error('Only master admin can view all users')
  }
  
  try {
    const usersRef = collection(db, 'users')
    const snapshot = await getDocs(usersRef)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// Update user (master can update anyone, employees can only update themselves)
export const updateUser = async (userId, updates) => {
  const currentUser = getCurrentUser()
  
  if (!currentUser) {
    throw new Error('Not authenticated')
  }
  
  // Check permissions
  if (currentUser.role !== ROLES.MASTER && currentUser.id !== userId) {
    throw new Error('You can only update your own profile')
  }
  
  try {
    // Prevent email changes
    const allowedUpdates = { ...updates }
    delete allowedUpdates.email
    delete allowedUpdates.id
    
    // Employees cannot change their role
    if (currentUser.role !== ROLES.MASTER) {
      delete allowedUpdates.role
    }
    
    allowedUpdates.updatedAt = new Date().toISOString()
    
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, allowedUpdates)
    
    // If updating self, update localStorage
    if (currentUser.id === userId) {
      const updatedUser = { ...currentUser, ...allowedUpdates }
      localStorage.setItem('adminAuth', JSON.stringify(updatedUser))
    }
    
    return true
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// Delete user (only master can do this)
export const deleteUser = async (userId) => {
  if (!isMasterAdmin()) {
    throw new Error('Only master admin can delete users')
  }
  
  const currentUser = getCurrentUser()
  
  // Cannot delete self
  if (currentUser.id === userId) {
    throw new Error('You cannot delete your own account')
  }
  
  try {
    const userRef = doc(db, 'users', userId)
    await deleteDoc(userRef)
    return true
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

// Note: Master admin should be created manually through Firebase Console
// or through the User Management page by an existing master admin

