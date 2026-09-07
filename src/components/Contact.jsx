import { MapPin, Clock, Phone, Globe } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './SectionReveal'
import Button from './ui/Button'
import BrandLogo from './ui/BrandLogo'
import { businessConfig } from '../data/businessConfig'

const contactItems = [
  { icon: MapPin, label: 'Location', value: businessConfig.location.full, available: true },
  { icon: Clock, label: 'Business Hours', value: businessConfig.businessHours.display, available: true },
  { icon: Phone, label: 'Phone', value: businessConfig.phone.display, available: false },
  { icon: Globe, label: 'Facebook', value: businessConfig.facebook.display, available: false },
]

export default function Contact() {
  return (
    <section id="contact" className="section-padding section-spacing">
      <div className="container-max">
        <SectionHeader eyebrow="Get in Touch" title="Contact Us" />

        <SectionReveal delay={0.1}>
          <div className="max-w-lg mx-auto card p-6 sm:p-8">
            <div className="flex justify-center mb-4">
              <BrandLogo size="contact" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-brown text-center mb-6 sm:mb-8">
              {businessConfig.name}
            </h3>

            <div className="space-y-5">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.available ? 'bg-red/5' : 'bg-cream-dark/60'}`}>
                    <item.icon className={`w-4 h-4 ${item.available ? 'text-red' : 'text-warm-gray-light'}`} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-charcoal">{item.label}</p>
                    <p className={`text-sm mt-0.5 break-words ${item.available ? 'text-warm-gray' : 'text-warm-gray-light italic'}`}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button to="/products" size="lg" className="w-full sm:w-auto">
                Order Now
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
