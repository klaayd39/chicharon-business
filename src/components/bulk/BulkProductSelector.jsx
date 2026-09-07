import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import CartItemImage from '../cart/CartItemImage'
import BulkQuantityInput from './BulkQuantityInput'
import { businessConfig } from '../../data/businessConfig'

export default function BulkProductSelector({
  products,
  selectedItems,
  onAdd,
  onQuantityChange,
  onRemove,
  error,
}) {
  const selectedIds = new Set(selectedItems.map((i) => i.id))
  const available = products.filter((p) => !selectedIds.has(p.id))
  const startQty = businessConfig.bulkOrder.minQuantity || 1

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg sm:text-xl font-semibold text-brown">Products</h3>
        <span className="text-xs text-warm-gray">{businessConfig.totalStatus}</span>
      </div>

      {error && (
        <p className="text-red text-sm p-3 bg-red/5 rounded-xl" role="alert">
          {error}
        </p>
      )}

      {/* Selected products */}
      {selectedItems.length > 0 && (
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {selectedItems.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="card p-3.5 sm:p-4"
              >
                <div className="flex gap-3">
                  <CartItemImage item={item} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-brown text-sm leading-tight">{item.name}</h4>
                        <p className="text-xs text-warm-gray mt-0.5">Unit: {item.unit}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="p-1.5 -mr-1 rounded-lg text-warm-gray hover:text-red hover:bg-red/5 transition-colors shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-2.5 flex items-center gap-3 flex-wrap">
                      <BulkQuantityInput
                        value={item.quantity}
                        onChange={(q) => onQuantityChange(item.id, q)}
                        min={businessConfig.bulkOrder.minQuantity || 1}
                        label={item.name}
                      />
                      <span className="text-xs text-warm-gray">{item.unit}(s)</span>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* Available products to add */}
      {available.length > 0 && (
        <div className="space-y-2">
          {selectedItems.length > 0 && (
            <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider pt-1">
              Add more products
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-3">
            {available.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => onAdd(product, startQty)}
                className="flex items-center gap-3 p-3 rounded-xl border-2 border-cream-dark bg-white text-left hover:border-brown/25 transition-all"
              >
                <CartItemImage item={product} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brown text-sm leading-tight">{product.name}</p>
                  <p className="text-xs text-warm-gray mt-0.5">{product.categoryLabel}</p>
                </div>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brown/5 text-brown shrink-0">
                  <Plus className="w-4 h-4" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedItems.length === 0 && available.length === 0 && (
        <p className="text-warm-gray text-sm">No products available.</p>
      )}
    </div>
  )
}
