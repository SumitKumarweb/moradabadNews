import { useState, useEffect } from "react"
import AdminLayout from "../../components/admin/AdminLayout"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Plus, Play, Edit, Trash2, Check } from "lucide-react"
import { getAllVideos, deleteVideo, setActiveVideo } from "../../lib/firebase-service"
import { useToast } from "../../hooks/use-toast"
import { VideoFormDialog } from "../../components/admin/VideoFormDialog"

export default function AdminVideos() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVideo, setEditingVideo] = useState(null)
  const { toast } = useToast()

  const loadVideos = async () => {
    setLoading(true)
    const data = await getAllVideos()
    setVideos(data)
    setLoading(false)
  }

  useEffect(() => {
    loadVideos()
  }, [])

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this video?")) {
      const success = await deleteVideo(id)
      if (success) {
        toast({ title: "Video deleted successfully" })
        loadVideos()
      } else {
        toast({ title: "Failed to delete video", variant: "destructive" })
      }
    }
  }

  const handleSetActive = async (id) => {
    const success = await setActiveVideo(id)
    if (success) {
      toast({ title: "Active video updated" })
      loadVideos()
    } else {
      toast({ title: "Failed to update active video", variant: "destructive" })
    }
  }

  const handleEdit = (video) => {
    setEditingVideo(video)
    setIsDialogOpen(true)
  }

  const handleSuccess = () => {
    setIsDialogOpen(false)
    setEditingVideo(null)
    loadVideos()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Featured Videos</h1>
            <p className="text-muted-foreground">Manage featured videos for the homepage</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Video
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="grid gap-4">
            {videos.map((video) => (
              <Card key={video.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-48 h-28 bg-black rounded overflow-hidden shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white/80" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{video.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">Video ID: {video.videoId}</p>
                        </div>
                        <div className="flex gap-2">
                          {video.isActive ? (
                            <Badge className="bg-green-600">Active</Badge>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleSetActive(video.id)}>
                              <Check className="h-4 w-4 mr-1" />
                              Set Active
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(video)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(video.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <VideoFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSuccess={handleSuccess}
          video={editingVideo}
        />
      </div>
    </AdminLayout>
  )
}
