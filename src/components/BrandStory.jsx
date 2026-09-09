import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import SectionReveal from './SectionReveal'
import Button from './ui/Button'
import { businessConfig } from '../data/businessConfig'

export default function BrandStory() {
  const imageRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="about" className="section-padding section-spacing bg-white overflow-hidden scroll-mt-20">
      <div className="container-max">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <SectionReveal className="lg:col-span-5" blur>
            <p className="eyebrow mb-3">Our Story</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold text-brown mb-3 leading-tight text-balance">
              {businessConfig.about.title}
            </h2>
            <p className="font-display italic text-brown/60 text-lg mb-6">
              {businessConfig.tagline}
            </p>
            <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-5">
              {businessConfig.about.description}
            </p>
            <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-8">
              From busy weeknights to family gatherings, we make it simple to bring the taste of
              home to your table — without the long prep.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button to="/products" size="lg">Shop Products</Button>
              <Button to="/bulk-order" variant="secondary" size="lg">Bulk Order</Button>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.12} scale className="lg:col-span-7">
            <div ref={imageRef} className="relative max-w-xl lg:max-w-none mx-auto">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold/10 via-transparent to-red/5 pointer-events-none" />
              <div className="relative overflow-hidden rounded-[2rem] border border-cream-dark/50 shadow-xl shadow-brown/8">
                {prefersReducedMotion ? (
                  <img
                    src="/images/lumpia.png"
                    alt="Crispy lumpia, a Kingdams Foods favorite"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[18rem] sm:h-[24rem] object-cover"
                  />
                ) : (
                  <motion.img
                    src="/images/lumpia.png"
                    alt="Crispy lumpia, a Kingdams Foods favorite"
                    loading="lazy"
                    decoding="async"
                    style={{ y: imageY }}
                    className="w-full h-[20rem] sm:h-[26rem] object-cover scale-110"
                  />
                )}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
