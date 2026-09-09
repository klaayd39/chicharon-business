import { useState } from 'react'
import ProductCard from './ProductCard'
import ProductSearch from './product/ProductSearch'
import Button from './ui/Button'
import { categories } from '../data/products'
import { searchProducts } from '../utils/searchProducts'

function filterByCategory(products, categoryId) {
  if (categoryId === 'all') return products
  return products.filter((p) => p.category === categoryId)
}

export default function ProductGrid({ products, showFilters = true }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categoryFiltered = filterByCategory(products, activeCategory)
  const filtered = searchProducts(categoryFiltered, searchQuery)
  const hasActiveFilters = activeCategory !== 'all' || searchQuery.length > 0

  const handleClearSearch = () => setSearchQuery('')
  const handleClearAll = () => {
    setSearchQuery('')
    setActiveCategory('all')
  }

  return (
    <div>
      {showFilters && (
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div
              className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide"
              role="tablist"
              aria-label="Product categories"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`category-chip ${
                    activeCategory === cat.id ? 'category-chip-active' : 'category-chip-inactive'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <ProductSearch value={searchQuery} onChange={setSearchQuery} />
          </div>

          {hasActiveFilters && filtered.length > 0 && (
            <p className="text-sm text-warm-gray" aria-live="polite">
              Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              {searchQuery && (
                <>
                  {' '}
                  for &ldquo;<span className="font-medium text-brown">{searchQuery}</span>&rdquo;
                </>
              )}
            </p>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16 px-4 card max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-cream-dark/60 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl" aria-hidden="true">🔍</span>
          </div>
          {searchQuery ? (
            <>
              <p className="font-display text-xl text-brown mb-2">No products found</p>
              <p className="text-warm-gray text-sm mb-6 max-w-xs mx-auto">
                Try searching for chicharon, longganisa, or another product.
              </p>
              <Button onClick={handleClearSearch} variant="secondary" size="md">
                Clear Search
              </Button>
            </>
          ) : (
            <>
              <p className="font-display text-xl text-brown mb-2">No products found</p>
              <p className="text-warm-gray text-sm mb-6">No products available in this category.</p>
              {hasActiveFilters && (
                <Button onClick={handleClearAll} variant="secondary" size="md">
                  View All Products
                </Button>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
