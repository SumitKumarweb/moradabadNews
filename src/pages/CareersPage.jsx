import { useState, useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import BreadcrumbNav from '../components/BreadcrumbNav'
import SEO from '../components/SEO'
import { getActiveJobs } from '../lib/firebase-service'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { JobApplicationDialog } from '../components/JobApplicationDialog'
import { Briefcase, MapPin, Clock, DollarSign, ChevronDown, ChevronUp } from 'lucide-react'
import { format } from 'date-fns'

export default function CareersPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [applicationDialog, setApplicationDialog] = useState({
    open: false,
    jobTitle: "",
    jobId: "",
  })

  useEffect(() => {
    const loadJobs = async () => {
      const data = await getActiveJobs()
      setJobs(data)
      setLoading(false)
    }
    loadJobs()
  }, [])

  const getJobTypeBadge = (type) => {
    const variants = {
      "full-time": "default",
      "part-time": "secondary",
      "contract": "outline",
      "internship": "outline",
    }
    return <Badge variant={variants[type]}>{type.replace("-", " ").toUpperCase()}</Badge>
  }

  const handleApply = (jobTitle, jobId) => {
    setApplicationDialog({ open: true, jobTitle, jobId })
  }

  return (
    <>
      <SEO
        title="Careers"
        description="Join Moradabad's leading news organization. Explore career opportunities at Moradabad News and grow with us. Be part of our team."
        keywords="careers, jobs, Moradabad News jobs, journalism careers, media jobs, job opportunities"
      />
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: "Careers" }]} />

          <div className="mt-8 space-y-8">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold">Join Our Team</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Be part of Moradabad's leading news organization. Explore career opportunities and grow with us.
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : jobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No openings at the moment</h3>
                  <p className="text-sm text-muted-foreground">
                    Check back later for new opportunities or send your resume to careers@moradabads.com
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => {
                  const isExpanded = expandedId === job.id
                  return (
                    <Card key={job.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <CardTitle className="text-2xl">{job.title}</CardTitle>
                              {getJobTypeBadge(job.type)}
                            </div>
                            <CardDescription className="mt-2 flex flex-wrap items-center gap-4 text-base">
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {job.department}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </span>
                              {job.salary && (
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  {job.salary}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Posted {format(new Date(job.postedAt), "MMM d, yyyy")}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold">Description</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>
                          </div>

                          {isExpanded && (
                            <>
                              <div>
                                <h3 className="font-semibold">Responsibilities</h3>
                                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                  {job.responsibilities.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h3 className="font-semibold">Requirements</h3>
                                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                  {job.requirements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )}

                          <div className="flex gap-3 pt-4">
                            <Button onClick={() => handleApply(job.title, job.id)}>
                              Apply Now
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setExpandedId(isExpanded ? null : job.id)}
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="mr-2 h-4 w-4" />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="mr-2 h-4 w-4" />
                                  View Details
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
      
      <JobApplicationDialog
        open={applicationDialog.open}
        onOpenChange={(open) => setApplicationDialog({ ...applicationDialog, open })}
        jobTitle={applicationDialog.jobTitle}
        jobId={applicationDialog.jobId}
      />
    </>
  )
}
