import { Link } from 'react-router-dom'
import { products } from '../../data/products'

const stripIds = ['lumpia', 'tocino', 'tapa', 'longganisa', 'bbq', 'chicharon']

export default function HeroPhotoStrip() {
  const items = stripIds.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  return (
    <section aria-label="Shop all products" className="border-y border-cream-dark/60 bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group relative aspect-[5/3] sm:aspect-[4/3] overflow-hidden border-r border-b lg:border-b-0 border-cream-dark/40 last:border-r-0"
          >
            <img
              src={product.image}
              alt={product.imageAlt}
              className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
                product.imageFit === 'contain' ? 'object-contain bg-cream p-2' : 'object-cover'
              }`}
              style={{ objectPosition: product.imagePosition || 'center' }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent group-hover:from-charcoal/70 transition-colors" />
            <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-display text-lg sm:text-xl font-semibold text-cream drop-shadow-sm">
              {product.name}
            </span>
            <span className="absolute top-3 right-3 text-[11px] font-medium text-cream/0 group-hover:text-cream/90 transition-colors">
              Shop
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
