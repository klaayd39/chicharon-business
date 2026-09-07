import { PackageCheck, ArrowRight, Users } from 'lucide-react'
import SectionReveal from './SectionReveal'
import Button from './ui/Button'

export default function BulkOrderCTA() {
  return (
    <section className="section-padding section-spacing">
      <div className="container-max">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-2xl bg-brown text-cream px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 shadow-xl shadow-brown/15">
            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/10 text-cream text-xs font-semibold tracking-wider uppercase mb-4">
                  <PackageCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  Bulk Orders Available
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 leading-tight text-balance">
                  Ordering for a Party, Event, or Business?
                </h2>
                <p className="text-cream/75 text-sm sm:text-base leading-relaxed mb-5">
                  Need larger quantities? Send us your bulk order request and we&apos;ll help you
                  arrange your order with availability and pricing.
                </p>
                <div className="flex items-center gap-2 text-cream/60 text-xs sm:text-sm">
                  <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Perfect for events, stores, and group orders</span>
                </div>
              </div>
              <div className="shrink-0">
                <Button to="/bulk-order" variant="cream" size="lg" className="w-full sm:w-auto shadow-lg">
                  Request a Bulk Order
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-red/15 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
