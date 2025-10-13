import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { PostsTable } from '../../components/admin/PostsTable'
import { PostFormDialog } from '../../components/admin/PostFormDialog'
import { Button } from '../../components/ui/button'
import { Plus } from 'lucide-react'

export default function AdminPosts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSuccess = () => {
    setIsDialogOpen(false)
    setRefreshKey((prev) => prev + 1) // Trigger refresh
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Posts</h1>
            <p className="text-muted-foreground">Manage your news articles</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </div>

        <PostsTable key={refreshKey} onEdit={(post) => setIsDialogOpen(true)} />

        <PostFormDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSuccess={handleSuccess} />
      </div>
    </AdminLayout>
  )
}
