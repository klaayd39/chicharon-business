import { Link } from 'react-router-dom'

export default function HeroProductCard({ product, featured = false }) {
  const isPack = product.imageFit === 'contain'

  return (
    <Link
      to={`/products/${product.id}`}
      className={`hero-product-card group ${featured ? 'hero-product-card-featured' : ''}`}
    >
      <div className={`hero-product-card-media ${isPack ? 'hero-product-card-media-pack' : ''}`}>
        <img
          src={product.image}
          alt={product.imageAlt}
          className={isPack ? 'hero-product-pack-img' : 'hero-product-food-img'}
          style={!isPack ? { objectPosition: product.imagePosition || 'center' } : undefined}
          decoding={featured ? 'async' : 'lazy'}
          fetchPriority={featured ? 'high' : undefined}
        />
      </div>
      <div className="hero-product-card-footer">
        <span className="hero-product-card-name">{product.name}</span>
        {product.weight && (
          <span className="hero-product-card-meta">{product.weight}</span>
        )}
      </div>
    </Link>
  )
}
