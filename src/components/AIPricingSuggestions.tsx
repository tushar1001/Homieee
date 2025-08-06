'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Sparkles, TrendingUp, TrendingDown, Minus, Calendar, MapPin, Star, Users, Wifi, Car, Coffee } from 'lucide-react'

interface AIPricingSuggestionsProps {
  className?: string
}

interface PricingData {
  basePrice: number
  suggestedPrice: number
  confidence: number
  factors: {
    demand: 'high' | 'medium' | 'low'
    seasonality: 'peak' | 'normal' | 'off'
    competition: 'high' | 'medium' | 'low'
    amenities: string[]
    location: string
    rating: number
  }
  breakdown: {
    baseRate: number
    demandAdjustment: number
    seasonalityAdjustment: number
    competitionAdjustment: number
    amenitiesBonus: number
    ratingBonus: number
  }
}

export default function AIPricingSuggestions({ className = '' }: AIPricingSuggestionsProps) {
  const [pricingData, setPricingData] = useState<PricingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['WiFi', 'Parking'])
  const [propertyRating, setPropertyRating] = useState([4.2])
  const [basePrice, setBasePrice] = useState([2500])

  const amenities = [
    { id: 'WiFi', icon: <Wifi className="w-4 h-4" />, label: 'WiFi' },
    { id: 'Parking', icon: <Car className="w-4 h-4" />, label: 'Parking' },
    { id: 'Breakfast', icon: <Coffee className="w-4 h-4" />, label: 'Breakfast' },
    { id: 'AC', icon: <Snowflake className="w-4 h-4" />, label: 'Air Conditioning' },
    { id: 'Kitchen', icon: <ChefHat className="w-4 h-4" />, label: 'Kitchen' },
    { id: 'Pool', icon: <Waves className="w-4 h-4" />, label: 'Swimming Pool' }
  ]

  useEffect(() => {
    // Simulate AI pricing calculation
    const calculatePricing = () => {
      setIsLoading(true)
      
      setTimeout(() => {
        const demand = Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low'
        const seasonality = Math.random() > 0.7 ? 'peak' : Math.random() > 0.3 ? 'normal' : 'off'
        const competition = Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low'
        
        const baseRate = basePrice[0]
        const demandAdjustment = demand === 'high' ? 300 : demand === 'medium' ? 150 : -100
        const seasonalityAdjustment = seasonality === 'peak' ? 400 : seasonality === 'normal' ? 100 : -200
        const competitionAdjustment = competition === 'high' ? -150 : competition === 'medium' ? 0 : 200
        const amenitiesBonus = selectedAmenities.length * 50
        const ratingBonus = propertyRating[0] > 4.5 ? 200 : propertyRating[0] > 4.0 ? 100 : 0
        
        const suggestedPrice = Math.max(1000, baseRate + demandAdjustment + seasonalityAdjustment + competitionAdjustment + amenitiesBonus + ratingBonus)
        const confidence = Math.min(95, 60 + (propertyRating[0] - 3) * 10 + selectedAmenities.length * 5)
        
        setPricingData({
          basePrice: baseRate,
          suggestedPrice,
          confidence,
          factors: {
            demand,
            seasonality,
            competition,
            amenities: selectedAmenities,
            location: 'Goa, India',
            rating: propertyRating[0]
          },
          breakdown: {
            baseRate,
            demandAdjustment,
            seasonalityAdjustment,
            competitionAdjustment,
            amenitiesBonus,
            ratingBonus
          }
        })
        
        setIsLoading(false)
      }, 1500)
    }

    calculatePricing()
  }, [selectedAmenities, propertyRating, basePrice])

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    )
  }

  const getDemandIcon = (demand: string) => {
    switch (demand) {
      case 'high': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'low': return <TrendingDown className="w-4 h-4 text-red-600" />
      default: return <Minus className="w-4 h-4 text-yellow-600" />
    }
  }

  const getSeasonalityColor = (seasonality: string) => {
    switch (seasonality) {
      case 'peak': return 'text-red-600 bg-red-50'
      case 'off': return 'text-blue-600 bg-blue-50'
      default: return 'text-yellow-600 bg-yellow-50'
    }
  }

  if (isLoading) {
    return (
      <div className={`relative ${className}`}>
        <Card className="border-indigo-100">
          <CardHeader>
            <CardTitle className="text-indigo-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-saffron-600" />
              <span>AI Pricing Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-indigo-600">Analyzing market data...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!pricingData) return null

  return (
    <div className={`relative ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff9800' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '80px 80px'
             }} />
      </div>

      <div className="relative z-10">
        <Card className="border-indigo-100">
          <CardHeader>
            <CardTitle className="text-indigo-900 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-saffron-600" />
                <span>AI Pricing Suggestions</span>
              </div>
              <Badge variant="secondary" className="bg-saffron-100 text-saffron-700">
                {pricingData.confidence.toFixed(0)}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Pricing Summary */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="text-center p-6 bg-indigo-50 rounded-lg">
                <div className="text-sm text-indigo-600 mb-2">Current Price</div>
                <div className="text-3xl font-bold text-indigo-900">
                  ₹{pricingData.basePrice.toLocaleString()}
                </div>
                <div className="text-sm text-indigo-500">per night</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-saffron-50 to-orange-50 rounded-lg border border-saffron-200">
                <div className="text-sm text-saffron-700 mb-2">AI Suggested Price</div>
                <div className="text-3xl font-bold text-saffron-600">
                  ₹{pricingData.suggestedPrice.toLocaleString()}
                </div>
                <div className="text-sm text-saffron-500">per night</div>
                <Badge variant="secondary" className="mt-2 bg-saffron-100 text-saffron-700">
                  {pricingData.suggestedPrice > pricingData.basePrice ? '+' : ''}
                  {((pricingData.suggestedPrice - pricingData.basePrice) / pricingData.basePrice * 100).toFixed(1)}%
                </Badge>
              </div>
            </div>

            {/* Market Factors */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="border-indigo-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-indigo-700">Demand</span>
                    {getDemandIcon(pricingData.factors.demand)}
                  </div>
                  <Badge variant="outline" className={`capitalize ${
                    pricingData.factors.demand === 'high' ? 'text-green-600 border-green-200' :
                    pricingData.factors.demand === 'low' ? 'text-red-600 border-red-200' :
                    'text-yellow-600 border-yellow-200'
                  }`}>
                    {pricingData.factors.demand}
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="border-indigo-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-indigo-700">Seasonality</span>
                    <Calendar className="w-4 h-4 text-indigo-600" />
                  </div>
                  <Badge variant="outline" className={`capitalize ${getSeasonalityColor(pricingData.factors.seasonality)}`}>
                    {pricingData.factors.seasonality}
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="border-indigo-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-indigo-700">Competition</span>
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <Badge variant="outline" className={`capitalize ${
                    pricingData.factors.competition === 'high' ? 'text-red-600 border-red-200' :
                    pricingData.factors.competition === 'low' ? 'text-green-600 border-green-200' :
                    'text-yellow-600 border-yellow-200'
                  }`}>
                    {pricingData.factors.competition}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Price Breakdown */}
            <Card className="bg-gray-50 border-gray-200 mb-6">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-700">Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Base Rate</span>
                    <span className="text-sm font-medium text-gray-900">₹{pricingData.breakdown.baseRate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Demand Adjustment</span>
                    <span className={`text-sm font-medium ${pricingData.breakdown.demandAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {pricingData.breakdown.demandAdjustment >= 0 ? '+' : ''}₹{pricingData.breakdown.demandAdjustment.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Seasonality Adjustment</span>
                    <span className={`text-sm font-medium ${pricingData.breakdown.seasonalityAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {pricingData.breakdown.seasonalityAdjustment >= 0 ? '+' : ''}₹{pricingData.breakdown.seasonalityAdjustment.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Competition Adjustment</span>
                    <span className={`text-sm font-medium ${pricingData.breakdown.competitionAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {pricingData.breakdown.competitionAdjustment >= 0 ? '+' : ''}₹{pricingData.breakdown.competitionAdjustment.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amenities Bonus</span>
                    <span className="text-sm font-medium text-green-600">+₹{pricingData.breakdown.amenitiesBonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rating Bonus</span>
                    <span className="text-sm font-medium text-green-600">+₹{pricingData.breakdown.ratingBonus.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Total Suggested</span>
                    <span className="text-lg font-bold text-saffron-600">₹{pricingData.suggestedPrice.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="space-y-6">
              {/* Base Price Slider */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Base Price: ₹{basePrice[0].toLocaleString()}
                </label>
                <Slider
                  value={basePrice}
                  onValueChange={setBasePrice}
                  max={10000}
                  min={1000}
                  step={100}
                  className="w-full"
                />
              </div>

              {/* Rating Slider */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Property Rating: {propertyRating[0]}★
                </label>
                <Slider
                  value={propertyRating}
                  onValueChange={setPropertyRating}
                  max={5}
                  min={3}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Amenities */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Available Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <button
                      key={amenity.id}
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`p-3 rounded-lg border transition-all duration-200 ${
                        selectedAmenities.includes(amenity.id)
                          ? 'bg-saffron-50 border-saffron-300 text-saffron-700'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {amenity.icon}
                        <span className="text-sm font-medium">{amenity.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <Button className="flex-1 bg-gradient-to-r from-saffron-600 to-orange-600 hover:from-saffron-700 hover:to-orange-700 text-white">
                Apply Suggested Price
              </Button>
              <Button variant="outline" className="flex-1">
                View Market Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Add missing icons
function Snowflake({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
    </svg>
  )
}

function ChefHat({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
    </svg>
  )
}

function Waves({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
    </svg>
  )
}