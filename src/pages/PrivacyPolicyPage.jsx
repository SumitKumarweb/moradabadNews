import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import BreadcrumbNav from '../components/BreadcrumbNav'
import SEO from '../components/SEO'
import { Card, CardContent } from '../components/ui/card'

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Privacy Policy - Moradabad News"
        description="Learn how Moradabad News collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights."
        keywords="privacy policy, data protection, personal information, Moradabad News privacy"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: "Privacy Policy" }]} />

          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <Card>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        We collect information you provide directly to us, such as when you create an account, 
                        subscribe to our newsletter, or contact us. This may include:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Name and email address</li>
                        <li>Contact information</li>
                        <li>News preferences and interests</li>
                        <li>Any other information you choose to provide</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>We use the information we collect to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Send you newsletters and updates</li>
                        <li>Respond to your comments and questions</li>
                        <li>Analyze usage patterns to improve our website</li>
                        <li>Comply with legal obligations</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. Cookies and Tracking</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        We use cookies and similar tracking technologies to enhance your experience on our website. 
                        This includes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Google Analytics for website analytics</li>
                        <li>Google AdSense for advertising</li>
                        <li>Session cookies for website functionality</li>
                        <li>Preference cookies to remember your settings</li>
                      </ul>
                      <p>
                        You can control cookie settings through your browser preferences.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">4. Third-Party Services</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        We use third-party services that may collect information about you:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Google Analytics:</strong> Tracks website usage and performance</li>
                        <li><strong>Google AdSense:</strong> Displays relevant advertisements</li>
                        <li><strong>Firebase:</strong> Powers our backend services and database</li>
                      </ul>
                      <p>
                        These services have their own privacy policies, which we encourage you to review.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        We implement appropriate security measures to protect your personal information against 
                        unauthorized access, alteration, disclosure, or destruction. However, no method of 
                        transmission over the internet is 100% secure.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>You have the right to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Access your personal information</li>
                        <li>Correct inaccurate information</li>
                        <li>Delete your personal information</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Withdraw consent for data processing</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">7. Children's Privacy</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Our services are not directed to children under 13. We do not knowingly collect 
                        personal information from children under 13. If we become aware that we have collected 
                        personal information from a child under 13, we will take steps to delete such information.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">8. Changes to This Policy</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        We may update this privacy policy from time to time. We will notify you of any changes 
                        by posting the new privacy policy on this page and updating the "Last updated" date.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">9. Contact Us</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        If you have any questions about this privacy policy, please contact us at:
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
