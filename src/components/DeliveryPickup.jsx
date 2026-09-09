import { Truck, Store, MapPin, Clock } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './SectionReveal'
import { businessConfig } from '../data/businessConfig'

export default function DeliveryPickup() {
  return (
    <section className="section-padding section-spacing section-surface-alt">
      <div className="container-max">
        <SectionHeader eyebrow="Convenient Options" title="Your Order, Your Way." />

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-10 sm:mb-12">
          <SectionReveal delay={0.08}>
            <div className="p-6 sm:p-8 rounded-2xl bg-cream border border-cream-dark/60 h-full card-hover">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brown text-cream mb-4">
                <Truck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-brown mb-2">Delivery</h3>
              <p className="text-warm-gray text-sm sm:text-base leading-relaxed">
                Have your order delivered to your preferred location.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.14}>
            <div className="p-6 sm:p-8 rounded-2xl bg-cream border border-cream-dark/60 h-full card-hover">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brown text-cream mb-4">
                <Store className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-brown mb-2">Pickup</h3>
              <p className="text-warm-gray text-sm sm:text-base leading-relaxed">
                Prefer to pick it up yourself? Pickup is available.
              </p>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-5 sm:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red/5 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-red" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-warm-gray uppercase tracking-wider">Location</p>
                <p className="font-medium text-brown text-sm">{businessConfig.location.full}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red/5 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-red" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-warm-gray uppercase tracking-wider">Business Hours</p>
                <p className="font-medium text-brown text-sm">{businessConfig.businessHours.display}</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
