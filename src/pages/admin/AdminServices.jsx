import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  BookOpen,
  CheckCircle,
  Clock,
  Settings,
  ExternalLink
} from 'lucide-react'

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: 'Education',
    status: 'active',
    features: '',
    isPopular: false
  })

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      // Load services from localStorage
      const savedServices = localStorage.getItem('services')
      if (savedServices) {
        const parsedServices = JSON.parse(savedServices)
        setServices(parsedServices)
      } else {
        // If no services exist, start with empty array
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
      'active': { label: 'Active', variant: 'default', icon: CheckCircle },
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

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddService = () => {
    setEditingService(null)
    setFormData({
      title: '',
      description: '',
      url: '',
      category: 'Education',
      status: 'active',
      features: '',
      isPopular: false
    })
    setIsDialogOpen(true)
  }

  const handleEditService = (service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      url: service.url,
      category: service.category,
      status: service.status,
      features: service.features.join('\n'),
      isPopular: service.isPopular
    })
    setIsDialogOpen(true)
  }

  const handleSaveService = () => {
    if (!formData.title || !formData.description || !formData.url) {
      alert('Please fill in all required fields')
      return
    }

    const serviceData = {
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim()),
      updatedAt: new Date()
    }

    let updatedServices
    if (editingService) {
      // Update existing service
      updatedServices = services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...serviceData }
          : service
      )
    } else {
      // Add new service
      const newService = {
        id: Date.now().toString(),
        ...serviceData,
        createdAt: new Date()
      }
      updatedServices = [newService, ...services]
    }

    // Save to localStorage
    localStorage.setItem('services', JSON.stringify(updatedServices))
    setServices(updatedServices)
    setIsDialogOpen(false)
    setEditingService(null)
  }

  const handleDeleteService = (serviceId) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const updatedServices = services.filter(service => service.id !== serviceId)
      localStorage.setItem('services', JSON.stringify(updatedServices))
      setServices(updatedServices)
    }
  }

  const handleStatusChange = (serviceId, newStatus) => {
    const updatedServices = services.map(service => 
      service.id === serviceId 
        ? { ...service, status: newStatus, updatedAt: new Date() }
        : service
    )
    localStorage.setItem('services', JSON.stringify(updatedServices))
    setServices(updatedServices)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Services Management</h1>
            <p className="text-muted-foreground">Manage your digital services and offerings</p>
          </div>
          <Button onClick={handleAddService}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Services</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by title, description, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Services ({filteredServices.length})</CardTitle>
            <CardDescription>Manage your digital services and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Popular</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary text-white">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">{service.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{service.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(service.status)}
                          <Select
                            value={service.status}
                            onValueChange={(value) => handleStatusChange(service.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="coming-soon">Coming Soon</SelectItem>
                              <SelectItem value="development">Development</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <a 
                            href={service.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm truncate max-w-32"
                          >
                            {service.url}
                          </a>
                          <Button variant="ghost" size="icon" asChild>
                            <a href={service.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {service.isPopular ? (
                          <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditService(service)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteService(service.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Service Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
              <DialogDescription>
                {editingService ? 'Update the service information' : 'Create a new service offering'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Service Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Library Management System"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="url">Service URL *</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://service.moradabads.com"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the service and its benefits..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="coming-soon">Coming Soon</SelectItem>
                      <SelectItem value="development">In Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPopular: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="isPopular">Mark as Popular Service</Label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveService}>
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
