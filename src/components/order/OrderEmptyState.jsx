import { ShoppingBag } from 'lucide-react'
import Button from '../ui/Button'

export default function OrderEmptyState({ onBrowse, onHome }) {
  return (
    <div className="order-empty-state card max-w-md mx-auto px-6 py-10 sm:py-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-cream-dark/50 flex items-center justify-center mx-auto mb-5">
        <ShoppingBag className="w-8 h-8 text-brown/50" aria-hidden="true" />
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brown mb-2">
        Your cart is empty
      </h2>
      <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-8 max-w-xs mx-auto">
        Add a few favorites first, then come back here to enter your delivery or pickup details.
      </p>
      <div className="flex flex-col gap-3">
        <Button onClick={onBrowse} size="lg" className="w-full">
          Browse Products
        </Button>
        <Button onClick={onHome} variant="secondary" size="lg" className="w-full">
          Back to Home
        </Button>
      </div>
    </div>
  )
}
