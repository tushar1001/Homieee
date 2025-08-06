'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import HomieLogo from '@/components/HomieLogo'
import { useRouter } from 'next/navigation'
import { Heart, Target, TrendingUp, MapPin, Users, Home, Award, Lightbulb, CheckCircle } from 'lucide-react'

export default function Mission() {
  const router = useRouter()

  const handleBecomeHost = () => {
    router.push('/become-host')
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
            <button onClick={handleBecomeHost} className="text-indigo-700 hover:text-indigo-900 font-medium cursor-pointer hover:underline">Become a Host</button>
            <button className="text-indigo-700 hover:text-indigo-900 font-medium border-b-2 border-indigo-700">Mission</button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            Our Mission
          </h1>
          <p className="text-xl text-indigo-700 max-w-3xl mx-auto mb-8">
            Empowering Indian homestay hosts with India's first zero-commission platform
          </p>
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Building the future of Indian hospitality</span>
          </div>
        </div>

        {/* The Problem */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-red-600" />
                The Problem We're Solving
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 font-bold text-sm">40%</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-900">Unlisted Homestays</h4>
                    <p className="text-sm text-indigo-700">Nearly half of India's homestays are missing from online booking platforms</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-900">High Commission Fees</h4>
                    <p className="text-sm text-indigo-700">Traditional OTAs charge 15-30% commission, eating into host profits</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-900">Limited Visibility</h4>
                    <p className="text-sm text-indigo-700">Small hosts struggle to compete with established hotel chains</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-saffron-600" />
                Our Inspiration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-indigo-700 leading-relaxed">
                  Inspired by the vision of bringing authentic Indian hospitality to the global stage, we identified a critical gap in the market. 
                  Many beautiful homestays across India's tier 2 and 3 cities remain hidden from potential guests, while hosts struggle with 
                  exorbitant commission fees that diminish their earnings.
                </p>
                <div className="bg-saffron-50 p-4 rounded-lg">
                  <p className="text-saffron-800 font-medium text-sm">
                    "We believe every homestay deserves a chance to shine, and every host deserves to keep what they earn. 
                    Our mission is to democratize the hospitality industry in India."
                  </p>
                </div>
                <p className="text-indigo-700 leading-relaxed">
                  By leveraging cutting-edge technology and AI-powered solutions, we're creating a platform that serves both 
                  hosts and travelers with transparency, efficiency, and trust.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Our Solution */}
        <Card className="border-indigo-100 mb-16">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-2xl">
              <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
              Our Solution: Homie - India's First Zero-Commission Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">0%</span>
                </div>
                <h3 className="font-semibold text-indigo-900 mb-2">Zero Commission</h3>
                <p className="text-sm text-indigo-700">Hosts keep 100% of their earnings - no hidden fees, no surprises</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-indigo-900 mb-2">Host Empowerment</h3>
                <p className="text-sm text-indigo-700">Complete control over listings, pricing, and guest interactions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-indigo-900 mb-2">Authentic Experiences</h3>
                <p className="text-sm text-indigo-700">Connect travelers with genuine Indian hospitality and culture</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Innovation */}
        <Card className="border-indigo-100 mb-16">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Award className="w-5 h-5 mr-2 text-indigo-600" />
              Technology-Driven Hospitality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-indigo-900 mb-2">AI-Powered Search</h4>
                <p className="text-sm text-indigo-700">Natural language search with Llama 3 intelligence</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded transform rotate-45"></div>
                </div>
                <h4 className="font-semibold text-indigo-900 mb-2">3D Virtual Tours</h4>
                <p className="text-sm text-indigo-700">Immersive property exploration with Three.js</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <h4 className="font-semibold text-indigo-900 mb-2">Smart Pricing</h4>
                <p className="text-sm text-indigo-700">Dynamic pricing suggestions powered by AI</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded"></div>
                </div>
                <h4 className="font-semibold text-indigo-900 mb-2">Verified Hosts</h4>
                <p className="text-sm text-indigo-700">Aadhaar & video KYC verification for trust</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision for the Future */}
        <Card className="border-indigo-100 mb-16">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Target className="w-5 h-5 mr-2 text-indigo-600" />
              Join Us in Building the Future of Indian Hospitality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <p className="text-lg text-indigo-700 max-w-3xl mx-auto">
                We envision a future where every homestay in India has the opportunity to thrive in the digital economy. 
                By removing barriers and empowering hosts, we're not just building a platform - we're fostering a movement 
                that celebrates Indian hospitality and creates meaningful connections between travelers and local communities.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 border-indigo-200">
                  100,000+ Homestays by 2030
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  ₹500 Crore+ Host Earnings Saved
                </Badge>
                <Badge variant="secondary" className="bg-saffron-100 text-saffron-800 border-saffron-200">
                  2 Million+ Traveler Experiences
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                  500+ Cities Covered
                </Badge>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-saffron-50 p-6 rounded-lg">
                <p className="text-indigo-800 font-medium">
                  "Together, we're creating a hospitality ecosystem that puts hosts first, celebrates authentic experiences, 
                  and makes Indian homestays accessible to travelers worldwide."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">
            Ready to Be Part of the Revolution?
          </h2>
          <p className="text-xl text-indigo-700 mb-8">
            Join thousands of hosts who are already benefiting from zero-commission hosting
          </p>
          <button 
            onClick={handleBecomeHost}
            className="bg-gradient-to-r from-indigo-600 to-saffron-600 hover:from-indigo-700 hover:to-saffron-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            List Your Property on Homie
          </button>
        </div>
      </main>
    </div>
  )
}