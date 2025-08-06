'use client'

import { useState } from 'react'

interface HomieLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  animated?: boolean
}

export default function HomieLogo({ 
  className = '', 
  size = 'md', 
  showText = true, 
  animated = false 
}: HomieLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }

  const svgSize = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  }

  return (
    <div 
      className={`flex items-center space-x-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Container with 3D Effects */}
      <div className={`relative ${sizeClasses[size]} ${animated ? 'transition-all duration-500 ease-out' : ''}`}>
        <div className={`
          absolute inset-0 rounded-full blur-lg transition-all duration-500
          ${animated && isHovered 
            ? 'bg-gradient-to-r from-indigo-400 to-saffron-400 opacity-30 scale-110' 
            : 'bg-gradient-to-r from-indigo-200 to-saffron-200 opacity-20 scale-100'
          }
        `}></div>
        
        <svg
          width={svgSize[size]}
          height={svgSize[size]}
          viewBox="0 0 100 100"
          className={`
            relative z-10 drop-shadow-lg transition-all duration-500
            ${animated && isHovered 
              ? 'transform rotate-3d(0, 0, 1, 5deg) scale-110' 
              : 'transform rotate-3d(0, 0, 1, 0deg) scale-100'
            }
          `}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* 3D Shadow Effect */}
          <defs>
            <filter id="shadow3d" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
              <feDropShadow dx="-2" dy="-2" stdDeviation="2" floodColor="#4f46e5" floodOpacity="0.2"/>
            </filter>
            
            {/* Gradient Definitions */}
            <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
            </linearGradient>
            
            <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#fbbf24', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
            </linearGradient>
            
            <radialGradient id="windowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{stopColor: '#fef3c7', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#fde68a', stopOpacity: 1}} />
            </radialGradient>
          </defs>
          
          {/* Home Base with 3D Effect */}
          <g filter="url(#shadow3d)">
            <path
              d="M20 70 L20 45 L50 20 L80 45 L80 70 Z"
              fill="url(#homeGradient)"
              stroke="#3730a3"
              strokeWidth="2"
              className={`
                transition-all duration-500
                ${animated && isHovered 
                  ? 'transform translate-z-4' 
                  : ''
                }
              `}
            />
            
            {/* 3D Roof */}
            <path
              d="M15 45 L50 15 L85 45"
              fill="none"
              stroke="#3730a3"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`
                transition-all duration-500
                ${animated && isHovered 
                  ? 'transform translate-z-6 stroke-[#4338ca]' 
                  : ''
                }
              `}
            />
            
            {/* Enhanced Door */}
            <rect
              x="42"
              y="55"
              width="16"
              height="15"
              fill="url(#doorGradient)"
              stroke="#f59e0b"
              strokeWidth="1"
              rx="2"
              className={`
                transition-all duration-500
                ${animated && isHovered 
                  ? 'transform translate-z-2 scale-105' 
                  : ''
                }
              `}
            />
            
            {/* Door Handle */}
            <circle
              cx="54"
              cy="62"
              r="1"
              fill="#92400e"
              className={`
                transition-all duration-500
                ${animated && isHovered ? 'opacity-100' : 'opacity-70'}
              `}
            />
            
            {/* Enhanced Windows */}
            <rect
              x="28"
              y="35"
              width="10"
              height="10"
              fill="url(#windowGradient)"
              stroke="#f59e0b"
              strokeWidth="1"
              rx="1"
              className={`
                transition-all duration-500
                ${animated && isHovered 
                  ? 'transform translate-z-2 scale-110' 
                  : ''
                }
              `}
            />
            <rect
              x="62"
              y="35"
              width="10"
              height="10"
              fill="url(#windowGradient)"
              stroke="#f59e0b"
              strokeWidth="1"
              rx="1"
              className={`
                transition-all duration-500
                ${animated && isHovered 
                  ? 'transform translate-z-2 scale-110' 
                  : ''
                }
              `}
            />
            
            {/* Window Crosses */}
            <path
              d="M33 35 L33 45 M28 40 L38 40"
              stroke="#f59e0b"
              strokeWidth="0.5"
              className={`
                transition-all duration-500
                ${animated && isHovered ? 'opacity-100' : 'opacity-50'}
              `}
            />
            <path
              d="M67 35 L67 45 M62 40 L72 40"
              stroke="#f59e0b"
              strokeWidth="0.5"
              className={`
                transition-all duration-500
                ${animated && isHovered ? 'opacity-100' : 'opacity-50'}
              `}
            />
            
            {/* Enhanced Smiley Face */}
            <g className={`
              transition-all duration-500
              ${animated && isHovered 
                ? 'transform translate-z-8 scale-110' 
                : ''
              }
            `}>
              <circle
                cx="50"
                cy="42"
                r="8"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.5"
              />
              
              {/* Animated Eyes */}
              <circle 
                cx="46" 
                cy="40" 
                r="1.5" 
                fill="#3730a3"
                className={`
                  transition-all duration-300
                  ${animated && isHovered ? 'transform scale-125' : ''}
                `}
              />
              <circle 
                cx="54" 
                cy="40" 
                r="1.5" 
                fill="#3730a3"
                className={`
                  transition-all duration-300
                  ${animated && isHovered ? 'transform scale-125' : ''}
                `}
              />
              
              {/* Animated Smile */}
              <path
                d="M46 44 Q50 47 54 44"
                fill="none"
                stroke="#3730a3"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={`
                  transition-all duration-500
                  ${animated && isHovered 
                    ? 'transform scale-110 stroke-[#4338ca]' 
                    : ''
                  }
                `}
              />
            </g>
            
            {/* Enhanced Handshake */}
            <g transform={`translate(${animated && isHovered ? '2' : '0'}, ${animated && isHovered ? '2' : '0'})`} 
               className={`
                 transition-all duration-500
                 ${animated && isHovered 
                   ? 'transform translate-z-4' 
                   : ''
                 }
               `}>
              {/* Left Hand */}
              <path
                d="M25 75 Q20 80 25 85 Q30 88 35 85 L40 80"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={`
                  transition-all duration-500
                  ${animated && isHovered 
                    ? 'transform translate-x-2 stroke-[#f59e0b]' 
                    : ''
                  }
                `}
              />
              
              {/* Right Hand */}
              <path
                d="M75 75 Q80 80 75 85 Q70 88 65 85 L60 80"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={`
                  transition-all duration-500
                  ${animated && isHovered 
                    ? 'transform -translate-x-2 stroke-[#f59e0b]' 
                    : ''
                  }
                `}
              />
              
              {/* Enhanced Connection */}
              <path
                d="M35 82 Q50 78 65 82"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeLinecap="round"
                className={`
                  transition-all duration-500
                  ${animated && isHovered 
                    ? 'transform scale-110 stroke-[#f59e0b]' 
                    : ''
                  }
                `}
              />
              
              {/* Heart in the middle */}
              <path
                d="M50 80 C50 78, 48 76, 46 76 C44 76, 42 78, 42 80 C42 78, 40 76, 38 76 C36 76, 34 78, 34 80 Q34 84, 50 92 Q66 84, 66 80 C66 78, 64 76, 62 76 C60 76, 58 78, 58 80 C58 78, 56 76, 54 76 C52 76, 50 78, 50 80 Z"
                fill="#ef4444"
                className={`
                  transition-all duration-500
                  ${animated && isHovered 
                    ? 'transform scale-125 opacity-100' 
                    : 'transform scale-100 opacity-70'
                  }
                `}
              />
            </g>
          </g>
          
          {/* Enhanced Decorative Elements */}
          {animated && (
            <>
              {/* Animated Sparkles */}
              <g className={isHovered ? 'animate-spin-slow' : ''}>
                <circle
                  cx="15"
                  cy="25"
                  r="1.5"
                  fill="#fbbf24"
                  className={`
                    transition-all duration-500
                    ${isHovered 
                      ? 'opacity-100 transform scale-150' 
                      : 'opacity-50 transform scale-100'
                    }
                  `}
                />
                <circle
                  cx="85"
                  cy="25"
                  r="1.5"
                  fill="#fbbf24"
                  className={`
                    transition-all duration-500
                    ${isHovered 
                      ? 'opacity-100 transform scale-150' 
                      : 'opacity-50 transform scale-100'
                    }
                  `}
                />
                <circle
                  cx="10"
                  cy="50"
                  r="1.5"
                  fill="#fbbf24"
                  className={`
                    transition-all duration-500
                    ${isHovered 
                      ? 'opacity-100 transform scale-150' 
                      : 'opacity-50 transform scale-100'
                    }
                  `}
                />
                <circle
                  cx="90"
                  cy="50"
                  r="1.5"
                  fill="#fbbf24"
                  className={`
                    transition-all duration-500
                    ${isHovered 
                      ? 'opacity-100 transform scale-150' 
                      : 'opacity-50 transform scale-100'
                    }
                  `}
                />
              </g>
              
              {/* Floating Particles */}
              {isHovered && (
                <>
                  <circle
                    cx="25"
                    cy="15"
                    r="0.8"
                    fill="#6366f1"
                    className="animate-float"
                  />
                  <circle
                    cx="75"
                    cy="15"
                    r="0.8"
                    fill="#f59e0b"
                    className="animate-float-delayed"
                  />
                  <circle
                    cx="20"
                    cy="85"
                    r="0.8"
                    fill="#ef4444"
                    className="animate-float-slow"
                  />
                  <circle
                    cx="80"
                    cy="85"
                    r="0.8"
                    fill="#10b981"
                    className="animate-float-slower"
                  />
                </>
              )}
            </>
          )}
        </svg>
        
        {/* Enhanced Animated Badge */}
        {animated && (
          <div className={`
            absolute -top-2 -right-2 bg-gradient-to-r from-saffron-500 to-orange-500 
            text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg 
            transition-all duration-500 transform
            ${isHovered 
              ? 'scale-125 rotate-12 shadow-xl' 
              : 'scale-100 rotate-0'
            }
          `}>
            <span className="flex items-center space-x-1">
              <span>✨</span>
              <span>New</span>
            </span>
          </div>
        )}
      </div>
      
      {/* Enhanced Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`
            font-bold bg-gradient-to-r from-indigo-900 to-saffron-600 bg-clip-text text-transparent 
            ${textSizeClasses[size]} transition-all duration-500
            ${animated && isHovered 
              ? 'transform scale-105 translate-y-[-2px]' 
              : ''
            }
          `}>
            Homie
          </span>
          <span className={`
            text-xs font-medium transition-all duration-500
            ${animated && isHovered 
              ? 'text-saffron-600 transform scale-105 translate-y-[-1px]' 
              : 'text-saffron-600 opacity-80'
            }
          `}>
            Zero Commission
          </span>
        </div>
      )}
    </div>
  )
}