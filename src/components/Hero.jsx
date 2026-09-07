import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Clock, Truck, Store, ArrowRight } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'
import { getFeaturedProducts } from '../data/products'
import Button from './ui/Button'
import BrandLogo from './ui/BrandLogo'
import ProductImage from './ProductImage'

const ease = [0.22, 1, 0.36, 1]

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
  const prefersReducedMotion = useReducedMotion()
  const featured = getFeaturedProducts()

  return (
    <section className="relative grain overflow-hidden">
      <div className="absolute inset-0 hero-glow" />

      <div className="relative z-10 section-padding container-max w-full pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
          <div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="badge-pill bg-red/8 text-red mb-4">
                {businessConfig.name}
              </p>

              <p className="inline-flex items-center gap-2 text-brown/80 text-sm sm:text-base font-medium mb-4">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red" aria-hidden="true" />
                Chicharon &amp; Frozen Longganisa
              </p>

              <h1 className="font-display text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-semibold text-brown mb-4 sm:mb-5 text-balance">
                {businessConfig.headline}
              </h1>

              <p className="text-warm-gray text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-6 sm:mb-7">
                {businessConfig.heroDescription}
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-7 sm:mb-8"
            >
              <Button to="/products" size="lg" className="w-full sm:w-auto">
                Order Now
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
              <Button to="/products" variant="secondary" size="lg" className="w-full sm:w-auto">
                View Products
              </Button>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="grid grid-cols-2 gap-2 sm:gap-2.5"
            >
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-white/80 backdrop-blur-sm rounded-xl text-xs sm:text-sm text-brown border border-cream-dark/80 shadow-sm ${badge.className || ''}`}
                >
                  <badge.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red shrink-0" aria-hidden="true" />
                  <span className="leading-tight">{badge.label}</span>
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative flex flex-col items-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 via-red/10 to-brown/5 blur-2xl scale-110"
                  aria-hidden="true"
                />
                <BrandLogo size="hero" className="relative drop-shadow-xl" />
              </div>

              <p className="mt-5 font-display italic text-brown/75 text-base sm:text-lg text-center">
                {businessConfig.tagline}
              </p>

              <div className="grid grid-cols-2 gap-3 w-full mt-8 max-w-sm">
                {featured.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease }}
                    className="product-card group"
                  >
                    <ProductImage
                      product={product}
                      aspect="aspect-[3/4]"
                      className="rounded-t-2xl bg-cream"
                      imageFit={product.imageFit}
                    />
                    <div className="p-3 text-center">
                      <p className="font-display text-sm sm:text-base font-semibold text-brown group-hover:text-red transition-colors">
                        {product.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
