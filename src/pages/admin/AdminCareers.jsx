import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Plus, Edit, Trash2, MapPin, Briefcase } from 'lucide-react'
import { getAllJobs, deleteJob } from '../../lib/firebase-service'
import { useToast } from '../../hooks/use-toast'
import { formatDate } from '../../lib/utils'
import { JobFormDialog } from '../../components/admin/JobFormDialog'

export default function AdminCareers() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const { toast } = useToast()

  const loadJobs = async () => {
    setLoading(true)
    const data = await getAllJobs()
    setJobs(data)
    setLoading(false)
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      const success = await deleteJob(id)
      if (success) {
        toast({ title: "Job deleted successfully" })
        loadJobs()
      }
    }
  }

  const handleOpenDialog = (job = null) => {
    setEditingJob(job)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingJob(null)
  }

  const handleSuccess = () => {
    loadJobs()
    handleCloseDialog()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manage Careers</h1>
            <p className="text-muted-foreground">Post and manage job openings</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Post Job
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <Badge variant={job.isActive ? 'default' : 'secondary'}>
                          {job.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.description.substring(0, 150)}...</p>
                      <p className="text-xs text-muted-foreground mt-2">Posted: {formatDate(job.postedAt)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleOpenDialog(job)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(job.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <JobFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={handleSuccess}
          job={editingJob}
        />
      </div>
    </AdminLayout>
  )
}
