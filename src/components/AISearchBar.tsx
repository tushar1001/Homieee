'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Sparkles, Mic, MapPin, Home, Users, Wifi, Car, Coffee, Star, Shield } from 'lucide-react'

interface SearchResult {
  title: string
  description: string
  url: string
  location: string
  price: string
  rating: number
  verified: boolean
  isPlatformProperty?: boolean
}

interface AISearchBarProps {
  onSearch?: (query: string, results: SearchResult[]) => void
  className?: string
  initialQuery?: string
  initialResults?: SearchResult[]
  initialShowResults?: boolean
}

export default function AISearchBar({ 
  onSearch, 
  className = '',
  initialQuery = '',
  initialResults = [],
  initialShowResults = false 
}: AISearchBarProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [isListening, setIsListening] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>(initialResults)
  const [showResults, setShowResults] = useState(initialShowResults)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const searchExamples = [
    'pet-friendly, beachside under ₹3k/night',
    'family-friendly homestay with kitchen in Goa',
    'luxury villa with pool near Mumbai',
    'budget stay with WiFi in Bangalore',
    'traditional Kerala houseboat experience',
    'mountain view cottage in Himachal',
    'heritage property in Rajasthan',
    'beachfront homestay with breakfast included'
  ]

  const quickFilters = [
    { icon: <Home className="w-4 h-4" />, label: 'Entire Home' },
    { icon: <Users className="w-4 h-4" />, label: 'Family Friendly' },
    { icon: <Wifi className="w-4 h-4" />, label: 'WiFi' },
    { icon: <Car className="w-4 h-4" />, label: 'Parking' },
    { icon: <Coffee className="w-4 h-4" />, label: 'Breakfast' },
    { icon: <MapPin className="w-4 h-4" />, label: 'Beach Nearby' }
  ]

  useEffect(() => {
    // Generate suggestions based on input
    if (searchQuery.length > 2) {
      const filtered = searchExamples.filter(example => 
        example.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 3))
    } else {
      setSuggestions([])
    }
  }, [searchQuery])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setShowResults(false)
    
    try {
      // Call the search API
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      })
      
      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        console.log('Search results:', data.results)
        setSearchResults(data.results)
        setShowResults(true)
        
        if (onSearch) {
          onSearch(searchQuery, data.results)
        }
      } else {
        console.log('No results found:', data)
        setSearchResults([])
        setShowResults(true)
        
        if (onSearch) {
          onSearch(searchQuery, [])
        }
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
      setShowResults(true)
      
      if (onSearch) {
        onSearch(searchQuery, [])
      }
    } finally {
      setIsSearching(false)
    }
  }

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-IN'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setSearchQuery(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      alert('Voice search is not supported in your browser')
    }
  }

  const handleExampleClick = (example: string) => {
    setSearchQuery(example)
    setSuggestions([])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleViewDetails = (propertyId: string) => {
    setExpandedCard(expandedCard === propertyId ? null : propertyId)
  }

  const handleCardClick = (url: string) => {
    // If it's a platform property, navigate to the property details page
    if (url.startsWith('/property/')) {
      router.push(url)
    } else {
      // If it's an external result, open in new tab
      window.open(url, '_blank')
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 border border-indigo-100">
        {/* AI Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-saffron-600 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-saffron-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <span className="text-sm font-medium text-saffron-700">AI-Powered Search</span>
              <div className="text-xs text-indigo-500">Powered by Llama 3</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceSearch}
            className={`relative ${isListening ? 'bg-red-100 text-red-600' : 'text-indigo-600'}`}
          >
            <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
            {isListening && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            )}
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <Input
            placeholder="Describe your perfect stay in natural language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-12 pr-12 py-4 text-lg border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                setShowResults(false)
                setSearchResults([])
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-600"
            >
              ×
            </button>
          )}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-indigo-500 mb-2">Did you mean?</div>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(suggestion)}
                  className="w-full text-left p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm text-indigo-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Filters */}
        <div className="mb-4">
          <div className="text-xs text-indigo-500 mb-2">Quick filters</div>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 cursor-pointer transition-colors"
                onClick={() => setSearchQuery(prev => prev ? `${prev}, ${filter.label.toLowerCase()}` : filter.label.toLowerCase())}
              >
                <span className="mr-1">{filter.icon}</span>
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="mb-4">
          <div className="text-xs text-indigo-500 mb-2">Try these examples:</div>
          <div className="flex flex-wrap gap-2">
            {searchExamples.slice(0, 4).map((example, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-saffron-100 text-saffron-700 border-saffron-200 hover:bg-saffron-200 cursor-pointer transition-colors"
                onClick={() => handleExampleClick(example)}
              >
                {example.length > 30 ? example.substring(0, 30) + '...' : example}
              </Badge>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          disabled={isSearching || !searchQuery.trim()}
          className="w-full bg-gradient-to-r from-indigo-600 to-saffron-600 hover:from-indigo-700 hover:to-saffron-700 text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
        >
          {isSearching ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search Verified Stays</span>
            </div>
          )}
        </Button>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="mt-6">
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-indigo-900">
                  Found {searchResults.length} properties for "{searchQuery}"
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowResults(false)
                    setSearchResults([])
                  }}
                >
                  Clear Results
                </Button>
              </div>
              
              <div className="grid gap-4">
                {searchResults.map((result, index) => {
                  const propertyId = `property-${index + 1}`
                  const isExpanded = expandedCard === propertyId
                  
                  return (
                    <Card 
                      key={index} 
                      className={`border-indigo-100 hover:shadow-lg transition-all cursor-pointer ${
                        isExpanded ? 'ring-2 ring-indigo-400' : ''
                      }`}
                      onClick={() => handleCardClick(result.url)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-indigo-900 mb-1">{result.title}</h4>
                            <p className="text-sm text-indigo-600 mb-2 line-clamp-2">{result.description}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4 text-indigo-500" />
                                <span className="text-indigo-700">{result.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-indigo-700">{result.rating}</span>
                              </div>
                              <div className="font-semibold text-saffron-600">{result.price}</div>
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col space-y-2">
                            {result.isPlatformProperty && (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                                <Home className="w-3 h-3 mr-1" />
                                Homie Property
                              </Badge>
                            )}
                            {result.verified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-indigo-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h5 className="font-medium text-indigo-900 mb-2">Property Details</h5>
                                <p className="text-sm text-indigo-700">{result.description}</p>
                                <div className="mt-2 space-y-1">
                                  <div className="text-sm text-indigo-600">
                                    <span className="font-medium">Location:</span> {result.location}
                                  </div>
                                  <div className="text-sm text-indigo-600">
                                    <span className="font-medium">Price:</span> {result.price}
                                  </div>
                                  <div className="text-sm text-indigo-600">
                                    <span className="font-medium">Rating:</span> {result.rating}/5
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h5 className="font-medium text-indigo-900 mb-2">Amenities</h5>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="text-xs">WiFi</Badge>
                                  <Badge variant="outline" className="text-xs">Parking</Badge>
                                  <Badge variant="outline" className="text-xs">Kitchen</Badge>
                                  <Badge variant="outline" className="text-xs">AC</Badge>
                                </div>
                                <div className="mt-4">
                                  <Button 
                                    size="sm" 
                                    className="bg-indigo-600 hover:bg-indigo-700 w-full"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleCardClick(result.url)
                                    }}
                                  >
                                    {result.isPlatformProperty ? 'View Full Details' : 'Visit Original Website'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-indigo-500">
                            {result.isPlatformProperty ? 'Homie Platform' : `Source: ${result.url.startsWith('http') ? new URL(result.url).hostname : 'External'}`}
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-indigo-600 hover:bg-indigo-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewDetails(propertyId)
                            }}
                          >
                            {isExpanded ? 'Show Less' : 'View Details'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-orange-600 mb-2">🔍</div>
                  <h3 className="font-semibold text-orange-800 mb-1">No properties found</h3>
                  <p className="text-sm text-orange-700 mb-3">
                    We couldn't find any properties matching "{searchQuery}". Try different keywords or browse our featured properties below.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowResults(false)
                      setSearchResults([])
                    }}
                  >
                    Try Another Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}