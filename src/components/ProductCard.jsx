import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import ProductImage from './ProductImage'
import Button from './ui/Button'
import AddToOrderButton from './product/AddToOrderButton'
import { getPriceDisplay } from '../data/products'

const ease = [0.22, 1, 0.36, 1]

export default function ProductCard({ product, index = 0 }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease }}
      className="group h-full"
    >
      <div className="product-card h-full flex flex-col">
        <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
          <ProductImage product={product} aspect="aspect-[4/3]" />
          <span className="badge-pill absolute top-3 left-3 bg-white/95 text-red shadow-sm backdrop-blur-sm">
            {product.categoryLabel}
          </span>
        </Link>

        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-brown mb-2 group-hover:text-red transition-colors duration-200">
              {product.name}
            </h3>
          </Link>

          <p className="text-warm-gray text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="price-tag">{getPriceDisplay(product)}</span>
            {product.availability === 'available' && (
              <span className="text-[11px] font-medium text-green-800 bg-green-50 px-2 py-0.5 rounded-full">
                Available
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2.5 pt-1 mt-auto">
            <AddToOrderButton product={product} size="md" className="w-full shadow-sm" />
            <Button to={`/products/${product.id}`} variant="secondary" size="sm" className="w-full">
              View Product
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
