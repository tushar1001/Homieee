'use client'

import { useState } from 'react'

interface CulturalMotifsProps {
  className?: string
}

export default function CulturalMotifs({ className = '' }: CulturalMotifsProps) {
  const [activeMotif, setActiveMotif] = useState('kolam')

  const motifs = [
    {
      id: 'kolam',
      name: 'Kolam Art',
      description: 'Traditional South Indian floor art patterns',
      icon: '🌸'
    },
    {
      id: 'brick',
      name: 'Brick Houses',
      description: 'Rural Indian architecture',
      icon: '🏠'
    },
    {
      id: 'bamboo',
      name: 'Bamboo Fencing',
      description: 'Natural boundary solutions',
      icon: '🎋'
    },
    {
      id: 'palm',
      name: 'Palm Trees',
      description: 'Coastal and tropical landscapes',
      icon: '🌴'
    }
  ]

  return (
    <div className={`relative ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff9800' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '80px 80px'
             }} />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-indigo-900 mb-2">Cultural Heritage</h3>
          <p className="text-indigo-700">Experience authentic Indian traditions</p>
        </div>

        {/* Motif selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {motifs.map((motif) => (
            <button
              key={motif.id}
              onClick={() => setActiveMotif(motif.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeMotif === motif.id
                  ? 'bg-saffron-500 text-white shadow-lg'
                  : 'bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200'
              }`}
            >
              <span className="text-xl">{motif.icon}</span>
              <span className="font-medium">{motif.name}</span>
            </button>
          ))}
        </div>

        {/* Motif display */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
          {activeMotif === 'kolam' && (
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block p-8 bg-gradient-to-br from-saffron-100 to-indigo-100 rounded-full">
                  <div className="text-6xl mb-2">🌸</div>
                  <div className="text-2xl font-bold text-saffron-600">Kolam Art</div>
                </div>
              </div>
              <p className="text-indigo-700 mb-4 max-w-2xl mx-auto">
                Kolam is a traditional South Indian art form where intricate patterns are created using rice flour 
                at the entrance of homes. These geometric designs symbolize prosperity and welcome guests.
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-saffron-50 to-indigo-50 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-saffron-300 rounded-full opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMotif === 'brick' && (
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block p-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-full">
                  <div className="text-6xl mb-2">🏠</div>
                  <div className="text-2xl font-bold text-orange-600">Brick Houses</div>
                </div>
              </div>
              <p className="text-indigo-700 mb-4 max-w-2xl mx-auto">
                Traditional Indian brick houses showcase timeless architecture with natural cooling, 
                intricate carvings, and sustainable building practices passed down through generations.
              </p>
              <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-orange-200 to-red-200 rounded-sm" />
                ))}
              </div>
            </div>
          )}

          {activeMotif === 'bamboo' && (
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block p-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                  <div className="text-6xl mb-2">🎋</div>
                  <div className="text-2xl font-bold text-green-600">Bamboo Fencing</div>
                </div>
              </div>
              <p className="text-indigo-700 mb-4 max-w-2xl mx-auto">
                Bamboo fencing represents sustainable living and natural beauty. These eco-friendly barriers 
                provide privacy while maintaining airflow and adding rustic charm to homestays.
              </p>
              <div className="flex justify-center space-x-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-3 h-24 bg-gradient-to-b from-green-300 to-green-500 rounded-full" />
                ))}
              </div>
            </div>
          )}

          {activeMotif === 'palm' && (
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block p-8 bg-gradient-to-br from-yellow-100 to-green-100 rounded-full">
                  <div className="text-6xl mb-2">🌴</div>
                  <div className="text-2xl font-bold text-yellow-600">Palm Trees</div>
                </div>
              </div>
              <p className="text-indigo-700 mb-4 max-w-2xl mx-auto">
                Palm trees symbolize coastal paradise and tropical relaxation. These majestic trees 
                provide natural shade, coconut resources, and create an authentic Indian beach atmosphere.
              </p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl mb-2">🌴</div>
                  <div className="text-sm text-indigo-600">Coconut</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🌴</div>
                  <div className="text-sm text-indigo-600">Date</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🌴</div>
                  <div className="text-sm text-indigo-600">Areca</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}