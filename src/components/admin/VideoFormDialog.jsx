import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { addVideo, updateVideo } from "../../lib/firebase-service"
import { useToast } from "../../hooks/use-toast"
import { Loader2 } from "lucide-react"

export function VideoFormDialog({ open, onOpenChange, onSuccess, video }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    videoId: "",
    title: "",
    description: "",
    isActive: false,
  })

  useEffect(() => {
    if (video) {
      setFormData({
        videoId: video.videoId,
        title: video.title,
        description: video.description,
        isActive: video.isActive,
      })
    } else {
      setFormData({
        videoId: "",
        title: "",
        description: "",
        isActive: false,
      })
    }
  }, [video, open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let success
      if (video) {
        success = await updateVideo(video.id, formData)
      } else {
        success = await addVideo(formData)
      }

      if (success) {
        toast({
          title: "Success",
          description: video ? "Video updated successfully" : "Video added successfully",
        })
        onSuccess()
      } else {
        toast({
          title: "Error",
          description: "Failed to save video",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{video ? "Edit Video" : "Add New Video"}</DialogTitle>
          <DialogDescription>
            Enter YouTube video ID and details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="videoId">YouTube Video ID *</Label>
            <Input
              id="videoId"
              value={formData.videoId}
              onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
              required
              placeholder="dQw4w9WgXcQ"
            />
            <p className="text-xs text-muted-foreground">
              Example: For https://youtube.com/watch?v=dQw4w9WgXcQ, use: dQw4w9WgXcQ
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Video title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Video description"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {video ? "Update Video" : "Add Video"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

