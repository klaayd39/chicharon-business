import { Clock, Leaf, Snowflake, Users } from 'lucide-react'
import SectionReveal from './SectionReveal'
import SectionHeader from './ui/SectionHeader'
import Button from './ui/Button'
import { businessConfig } from '../data/businessConfig'

const highlights = [
  { icon: Clock, label: 'Easy to Cook' },
  { icon: Users, label: 'Perfect for Busy Families' },
  { icon: Leaf, label: 'High Quality' },
  { icon: Snowflake, label: 'Keep Frozen' },
]

export default function PromoShowcase() {
  return (
    <section className="section-padding section-spacing section-surface section-divider overflow-hidden">
      <div className="container-max">
        <SectionHeader
          eyebrow="Our Range"
          title="Easy to Cook Filipino Favorites"
          description="Frozen meals ready in minutes — from chicharon and longganisa to more Pinoy classics."
        />

        <SectionReveal delay={0.08}>
          <figure className="relative mx-auto max-w-4xl">
            <div
              className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-br from-red/5 via-gold/5 to-brown/5 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brown/12 border border-cream-dark/70 bg-cream p-1.5 sm:p-2">
              <img
                src={businessConfig.promoImage.src}
                alt={businessConfig.promoImage.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl"
              />
            </div>
            <figcaption className="sr-only">
              Kingdams Foods product lineup — {businessConfig.tagline}
            </figcaption>
          </figure>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 max-w-2xl mx-auto">
            {highlights.map((item) => (
              <li
                key={item.label}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-cream border border-cream-dark/80 text-xs sm:text-sm font-medium text-brown"
              >
                <item.icon className="w-3.5 h-3.5 text-red shrink-0" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="text-center mt-8 sm:mt-10">
            <p className="font-display italic text-brown/70 text-base sm:text-lg mb-5">
              {businessConfig.tagline}
            </p>
            <Button to="/products" size="lg">
              Order Now
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
