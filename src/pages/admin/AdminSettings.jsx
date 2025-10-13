import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { useToast } from '../../hooks/use-toast'
import { getCurrentUser, updateUser, ROLES } from '../../lib/auth-service'
import { User, Mail, Phone, Shield, Save } from 'lucide-react'

export default function AdminSettings() {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        password: ''
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updates = {
        name: formData.name,
        phone: formData.phone
      }

      // Only add password if it's being changed
      if (formData.password) {
        updates.password = formData.password
      }

      await updateUser(currentUser.id, updates)

      // Refresh current user data
      const updatedUser = getCurrentUser()
      setCurrentUser(updatedUser)
      
      // Clear password field
      setFormData(prev => ({ ...prev, password: '' }))

      toast({
        title: "Success",
        description: "Your settings have been updated"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update settings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) {
    return (
      <AdminLayout>
        <div className="text-center py-8">Loading...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information
              {currentUser.role === ROLES.EMPLOYEE && " (Email is permanent and cannot be changed)"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {currentUser.role === ROLES.MASTER ? 'Master Admin' : 'Employee'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your role determines what you can access in the admin panel
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={formData.email}
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed for security reasons
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Only fill this if you want to change your password
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="submit" disabled={loading}>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Created:</span>
                <span className="font-medium">
                  {currentUser.createdAt 
                    ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : 'N/A'
                  }
                </span>
              </div>
              {currentUser.updatedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">
                    {new Date(currentUser.updatedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
