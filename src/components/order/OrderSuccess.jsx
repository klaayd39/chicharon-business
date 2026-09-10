import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle, Truck, Store } from 'lucide-react'
import { businessConfig } from '../../data/businessConfig'
import Button from '../ui/Button'

const ease = [0.22, 1, 0.36, 1]

export default function OrderSuccess({ form, orderType, orderId, demo = false }) {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const isDelivery = orderType === 'delivery'

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      className="max-w-lg mx-auto"
    >
      <div className="card p-6 sm:p-8 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-700" aria-hidden="true" />
        </motion.div>

        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brown mb-2">
          Order Received
        </h2>
        <p className="font-medium text-brown/80 mb-1">
          Thank you for ordering from {businessConfig.name}!
        </p>
        <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-6">
          Your order details have been recorded. We&apos;ll contact you to confirm availability,
          pricing, and {isDelivery ? 'delivery' : 'pickup'} details.
        </p>

        {demo && (
          <p
            className="text-amber-900 text-sm mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200/80"
            role="status"
          >
            Demo mode: this order was not sent to our system yet. Please contact us directly to
            confirm your order.
          </p>
        )}

        {orderId && (
          <div className="inline-flex flex-col items-center gap-1 px-6 py-4 rounded-xl bg-cream border border-cream-dark/60 mb-6 w-full sm:w-auto">
            <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
              Your Order Reference
            </span>
            <span className="font-display text-xl font-semibold text-brown tracking-wide">
              {orderId}
            </span>
            <span className="text-xs text-warm-gray mt-1">Status: Request Submitted</span>
          </div>
        )}

        <div className="text-left space-y-4 mb-8 p-4 rounded-xl bg-cream/60 border border-cream-dark/60">
          <div className="flex items-start gap-3">
            {isDelivery ? (
              <Truck className="w-4 h-4 text-red shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <Store className="w-4 h-4 text-red shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <div>
              <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-0.5">
                {isDelivery ? 'Delivery' : 'Pickup'}
              </p>
              <p className="text-sm text-charcoal">
                {isDelivery
                  ? form.address || 'Address on file'
                  : `${businessConfig.location.city}, ${businessConfig.location.province}`}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-0.5">
              Next Steps
            </p>
            <p className="text-sm text-charcoal">
              We&apos;ll reach out via {form.contactNumber} to confirm your order.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate('/products')} size="lg" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
          <Button onClick={() => navigate('/')} variant="secondary" size="lg" className="w-full sm:w-auto">
            Back to Home
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
