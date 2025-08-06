'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import HomieLogo from '@/components/HomieLogo'
import { useRouter } from 'next/navigation'
import { Sparkles, Home, MapPin, Users, Star, Upload, X, CheckCircle, AlertCircle } from 'lucide-react'

interface PropertyFormData {
  title: string
  description: string
  location: string
  propertyType: string
  maxGuests: string
  bedrooms: string
  bathrooms: string
  price: string
  amenities: string[]
  images: File[]
  hostName: string
  hostEmail: string
  hostPhone: string
}

const amenityOptions = [
  'WiFi', 'Parking', 'Kitchen', 'AC', 'TV', 'Washing Machine', 'Pool', 'Gym',
  'Breakfast', 'Pets Allowed', 'Smoking Allowed', 'Wheelchair Accessible',
  'Balcony', 'Garden', 'Security', 'Power Backup', 'Hot Water', 'Refrigerator'
]

const propertyTypes = [
  'Entire Home', 'Private Room', 'Shared Room', 'Villa', 'Apartment', 'Cottage', 'Bungalow'
]

export default function BecomeHost() {
  const router = useRouter()
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    location: '',
    propertyType: '',
    maxGuests: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    amenities: [],
    images: [],
    hostName: '',
    hostEmail: '',
    hostPhone: ''
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (field: keyof PropertyFormData, value: string | string[] | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAIGenerate = async () => {
    if (!formData.title && !formData.location) {
      setAiSuggestion('Please provide at least a property title and location to generate AI suggestions.')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an expert property description writer for homestay listings. Generate compelling, accurate descriptions and suggest appropriate amenities and pricing based on the property details provided.'
            },
            {
              role: 'user',
              content: `Generate a property description and suggestions for:
Title: ${formData.title}
Location: ${formData.location}
Property Type: ${formData.propertyType || 'Not specified'}
Max Guests: ${formData.maxGuests || 'Not specified'}
Bedrooms: ${formData.bedrooms || 'Not specified'}
Bathrooms: ${formData.bathrooms || 'Not specified'}

Please provide:
1. A compelling property description (2-3 paragraphs)
2. Suggested amenities (comma-separated)
3. Suggested price per night in INR
4. Additional tips for hosting`
            }
          ]
        }),
      })

      const data = await response.json()
      if (data.choices && data.choices[0]) {
        setAiSuggestion(data.choices[0].message.content)
        
        // Parse AI suggestions and auto-fill form
        const lines = data.choices[0].message.content.split('\n')
        let description = ''
        let amenities: string[] = []
        let price = ''
        
        for (const line of lines) {
          if (line.toLowerCase().includes('description') || line.toLowerCase().includes('property')) {
            description += line + '\n'
          } else if (line.toLowerCase().includes('amenit')) {
            const amenityMatch = line.match(/(?:amenities|suggested):\s*(.+)/i)
            if (amenityMatch) {
              amenities = amenityMatch[1].split(',').map(a => a.trim()).filter(a => amenityOptions.includes(a))
            }
          } else if (line.toLowerCase().includes('price') || line.toLowerCase().includes('inr')) {
            const priceMatch = line.match(/₹?(\d+)/)
            if (priceMatch) {
              price = priceMatch[1]
            }
          }
        }
        
        if (description && !formData.description) {
          handleInputChange('description', description.trim())
        }
        if (amenities.length > 0 && formData.amenities.length === 0) {
          handleInputChange('amenities', amenities)
        }
        if (price && !formData.price) {
          handleInputChange('price', price)
        }
      }
    } catch (error) {
      setAiSuggestion('Failed to generate AI suggestions. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const currentAmenities = formData.amenities
    if (checked) {
      handleInputChange('amenities', [...currentAmenities, amenity])
    } else {
      handleInputChange('amenities', currentAmenities.filter(a => a !== amenity))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    handleInputChange('images', [...formData.images, ...files])
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    handleInputChange('images', newImages)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call to submit property
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store property in localStorage for demo purposes
      const properties = JSON.parse(localStorage.getItem('homieProperties') || '[]')
      const newProperty = {
        id: Date.now().toString(),
        ...formData,
        rating: 4.5,
        verified: false,
        createdAt: new Date().toISOString()
      }
      properties.push(newProperty)
      localStorage.setItem('homieProperties', JSON.stringify(properties))
      
      setSubmissionStatus('success')
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error) {
      setSubmissionStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return formData.title && formData.description && formData.location && 
           formData.propertyType && formData.maxGuests && formData.price &&
           formData.hostName && formData.hostEmail && formData.hostPhone
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-saffron-10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <HomieLogo size="md" animated={true} />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-indigo-700 hover:text-indigo-900 font-medium">Explore</a>
            <a href="/mission" className="text-indigo-700 hover:text-indigo-900 font-medium">Mission</a>
            <Button variant="outline" size="sm">Sign In</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Property Submission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
              List Your Property on Homie
            </h1>
            <p className="text-xl text-indigo-700 mb-6">
              Join India's zero-commission homestay platform
            </p>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Zero Commission - You keep 100% of your earnings!</span>
            </div>
          </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Assistant */}
            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-indigo-600" />
                  AI Property Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-indigo-700 mb-4">
                  Let our AI help you create the perfect property listing. Fill in the basic details and click "Generate AI Suggestions".
                </p>
                <Button 
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-indigo-600 to-saffron-600 hover:from-indigo-700 hover:to-saffron-700"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating AI Suggestions...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Generate AI Suggestions</span>
                    </div>
                  )}
                </Button>
                
                {aiSuggestion && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-indigo-900 mb-2">AI Suggestions:</h4>
                    <div className="text-sm text-indigo-700 whitespace-pre-line">{aiSuggestion}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="w-5 h-5 mr-2 text-indigo-600" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Cozy Cottage in Goa with Private Pool"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Property Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your property, its unique features, and what makes it special..."
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="e.g., Goa, India"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="maxGuests">Max Guests *</Label>
                    <Input
                      id="maxGuests"
                      type="number"
                      value={formData.maxGuests}
                      onChange={(e) => handleInputChange('maxGuests', e.target.value)}
                      placeholder="2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      placeholder="1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="price">Price per Night (INR) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="2500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-indigo-600" />
                  Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-3">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                      />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-indigo-600" />
                  Property Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="images">Upload Images</Label>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-2"
                    />
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Property ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Host Information */}
            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-indigo-600" />
                  Host Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hostName">Full Name *</Label>
                    <Input
                      id="hostName"
                      value={formData.hostName}
                      onChange={(e) => handleInputChange('hostName', e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="hostEmail">Email Address *</Label>
                    <Input
                      id="hostEmail"
                      type="email"
                      value={formData.hostEmail}
                      onChange={(e) => handleInputChange('hostEmail', e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="hostPhone">Phone Number *</Label>
                  <Input
                    id="hostPhone"
                    type="tel"
                    value={formData.hostPhone}
                    onChange={(e) => handleInputChange('hostPhone', e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className="bg-gradient-to-r from-indigo-600 to-saffron-600 hover:from-indigo-700 hover:to-saffron-700 px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'List Your Property'
                )}
              </Button>
            </div>

            {/* Submission Status */}
            {submissionStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-green-800 font-semibold">Property Listed Successfully!</h3>
                <p className="text-green-700">Your property has been submitted and will be reviewed shortly.</p>
              </div>
            )}

            {submissionStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="text-red-800 font-semibold">Submission Failed</h3>
                <p className="text-red-700">Please try again or contact support if the problem persists.</p>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="border-indigo-100 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                  Property Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.title ? (
                    <div>
                      <h3 className="font-semibold text-indigo-900">{formData.title}</h3>
                      <p className="text-sm text-indigo-600">{formData.location}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Property title will appear here</p>
                  )}
                  
                  <Separator />
                  
                  {formData.description ? (
                    <p className="text-sm text-gray-700 line-clamp-4">{formData.description}</p>
                  ) : (
                    <p className="text-gray-500 text-sm">Property description will appear here</p>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    {formData.propertyType && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{formData.propertyType}</span>
                      </div>
                    )}
                    
                    {formData.maxGuests && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Guests:</span>
                        <span className="font-medium">{formData.maxGuests}</span>
                      </div>
                    )}
                    
                    {formData.bedrooms && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Bedrooms:</span>
                        <span className="font-medium">{formData.bedrooms}</span>
                      </div>
                    )}
                    
                    {formData.bathrooms && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Bathrooms:</span>
                        <span className="font-medium">{formData.bathrooms}</span>
                      </div>
                    )}
                    
                    {formData.price && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium text-green-600">₹{formData.price}/night</span>
                      </div>
                    )}
                  </div>
                  
                  {formData.amenities.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities:</h4>
                        <div className="flex flex-wrap gap-1">
                          {formData.amenities.slice(0, 6).map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {formData.amenities.length > 6 && (
                            <Badge variant="secondary" className="text-xs">
                              +{formData.amenities.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  
                  <Separator />
                  
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Zero Commission</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}