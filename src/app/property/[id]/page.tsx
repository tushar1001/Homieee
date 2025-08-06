'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Heart, Share2, MapPin, Star, Home, Users, Bath, Wifi, Car, Coffee, Shield, Award } from 'lucide-react'
import HomieLogo from '@/components/HomieLogo'
import ThreeDTour from '@/components/ThreeDTour'

interface Property {
  id: string
  title: string
  description: string
  location: string
  price: number
  rating: number
  reviews: number
  isVerified: boolean
  amenities: string[]
  host: {
    name: string
    isSuperhost: boolean
    joinedDate: string
    responseRate: number
  }
  images: string[]
  maxGuests: number
  bedrooms: number
  bathrooms: number
  type: string
}

export default function PropertyDetails() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    // Mock property data - in a real app, this would come from an API
    const mockProperty: Property = {
      id: params.id as string,
      title: "Luxury Heritage Villa with Private Pool",
      description: "Experience the perfect blend of traditional Indian architecture and modern luxury in this stunning heritage villa. Located in the heart of Jaipur, this property offers breathtaking views of the Aravalli hills and comes with a private pool, traditional courtyard, and modern amenities.",
      location: "Jaipur, Rajasthan",
      price: 8500,
      rating: 4.9,
      reviews: 127,
      isVerified: true,
      amenities: ["WiFi", "Pool", "Parking", "Kitchen", "AC", "TV", "Gym", "Security"],
      host: {
        name: "Rajesh Sharma",
        isSuperhost: true,
        joinedDate: "2019",
        responseRate: 98
      },
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ],
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 3,
      type: "Entire Villa"
    }

    // Simulate API call
    setTimeout(() => {
      setProperty(mockProperty)
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h1>
          <Button onClick={() => router.push('/')} className="bg-orange-600 hover:bg-orange-700">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, React.ReactNode> = {
      'WiFi': <Wifi className="h-4 w-4" />,
      'Pool': <div className="h-4 w-4">🏊</div>,
      'Parking': <Car className="h-4 w-4" />,
      'Kitchen': <div className="h-4 w-4">🍳</div>,
      'AC': <div className="h-4 w-4">❄️</div>,
      'TV': <div className="h-4 w-4">📺</div>,
      'Gym': <div className="h-4 w-4">💪</div>,
      'Security': <Shield className="h-4 w-4" />
    }
    return icons[amenity] || <div className="h-4 w-4">✓</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
              <HomieLogo className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Homie
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button className="text-gray-700 hover:text-orange-600 transition-colors">Explore</button>
              <button className="text-gray-700 hover:text-orange-600 transition-colors">Host</button>
              <button className="text-gray-700 hover:text-orange-600 transition-colors">Support</button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.location}</span>
            <div className="flex items-center ml-4">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="mx-1">·</span>
              <span>{property.reviews} reviews</span>
            </div>
            {property.isVerified && (
              <Badge variant="secondary" className="ml-4 bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="md:col-span-1">
            <img
              src={property.images[selectedImage]}
              alt={property.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {property.images.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 1}`}
                className={`w-full h-44 object-cover rounded-lg cursor-pointer transition-all ${
                  selectedImage === index ? 'ring-2 ring-orange-600' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="h-5 w-5 mr-2 text-orange-600" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{property.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="font-semibold">{property.maxGuests}</div>
                    <div className="text-sm text-gray-600">Guests</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl mb-2">🛏️</div>
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-600">Property Type</span>
                    <div className="font-semibold">{property.type}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coffee className="h-5 w-5 mr-2 text-orange-600" />
                  Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                      {getAmenityIcon(amenity)}
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 3D Virtual Tour */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="h-5 w-5 mr-2">🎮</div>
                  3D Virtual Tour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 rounded-lg overflow-hidden">
                  <ThreeDTour />
                </div>
              </CardContent>
            </Card>

            {/* Host Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="h-5 w-5 mr-2">👤</div>
                  Host Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-orange-800">
                      {property.host.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{property.host.name}</h3>
                      {property.host.isSuperhost && (
                        <Badge className="bg-orange-100 text-orange-800">
                          <Award className="h-3 w-3 mr-1" />
                          Superhost
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600">Member since {property.host.joinedDate}</p>
                    <p className="text-sm text-gray-500">{property.host.responseRate}% response rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">₹{property.price.toLocaleString()}</CardTitle>
                <p className="text-gray-600">per night</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3">
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                    Contact Host
                  </Button>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Zero Commission Booking</p>
                    <Badge className="bg-green-100 text-green-800">
                      Save up to 20% compared to other platforms
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}