import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { 
  BookOpen, 
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Clock,
  Settings
} from 'lucide-react'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import SEO from '../components/SEO'

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      // Fetch services from localStorage (can be extended to Firebase later)
      const savedServices = localStorage.getItem('services')
      if (savedServices) {
        const parsedServices = JSON.parse(savedServices)
        setServices(parsedServices)
      } else {
        // If no services are saved, start with empty array
        setServices([])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error loading services:', error)
      setServices([])
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { label: 'Available', variant: 'default', icon: CheckCircle },
      'coming-soon': { label: 'Coming Soon', variant: 'secondary', icon: Clock },
      'development': { label: 'In Development', variant: 'outline', icon: Settings }
    }
    
    const config = statusConfig[status] || statusConfig['development']
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our Services - Digital Solutions for Education & Business"
        description="Explore our digital services including Library Management System and more. Professional solutions for modern organizations."
        keywords="library management system, digital services, education technology, business solutions"
      />
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Digital Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional digital solutions designed to streamline your operations and enhance productivity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Services Available</h3>
              <p className="text-muted-foreground mb-4">
                Services will be added soon. Please check back later.
              </p>
            </div>
          ) : (
            services.map((service) => (
            <Card key={service.id} className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
              service.isPopular ? 'ring-2 ring-primary' : ''
            }`}>
              {service.isPopular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary text-white">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {service.category}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-lg">Available Now</span>
                      {getStatusBadge(service.status)}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        asChild
                        disabled={service.status !== 'active'}
                      >
                        <a href={service.url} target="_blank" rel="noopener noreferrer">
                          Visit Service
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={service.url} target="_blank" rel="noopener noreferrer">
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-muted/50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Services?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Reliable & Secure</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security with 99.9% uptime guarantee
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Round-the-clock technical support and assistance
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy to Use</h3>
              <p className="text-sm text-muted-foreground">
                Intuitive interface designed for all skill levels
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Comprehensive</h3>
              <p className="text-sm text-muted-foreground">
                Complete solutions for all your digital needs
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl mb-6 opacity-90">
            Contact us to discuss your specific requirements and get a personalized solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/contact">
                Contact Us
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <a href="mailto:info@moradabads.com">
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  )
}
