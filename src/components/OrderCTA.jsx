import { ArrowRight, ShoppingBag } from 'lucide-react'
import SectionReveal from './SectionReveal'
import Button from './ui/Button'
import { businessConfig } from '../data/businessConfig'

export default function OrderCTA() {
  return (
    <section className="section-padding pb-16 sm:pb-20 lg:pb-24">
      <div className="container-max">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-2xl border border-cream-dark/80 bg-white px-6 py-10 sm:px-10 sm:py-12 text-center shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-red/[0.03] via-transparent to-gold/[0.05] pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 max-w-xl mx-auto">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brown/5 text-brown mb-5">
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-brown mb-3 leading-tight text-balance">
                Ready to Order?
              </h2>
              <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-7 text-balance">
                Get your favorite Filipino favorites from {businessConfig.name}. Browse our menu and
                place your order in just a few steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button to="/products" size="lg" className="w-full sm:w-auto">
                  Order Now
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
                <Button to="/bulk-order" variant="secondary" size="lg" className="w-full sm:w-auto">
                  Bulk Order
                </Button>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
