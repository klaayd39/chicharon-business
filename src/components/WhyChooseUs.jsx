import { UtensilsCrossed, ShieldCheck, ShoppingBag, Home } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './SectionReveal'
import { businessConfig } from '../data/businessConfig'

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Authentic Filipino Flavors',
    description:
      'Lumpia, tocino, tapa, longganisa, BBQ, and chicharon — familiar tastes made for everyday meals.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Products',
    description:
      'Carefully prepared favorites with attention to quality, from crispy chicharon to savory longganisa.',
  },
  {
    icon: ShoppingBag,
    title: 'Convenient Ordering',
    description: 'Browse online, add to cart, and place your order in just a few simple steps.',
  },
  {
    icon: Home,
    title: 'Made for Everyday Meals',
    description: `Proudly serving ${businessConfig.location.city}, ${businessConfig.location.province} — easy meals for families and gatherings.`,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding section-spacing bg-cream-dark/20">
      <div className="container-max">
        <SectionHeader
          eyebrow="Why Kingdams Foods"
          title="Filipino Favorites You Can Trust"
          description="Quality, convenience, and the flavors of home — all in one place."
        />

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {features.map((feature, i) => (
            <SectionReveal key={feature.title} delay={i * 0.06}>
              <div className="flex gap-4 p-5 sm:p-6 bg-white border border-cream-dark/60 h-full transition-shadow duration-300 hover:shadow-md hover:shadow-brown/5">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brown/5 text-brown shrink-0">
                  <feature.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-brown mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
