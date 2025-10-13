import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Plus, Edit, Trash2, Check } from 'lucide-react'
import { getAllHeaderBanners, deleteHeaderBanner, setActiveHeaderBanner } from '../../lib/firebase-service'
import { useToast } from '../../hooks/use-toast'
import { HeaderBannerFormDialog } from '../../components/admin/HeaderBannerFormDialog'

export default function AdminHeaders() {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState(null)
  const { toast } = useToast()

  const loadBanners = async () => {
    setLoading(true)
    const data = await getAllHeaderBanners()
    setBanners(data)
    setLoading(false)
  }

  useEffect(() => {
    loadBanners()
  }, [])

  const handleEdit = (banner) => {
    setEditingBanner(banner)
    setDialogOpen(true)
  }

  const handleSuccess = () => {
    setDialogOpen(false)
    setEditingBanner(null)
    loadBanners()
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      const success = await deleteHeaderBanner(id)
      if (success) {
        toast({ title: "Banner deleted successfully" })
        loadBanners()
      }
    }
  }

  const handleSetActive = async (id) => {
    const success = await setActiveHeaderBanner(id)
    if (success) {
      toast({ title: "Active banner updated" })
      loadBanners()
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Header Banners</h1>
            <p className="text-muted-foreground">Manage announcement banners at the top of the site</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Banner
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-4">
            {banners.map((banner) => (
              <Card key={banner.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{banner.title}</h3>
                        {banner.isActive && <Badge className="bg-green-600">Active</Badge>}
                      </div>
                      <div 
                        className="text-sm text-muted-foreground prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: banner.content }}
                      />
                      <div className="flex gap-2 mt-2">
                        {banner.backgroundColor && (
                          <div className="flex items-center gap-1 text-xs">
                            <div className="w-4 h-4 rounded border" style={{ backgroundColor: banner.backgroundColor }} />
                            <span className="text-muted-foreground">{banner.backgroundColor}</span>
                          </div>
                        )}
                        {banner.textColor && (
                          <div className="flex items-center gap-1 text-xs">
                            <div className="w-4 h-4 rounded border" style={{ backgroundColor: banner.textColor }} />
                            <span className="text-muted-foreground">{banner.textColor}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!banner.isActive && (
                        <Button size="sm" variant="outline" onClick={() => handleSetActive(banner.id)}>
                          <Check className="h-4 w-4 mr-1" />
                          Set Active
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleEdit(banner)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(banner.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <HeaderBannerFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          banner={editingBanner}
          onSuccess={handleSuccess}
        />
      </div>
    </AdminLayout>
  )
}
