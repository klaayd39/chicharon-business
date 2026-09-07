import { Shield, Snowflake, Truck, Store, Heart } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './SectionReveal'
import { businessConfig } from '../data/businessConfig'

const features = [
  {
    icon: Shield,
    title: 'Quality Products',
    description: 'Carefully prepared chicharon and longganisa made with attention to quality.',
  },
  {
    icon: Snowflake,
    title: 'Fresh & Properly Stored',
    description: 'Our frozen products are stored properly to maintain freshness and quality.',
  },
  {
    icon: Heart,
    title: 'Local Filipino Favorite',
    description: 'Authentic flavors that bring the taste of home to Malaybalay City and Bukidnon.',
  },
  ...(businessConfig.deliveryAvailable
    ? [
        {
          icon: Truck,
          title: 'Delivery Available',
          description: 'Have your favorites delivered right to your preferred location.',
        },
      ]
    : []),
  ...(businessConfig.pickupAvailable
    ? [
        {
          icon: Store,
          title: 'Pickup Available',
          description: 'Prefer to pick up? Visit us during business hours for convenient pickup.',
        },
      ]
    : []),
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding section-spacing bg-cream-dark/30">
      <div className="container-max">
        <SectionHeader
          eyebrow="Why Choose Us"
          title={`The ${businessConfig.name} Difference`}
          description="Quality Filipino food, made convenient for you."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {features.map((feature, i) => (
            <SectionReveal key={feature.title} delay={i * 0.06}>
              <div className="card card-hover text-center p-5 sm:p-6 h-full group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brown/5 text-brown mb-4 group-hover:bg-red/5 group-hover:text-red transition-colors duration-300">
                  <feature.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-brown mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">{feature.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
