import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'

const placeholders = {
  chicharon: {
    gradient: 'from-amber-800/80 via-amber-700/60 to-amber-900/80',
    emoji: '🥓',
    label: 'Chicharon',
  },
  longganisa: {
    gradient: 'from-red-900/70 via-red-800/50 to-brown/80',
    emoji: '🌭',
    label: 'Longganisa',
  },
}

function PlaceholderVisual({ product }) {
  const placeholder = placeholders[product.id] || {
    gradient: 'from-brown/60 to-charcoal/80',
    emoji: '🍽️',
    label: product.name,
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${placeholder.gradient}`}
      aria-hidden="true"
    >
      <span className="text-4xl sm:text-5xl mb-2 opacity-80">{placeholder.emoji}</span>
      <span className="font-display text-base sm:text-lg text-cream/70 tracking-wide">{placeholder.label}</span>
    </div>
  )
}

export default function ProductImage({ product, className = '', aspect = 'aspect-[4/3]' }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-cream-dark group ${aspect} ${className}`}>
      {!imgError && (
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          onError={() => setImgError(true)}
        />
      )}
      {imgError && <PlaceholderVisual product={product} />}
    </div>
  )
}

export function HeroImage({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-lg shadow-brown/5 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-800/90 via-amber-700/70 to-brown/90" />
      <div className="relative flex h-full min-h-[220px] sm:min-h-[300px] lg:min-h-[420px] items-center justify-center">
        <div className="text-center p-6 sm:p-8">
          <div className="flex justify-center gap-3 sm:gap-6 mb-3 sm:mb-4">
            <span className="text-5xl sm:text-6xl lg:text-7xl drop-shadow-md" role="img" aria-label="Chicharon">🥓</span>
            <span className="text-5xl sm:text-6xl lg:text-7xl drop-shadow-md" role="img" aria-label="Longganisa">🌭</span>
          </div>
          <p className="font-display text-cream/55 text-xs sm:text-sm tracking-[0.2em] uppercase">
            {businessConfig.name}
          </p>
        </div>
      </div>
    </div>
  )
}
