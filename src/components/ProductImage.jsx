import { useState } from 'react'

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

export default function ProductImage({ product, className = '', aspect = 'aspect-[4/3]', imageFit }) {
  const [imgError, setImgError] = useState(!product.image)
  const fit = imageFit ?? product.imageFit ?? 'cover'

  return (
    <div className={`relative overflow-hidden bg-cream-dark group ${aspect} ${className}`}>
      {!imgError && product.image && (
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-105 ${
            fit === 'contain' ? 'object-contain p-3 sm:p-4' : 'object-cover'
          }`}
          onError={() => setImgError(true)}
        />
      )}
      {imgError && <PlaceholderVisual product={product} />}
    </div>
  )
}
