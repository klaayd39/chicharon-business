import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, Truck, Store } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'
import Button from './ui/Button'
import TextReveal from './ui/TextReveal'
import HeroEditorialVisual from './hero/HeroEditorialVisual'
import HeroProductLinks from './hero/HeroProductLinks'
import { heroContainer, heroItem } from '../constants/motion'

const trustSignals = [
  { icon: MapPin, label: 'Malaybalay City, Bukidnon' },
  ...(businessConfig.deliveryAvailable ? [{ icon: Truck, label: 'Delivery' }] : []),
  ...(businessConfig.pickupAvailable ? [{ icon: Store, label: 'Pickup' }] : []),
]

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <section className="relative hero-glow grain border-b border-cream-dark/50">
        <div className="section-padding container-wide pt-[5rem] pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
            <HeroCopy />
            <HeroEditorialVisual />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative hero-glow grain border-b border-cream-dark/50 overflow-hidden">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-orb hero-orb-1" />
        <span className="hero-orb hero-orb-2" />
      </div>

      <div className="section-padding container-wide relative z-[1] pt-[5rem] pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="max-w-lg"
          >
            <HeroCopy animated />
          </motion.div>

          <div className="w-full max-w-md lg:max-w-none mx-auto">
            <HeroEditorialVisual />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroCopy({ animated = false }) {
  const Tag = animated ? motion.div : 'div'
  const item = animated ? { variants: heroItem } : {}

  return (
    <>
      <Tag {...item}>
        <motion.p
          className="eyebrow mb-4"
          {...(animated
            ? {
                initial: { opacity: 0, x: -12 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] },
              }
            : {})}
        >
          {businessConfig.name}
        </motion.p>
        <h1 className="font-display text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem] font-semibold text-brown mb-5">
          {animated ? (
            <TextReveal text={businessConfig.headline} delay={0.12} wordDelay={0.05} />
          ) : (
            businessConfig.headline
          )}
        </h1>
        <p className="text-warm-gray text-base sm:text-lg leading-relaxed mb-8">
          {businessConfig.heroDescription}
        </p>
      </Tag>

      <Tag {...item} className="flex flex-col sm:flex-row gap-3 mb-6">
        <Button to="/products" size="lg" className="w-full sm:w-auto">
          Order Now
          <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
        </Button>
        <Button href="#shop" variant="secondary" size="lg" className="w-full sm:w-auto">
          Explore Products
        </Button>
      </Tag>

      <Tag {...item}>
        <HeroProductLinks animated={animated} />
      </Tag>

      <Tag
        {...item}
        className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-cream-dark/60"
        aria-label="Service options"
      >
        {trustSignals.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-2 text-sm text-warm-gray">
            <Icon className="w-4 h-4 text-red/60" aria-hidden="true" />
            {label}
          </span>
        ))}
      </Tag>

      <Tag {...item}>
        <p className="font-display italic text-brown/40 text-lg mt-6">
          {businessConfig.tagline}
        </p>
      </Tag>
    </>
  )
}
