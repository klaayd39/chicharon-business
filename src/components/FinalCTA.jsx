import { ArrowRight } from 'lucide-react'
import SectionReveal from './SectionReveal'
import Button from './ui/Button'
import { businessConfig } from '../data/businessConfig'

export default function FinalCTA() {
  return (
    <section className="section-padding section-spacing-sm">
      <div className="container-max">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-brown text-cream">
            <div className="grid lg:grid-cols-2 items-stretch">
              <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 lg:py-14">
                <p className="eyebrow text-cream/50 mb-3">Ready when you are</p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight mb-4 text-balance">
                  Bring Home the Pinoy Feels.
                </h2>
                <p className="text-cream/70 text-sm sm:text-base leading-relaxed max-w-md mb-7">
                  Your favorite Filipino flavors are just an order away. Browse, add to cart, and
                  enjoy — delivery and pickup available in {businessConfig.location.city}.
                </p>
                <Button to="/products" variant="cream" size="lg">
                  Order Now
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>

              <div className="relative h-52 sm:h-64 lg:min-h-[18rem]">
                <img
                  src="/images/lumpia.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brown via-brown/35 to-transparent" aria-hidden="true" />
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
