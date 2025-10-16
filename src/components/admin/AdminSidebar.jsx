import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Layers,
  Settings,
  Home,
  HelpCircle,
  Video,
  Mail,
  Briefcase,
  Users,
  Megaphone,
  BarChart3,
  UserCog,
  Library,
} from "lucide-react"
import { getCurrentUser, ROLES } from "@/lib/auth-service"

// All nav items with role-based access
const allNavItems = [
  {
    title: "Dashboard",
    to: "/nimda/dashboard",
    icon: LayoutDashboard,
    roles: [ROLES.MASTER], // Only master
  },
  {
    title: "Posts",
    to: "/nimda/posts",
    icon: FileText,
    roles: [ROLES.MASTER, ROLES.EMPLOYEE], // Both
  },
  {
    title: "Categories",
    to: "/nimda/categories",
    icon: Layers,
    roles: [ROLES.MASTER], // Only master
  },
  {
    title: "Quiz",
    to: "/nimda/quiz",
    icon: HelpCircle,
    roles: [ROLES.MASTER, ROLES.EMPLOYEE], // Both
  },
  {
    title: "Videos",
    to: "/nimda/videos",
    icon: Video,
    roles: [ROLES.MASTER], // Only master
  },
  {
    title: "Headers",
    to: "/nimda/headers",
    icon: Megaphone,
    roles: [ROLES.MASTER], // Only master
  },
  {
    title: "Messages",
    to: "/nimda/messages",
    icon: Mail,
    roles: [ROLES.MASTER, ROLES.EMPLOYEE], // Both
  },
  {
    title: "Careers",
    to: "/nimda/careers",
    icon: Briefcase,
    roles: [ROLES.MASTER], // Only master
  },
  {
    title: "Applications",
    to: "/nimda/applications",
    icon: Users,
    roles: [ROLES.MASTER], // Only master
  },
  {
    title: "Analytics",
    to: "/nimda/analytics",
    icon: BarChart3,
    roles: [ROLES.MASTER], // Only master
  },
  {
    title: "Services",
    to: "/nimda/services",
    icon: Library,
    roles: [ROLES.MASTER], // Only master
  },
  {
    title: "User Management",
    to: "/nimda/users",
    icon: UserCog,
    roles: [ROLES.MASTER], // Only master
  },
  {
    title: "Settings",
    to: "/nimda/settings",
    icon: Settings,
    roles: [ROLES.MASTER, ROLES.EMPLOYEE], // Both
  },
]

export default function AdminSidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const currentUser = getCurrentUser()
  
  // Filter nav items based on user role
  const navItems = allNavItems.filter(item => 
    item.roles.includes(currentUser?.role)
  )

  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold text-foreground">Moradabad News</span>
        </Link>
      </div>

      <nav className="space-y-1 p-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Home className="h-4 w-4" />
          View Site
        </Link>

        <div className="my-4 border-t border-border" />

        {navItems.map((item) => {
          const isActive = pathname === item.to
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export { AdminSidebar }

