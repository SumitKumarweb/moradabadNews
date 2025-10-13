import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Badge } from '../../components/ui/badge'
import { useToast } from '../../hooks/use-toast'
import { getAllUsers, createUser, updateUser, deleteUser, ROLES, isMasterAdmin } from '../../lib/auth-service'
import { UserPlus, Edit, Trash2, Shield, User } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog'
import { useNavigate } from 'react-router-dom'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const { toast } = useToast()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: ROLES.EMPLOYEE
  })

  // Check if user is master admin
  useEffect(() => {
    if (!isMasterAdmin()) {
      toast({
        title: "Access Denied",
        description: "Only master admin can access user management",
        variant: "destructive"
      })
      navigate('/nimda/dashboard')
      return
    }
    loadUsers()
  }, [navigate, toast])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const userData = await getAllUsers()
      setUsers(userData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        password: '',
        role: user.role
      })
    } else {
      setEditingUser(null)
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: ROLES.EMPLOYEE
      })
    }
    setShowDialog(true)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: ROLES.EMPLOYEE
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingUser) {
        // Update user
        const updates = {
          name: formData.name,
          phone: formData.phone,
          role: formData.role
        }
        
        if (formData.password) {
          updates.password = formData.password
        }

        await updateUser(editingUser.id, updates)
        toast({
          title: "Success",
          description: "User updated successfully"
        })
      } else {
        // Create new user
        if (!formData.password) {
          toast({
            title: "Error",
            description: "Password is required for new users",
            variant: "destructive"
          })
          return
        }

        await createUser(formData)
        toast({
          title: "Success",
          description: "User created successfully"
        })
      }

      handleCloseDialog()
      loadUsers()
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to save user",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async () => {
    if (!deleteUserId) return

    try {
      await deleteUser(deleteUserId)
      toast({
        title: "Success",
        description: "User deleted successfully"
      })
      setDeleteUserId(null)
      loadUsers()
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive"
      })
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage admin users and their permissions</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>View and manage all admin users</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No users found</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === ROLES.MASTER ? "default" : "secondary"}>
                          {user.role === ROLES.MASTER ? (
                            <><Shield className="mr-1 h-3 w-3" /> Master</>
                          ) : (
                            <><User className="mr-1 h-3 w-3" /> Employee</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDialog(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteUserId(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit User Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Create New User'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Update user information and permissions' : 'Add a new user to the admin panel'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!!editingUser}
                  required
                />
                {editingUser && (
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password {!editingUser && '*'}</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                />
                {editingUser && (
                  <p className="text-xs text-muted-foreground">Leave blank to keep current password</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ROLES.MASTER}>Master Admin</SelectItem>
                    <SelectItem value={ROLES.EMPLOYEE}>Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingUser ? 'Update' : 'Create'} User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}

