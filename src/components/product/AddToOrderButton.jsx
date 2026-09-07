import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import { useAddToOrder } from '../../hooks/useAddToOrder'

export default function AddToOrderButton({
  product,
  quantity = 1,
  size = 'md',
  className = '',
  showLabel = true,
  onAdded,
}) {
  const { addToOrder, isAdded } = useAddToOrder()
  const added = isAdded(product.id)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-sm sm:text-base',
  }

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToOrder(product, quantity)
    onAdded?.()
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-200 ${sizeClasses[size]} ${
        added
          ? 'bg-green-700 text-cream'
          : 'bg-brown text-cream hover:bg-brown-light hover:shadow-lg hover:shadow-brown/15'
      } ${className}`}
      aria-label={added ? `${product.name} added to order` : `Add ${product.name} to order`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="w-4 h-4" aria-hidden="true" />
            {showLabel && 'Added'}
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            {showLabel && 'Add to Order'}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
