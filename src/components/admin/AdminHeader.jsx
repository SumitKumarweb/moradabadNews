import { Moon, Sun, LogOut } from "lucide-react"
import { useTheme } from "../theme-provider"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useToast } from "../../hooks/use-toast"

export default function AdminHeader() {
  const { setTheme, theme } = useTheme()
  const navigate = useNavigate()
  const { toast } = useToast()

  const toggleTheme = () => {
    // Get current effective theme
    const currentTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme

    // Toggle to opposite theme
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    })
    navigate("/nimda")
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'light' : 'dark'} mode`}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  )
}

export { AdminHeader }

