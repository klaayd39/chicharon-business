import { Shield, Snowflake, Truck, Store } from 'lucide-react'
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
    icon: Truck,
    title: 'Delivery Available',
    description: 'Have your favorites delivered right to your preferred location.',
  },
  {
    icon: Store,
    title: 'Pickup Available',
    description: 'Prefer to pick up? Visit us during business hours for convenient pickup.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding section-spacing">
      <div className="container-max">
        <SectionHeader
          eyebrow="Why Choose Us"
          title={`The ${businessConfig.name} Difference`}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, i) => (
            <SectionReveal key={feature.title} delay={i * 0.08}>
              <div className="card card-hover text-center p-5 sm:p-6 h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brown/5 text-brown mb-4">
                  <feature.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-brown mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
