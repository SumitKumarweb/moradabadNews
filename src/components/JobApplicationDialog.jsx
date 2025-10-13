import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { useToast } from '../hooks/use-toast'
import { addJobApplication, uploadResume } from '../lib/firebase-service'
import { Loader2, Upload, Github, Linkedin, Mail, Phone, User, FileText } from 'lucide-react'

export function JobApplicationDialog({ open, onOpenChange, jobTitle, jobId }) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    githubId: '',
    linkedinId: '',
    coverLetter: '',
    resumeId: '', // Changed from resumeUrl to resumeId
  })
  const [resumeFile, setResumeFile] = useState(null)
  const fileInputRef = useRef(null)
  
  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        githubId: '',
        linkedinId: '',
        coverLetter: '',
        resumeId: '', // Changed from resumeUrl to resumeId
      })
      setResumeFile(null)
      setUploading(false)
      setLoading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
}
    }
  }, [open])

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (2MB max for Firestore base64 storage)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 2MB',
        variant: 'destructive',
      })
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      return
    }

    // Set uploading state immediately
    setUploading(true)
    setResumeFile(file)

    // Show immediate feedback
    toast({
      title: 'Uploading resume...',
      description: 'Please wait while we save your file',
    })

    try {
      console.log('Starting upload for:', file.name)
      const resumeId = await uploadResume(file)
      console.log('Upload completed. Resume ID:', resumeId)
      
      // Use functional update to avoid stale state closure issue
      setFormData(prev => ({ ...prev, resumeId: resumeId }))
      setUploading(false) // Stop loading BEFORE showing success
      toast({ 
        title: '✓ Resume uploaded!',
        description: 'Your resume has been saved successfully',
      })
    } catch (error) {
      console.error('Upload error:', error)
      setUploading(false)
      
      // Show specific error message if available
      const errorMessage = error.message || 'An error occurred. Please check your connection and try again.'
      
      toast({
        title: 'Upload error',
        description: errorMessage,
        variant: 'destructive',
      })
      setResumeFile(null)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate resume ID
    if (!formData.resumeId || !formData.resumeId.trim()) {
      toast({
        title: 'Resume required',
        description: 'Please upload your resume before submitting',
        variant: 'destructive',
      })
      return
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    // Show submitting feedback
    toast({
      title: 'Submitting application...',
      description: 'Please wait a moment',
    })

    try {
      const applicationData = {
        ...formData,
        jobId,
        jobTitle,
        appliedAt: new Date().toISOString(),
      }

      console.log('Submitting application:', applicationData)

      const result = await addJobApplication(applicationData)

      if (result) {
        toast({
          title: '✅ Application submitted!',
          description: 'We will review your application and get back to you soon.',
        })
        onOpenChange(false)
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          githubId: '',
          linkedinId: '',
          coverLetter: '',
          resumeId: '',
        })
        setResumeFile(null)
      } else {
        toast({
          title: 'Submission failed',
          description: 'Failed to submit application. Please try again.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Submit error:', error)
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Fill in your details below to apply for this position
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="john.doe@example.com"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder="+91 1234567890"
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Professional Profiles */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold">Professional Profiles</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="githubId">GitHub Username</Label>
                <div className="relative">
                  <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="githubId"
                    value={formData.githubId}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubId: e.target.value }))}
                    placeholder="yourusername"
                    className="pl-9"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Just the username, not full URL
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinId">LinkedIn Profile</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="linkedinId"
                    value={formData.linkedinId}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedinId: e.target.value }))}
                    placeholder="linkedin.com/in/yourprofile"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Resume Upload
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="resume">Upload Resume (PDF, DOC, DOCX) *</Label>
              <div className="flex items-center gap-2">
                <Input
                  ref={fileInputRef}
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={uploading}
                  required
                />
                {uploading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
              </div>
              {resumeFile && !uploading && (
                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950 rounded border border-green-200 dark:border-green-800">
                  <Upload className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    ✓ {resumeFile.name} uploaded successfully
                  </span>
                </div>
              )}
              {uploading && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-sm text-blue-600">
                    Uploading to Firestore... Please wait
                  </span>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Maximum file size: 2MB. Supported: PDF, DOC, DOCX
              </p>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold">Cover Letter <span className="text-muted-foreground text-sm font-normal">(Optional)</span></h3>
            
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Why are you interested in this position?</Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                placeholder="Tell us why you're a great fit for this role... (Optional)"
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                This field is optional but recommended
              </p>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading || uploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploading || !formData.resumeId}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {uploading ? 'Uploading Resume...' : 'Submit Application'}
            </Button>
          </DialogFooter>
          
          {uploading && (
            <p className="text-xs text-center text-muted-foreground mt-2">
              Please wait while your resume is being saved...
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

