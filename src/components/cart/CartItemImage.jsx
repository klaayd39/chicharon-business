import { useState } from 'react'

const placeholders = {
  chicharon: { emoji: '🥓', gradient: 'from-amber-800/70 to-amber-900/80' },
  longganisa: { emoji: '🌭', gradient: 'from-red-900/60 to-brown/80' },
}

export default function CartItemImage({ item, className = 'w-14 h-14 sm:w-16 sm:h-16' }) {
  const [imgError, setImgError] = useState(false)
  const placeholder = placeholders[item.id] || { emoji: '🍽️', gradient: 'from-brown/50 to-charcoal/70' }

  return (
    <div className={`relative rounded-xl overflow-hidden bg-cream-dark shrink-0 ${className}`}>
      {!imgError && item.image ? (
        <img
          src={item.image}
          alt={item.imageAlt || item.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${placeholder.gradient}`}
          aria-hidden="true"
        >
          <span className="text-xl sm:text-2xl">{placeholder.emoji}</span>
        </div>
      )}
    </div>
  )
}
