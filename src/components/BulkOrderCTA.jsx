import { PackageCheck, ArrowRight } from 'lucide-react'
import SectionReveal from './SectionReveal'
import Button from './ui/Button'

export default function BulkOrderCTA() {
  return (
    <section className="section-padding section-spacing">
      <div className="container-max">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-2xl bg-brown text-cream px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/10 text-cream text-xs font-semibold tracking-wider uppercase mb-4">
                  <PackageCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  Bulk Orders Available
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 leading-tight">
                  Need a Larger Order?
                </h2>
                <p className="text-cream/70 text-sm sm:text-base leading-relaxed">
                  Ordering for an event, store, or business? Send us your requirements and we&apos;ll
                  get back to you with availability and pricing.
                </p>
              </div>
              <div className="shrink-0">
                <Button to="/bulk-order" variant="cream" size="lg" className="w-full sm:w-auto">
                  Request a Bulk Order
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* Decorative accents */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-red/15 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
