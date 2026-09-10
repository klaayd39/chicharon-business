import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { businessConfig } from '../../data/businessConfig'
import Button from '../ui/Button'

const ease = [0.22, 1, 0.36, 1]

export default function BulkOrderSuccess({ reference, demo = false }) {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

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
          Bulk Order Request Received!
        </h2>
        <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-6">
          Thank you for choosing {businessConfig.name}. We&apos;ve received your request and will
          contact you to confirm availability, pricing, and delivery or pickup details.
        </p>

        {demo && (
          <p
            className="text-amber-900 text-sm mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200/80"
            role="status"
          >
            Demo mode: this request was not sent to our system yet. Please contact us directly to
            confirm your bulk order.
          </p>
        )}

        {reference && (
          <div className="inline-flex flex-col items-center gap-1 px-6 py-4 rounded-xl bg-cream border border-cream-dark/60 mb-6 w-full sm:w-auto">
            <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
              Your Reference Number
            </span>
            <span className="font-display text-xl font-semibold text-brown tracking-wide">
              Request #{reference}
            </span>
            <span className="text-xs text-warm-gray mt-1">Status: Request Submitted</span>
          </div>
        )}

        <div className="text-left p-4 rounded-xl bg-cream/60 border border-cream-dark/60 mb-8">
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-1">
            Next Steps
          </p>
          <p className="text-sm text-charcoal">
            Our team will review your request and get back to you with a quote and confirmation.
          </p>
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
