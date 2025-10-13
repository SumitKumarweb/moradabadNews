import { useState, useEffect } from "react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { getAllArticles, deleteArticle } from "../../lib/firebase-service"
import { Eye, Edit, Trash2, Loader2 } from "lucide-react"
import { formatDate } from "../../lib/utils"
import { useToast } from "../../hooks/use-toast"
import { PostFormDialog } from "./PostFormDialog"

export function PostsTable({ onEdit }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState(undefined)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    setLoading(true)
    const articles = await getAllArticles()
    setPosts(articles)
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this post?")) return

    const success = await deleteArticle(id)
    if (success) {
      toast({
        title: "Success",
        description: "Post deleted successfully",
      })
      loadPosts()
    } else {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      })
    }
  }

  function handleEdit(post) {
    setEditingPost(post)
    setIsEditDialogOpen(true)
  }

  function handleEditSuccess() {
    setIsEditDialogOpen(false)
    setEditingPost(undefined)
    loadPosts()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">No posts found. Create your first post to get started.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Author</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Views</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Published</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{post.summary}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="capitalize">
                        {post.category.replace("-", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{post.author}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        {post.views?.toLocaleString() || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(post.publishedAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {post.isFeatured && <Badge className="bg-blue-600">Featured</Badge>}
                        {post.isTrending && <Badge className="bg-orange-600">Trending</Badge>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(post)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
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

      <PostFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={handleEditSuccess}
        post={editingPost}
      />
    </>
  )
}

