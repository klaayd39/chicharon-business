import { Truck, Store, Info } from 'lucide-react'
import { businessConfig } from '../../data/businessConfig'
import OrderAlert from './OrderAlert'

const orderTypes = [
  { id: 'delivery', label: 'Delivery', desc: 'We bring it to you', icon: Truck },
  { id: 'pickup', label: 'Pickup', desc: 'Collect from us', icon: Store },
]

const fieldIds = {
  fullName: 'fullName',
  contactNumber: 'contactNumber',
  address: 'address',
  notes: 'notes',
}

export default function OrderDetailsForm({
  form,
  errors,
  orderType,
  onFieldChange,
  onOrderTypeChange,
}) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="order-section-card" aria-labelledby="order-type-heading">
        <div className="mb-4">
          <h2 id="order-type-heading" className="order-section-title">
            How would you like to receive your order?
          </h2>
          <p className="order-section-desc">Choose delivery or pickup in Malaybalay City.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {orderTypes.map((type) => {
            const active = orderType === type.id
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => onOrderTypeChange(type.id)}
                className={`order-type-option ${
                  active ? 'order-type-option-active' : 'order-type-option-inactive'
                }`}
                aria-pressed={active}
              >
                <type.icon
                  className={`w-5 h-5 mb-2 ${active ? 'text-brown' : 'text-warm-gray'}`}
                  aria-hidden="true"
                />
                <span className="font-semibold text-brown text-sm block">{type.label}</span>
                <p className="text-xs text-warm-gray mt-0.5 leading-snug">{type.desc}</p>
              </button>
            )
          })}
        </div>
      </section>

      <section className="order-section-card" aria-labelledby="your-info-heading">
        <div className="mb-5">
          <h2 id="your-info-heading" className="order-section-title">
            Your details
          </h2>
          <p className="order-section-desc">
            We&apos;ll use this to confirm your order. Fields marked <span className="text-red">*</span> are required.
          </p>
        </div>

        {errors.items && (
          <div className="mb-4">
            <OrderAlert variant="error">{errors.items}</OrderAlert>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor={fieldIds.fullName} className="block text-sm font-medium text-charcoal mb-1.5">
              Full Name <span className="text-red" aria-hidden="true">*</span>
            </label>
            <input
              id={fieldIds.fullName}
              name="fullName"
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              value={form.fullName}
              onChange={(e) => onFieldChange('fullName', e.target.value)}
              className={`input-field text-base sm:text-sm ${errors.fullName ? 'input-error' : 'border-cream-dark'}`}
              placeholder="Juan Dela Cruz"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-red text-xs mt-1.5 font-medium" role="alert">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fieldIds.contactNumber} className="block text-sm font-medium text-charcoal mb-1.5">
              Contact Number <span className="text-red" aria-hidden="true">*</span>
            </label>
            <input
              id={fieldIds.contactNumber}
              name="contactNumber"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              enterKeyHint="next"
              value={form.contactNumber}
              onChange={(e) => onFieldChange('contactNumber', e.target.value)}
              className={`input-field text-base sm:text-sm ${errors.contactNumber ? 'input-error' : 'border-cream-dark'}`}
              placeholder="09XX XXX XXXX"
              aria-invalid={!!errors.contactNumber}
              aria-describedby={errors.contactNumber ? 'contact-error' : 'contact-hint'}
            />
            <p id="contact-hint" className="text-xs text-warm-gray mt-1.5">
              We&apos;ll call or message you to confirm.
            </p>
            {errors.contactNumber && (
              <p id="contact-error" className="text-red text-xs mt-1.5 font-medium" role="alert">
                {errors.contactNumber}
              </p>
            )}
          </div>

          {orderType === 'delivery' && (
            <div>
              <label htmlFor={fieldIds.address} className="block text-sm font-medium text-charcoal mb-1.5">
                Delivery Address <span className="text-red" aria-hidden="true">*</span>
              </label>
              <textarea
                id={fieldIds.address}
                name="address"
                value={form.address}
                onChange={(e) => onFieldChange('address', e.target.value)}
                rows={3}
                className={`input-field resize-none text-base sm:text-sm ${errors.address ? 'input-error' : 'border-cream-dark'}`}
                placeholder="Street, Barangay, Malaybalay City"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && (
                <p id="address-error" className="text-red text-xs mt-1.5 font-medium" role="alert">
                  {errors.address}
                </p>
              )}
            </div>
          )}

          {orderType === 'pickup' && (
            <div className="flex gap-3 p-4 rounded-xl bg-cream border border-cream-dark/60">
              <Info className="w-4 h-4 text-red shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm text-charcoal font-medium">
                  Pickup in {businessConfig.location.city}, {businessConfig.location.province}
                </p>
                <p className="text-xs text-warm-gray mt-1 leading-relaxed">
                  Hours: {businessConfig.businessHours.display}. We&apos;ll confirm your pickup time after you submit.
                </p>
              </div>
            </div>
          )}

          <div>
            <label htmlFor={fieldIds.notes} className="block text-sm font-medium text-charcoal mb-1.5">
              Notes <span className="text-warm-gray font-normal">(optional)</span>
            </label>
            <textarea
              id={fieldIds.notes}
              name="notes"
              value={form.notes}
              onChange={(e) => onFieldChange('notes', e.target.value)}
              rows={3}
              className="input-field resize-none border-cream-dark text-base sm:text-sm"
              placeholder="Allergies, preferred time, or special requests..."
            />
          </div>
        </div>
      </section>
    </div>
  )
}
