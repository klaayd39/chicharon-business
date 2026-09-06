import { useState } from 'react'
import ProductCard from './ProductCard'
import { categories } from '../data/products'

export default function ProductGrid({ products, showFilters = true }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10" role="tablist" aria-label="Product categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-brown text-cream shadow-sm'
                  : 'bg-white text-charcoal/70 border border-cream-dark hover:border-brown/25 hover:text-brown'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-14">
          <p className="text-warm-gray">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-3xl sm:max-w-none mx-auto">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
