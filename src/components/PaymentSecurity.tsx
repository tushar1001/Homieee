'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Award, CheckCircle, Lock, Smartphone, CreditCard, Building, Fingerprint, Video, TrendingUp, Users } from 'lucide-react'

interface PaymentSecurityProps {
  className?: string
}

export default function PaymentSecurity({ className = '' }: PaymentSecurityProps) {
  const [activeSection, setActiveSection] = useState<'payments' | 'verification'>('payments')

  const paymentMethods = [
    {
      name: 'UPI',
      icon: '📱',
      description: 'Instant payments via UPI ID',
      features: ['Instant transfer', 'No extra charges', '24/7 available'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Paytm',
      icon: '💰',
      description: 'Digital wallet payments',
      features: ['Wallet balance', 'Cashback offers', 'Quick payments'],
      color: 'from-blue-400 to-blue-500'
    },
    {
      name: 'PhonePe',
      icon: '📱',
      description: 'Unified payment interface',
      features: ['Multiple banks', 'Rewards program', 'Easy refunds'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Razorpay',
      icon: '💳',
      description: 'Secure payment gateway',
      features: ['Credit/Debit cards', 'Net banking', 'International cards'],
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Google Pay',
      icon: '📱',
      description: 'Google payment solution',
      features: ['Google integration', 'Rewards', 'Secure transactions'],
      color: 'from-green-400 to-green-500'
    },
    {
      name: 'Net Banking',
      icon: '🏦',
      description: 'Direct bank transfers',
      features: ['All major banks', 'Secure', 'Transaction history'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const verificationMethods = [
    {
      name: 'Aadhaar Verification',
      icon: <Fingerprint className="w-6 h-6" />,
      description: 'Government ID verification',
      status: 'Mandatory',
      color: 'from-orange-500 to-orange-600',
      benefits: ['Identity verification', 'Government backed', 'Secure authentication']
    },
    {
      name: 'Video KYC',
      icon: <Video className="w-6 h-6" />,
      description: 'Live video verification',
      status: 'Required',
      color: 'from-blue-500 to-blue-600',
      benefits: ['Face recognition', 'Liveness detection', 'Real-time verification']
    },
    {
      name: 'Property Verification',
      icon: <Building className="w-6 h-6" />,
      description: 'Physical property check',
      status: 'Essential',
      color: 'from-green-500 to-green-600',
      benefits: ['Property authenticity', 'Safety standards', 'Quality assurance']
    },
    {
      name: 'Document Verification',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Legal document validation',
      status: 'Required',
      color: 'from-purple-500 to-purple-600',
      benefits: ['Legal compliance', 'Ownership proof', 'Documentation security']
    }
  ]

  const securityFeatures = [
    {
      title: '256-bit SSL Encryption',
      description: 'Military-grade encryption for all transactions',
      icon: <Lock className="w-8 h-8 text-green-600" />
    },
    {
      title: 'PCI DSS Compliance',
      description: 'Payment Card Industry security standards',
      icon: <Shield className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Two-Factor Authentication',
      description: 'Extra layer of security for your account',
      icon: <Smartphone className="w-8 h-8 text-purple-600" />
    },
    {
      title: 'Fraud Detection',
      description: 'AI-powered fraud prevention system',
      icon: <Award className="w-8 h-8 text-orange-600" />
    }
  ]

  return (
    <div className={`relative ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '120px 120px'
             }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
            Secure & Trusted Platform
          </h2>
          <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
            Your safety and security are our top priorities with multiple verification layers
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveSection('payments')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeSection === 'payments'
                  ? 'bg-gradient-to-r from-indigo-600 to-saffron-600 text-white shadow-md'
                  : 'text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Payment Methods</span>
              </div>
            </button>
            <button
              onClick={() => setActiveSection('verification')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeSection === 'verification'
                  ? 'bg-gradient-to-r from-indigo-600 to-saffron-600 text-white shadow-md'
                  : 'text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Host Verification</span>
              </div>
            </button>
          </div>
        </div>

        {activeSection === 'payments' && (
          <div>
            {/* Payment Methods Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paymentMethods.map((method, index) => (
                <Card key={index} className="border-indigo-100 hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center text-white text-2xl mb-3`}>
                      {method.icon}
                    </div>
                    <CardTitle className="text-lg font-bold text-indigo-900">
                      {method.name}
                    </CardTitle>
                    <p className="text-sm text-indigo-600">{method.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {method.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-indigo-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Security Features */}
            <Card className="bg-gradient-to-r from-indigo-50 to-saffron-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-center text-indigo-900 flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-3">{feature.icon}</div>
                      <h3 className="font-semibold text-indigo-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-indigo-700">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'verification' && (
          <div>
            {/* Verification Methods */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {verificationMethods.map((method, index) => (
                <Card key={index} className="border-indigo-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center text-white`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-indigo-900">
                          {method.name}
                        </CardTitle>
                        <p className="text-sm text-indigo-600">{method.description}</p>
                      </div>
                      <Badge variant={method.status === 'Mandatory' ? 'destructive' : 'secondary'}>
                        {method.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {method.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-indigo-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Verified Host Badge */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-center text-green-900 flex items-center justify-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Verified Host Benefits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-green-900 mb-2">Trust Badge</h3>
                    <p className="text-sm text-green-700">Display verification badge on your profile</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-green-900 mb-2">Higher Visibility</h3>
                    <p className="text-sm text-green-700">Priority listing in search results</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-green-900 mb-2">More Bookings</h3>
                    <p className="text-sm text-green-700">Increased guest confidence and trust</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center items-center space-x-6 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-indigo-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>100% Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-indigo-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Verified Hosts Only</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-indigo-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>24/7 Customer Support</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-indigo-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}