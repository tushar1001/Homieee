import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    console.log('Search query received:', query)

    // Get platform properties first (from localStorage simulation)
    let platformProperties = []
    try {
      // In a real app, this would be a database query
      // For demo, we'll simulate by checking if there are any stored properties
      platformProperties = getPlatformProperties(query)
    } catch (error) {
      console.error('Error getting platform properties:', error)
    }

    // Try to use ZAI SDK for external search, but have fallback
    let externalResults = []
    
    try {
      const zai = await ZAI.create()
      
      // Use web search function to find homestay properties
      externalResults = await zai.functions.invoke("web_search", {
        query: `homestay properties in India ${query}`,
        num: 5
      })
      
      console.log('ZAI search results:', externalResults)
    } catch (zaiError) {
      console.error('ZAI search failed, using fallback:', zaiError)
      // Fallback to mock data if ZAI fails
      externalResults = generateMockSearchResults(query)
    }

    // Process platform properties
    const processedPlatformResults = platformProperties.map((property: any) => ({
      title: property.title,
      description: property.description,
      url: `/property/${property.id}`,
      location: property.location,
      price: `₹${property.price}`,
      rating: property.rating,
      verified: property.verified,
      isPlatformProperty: true
    }))

    // Process external search results to match homestay criteria
    const processedExternalResults = externalResults.map((result: any) => ({
      title: result.name || `Beautiful Homestay in ${extractLocation(result.snippet || result.description || '')}`,
      description: result.snippet || result.description || `Experience authentic Indian hospitality in this lovely homestay.`,
      url: result.url || '#',
      location: extractLocation(result.snippet || result.description || ''),
      price: extractPrice(result.snippet || result.description || ''),
      rating: extractRating(result.snippet || result.description || ''),
      verified: Math.random() > 0.3, // Simulate verification status
      isPlatformProperty: false
    }))

    // Combine results: platform properties first, then external results
    const allResults = [...processedPlatformResults, ...processedExternalResults]

    return NextResponse.json({ results: allResults })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message,
      results: generateMockSearchResults('fallback') // Return fallback results
    }, { status: 500 })
  }
}

function getPlatformProperties(query: string) {
  // In a real app, this would query the database
  // For demo, we'll return some sample platform properties
  const samplePlatformProperties = [
    {
      id: 'platform-1',
      title: 'Luxury Heritage Villa with Private Pool',
      description: 'Experience the perfect blend of traditional Indian architecture and modern luxury in this stunning heritage villa located in Jaipur.',
      location: 'Jaipur, Rajasthan',
      price: 8500,
      rating: 4.9,
      verified: true
    },
    {
      id: 'platform-2',
      title: 'Cozy Beachside Cottage in Goa',
      description: 'Beautiful beachfront property with modern amenities and stunning ocean views. Perfect for romantic getaways.',
      location: 'South Goa, Goa',
      price: 3500,
      rating: 4.7,
      verified: true
    },
    {
      id: 'platform-3',
      title: 'Traditional Kerala Houseboat',
      description: 'Authentic houseboat experience with traditional Kerala cuisine and serene backwater views.',
      location: 'Alleppey, Kerala',
      price: 4500,
      rating: 4.8,
      verified: false
    }
  ]

  // Filter properties based on query (simplified for demo)
  const queryLower = query.toLowerCase()
  return samplePlatformProperties.filter(property => {
    return queryLower === '' || 
           property.location.toLowerCase().includes(queryLower) ||
           property.title.toLowerCase().includes(queryLower) ||
           property.description.toLowerCase().includes(queryLower)
  })
}

function generateMockSearchResults(query: string) {
  const mockProperties = [
    {
      name: "Coconut Grove Homestay",
      snippet: "Beautiful beachside property in Goa with traditional architecture and modern amenities. Perfect for families and couples.",
      url: "#",
      host_name: "Rajesh Patel"
    },
    {
      name: "Heritage Haveli",
      snippet: "Authentic Rajasthani heritage property with traditional decor and modern comforts. Located in the heart of Jaipur.",
      url: "#",
      host_name: "Priya Singh"
    },
    {
      name: "Backwater Bliss",
      snippet: "Traditional Kerala houseboat experience with authentic cuisine and serene backwater views. Alleppey, Kerala.",
      url: "#",
      host_name: "Suresh Kumar"
    },
    {
      name: "Mountain View Cottage",
      snippet: "Cozy hillside cottage in Manali with stunning mountain views and fireplace. Perfect for winter getaways.",
      url: "#",
      host_name: "Anita Sharma"
    },
    {
      name: "City Center Apartment",
      snippet: "Modern apartment in Bangalore's tech hub with high-speed WiFi and close to major attractions.",
      url: "#",
      host_name: "Vikram Mehta"
    }
  ]
  
  return mockProperties
}

function extractLocation(snippet: string): string {
  // Extract location from snippet - simplified for demo
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Goa', 'Kerala', 'Rajasthan', 'Pune', 'Chennai', 'Manali', 'Jaipur', 'Alleppey']
  const found = locations.find(loc => snippet.toLowerCase().includes(loc.toLowerCase()))
  return found || 'India'
}

function extractPrice(snippet: string): string {
  // Extract price from snippet - simplified for demo
  const priceMatch = snippet.match(/₹[\d,]+/)
  if (priceMatch) {
    return priceMatch[0]
  }
  // Generate random price between 1500-5000
  const randomPrice = Math.floor(Math.random() * 3500) + 1500
  return `₹${randomPrice}`
}

function extractRating(snippet: string): number {
  // Extract rating from snippet - simplified for demo
  const ratingMatch = snippet.match(/(\d+\.?\d*)\s*\/\s*5/)
  if (ratingMatch) {
    return parseFloat(ratingMatch[1])
  }
  // Generate random rating between 3.5-5.0
  return Math.round((Math.random() * 1.5 + 3.5) * 10) / 10
}