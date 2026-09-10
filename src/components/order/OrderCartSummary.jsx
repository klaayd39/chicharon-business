import { ShoppingBag, ChevronRight } from 'lucide-react'
import CartItemImage from '../cart/CartItemImage'

export default function OrderCartSummary({ items, onEdit }) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const preview = items.slice(0, 3)

  return (
    <div className="order-cart-summary card p-4 sm:p-5 mb-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-1">
            Your Cart
          </p>
          <p className="font-display text-lg font-semibold text-brown">
            {totalItems} item{totalItems !== 1 ? 's' : ''} ready to order
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-brown/5 flex items-center justify-center shrink-0">
          <ShoppingBag className="w-5 h-5 text-brown" aria-hidden="true" />
        </div>
      </div>

      <ul className="flex items-center gap-2 mb-4" aria-label="Cart preview">
        {preview.map((item) => (
          <li key={item.id} className="shrink-0">
            <CartItemImage item={item} className="w-11 h-11 rounded-lg ring-2 ring-white" />
          </li>
        ))}
        {items.length > 3 && (
          <li className="w-11 h-11 rounded-lg bg-cream border border-cream-dark flex items-center justify-center text-xs font-semibold text-brown">
            +{items.length - 3}
          </li>
        )}
      </ul>

      <button
        type="button"
        onClick={onEdit}
        className="order-link-button w-full flex items-center justify-between gap-2 text-sm font-semibold text-brown py-2.5 px-3 -mx-1 rounded-xl hover:bg-cream transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
      >
        <span>Edit items in cart</span>
        <ChevronRight className="w-4 h-4 text-warm-gray" aria-hidden="true" />
      </button>
    </div>
  )
}
