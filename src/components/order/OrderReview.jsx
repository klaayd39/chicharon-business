import { Truck, Store, MapPin, Phone, User, StickyNote } from 'lucide-react'
import { businessConfig } from '../../data/businessConfig'
import CartItemImage from '../cart/CartItemImage'

function ReviewRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-cream-dark/60 last:border-0 last:pb-0 first:pt-0">
      <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-brown/70" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold text-warm-gray uppercase tracking-wider mb-0.5">{label}</p>
        <div className="text-sm text-charcoal leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export default function OrderReview({ items, form, orderType }) {
  const isDelivery = orderType === 'delivery'
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <div className="order-section-card space-y-5">
      <div>
        <h2 className="order-section-title">Review your order</h2>
        <p className="order-section-desc">
          Double-check everything before you submit. You can still edit your details below.
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-3">
          {totalItems} item{totalItems !== 1 ? 's' : ''}
        </p>
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-cream/50 border border-cream-dark/50"
            >
              <CartItemImage item={item} className="w-12 h-12 rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brown leading-tight">{item.name}</p>
                <p className="text-xs text-warm-gray mt-0.5">Qty: {item.quantity}</p>
              </div>
              <span className="text-xs text-warm-gray italic shrink-0">{item.priceDisplay}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-cream-dark/60 bg-white p-4">
        <ReviewRow icon={isDelivery ? Truck : Store} label="Order type">
          {isDelivery ? 'Delivery' : 'Pickup'}
        </ReviewRow>
        <ReviewRow icon={User} label="Name">{form.fullName}</ReviewRow>
        <ReviewRow icon={Phone} label="Contact">{form.contactNumber}</ReviewRow>
        {isDelivery && form.address && (
          <ReviewRow icon={MapPin} label="Delivery address">
            <span className="whitespace-pre-line">{form.address}</span>
          </ReviewRow>
        )}
        {!isDelivery && (
          <ReviewRow icon={MapPin} label="Pickup location">
            {businessConfig.location.city}, {businessConfig.location.province}
            <span className="block text-xs text-warm-gray mt-1">
              Hours: {businessConfig.businessHours.display}
            </span>
          </ReviewRow>
        )}
        {form.notes && (
          <ReviewRow icon={StickyNote} label="Notes">
            <span className="whitespace-pre-line">{form.notes}</span>
          </ReviewRow>
        )}
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-brown/5 border border-brown/10">
        <span className="font-display text-lg font-semibold text-brown">Total</span>
        <span className="text-sm text-warm-gray italic">{businessConfig.totalStatus}</span>
      </div>

      <p className="text-xs text-warm-gray leading-relaxed text-center px-2">
        Pricing will be confirmed when we contact you. No payment is required right now.
      </p>
    </div>
  )
}
