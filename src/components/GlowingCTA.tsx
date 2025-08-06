'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search, Sparkles, ArrowRight } from 'lucide-react'

interface GlowingCTAProps {
  onClick?: () => void
  className?: string
  text?: string
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

export default function GlowingCTA({ 
  onClick, 
  className = '', 
  text = 'Search Verified Stays', 
  icon,
  size = 'lg',
  variant = 'primary'
}: GlowingCTAProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const baseClasses = `
    relative overflow-hidden
    font-bold rounded-xl
    transition-all duration-300
    transform hover:scale-105
    active:scale-95
    shadow-lg hover:shadow-xl
    ${sizeClasses[size]}
    ${className}
  `

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-saffron-600 
      hover:from-indigo-700 hover:to-saffron-700 
      text-white
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100
    `,
    secondary: `
      bg-gradient-to-r from-saffron-500 to-orange-500 
      hover:from-saffron-600 hover:to-orange-600 
      text-white
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100
    `
  }

  const defaultIcon = variant === 'primary' ? <Search className={iconSize[size]} /> : <Sparkles className={iconSize[size]} />

  return (
    <Button
      onClick={() => {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 200)
        onClick?.()
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-saffron-400/20 blur-xl transition-all duration-300 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`} />
      
      {/* Sparkle Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full transition-all duration-1000 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 15)}%`,
              animation: isHovered ? `sparkle-${i} 1.5s ease-in-out infinite` : 'none',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
      {/* Button Content */}
      <div className="relative flex items-center space-x-3 z-10">
        {icon || defaultIcon}
        <span className="font-bold">{text}</span>
        <ArrowRight className={`${iconSize[size]} transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
      </div>
      
      {/* Ripple Effect on Click */}
      {isClicked && (
        <div className="absolute inset-0 bg-white/30 rounded-xl animate-ping" />
      )}
      
      {/* Border Glow */}
      <div className={`absolute inset-0 rounded-xl border-2 border-white/20 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </Button>
  )
}

// Add sparkle animations to global CSS
const sparkleKeyframes = `
  @keyframes sparkle-0 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    50% { transform: translate(10px, -10px) scale(1.5); opacity: 1; }
  }
  @keyframes sparkle-1 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    50% { transform: translate(-10px, 10px) scale(1.5); opacity: 1; }
  }
  @keyframes sparkle-2 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    50% { transform: translate(15px, 5px) scale(1.5); opacity: 1; }
  }
  @keyframes sparkle-3 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    50% { transform: translate(-15px, -5px) scale(1.5); opacity: 1; }
  }
  @keyframes sparkle-4 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    50% { transform: translate(5px, 15px) scale(1.5); opacity: 1; }
  }
  @keyframes sparkle-5 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    50% { transform: translate(-5px, -15px) scale(1.5); opacity: 1; }
  }
`

// Add keyframes to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = sparkleKeyframes
  document.head.appendChild(style)
}