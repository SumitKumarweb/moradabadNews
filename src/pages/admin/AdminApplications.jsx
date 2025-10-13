import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Trash2, Download, Mail, Phone, Github, Linkedin, ChevronDown, ChevronUp, FileText } from 'lucide-react'
import { getAllJobApplications, deleteJobApplication, updateJobApplicationStatus, getResume } from '../../lib/firebase-service'
import { useToast } from '../../hooks/use-toast'
import { formatDate } from '../../lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible'

export default function AdminApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedApps, setExpandedApps] = useState(new Set())
  const { toast } = useToast()

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedApps)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedApps(newExpanded)
  }

  const loadApplications = async () => {
    setLoading(true)
    const data = await getAllJobApplications()
    setApplications(data)
    setLoading(false)
  }

  useEffect(() => {
    loadApplications()
  }, [])

  const handleStatusChange = async (id, status) => {
    const success = await updateJobApplicationStatus(id, status)
    if (success) {
      toast({ title: "Status updated successfully" })
      loadApplications()
    }
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this application?")) {
      const success = await deleteJobApplication(id)
      if (success) {
        toast({ title: "Application deleted successfully" })
        loadApplications()
      }
    }
  }

  const handleDownloadResume = async (resumeId, applicantName) => {
    try {
      toast({ title: "Downloading resume...", description: "Please wait" })
      
      const resumeData = await getResume(resumeId)
      
      if (!resumeData) {
        toast({ 
          title: "Resume not found", 
          description: "Could not retrieve the resume file",
          variant: "destructive" 
        })
        return
      }

      // Convert base64 to blob and download
      const base64Data = resumeData.base64Data
      const byteCharacters = atob(base64Data.split(',')[1])
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: resumeData.fileType })

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${applicantName.replace(/\s+/g, '_')}_${resumeData.fileName}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast({ title: "Resume downloaded!", description: "Check your downloads folder" })
    } catch (error) {
      console.error("Error downloading resume:", error)
      toast({ 
        title: "Download failed", 
        description: "An error occurred while downloading the resume",
        variant: "destructive" 
      })
    }
  }

  const pendingCount = applications.filter((a) => a.status === "pending").length

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Applications</h1>
            <p className="text-muted-foreground">Review and manage job applications ({pendingCount} pending)</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => {
              const isExpanded = expandedApps.has(application.id)
              
              return (
                <Card key={application.id} className="overflow-hidden">
                  <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(application.id)}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{application.name}</h3>
                            <Badge variant={application.status === 'pending' ? 'default' : 'secondary'}>
                              {application.status}
                            </Badge>
                          </div>
                          
                          <p className="text-sm font-medium text-muted-foreground mb-3">
                            Applied for: <span className="text-foreground">{application.jobTitle}</span>
                          </p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {application.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {application.phone}
                            </span>
                          </div>
                          
                          {/* Collapsible Content */}
                          <CollapsibleContent>
                            <div className="mt-4 pt-4 border-t space-y-3">
                              {/* Social Links */}
                              {(application.githubId || application.linkedinId) && (
                                <div className="flex flex-wrap gap-4 text-sm">
                                  {application.githubId && (
                                    <a 
                                      href={`https://github.com/${application.githubId}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      <Github className="h-4 w-4" />
                                      {application.githubId}
                                    </a>
                                  )}
                                  {application.linkedinId && (
                                    <a 
                                      href={`https://linkedin.com/in/${application.linkedinId}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      <Linkedin className="h-4 w-4" />
                                      {application.linkedinId}
                                    </a>
                                  )}
                                </div>
                              )}
                              
                              {/* Cover Letter */}
                              {application.coverLetter && (
                                <div className="bg-muted/50 p-4 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium text-sm">Cover Letter</h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {application.coverLetter}
                                  </p>
                                </div>
                              )}
                            </div>
                          </CollapsibleContent>
                          
                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              Applied: {formatDate(application.appliedAt)}
                            </p>
                            
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm" className="gap-1">
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="h-4 w-4" />
                                    Show Less
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="h-4 w-4" />
                                    Show More
                                  </>
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleDownloadResume(application.resumeId, application.name)}
                            disabled={!application.resumeId}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download Resume
                          </Button>
                          {application.status === 'pending' && (
                            <Button size="sm" variant="secondary" onClick={() => handleStatusChange(application.id, 'reviewed')}>
                              Mark Reviewed
                            </Button>
                          )}
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(application.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Collapsible>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
