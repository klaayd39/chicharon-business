import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartBadge() {
  const { itemCount, bump, openCart } = useCart()

  return (
    <button
      onClick={openCart}
      className="relative p-2.5 rounded-full hover:bg-brown/5 transition-colors"
      aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
    >
      <ShoppingBag className="w-5 h-5 text-brown" />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 400 }}
            className="absolute top-0.5 right-0.5 flex h-4 min-w-4 px-0.5 items-center justify-center rounded-full bg-red text-[9px] font-bold text-cream"
          >
            <motion.span
              key={bump}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {itemCount > 9 ? '9+' : itemCount}
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
