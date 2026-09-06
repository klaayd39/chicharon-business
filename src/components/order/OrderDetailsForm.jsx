import { Truck, Store } from 'lucide-react'
import { businessConfig } from '../../data/businessConfig'

const orderTypes = [
  { id: 'delivery', label: 'Delivery', desc: 'Have your order delivered', icon: Truck },
  { id: 'pickup', label: 'Pickup', desc: 'Pick up your order', icon: Store },
]

export default function OrderDetailsForm({
  form,
  errors,
  orderType,
  onFieldChange,
  onOrderTypeChange,
}) {
  return (
    <>
      <fieldset className="mb-6">
        <legend className="font-display text-lg sm:text-xl font-semibold text-brown mb-3">
          Order Type
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
      </fieldset>

      <div className="space-y-4">
        <h3 className="font-display text-lg sm:text-xl font-semibold text-brown">Your Information</h3>

        {errors.items && (
          <p className="text-red text-sm p-3 bg-red/5 rounded-xl" role="alert">{errors.items}</p>
        )}

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

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-charcoal mb-1.5">
            Notes / Special Instructions
          </label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={(e) => onFieldChange('notes', e.target.value)}
            rows={3}
            className="input-field resize-none border-cream-dark"
            placeholder="Any special requests or instructions..."
          />
        </div>
      </div>
    </>
  )
}
