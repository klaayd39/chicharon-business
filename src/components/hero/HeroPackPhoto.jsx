import { Link } from 'react-router-dom'

export default function HeroPackPhoto({ product, className = '' }) {
  if (!product?.image) return null

  return (
    <Link
      to={`/products/${product.id}`}
      className={`hero-pack-hero group block ${className}`}
    >
      <img
        src={product.image}
        alt={product.imageAlt}
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        decoding="async"
        fetchPriority="high"
      />
    </Link>
  )
}
