import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import CartItemImage from './CartItemImage'
import QuantityControl from '../ui/QuantityControl'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.2 }}
      className="card p-3.5 sm:p-4"
    >
      <div className="flex gap-3">
        <CartItemImage item={item} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-brown text-sm leading-tight">{item.name}</h3>
              <p className="text-xs text-warm-gray italic mt-0.5">{item.priceDisplay}</p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1.5 -mr-1 rounded-lg text-warm-gray hover:text-red hover:bg-red/5 transition-colors shrink-0"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-2.5">
            <QuantityControl
              value={item.quantity}
              onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
              onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
              label={item.name}
              size="sm"
            />
          </div>
        </div>
      </div>
    </motion.li>
  )
}
