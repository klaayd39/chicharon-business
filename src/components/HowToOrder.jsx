import { Truck, Store } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './SectionReveal'
import Button from './ui/Button'
import { businessConfig } from '../data/businessConfig'

const steps = [
  {
    number: '01',
    title: 'Choose Your Favorites',
    description: 'Browse lumpia, tocino, tapa, longganisa, BBQ, and chicharon.',
  },
  {
    number: '02',
    title: 'Place Your Order',
    description: 'Add items to your cart and submit your order details.',
  },
  {
    number: '03',
    title: 'Enjoy Filipino Flavors',
    description: 'Receive your order via delivery or pick it up during business hours.',
  },
]

export default function HowToOrder() {
  return (
    <section id="how-to-order" className="section-padding section-spacing bg-white border-t border-cream-dark/50 scroll-mt-20">
      <div className="container-max">
        <SectionHeader eyebrow="Simple & Easy" title="How to Order" />

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {steps.map((step, i) => (
            <SectionReveal key={step.number} delay={i * 0.08}>
              <div className="relative pl-0 md:pl-2">
                <span className="font-display text-5xl sm:text-6xl font-bold text-red/12 leading-none block mb-3">
                  {step.number}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-brown mb-2">
                  {step.title}
                </h3>
                <p className="text-warm-gray text-sm sm:text-base leading-relaxed">{step.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {businessConfig.deliveryAvailable && (
              <div className="flex items-start gap-3 p-4 border border-cream-dark/70 bg-cream/40">
                <Truck className="w-5 h-5 text-brown shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-brown text-sm">Delivery Available</p>
                  <p className="text-warm-gray text-sm mt-0.5">
                    Have your favorites delivered to your preferred location.
                  </p>
                </div>
              </div>
            )}
            {businessConfig.pickupAvailable && (
              <div className="flex items-start gap-3 p-4 border border-cream-dark/70 bg-cream/40">
                <Store className="w-5 h-5 text-brown shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-brown text-sm">Pickup Available</p>
                  <p className="text-warm-gray text-sm mt-0.5">
                    Visit us {businessConfig.businessHours.display} for convenient pickup.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <Button to="/products" size="lg">
              Start Your Order
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
