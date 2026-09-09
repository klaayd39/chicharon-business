import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { products } from '../../data/products'
import { staggerContainer, staggerItem } from '../../constants/motion'

export default function HeroProductLinks({ animated = false }) {
  const prefersReducedMotion = useReducedMotion()
  const showMotion = animated && !prefersReducedMotion

  const content = products.map((product, i) => (
    <motion.span
      key={product.id}
      variants={showMotion ? staggerItem : undefined}
      className="inline-flex items-center"
    >
      <Link
        to={`/products/${product.id}`}
        className="hero-product-link text-sm font-medium text-brown/60 hover:text-red transition-colors"
      >
        {product.name}
      </Link>
      {i < products.length - 1 && (
        <span className="text-warm-gray-light mx-2 select-none" aria-hidden="true">·</span>
      )}
    </motion.span>
  ))

  if (showMotion) {
    return (
      <motion.nav
        aria-label="Product quick links"
        className="flex flex-wrap gap-y-1 pt-2"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {content}
      </motion.nav>
    )
  }

  return (
    <nav aria-label="Product quick links" className="flex flex-wrap gap-y-1 pt-2">
      {content}
    </nav>
  )
}
