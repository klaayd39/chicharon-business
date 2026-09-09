import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import ProductImage from './ProductImage'
import Button from './ui/Button'
import AddToOrderButton from './product/AddToOrderButton'
import { getPriceDisplay } from '../data/products'
import { easeOutExpo } from '../constants/motion'

export default function ProductCard({ product, index = 0 }) {
  const prefersReducedMotion = useReducedMotion()
  const [quantity, setQuantity] = useState(1)
  const isOutOfStock = product.availability === 'out-of-stock'
  const price = getPriceDisplay(product)

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: easeOutExpo }}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      className="group h-full"
    >
      <div className="product-card-v2 h-full flex flex-col">
        <Link to={`/products/${product.id}`} className="block relative overflow-hidden bg-cream-dark/30">
          <ProductImage
            product={product}
            aspect="aspect-[4/3]"
            imageFit={product.imageFit}
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.featured && (
              <span className="badge-pill bg-brown text-cream shadow-sm">Fan Favorite</span>
            )}
            {isOutOfStock && (
              <span className="badge-pill bg-charcoal/80 text-cream shadow-sm">Out of Stock</span>
            )}
          </div>
        </Link>

        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-2">
            <Link to={`/products/${product.id}`} className="block min-w-0">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-brown group-hover:text-red transition-colors duration-300">
                {product.name}
              </h3>
            </Link>
            <span className="shrink-0 text-xs font-medium text-warm-gray bg-cream px-2 py-1 rounded-md">
              {product.weight || 'Pack'}
            </span>
          </div>

          <p className="text-warm-gray text-sm leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-end justify-between gap-3 mb-5 mt-auto">
            <p className="font-display text-2xl sm:text-[1.65rem] font-semibold text-brown leading-none">
              {price}
            </p>
            <span className={`text-[11px] font-medium ${isOutOfStock ? 'text-warm-gray' : 'text-green-800'}`}>
              {isOutOfStock ? 'Out of stock' : 'Available'}
            </span>
          </div>

          {!isOutOfStock ? (
            <div className="flex items-center gap-2.5">
              <div className="inline-flex items-center rounded-full border border-cream-dark bg-cream/50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-brown hover:bg-brown/5 rounded-l-full transition-colors"
                  aria-label={`Decrease quantity of ${product.name}`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-brown tabular-nums" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 text-brown hover:bg-brown/5 rounded-r-full transition-colors"
                  aria-label={`Increase quantity of ${product.name}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <AddToOrderButton
                product={product}
                quantity={quantity}
                size="md"
                className="flex-1"
              />
            </div>
          ) : (
            <Button disabled size="md" className="w-full opacity-60">
              Out of Stock
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  )
}
