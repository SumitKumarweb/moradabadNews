import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { getAllCategories, deleteCategory } from '../../lib/firebase-service'
import { useToast } from '../../hooks/use-toast'
import { CategoryFormDialog } from '../../components/admin/CategoryFormDialog'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const { toast } = useToast()

  const loadCategories = async () => {
    setLoading(true)
    const data = await getAllCategories()
    setCategories(data)
    setLoading(false)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleEdit = (category) => {
    setEditingCategory(category)
    setDialogOpen(true)
  }

  const handleSuccess = () => {
    setDialogOpen(false)
    setEditingCategory(null)
    loadCategories()
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const success = await deleteCategory(id)
      if (success) {
        toast({ title: "Category deleted successfully" })
        loadCategories()
      } else {
        toast({ title: "Failed to delete category", variant: "destructive" })
      }
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categories</h1>
            <p className="text-muted-foreground mt-1">Manage your news categories</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Slug</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">{category.name}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline">{category.slug}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{category.description || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        <CategoryFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          category={editingCategory}
          onSuccess={handleSuccess}
        />
      </div>
    </AdminLayout>
  )
}
