import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { businessConfig } from '../../data/businessConfig'
import Button from '../ui/Button'

export default function BulkOrderSuccess({ reference }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-12 sm:py-16 max-w-lg mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
      >
        <CheckCircle className="w-16 h-16 text-green-700 mx-auto mb-6" aria-hidden="true" />
      </motion.div>

      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brown mb-2">
        Bulk Order Request Received!
      </h2>
      <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-6">
        Thank you for choosing {businessConfig.name}. We&apos;ve received your request and will
        contact you to confirm availability, pricing, and delivery or pickup details.
      </p>

      {reference && (
        <div className="inline-flex flex-col items-center gap-1 px-6 py-4 rounded-xl bg-cream border border-cream-dark/60 mb-6">
          <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
            Your Reference Number
          </span>
          <span className="font-display text-xl font-semibold text-brown tracking-wide">
            Request #{reference}
          </span>
          <span className="text-xs text-warm-gray mt-1">Status: Request Submitted</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={() => navigate('/products')} size="lg" className="w-full sm:w-auto">
          Back to Products
        </Button>
        <Button onClick={() => navigate('/')} variant="secondary" size="lg" className="w-full sm:w-auto">
          Continue Shopping
        </Button>
      </div>
    </motion.div>
  )
}
