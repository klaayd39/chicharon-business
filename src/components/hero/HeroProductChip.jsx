import { Link } from 'react-router-dom'
import { useState } from 'react'

const chipColors = {
  lumpia: 'from-amber-700/90 to-brown/90',
  tocino: 'from-red-800/90 to-brown/90',
  tapa: 'from-amber-900/90 to-charcoal/90',
  longganisa: 'from-red-900/90 to-brown/90',
  bbq: 'from-amber-800/90 to-charcoal/90',
  chicharon: 'from-amber-800/90 to-amber-900/90',
}

export default function HeroProductChip({ product, className = '', accent = false }) {
  const [imgError, setImgError] = useState(false)
  const gradient = chipColors[product.id] || 'from-brown/90 to-charcoal/90'

  return (
    <Link
      to={`/products/${product.id}`}
      className={`hero-chip group ${accent ? 'hero-chip-accent' : ''} ${className}`}
    >
      <span className="hero-chip-thumb" aria-hidden="true">
        {!imgError && product.image ? (
          <img
            src={product.image}
            alt=""
            className={`w-full h-full ${product.imageFit === 'contain' ? 'object-contain p-0.5 bg-cream' : 'object-cover'}`}
            style={{ objectPosition: product.imagePosition || 'center' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={`flex w-full h-full items-center justify-center bg-gradient-to-br ${gradient} text-cream text-xs font-semibold`}>
            {product.name.charAt(0)}
          </span>
        )}
      </span>
      <span className="hero-chip-label">{product.name}</span>
    </Link>
  )
}
