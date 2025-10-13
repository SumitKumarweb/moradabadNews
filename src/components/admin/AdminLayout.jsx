import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("adminAuth")
    if (!auth && pathname !== "/nimda") {
      navigate("/nimda")
    } else {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [pathname, navigate])

  // Show login page without layout
  if (pathname === "/nimda") {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  )
}

