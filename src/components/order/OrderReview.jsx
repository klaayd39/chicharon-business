import { businessConfig } from '../../data/businessConfig'
import CartItemImage from '../cart/CartItemImage'

export default function OrderReview({ items, form, orderType }) {
  const orderTypeLabel = orderType === 'delivery' ? 'Delivery' : 'Pickup'
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <div className="card p-5 sm:p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg sm:text-xl font-semibold text-brown">Order Summary</h3>
        <p className="text-sm text-warm-gray mt-1">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-3">Items</p>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <CartItemImage item={item} className="w-12 h-12 rounded-lg" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-charcoal">{item.name}</p>
                <p className="text-xs text-warm-gray">Qty: {item.quantity}</p>
              </div>
              <span className="text-xs text-warm-gray italic shrink-0">{item.priceDisplay}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-cream-dark pt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Order Type</p>
          <p className="text-charcoal font-medium">{orderTypeLabel}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Customer</p>
          <p className="text-charcoal">{form.fullName}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Contact</p>
          <p className="text-charcoal">{form.contactNumber}</p>
        </div>

        {orderType === 'delivery' && form.address && (
          <div>
            <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-0.5">Address</p>
            <p className="text-charcoal whitespace-pre-line">{form.address}</p>
          </div>
        )}

        {orderType === 'pickup' && (
          <div>
            <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-0.5">Pickup Location</p>
            <p className="text-charcoal">
              {businessConfig.location.city}, {businessConfig.location.province}
            </p>
            <p className="text-xs text-warm-gray mt-0.5">
              Hours: {businessConfig.businessHours.display}
            </p>
          </div>
        )}

        {form.notes && (
          <div>
            <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-0.5">Notes</p>
            <p className="text-charcoal whitespace-pre-line">{form.notes}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center border-t border-cream-dark pt-4 bg-cream/40 -mx-5 sm:-mx-6 px-5 sm:px-6 py-3 -mb-5 sm:-mb-6 rounded-b-2xl">
        <span className="font-display text-lg font-semibold text-brown">Total</span>
        <span className="text-sm text-warm-gray italic">{businessConfig.totalStatus}</span>
      </div>
    </div>
  )
}
