import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductImage from './ProductImage'
import Button from './ui/Button'
import AddToOrderButton from './product/AddToOrderButton'
import { getPriceDisplay } from '../data/products'

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group h-full"
    >
      <div className="card card-hover overflow-hidden h-full flex flex-col">
        <Link to={`/products/${product.id}`} className="block overflow-hidden">
          <ProductImage product={product} aspect="aspect-[4/3]" />
        </Link>
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <p className="text-[11px] sm:text-xs font-semibold text-red tracking-wider uppercase mb-1.5">
            {product.categoryLabel}
          </p>
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-brown mb-2 group-hover:text-red transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-warm-gray text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>
          <p className="text-sm font-medium text-warm-gray italic mb-4">
            {getPriceDisplay(product)}
          </p>
          <div className="flex flex-col gap-2.5 pt-1">
            <AddToOrderButton product={product} size="md" className="w-full" />
            <Button to={`/products/${product.id}`} variant="secondary" size="sm" className="w-full">
              View Product
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
