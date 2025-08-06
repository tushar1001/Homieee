'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Award, Sparkles, TrendingUp, Users, Gift, Crown } from 'lucide-react'

interface LoyaltyRewardsProps {
  className?: string
}

export default function LoyaltyRewards({ className = '' }: LoyaltyRewardsProps) {
  const [activeTab, setActiveTab] = useState<'rewards' | 'earnings'>('rewards')

  const rewardTiers = [
    {
      name: 'Bronze',
      icon: '🥉',
      points: 0,
      color: 'from-orange-400 to-orange-600',
      benefits: ['5% discount on bookings', 'Early check-in when available', 'Birthday surprise']
    },
    {
      name: 'Silver',
      icon: '🥈',
      points: 1000,
      color: 'from-gray-400 to-gray-600',
      benefits: ['10% discount on bookings', 'Free room upgrade', 'Welcome drink', 'Late check-out']
    },
    {
      name: 'Gold',
      icon: '🥇',
      points: 2500,
      color: 'from-yellow-400 to-yellow-600',
      benefits: ['15% discount on bookings', 'Free breakfast', 'Airport transfer', 'Exclusive events']
    },
    {
      name: 'Platinum',
      icon: '💎',
      points: 5000,
      color: 'from-blue-400 to-blue-600',
      benefits: ['20% discount on bookings', 'Free spa treatment', 'Personal concierge', 'VIP access']
    }
  ]

  const commissionComparison = [
    {
      platform: 'Homie',
      commission: 0,
      color: 'text-saffron-600',
      bgColor: 'bg-saffron-50',
      features: ['Zero commission', 'Direct payment to hosts', 'No hidden fees', 'Full control over pricing']
    },
    {
      platform: 'Airbnb',
      commission: 15,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      features: ['15% service fee', 'Payment processing fees', 'Cleaning fee deductions', 'Seasonal pricing restrictions']
    },
    {
      platform: 'OYO',
      commission: 22,
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      features: ['22% commission', 'Mandatory services', 'Fixed pricing', 'Limited host control']
    }
  ]

  const earningScenarios = [
    {
      monthlyBookings: 15,
      averagePrice: 3000,
      homieEarnings: 45000,
      airbnbEarnings: 38250,
      oyoEarnings: 35100,
      savings: 9900
    },
    {
      monthlyBookings: 25,
      averagePrice: 2500,
      homieEarnings: 62500,
      airbnbEarnings: 53125,
      oyoEarnings: 48750,
      savings: 13750
    },
    {
      monthlyBookings: 40,
      averagePrice: 2000,
      homieEarnings: 80000,
      airbnbEarnings: 68000,
      oyoEarnings: 62400,
      savings: 17600
    }
  ]

  return (
    <div className={`relative ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-saffron-600 opacity-10"></div>
      
      <div className="relative z-10">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'rewards'
                  ? 'bg-gradient-to-r from-indigo-600 to-saffron-600 text-white shadow-md'
                  : 'text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Traveler Rewards</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'earnings'
                  ? 'bg-gradient-to-r from-indigo-600 to-saffron-600 text-white shadow-md'
                  : 'text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Host Earnings</span>
              </div>
            </button>
          </div>
        </div>

        {activeTab === 'rewards' && (
          <div>
            {/* Rewards Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <Crown className="w-8 h-8 text-saffron-600" />
                <h2 className="text-3xl font-bold text-indigo-900">Homie Rewards</h2>
                <Sparkles className="w-8 h-8 text-saffron-600 animate-pulse" />
              </div>
              <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
                Join our loyalty program and unlock exclusive benefits across India
              </p>
            </div>

            {/* Reward Tiers */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {rewardTiers.map((tier, index) => (
                <Card key={index} className={`border-2 hover:shadow-xl transition-all duration-300 ${
                  index === 0 ? 'border-orange-200' : 
                  index === 1 ? 'border-gray-200' : 
                  index === 2 ? 'border-yellow-200' : 'border-blue-200'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center text-white text-2xl mb-3`}>
                      {tier.icon}
                    </div>
                    <CardTitle className={`text-lg font-bold ${
                      index === 0 ? 'text-orange-600' : 
                      index === 1 ? 'text-gray-600' : 
                      index === 2 ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      {tier.name} Tier
                    </CardTitle>
                    <div className="text-sm text-indigo-600">
                      {tier.points === 0 ? 'Start earning' : `${tier.points}+ points`}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-indigo-700">
                          <div className="w-1.5 h-1.5 bg-saffron-500 rounded-full"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* How it Works */}
            <Card className="bg-gradient-to-r from-indigo-50 to-saffron-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-center text-indigo-900 flex items-center justify-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>How It Works</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-indigo-900 mb-2">1. Book & Stay</h3>
                    <p className="text-sm text-indigo-700">Earn 10 points for every ₹1000 spent on verified homestays</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-6 h-6 text-saffron-600" />
                    </div>
                    <h3 className="font-semibold text-indigo-900 mb-2">2. Collect Points</h3>
                    <p className="text-sm text-indigo-700">Points accumulate automatically with each booking</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-indigo-900 mb-2">3. Redeem Rewards</h3>
                    <p className="text-sm text-indigo-700">Unlock discounts, upgrades, and exclusive experiences</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Button */}
            <div className="text-center mt-8">
              <Button className="bg-gradient-to-r from-indigo-600 to-saffron-600 hover:from-indigo-700 hover:to-saffron-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Join Rewards Program
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div>
            {/* Earnings Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-indigo-900">Keep 100% of Your Earnings</h2>
              </div>
              <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
                Unlike other platforms, Homie lets hosts keep their full income
              </p>
            </div>

            {/* Commission Comparison */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {commissionComparison.map((platform, index) => (
                <Card key={index} className={`border-2 ${platform.bgColor} hover:shadow-xl transition-all duration-300`}>
                  <CardHeader className="text-center">
                    <CardTitle className={`text-2xl font-bold ${platform.color}`}>
                      {platform.platform}
                    </CardTitle>
                    <div className={`text-4xl font-bold ${platform.color}`}>
                      {platform.commission}%
                    </div>
                    <Badge variant={platform.commission === 0 ? "default" : "secondary"} 
                           className={platform.commission === 0 ? "bg-green-500 text-white" : ""}>
                      {platform.commission === 0 ? "Zero Commission" : "Commission Fee"}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {platform.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-indigo-700">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            platform.commission === 0 ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Earning Scenarios */}
            <Card className="bg-white border-indigo-200">
              <CardHeader>
                <CardTitle className="text-center text-indigo-900">Monthly Earning Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {earningScenarios.map((scenario, index) => (
                    <div key={index} className="border-l-4 border-saffron-500 pl-4">
                      <div className="flex flex-wrap items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-indigo-900">
                            {scenario.monthlyBookings} bookings/month @ ₹{scenario.averagePrice.toLocaleString()}/night
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            Save ₹{scenario.savings.toLocaleString()}/month with Homie
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-green-600 mb-1">Homie</div>
                          <div className="text-lg font-bold text-green-700">
                            ₹{scenario.homieEarnings.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <div className="text-sm text-red-600 mb-1">Airbnb</div>
                          <div className="text-lg font-bold text-red-700">
                            ₹{scenario.airbnbEarnings.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-red-100 rounded-lg">
                          <div className="text-sm text-red-700 mb-1">OYO</div>
                          <div className="text-lg font-bold text-red-700">
                            ₹{scenario.oyoEarnings.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Host CTA */}
            <div className="text-center mt-8">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Become a Host Today
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}