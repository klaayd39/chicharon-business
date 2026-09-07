import { motion } from 'framer-motion'
import { MapPin, Clock, Truck, Store, ArrowRight } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'
import Button from './ui/Button'
import BrandLogo from './ui/BrandLogo'

const badges = [
  {
    icon: MapPin,
    label: businessConfig.location.full,
    className: 'sm:col-span-2',
  },
  {
    icon: Clock,
    label: businessConfig.businessHours.display,
  },
  ...(businessConfig.deliveryAvailable
    ? [{ icon: Truck, label: 'Delivery Available' }]
    : []),
  ...(businessConfig.pickupAvailable
    ? [{ icon: Store, label: 'Pickup Available' }]
    : []),
]

export default function Hero() {
  return (
    <section className="relative grain overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-dark/40" />

      <div className="relative z-10 section-padding container-max w-full pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-red text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                {businessConfig.name}
              </p>

              <p className="inline-flex items-center gap-2 text-brown/80 text-sm sm:text-base font-medium mb-4">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red" aria-hidden="true" />
                Chicharon &amp; Frozen Longganisa
              </p>

              <h1 className="font-display text-[2rem] leading-[1.12] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-semibold text-brown mb-4 sm:mb-5">
                {businessConfig.headline}
              </h1>

              <p className="text-warm-gray text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-6 sm:mb-7">
                {businessConfig.heroDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-7 sm:mb-8"
            >
              <Button to="/products" size="lg" className="w-full sm:w-auto">
                Order Now
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
              <Button to="/products" variant="secondary" size="lg" className="w-full sm:w-auto">
                Explore Products
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-2 sm:gap-2.5"
            >
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-white/70 rounded-xl text-xs sm:text-sm text-brown border border-cream-dark/80 ${badge.className || ''}`}
                >
                  <badge.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red shrink-0" aria-hidden="true" />
                  <span className="leading-tight">{badge.label}</span>
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none flex flex-col items-center justify-center"
          >
            <BrandLogo size="hero" className="drop-shadow-lg" />
            <p className="mt-4 font-display italic text-brown/70 text-sm sm:text-base text-center">
              {businessConfig.tagline}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
