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
import { addHeaderBanner, updateHeaderBanner } from "../../lib/firebase-service"
import { useToast } from "../../hooks/use-toast"
import { Loader2 } from "lucide-react"

export function HeaderBannerFormDialog({ open, onOpenChange, onSuccess, banner }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isActive: false,
    backgroundColor: "#f0f0f0",
    textColor: "#000000",
  })

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title,
        content: banner.content,
        isActive: banner.isActive,
        backgroundColor: banner.backgroundColor || "#f0f0f0",
        textColor: banner.textColor || "#000000",
      })
    } else {
      setFormData({
        title: "",
        content: "",
        isActive: false,
        backgroundColor: "#f0f0f0",
        textColor: "#000000",
      })
    }
  }, [banner, open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let success
      if (banner) {
        success = await updateHeaderBanner(banner.id, formData)
      } else {
        success = await addHeaderBanner(formData)
      }

      if (success) {
        toast({
          title: "Success",
          description: banner ? "Banner updated successfully" : "Banner created successfully",
        })
        onSuccess()
      } else {
        toast({
          title: "Error",
          description: "Failed to save banner",
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{banner ? "Edit Banner" : "Create New Banner"}</DialogTitle>
          <DialogDescription>
            {banner ? "Update the banner details" : "Create a new header banner"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Banner title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (HTML) *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              placeholder="<p>Banner content with HTML</p>"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={formData.backgroundColor}
                  onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                  className="w-16 h-10"
                />
                <Input
                  value={formData.backgroundColor}
                  onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                  placeholder="#f0f0f0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="textColor">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  id="textColor"
                  type="color"
                  value={formData.textColor}
                  onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                  className="w-16 h-10"
                />
                <Input
                  value={formData.textColor}
                  onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {banner ? "Update Banner" : "Create Banner"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

