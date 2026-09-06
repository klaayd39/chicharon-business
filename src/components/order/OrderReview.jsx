import { businessConfig } from '../../data/businessConfig'

export default function OrderReview({ items, form, orderType }) {
  const orderTypeLabel = orderType === 'delivery' ? 'Delivery' : 'Pickup'

  return (
    <div className="card p-5 sm:p-6 space-y-5">
      <h3 className="font-display text-lg sm:text-xl font-semibold text-brown">Order Summary</h3>

      <div>
        <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">Items</p>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id} className="text-sm text-charcoal">
              {item.name} × {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-cream-dark pt-4 space-y-3 text-sm">
        <div>
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-0.5">Order Type</p>
          <p className="text-charcoal">{orderTypeLabel}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-0.5">Customer</p>
          <p className="text-charcoal">{form.fullName}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-0.5">Contact</p>
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
          </div>
        )}

        {form.notes && (
          <div>
            <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-0.5">Notes</p>
            <p className="text-charcoal whitespace-pre-line">{form.notes}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center border-t border-cream-dark pt-4">
        <span className="font-medium text-charcoal">Total</span>
        <span className="text-sm text-warm-gray italic">{businessConfig.totalStatus}</span>
      </div>
    </div>
  )
}
