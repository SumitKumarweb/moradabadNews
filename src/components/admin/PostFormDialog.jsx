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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from "../ui/switch"
import { addArticle, updateArticle } from "../../lib/firebase-service"
import { useToast } from "../../hooks/use-toast"
import { Loader2, ChevronDown } from "lucide-react"

export function PostFormDialog({ open, onOpenChange, onSuccess, post }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showMetadata, setShowMetadata] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "moradabad",
    image: "",
    author: "",
    tags: "",
    isFeatured: false,
    isTrending: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ogImage: "",
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        summary: post.summary,
        content: post.content,
        category: post.category,
        image: post.image,
        author: post.author,
        tags: post.tags.join(", "),
        isFeatured: post.isFeatured,
        isTrending: post.isTrending,
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        metaKeywords: post.metaKeywords?.join(", ") || "",
        ogImage: post.ogImage || "",
      })
    } else {
      // Reset form when creating new post
      setFormData({
        title: "",
        summary: "",
        content: "",
        category: "moradabad",
        image: "",
        author: "",
        tags: "",
        isFeatured: false,
        isTrending: false,
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        ogImage: "",
      })
    }
  }, [post, open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const articleData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      metaTitle: formData.metaTitle || undefined,
      metaDescription: formData.metaDescription || undefined,
      metaKeywords: formData.metaKeywords
        ? formData.metaKeywords
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean)
        : undefined,
      ogImage: formData.ogImage || undefined,
    }

    try {
      let success
      if (post) {
        success = await updateArticle(post.id, articleData)
      } else {
        success = await addArticle(articleData)
      }

      if (success) {
        toast({
          title: "Success",
          description: post ? "Post updated successfully" : "Post created successfully",
        })
        onSuccess()
      } else {
        toast({
          title: "Error",
          description: "Failed to save post",
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Post" : "Create New Post"}</DialogTitle>
          <DialogDescription>
            {post ? "Update the post details below" : "Fill in the details to create a new post"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Enter post title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moradabad">Moradabad</SelectItem>
                  <SelectItem value="up">UP</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="current-affairs">Current Affairs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary *</Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              required
              placeholder="Brief summary of the article"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              placeholder="Full article content (HTML supported)"
              rows={10}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                placeholder="Author name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="news, breaking, local"
            />
          </div>

          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="trending"
                checked={formData.isTrending}
                onCheckedChange={(checked) => setFormData({ ...formData, isTrending: checked })}
              />
              <Label htmlFor="trending" className="cursor-pointer">
                Trending
              </Label>
            </div>
          </div>

          {/* SEO Metadata Section */}
          <div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setShowMetadata(!showMetadata)}
            >
              <ChevronDown className={`mr-2 h-4 w-4 transition-transform ${showMetadata ? 'rotate-180' : ''}`} />
              {showMetadata ? 'Hide' : 'Show'} SEO Metadata
            </Button>

            {showMetadata && (
              <div className="mt-4 space-y-4 border-t pt-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="SEO title (defaults to post title)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="SEO description (defaults to summary)"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaKeywords">Meta Keywords (comma-separated)</Label>
                  <Input
                    id="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImage">OG Image URL</Label>
                  <Input
                    id="ogImage"
                    value={formData.ogImage}
                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                    placeholder="Social media share image URL"
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {post ? "Update Post" : "Create Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

