import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import BreadcrumbNav from '../components/BreadcrumbNav'
import { Card, CardContent } from '../components/ui/card'
import { Target, Users, Award, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: "About Us" }]} />

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">About Moradabad News</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Your trusted source for the latest news from Moradabad, Uttar Pradesh, India, and around the world. We are
              committed to delivering accurate, timely, and unbiased news coverage.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="mb-16 grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">Our Mission</h2>
                <p className="leading-relaxed text-muted-foreground">
                  To provide comprehensive, accurate, and timely news coverage that empowers our readers to make
                  informed decisions. We strive to be the most trusted news source for Moradabad and beyond, maintaining
                  the highest standards of journalistic integrity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">Our Vision</h2>
                <p className="leading-relaxed text-muted-foreground">
                  To become the leading digital news platform connecting Moradabad with the world. We envision a future
                  where quality journalism thrives, communities are well-informed, and diverse voices are heard and
                  respected.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold text-foreground">Our Core Values</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                    <Award className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-bold text-foreground">Integrity</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We uphold the highest standards of honesty and ethical journalism in all our reporting.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                    <Users className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-bold text-foreground">Community</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We serve our community by highlighting local stories and giving voice to diverse perspectives.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                    <Target className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-bold text-foreground">Accuracy</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We verify facts rigorously and correct errors promptly to maintain reader trust.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* About Content */}
          <div className="mx-auto max-w-4xl">
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">Who We Are</h2>
                <div className="space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    Moradabad News is a modern digital news platform dedicated to bringing you the latest updates from
                    Moradabad, Uttar Pradesh, India, and around the globe. Founded with a vision to bridge the gap
                    between local communities and the wider world, we have grown to become a trusted source of news and
                    information.
                  </p>
                  <p>
                    Our team of experienced journalists and reporters work tirelessly to bring you accurate, unbiased,
                    and comprehensive news coverage across various categories including local news, state affairs,
                    national developments, international events, and current affairs.
                  </p>
                  <p>
                    We believe in the power of journalism to inform, educate, and empower. Our commitment to quality
                    reporting, fact-checking, and ethical journalism sets us apart in today's fast-paced digital media
                    landscape.
                  </p>
                  <p>
                    Whether you're looking for breaking news, in-depth analysis, or feature stories, Moradabad News is
                    your go-to destination for staying informed about what matters most to you and your community.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

