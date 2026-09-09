import { Link } from 'react-router-dom'

export default function HeroFloatPhoto({ product, className = '', rotate = '' }) {
  if (!product?.image) return null

  return (
    <Link
      to={`/products/${product.id}`}
      className={`hero-float-photo group relative ${className} ${rotate}`}
    >
      <img
        src={product.image}
        alt=""
        className={`w-full h-full ${product.imageFit === 'contain' ? 'object-contain bg-cream p-1' : 'object-cover'}`}
        style={{ objectPosition: product.imagePosition || 'center' }}
        decoding="async"
      />
      <span className="hero-float-photo-label">{product.name}</span>
    </Link>
  )
}
