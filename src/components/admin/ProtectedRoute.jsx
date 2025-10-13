import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '@/lib/auth-service'

export default function ProtectedRoute({ children, requiredRole = null }) {
  const navigate = useNavigate()

  useEffect(() => {
    const user = getCurrentUser()

    // Check if user is logged in
    if (!user) {
      navigate('/nimda')
      return
    }

    // Check if specific role is required
    if (requiredRole && user.role !== requiredRole) {
      // Master has access to everything
      if (user.role !== 'master') {
        navigate('/nimda/dashboard')
        return
      }
    }
  }, [navigate, requiredRole])

  return <>{children}</>
}

export { ProtectedRoute }

