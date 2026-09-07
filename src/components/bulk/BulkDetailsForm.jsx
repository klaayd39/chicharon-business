import { Truck, Store } from 'lucide-react'
import { businessConfig } from '../../data/businessConfig'

const orderTypes = [
  { id: 'delivery', label: 'Delivery', desc: 'Have your order delivered', icon: Truck },
  { id: 'pickup', label: 'Pickup', desc: 'Pick up your order', icon: Store },
]

function localToday() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function BulkDetailsForm({ form, errors, orderType, onFieldChange, onOrderTypeChange }) {
  const today = localToday()
  return (
    <div className="space-y-6">
      {/* Customer info */}
      <div className="space-y-4">
        <h3 className="font-display text-lg sm:text-xl font-semibold text-brown">Your Information</h3>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-charcoal mb-1.5">
            Full Name <span className="text-red">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => onFieldChange('fullName', e.target.value)}
            className={`input-field ${errors.fullName ? 'input-error' : 'border-cream-dark'}`}
            placeholder="Juan Dela Cruz"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-red text-xs mt-1.5" role="alert">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-charcoal mb-1.5">
            Business / Organization Name <span className="text-warm-gray-light font-normal">(optional)</span>
          </label>
          <input
            id="businessName"
            type="text"
            autoComplete="organization"
            value={form.businessName}
            onChange={(e) => onFieldChange('businessName', e.target.value)}
            className="input-field border-cream-dark"
            placeholder="ABC Store"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-charcoal mb-1.5">
              Contact Number <span className="text-red">*</span>
            </label>
            <input
              id="contactNumber"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.contactNumber}
              onChange={(e) => onFieldChange('contactNumber', e.target.value)}
              className={`input-field ${errors.contactNumber ? 'input-error' : 'border-cream-dark'}`}
              placeholder="09XX XXX XXXX"
              aria-invalid={!!errors.contactNumber}
              aria-describedby={errors.contactNumber ? 'contact-error' : undefined}
            />
            {errors.contactNumber && (
              <p id="contact-error" className="text-red text-xs mt-1.5" role="alert">{errors.contactNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
              Email Address <span className="text-warm-gray-light font-normal">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              className={`input-field ${errors.email ? 'input-error' : 'border-cream-dark'}`}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red text-xs mt-1.5" role="alert">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* Order type */}
      <fieldset>
        <legend className="font-display text-lg sm:text-xl font-semibold text-brown mb-3">
          Order Type <span className="text-red text-sm">*</span>
        </legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {orderTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => onOrderTypeChange(type.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                orderType === type.id
                  ? 'border-brown bg-brown/5 shadow-sm'
                  : 'border-cream-dark bg-white hover:border-brown/25'
              }`}
              aria-pressed={orderType === type.id}
            >
              <type.icon
                className={`w-5 h-5 mb-2 ${orderType === type.id ? 'text-brown' : 'text-warm-gray'}`}
                aria-hidden="true"
              />
              <span className="font-semibold text-brown text-sm block">{type.label}</span>
              <p className="text-xs text-warm-gray mt-0.5">{type.desc}</p>
            </button>
          ))}
        </div>
        {errors.orderType && (
          <p className="text-red text-xs mt-1.5" role="alert">{errors.orderType}</p>
        )}
      </fieldset>

      {orderType === 'delivery' && (
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-charcoal mb-1.5">
            Delivery Address <span className="text-red">*</span>
          </label>
          <textarea
            id="address"
            value={form.address}
            onChange={(e) => onFieldChange('address', e.target.value)}
            rows={3}
            className={`input-field resize-none ${errors.address ? 'input-error' : 'border-cream-dark'}`}
            placeholder="Street, Barangay, Malaybalay City"
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? 'address-error' : undefined}
          />
          {errors.address && (
            <p id="address-error" className="text-red text-xs mt-1.5" role="alert">{errors.address}</p>
          )}
        </div>
      )}

      {orderType === 'pickup' && (
        <div className="p-4 rounded-xl bg-cream border border-cream-dark/60">
          <p className="text-sm text-warm-gray leading-relaxed">
            Pickup available in {businessConfig.location.city}, {businessConfig.location.province}.
          </p>
          <p className="text-xs text-warm-gray mt-1">
            Business hours: {businessConfig.businessHours.display}
          </p>
        </div>
      )}

      {/* Schedule */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-charcoal mb-1.5">
            Preferred {orderType === 'delivery' ? 'Delivery' : 'Pickup'} Date <span className="text-red">*</span>
          </label>
          <input
            id="preferredDate"
            type="date"
            min={today}
            value={form.preferredDate}
            onChange={(e) => onFieldChange('preferredDate', e.target.value)}
            className={`input-field ${errors.preferredDate ? 'input-error' : 'border-cream-dark'}`}
            aria-invalid={!!errors.preferredDate}
            aria-describedby={errors.preferredDate ? 'date-error' : undefined}
          />
          {errors.preferredDate && (
            <p id="date-error" className="text-red text-xs mt-1.5" role="alert">{errors.preferredDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="preferredTime" className="block text-sm font-medium text-charcoal mb-1.5">
            Preferred Time <span className="text-warm-gray-light font-normal">(optional)</span>
          </label>
          <input
            id="preferredTime"
            type="time"
            value={form.preferredTime}
            onChange={(e) => onFieldChange('preferredTime', e.target.value)}
            className="input-field border-cream-dark"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-charcoal mb-1.5">
          Additional Notes <span className="text-warm-gray-light font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          value={form.notes}
          onChange={(e) => onFieldChange('notes', e.target.value)}
          rows={3}
          className="input-field resize-none border-cream-dark"
          placeholder="Any special requirements for your bulk order..."
        />
      </div>
    </div>
  )
}
