import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import BreadcrumbNav from '../components/BreadcrumbNav'
import SEO from '../components/SEO'
import { Card, CardContent } from '../components/ui/card'

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Terms of Service - Moradabad News"
        description="Read our terms of service and user agreement for using Moradabad News website and services."
        keywords="terms of service, user agreement, website terms, Moradabad News terms"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: "Terms of Service" }]} />

          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <Card>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        By accessing and using Moradabad News website, you accept and agree to be bound by the 
                        terms and provision of this agreement. If you do not agree to abide by the above, 
                        please do not use this service.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">2. Use License</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Permission is granted to temporarily download one copy of the materials on Moradabad News 
                        for personal, non-commercial transitory viewing only. This is the grant of a license, 
                        not a transfer of title, and under this license you may not:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose or for any public display</li>
                        <li>Attempt to reverse engineer any software contained on the website</li>
                        <li>Remove any copyright or other proprietary notations from the materials</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. Content and Conduct</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>Users agree not to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Post or transmit any unlawful, threatening, defamatory, or obscene content</li>
                        <li>Violate any applicable laws or regulations</li>
                        <li>Infringe on the rights of others</li>
                        <li>Distribute spam or unsolicited communications</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">4. Intellectual Property</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        All content on this website, including but not limited to text, graphics, logos, 
                        images, and software, is the property of Moradabad News and is protected by copyright 
                        and other intellectual property laws.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">5. Disclaimer</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        The materials on Moradabad News are provided on an 'as is' basis. Moradabad News 
                        makes no warranties, expressed or implied, and hereby disclaims and negates all other 
                        warranties including without limitation, implied warranties or conditions of merchantability, 
                        fitness for a particular purpose, or non-infringement of intellectual property or other 
                        violation of rights.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">6. Limitations</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        In no event shall Moradabad News or its suppliers be liable for any damages (including, 
                        without limitation, damages for loss of data or profit, or due to business interruption) 
                        arising out of the use or inability to use the materials on Moradabad News, even if 
                        Moradabad News or an authorized representative has been notified orally or in writing 
                        of the possibility of such damage.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">7. Accuracy of Materials</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        The materials appearing on Moradabad News could include technical, typographical, 
                        or photographic errors. Moradabad News does not warrant that any of the materials on 
                        its website are accurate, complete, or current. Moradabad News may make changes to 
                        the materials contained on its website at any time without notice.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">8. Links to Other Websites</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Moradabad News has not reviewed all of the sites linked to our website and is not 
                        responsible for the contents of any such linked site. The inclusion of any link does 
                        not imply endorsement by Moradabad News of the site.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">9. Modifications</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Moradabad News may revise these terms of service for its website at any time without 
                        notice. By using this website, you are agreeing to be bound by the then current 
                        version of these terms of service.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">10. Governing Law</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        These terms and conditions are governed by and construed in accordance with the laws 
                        of India and you irrevocably submit to the exclusive jurisdiction of the courts in 
                        that state or location.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">11. Contact Information</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        If you have any questions about these Terms of Service, please contact us at:
                      </p>
                      <div className="bg-muted p-4 rounded-lg">
                        <p><strong>Email:</strong> info@moradabads.com</p>
                        <p><strong>Phone:</strong> +91 8791447027</p>
                        <p><strong>Address:</strong> Moradabad News Office, Civil Lines, Moradabad, Uttar Pradesh 244001, India</p>
                      </div>
                    </div>
                  </section>
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
