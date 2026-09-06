import { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { businessConfig } from '../data/businessConfig'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import Button from './ui/Button'
import CartItem from './cart/CartItem'

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, itemCount } = useCart()
  const navigate = useNavigate()
  const [confirmClear, setConfirmClear] = useState(false)

  useBodyScrollLock(isOpen)

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') closeCart()
    },
    [closeCart]
  )

  useEffect(() => {
    if (!isOpen) {
      setConfirmClear(false)
      return
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])

  const handleProceed = () => {
    closeCart()
    navigate('/order')
  }

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true)
      return
    }
    clearCart()
    setConfirmClear(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal/45 backdrop-blur-[2px] z-50"
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 w-[calc(100%-1rem)] sm:w-full sm:max-w-md bg-cream z-50 flex flex-col shadow-2xl safe-bottom rounded-l-2xl sm:rounded-none overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Order cart"
          >
            <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-cream-dark shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <ShoppingBag className="w-5 h-5 text-brown shrink-0" />
                <h2 className="font-display text-lg sm:text-xl font-semibold text-brown truncate">
                  Your Order
                </h2>
                {itemCount > 0 && (
                  <span className="text-xs text-warm-gray shrink-0">({itemCount})</span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-brown/5 transition-colors shrink-0"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div className="w-14 h-14 rounded-2xl bg-cream-dark/60 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-7 h-7 text-warm-gray-light" />
                  </div>
                  <p className="font-display text-lg text-brown mb-1.5">Your cart is empty</p>
                  <p className="text-warm-gray text-sm mb-6 max-w-[14rem]">
                    Browse our products and add your favorites.
                  </p>
                  <Button to="/products" onClick={closeCart} size="md">
                    Browse Products
                  </Button>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-4 sm:px-5 py-4 border-t border-cream-dark bg-white/60 shrink-0 safe-bottom space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-charcoal text-sm">Total</span>
                  <span className="text-xs sm:text-sm text-warm-gray italic">
                    {businessConfig.totalStatus}
                  </span>
                </div>
                <Button onClick={handleProceed} size="lg" className="w-full">
                  Proceed to Order
                </Button>
                <button
                  type="button"
                  onClick={handleClear}
                  className={`w-full text-sm font-medium py-2 rounded-full transition-colors ${
                    confirmClear
                      ? 'text-red bg-red/5 hover:bg-red/10'
                      : 'text-warm-gray hover:text-brown hover:bg-brown/5'
                  }`}
                >
                  {confirmClear ? 'Tap again to clear cart' : 'Clear Cart'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
