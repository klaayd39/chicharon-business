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
    <section id="contact" className="section-padding section-spacing section-surface-alt scroll-mt-20">
      <div className="container-max">
        <SectionHeader eyebrow="Get in Touch" title="Contact Us" />

        <SectionReveal delay={0.1}>
          <div className="max-w-xl mx-auto">
            <div className="card overflow-hidden shadow-lg shadow-brown/5">
              <div className="bg-brown px-6 py-8 text-center">
                <BrandLogo size="contact" className="mx-auto mb-3" />
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-cream">
                  {businessConfig.name}
                </h3>
                {businessConfig.tagline && (
                  <p className="font-display italic text-cream/70 text-sm mt-1">{businessConfig.tagline}</p>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        item.available ? 'bg-red/5' : 'bg-cream-dark/60'
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 ${item.available ? 'text-red' : 'text-warm-gray-light'}`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-semibold text-charcoal">{item.label}</p>
                      <p
                        className={`text-sm mt-0.5 break-words ${
                          item.available ? 'text-warm-gray' : 'text-warm-gray-light italic'
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-cream-dark/60">
                  <Button to="/products" size="lg" className="w-full">
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
