import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { RefreshCw, Mail, Trash2 } from 'lucide-react'
import { getAllMessages, updateMessageStatus, deleteMessage } from '../../lib/firebase-service'
import { useToast } from '../../hooks/use-toast'
import { formatDate } from '../../lib/utils'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const loadMessages = async () => {
    setLoading(true)
    const data = await getAllMessages()
    setMessages(data)
    setLoading(false)
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const handleStatusChange = async (id, status) => {
    const success = await updateMessageStatus(id, status)
    if (success) {
      toast({ title: "Message status updated" })
      loadMessages()
    }
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      const success = await deleteMessage(id)
      if (success) {
        toast({ title: "Message deleted successfully" })
        loadMessages()
      }
    }
  }

  const unreadCount = messages.filter((m) => m.status === "unread").length

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">Manage contact form submissions ({unreadCount} unread)</p>
          </div>
          <Button onClick={loadMessages} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-4 w-4" />
                        <h3 className="font-semibold">{message.name}</h3>
                        <Badge variant={message.status === 'unread' ? 'default' : 'secondary'}>
                          {message.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                      <p className="text-sm font-medium mt-2">{message.subject}</p>
                      <p className="text-sm text-muted-foreground mt-2">{message.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{formatDate(message.createdAt)}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {message.status === 'unread' && (
                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(message.id, 'read')}>
                          Mark Read
                        </Button>
                      )}
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(message.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
