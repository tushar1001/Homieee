'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import HomieLogo from '@/components/HomieLogo'
import AISearchBar from '@/components/AISearchBar'
import ThreeDTour from '@/components/ThreeDTour'
import CulturalMotifs from '@/components/CulturalMotifs'
import PaymentSecurity from '@/components/PaymentSecurity'
import AIPricingSuggestions from '@/components/AIPricingSuggestions'
import GlowingCTA from '@/components/GlowingCTA'
import AIChatbot from '@/components/AIChatbot'
import { useRouter } from 'next/navigation'
import { Star, Award, Shield, MapPin, Home, Users, Wifi, Car, Coffee, TrendingUp, Sparkles } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Search",
      description: "Natural language search with Llama 3 intelligence"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "3D Virtual Tours",
      description: "Immersive property exploration with Three.js"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Zero Commission",
      description: "Hosts keep 100% of their earnings"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Verified Hosts",
      description: "Aadhaar & video KYC verification"
    }
  ]

  const handleSearch = (query: string, results: any[]) => {
    console.log('Searching for:', query, 'Found:', results.length, 'properties')
    setSearchQuery(query)
    setSearchResults(results)
    setShowResults(true)
  }

  const handleBecomeHost = () => {
    router.push('/become-host')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-saffron-10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <HomieLogo size="md" animated={true} />
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-indigo-700 hover:text-indigo-900 font-medium">Explore</a>
            <button onClick={handleBecomeHost} className="text-indigo-700 hover:text-indigo-900 font-medium cursor-pointer hover:underline">Become a Host</button>
            <a href="/mission" className="text-indigo-700 hover:text-indigo-900 font-medium">Mission</a>
            <Button variant="outline" size="sm">Sign In</Button>
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">Menu</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Cultural Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-indigo-300 rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-4 border-saffron-300 rounded-lg transform rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border-4 border-indigo-300"></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 border-4 border-saffron-300 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-indigo-900 mb-4">
              India's First
              <span className="text-saffron-600"> Zero-Commission</span>
              <br />Homestay Platform
            </h1>
            <p className="text-xl text-indigo-700 mb-8 max-w-2xl mx-auto">
              Experience authentic Indian hospitality with AI-powered matching, 3D virtual tours, and verified hosts across Tier 2 & 3 cities.
            </p>
          </div>

          {/* Enhanced AI Search Bar */}
          <div className="max-w-4xl mx-auto mb-16">
            <AISearchBar 
              onSearch={handleSearch} 
              initialQuery={searchQuery}
              initialResults={searchResults}
              initialShowResults={showResults}
            />
          </div>

          {/* 3D Tour Preview */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="relative">
              <ThreeDTour className="h-96" />
              <div className="absolute -top-4 -right-4 bg-saffron-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                New Feature
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-indigo-900 mb-6">
                Experience Before You Book
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span className="text-indigo-700">360° property walkthroughs with Three.js</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span className="text-indigo-700">AR mode for mobile devices</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span className="text-indigo-700">Real-time property measurements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span className="text-indigo-700">Interactive furniture placement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
              Why Choose Homie?
            </h2>
            <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
              Built for India, by Indians - bringing authentic homestays with modern technology
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-indigo-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-indigo-600">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-indigo-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <CulturalMotifs />
        </div>
      </section>

      {/* AI Pricing Dashboard Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
              AI-Powered Pricing
            </h2>
            <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
              Dynamic pricing suggestions powered by Llama 3 intelligence
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <AIPricingSuggestions />
          </div>
        </div>
      </section>

      {/* Payment Methods & Trust */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <PaymentSecurity />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-saffron-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Homie?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of travelers and hosts across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowingCTA 
              text="Search Verified Stays" 
              size="lg"
              onClick={() => console.log('Search stays')}
            />
            <GlowingCTA 
              text="Become a Host" 
              size="lg"
              variant="secondary"
              onClick={handleBecomeHost}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <HomieLogo size="sm" showText={true} />
              <p className="text-indigo-200 text-sm mt-2">
                India's first zero-commission homestay platform, bringing authentic experiences to travelers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Hosts</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
                <li><button onClick={handleBecomeHost} className="hover:text-white text-left cursor-pointer">Become a Host</button></li>
                <li><a href="#" className="hover:text-white">Host Resources</a></li>
                <li><a href="#" className="hover:text-white">Pricing Tools</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Technology</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
                <li><a href="#" className="hover:text-white">Llama 3 AI</a></li>
                <li><a href="#" className="hover:text-white">Three.js 3D Tours</a></li>
                <li><a href="#" className="hover:text-white">AR Integration</a></li>
                <li><a href="#" className="hover:text-white">API Access</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 pt-8 text-center text-indigo-300 text-sm">
            <p>&copy; 2024 Homie. Built with ❤️ for India. Powered by Llama 3 & Three.js</p>
          </div>
        </div>
      </footer>
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}