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
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    to: "/nimda/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Posts",
    to: "/nimda/posts",
    icon: FileText,
  },
  {
    title: "Categories",
    to: "/nimda/categories",
    icon: Layers,
  },
  {
    title: "Quiz",
    to: "/nimda/quiz",
    icon: HelpCircle,
  },
  {
    title: "Videos",
    to: "/nimda/videos",
    icon: Video,
  },
  {
    title: "Headers",
    to: "/nimda/headers",
    icon: Megaphone,
  },
  {
    title: "Messages",
    to: "/nimda/messages",
    icon: Mail,
  },
  {
    title: "Careers",
    to: "/nimda/careers",
    icon: Briefcase,
  },
  {
    title: "Applications",
    to: "/nimda/applications",
    icon: Users,
  },
  {
    title: "Analytics",
    to: "/nimda/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    to: "/nimda/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const location = useLocation()
  const pathname = location.pathname

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

