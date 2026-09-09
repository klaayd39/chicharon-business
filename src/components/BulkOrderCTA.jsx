import { ArrowRight } from 'lucide-react'
import SectionReveal from './SectionReveal'
import Button from './ui/Button'

export default function BulkOrderCTA() {
  return (
    <section className="section-padding section-spacing-sm">
      <div className="container-max">
        <SectionReveal>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0 overflow-hidden border border-cream-dark/70 bg-cream-dark/30">
            <div className="px-6 py-10 sm:px-10 sm:py-12 lg:py-14">
              <p className="eyebrow mb-3">Bulk Orders</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brown mb-4 leading-tight text-balance">
                Feeding a Crowd?
              </h2>
              <p className="text-warm-gray text-sm sm:text-base leading-relaxed max-w-lg mb-7">
                Planning an event, family gathering, or business order? Stock up on your Filipino
                favorites with a bulk order request.
              </p>
              <Button to="/bulk-order" size="lg">
                Bulk Order
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
            </div>

            <div className="relative min-h-[12rem] lg:min-h-0 bg-brown overflow-hidden">
              <img
                src="/images/longganisa.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-brown/60" aria-hidden="true" />
              <div className="relative z-10 h-full flex items-center justify-center p-8">
                <p className="font-display text-2xl sm:text-3xl text-cream text-center italic leading-snug max-w-xs">
                  Perfect for events, gatherings, and group orders.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
