import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import BreadcrumbNav from '../components/BreadcrumbNav'
import { ContactForm } from '../components/ContactForm'
import { Card, CardContent } from '../components/ui/card'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: "Contact Us" }]} />

          <div className="mb-12 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">Contact Us</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Have a question, feedback, or news tip? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-bold text-foreground">Email</h3>
                  <p className="text-sm text-muted-foreground">info@moradabads.com</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-bold text-foreground">Phone</h3>
                  <p className="text-sm text-muted-foreground">+91 8791447027</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-bold text-foreground">Address</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Moradabad News Office<br />
                    Civil Lines, Moradabad<br />
                    Uttar Pradesh 244001<br />
                    India
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-bold text-foreground">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="mt-1 text-sm text-muted-foreground">Saturday: 9:00 AM - 2:00 PM</p>
                  <p className="mt-1 text-sm text-muted-foreground">Sunday: Closed</p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">Send us a Message</h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

