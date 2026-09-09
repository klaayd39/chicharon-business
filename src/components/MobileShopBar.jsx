import { useLocation } from 'react-router-dom'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/useCart'
import Button from './ui/Button'

export default function MobileShopBar() {
  const { itemCount, openCart } = useCart()
  const location = useLocation()
  const isShop = location.pathname === '/' || location.pathname.startsWith('/products')

  if (!isShop) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-cream-dark/80 bg-white/95 backdrop-blur-md safe-bottom"
      role="region"
      aria-label="Quick shop actions"
    >
      <div className="flex items-center gap-2 px-4 py-2.5">
        <button
          type="button"
          onClick={openCart}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-cream-dark text-brown text-sm font-semibold min-w-[5.5rem]"
          aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
        >
          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          Cart{itemCount > 0 ? ` (${itemCount})` : ''}
        </button>
        <Button to="/products" size="md" className="flex-1">
          Order Now
          <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
