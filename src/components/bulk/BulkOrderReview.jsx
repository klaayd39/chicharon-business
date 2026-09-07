import { businessConfig } from '../../data/businessConfig'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(`${dateStr}T00:00:00`)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function Row({ label, value }) {
  if (!value) return null
  return (
    <div>
      <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-charcoal whitespace-pre-line">{value}</p>
    </div>
  )
}

export default function BulkOrderReview({ items, form, orderType }) {
  const orderTypeLabel = orderType === 'delivery' ? 'Delivery' : 'Pickup'

  return (
    <div className="card p-5 sm:p-6 space-y-5">
      <div>
        <p className="text-xs font-semibold text-red uppercase tracking-[0.15em] mb-1">Bulk Order Request</p>
        <h3 className="font-display text-lg sm:text-xl font-semibold text-brown">Review Your Request</h3>
      </div>

      <div className="space-y-3 text-sm">
        <Row label="Customer" value={form.fullName} />
        <Row label="Business / Organization" value={form.businessName} />
        <Row label="Contact" value={form.contactNumber} />
        <Row label="Email" value={form.email} />
      </div>

      <div className="border-t border-cream-dark pt-4">
        <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">Products</p>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id} className="text-sm text-charcoal flex justify-between gap-4">
              <span>
                {item.name} <span className="text-warm-gray">× {item.quantity} {item.unit}(s)</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-cream-dark pt-4 space-y-3 text-sm">
        <Row label="Order Type" value={orderTypeLabel} />
        {orderType === 'delivery' && <Row label="Address" value={form.address} />}
        {orderType === 'pickup' && (
          <Row label="Pickup Location" value={`${businessConfig.location.city}, ${businessConfig.location.province}`} />
        )}
        <Row label="Preferred Date" value={formatDate(form.preferredDate)} />
        <Row label="Preferred Time" value={form.preferredTime} />
        <Row label="Notes" value={form.notes} />
      </div>

      <div className="flex justify-between items-center border-t border-cream-dark pt-4">
        <span className="font-medium text-charcoal">Total</span>
        <span className="text-sm text-warm-gray italic">{businessConfig.totalStatus}</span>
      </div>

      <p className="text-xs text-warm-gray leading-relaxed">
        Bulk orders are subject to confirmation. We&apos;ll contact you to confirm availability,
        pricing, and {orderType === 'delivery' ? 'delivery' : 'pickup'} details.
      </p>
    </div>
  )
}
