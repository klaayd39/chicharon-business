import SectionReveal from './SectionReveal'
import BrandLogo from './ui/BrandLogo'
import Button from './ui/Button'
import { businessConfig } from '../data/businessConfig'

const highlights = [
  { label: 'Location', value: businessConfig.location.full },
  { label: 'Hours', value: businessConfig.businessHours.display },
]

export default function About() {
  return (
    <section id="about" className="section-padding section-spacing section-surface section-divider">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <SectionReveal>
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-amber-800/10 via-cream to-brown/5 flex items-center justify-center border border-cream-dark/60 p-8 shadow-lg shadow-brown/5">
                <BrandLogo size="hero" className="max-w-[220px] sm:max-w-[260px]" />
              </div>
              <p className="text-center font-display italic text-brown/60 text-sm mt-4">
                {businessConfig.tagline}
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <p className="eyebrow mb-2.5">About Us</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-brown mb-5 leading-tight text-balance">
              {businessConfig.about.title}
            </h2>
            <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-8">
              {businessConfig.about.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-4 bg-cream rounded-xl border border-cream-dark/60"
                >
                  <p className="text-[10px] sm:text-xs text-warm-gray uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="font-medium text-brown text-sm mt-1 leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
            <Button to="/products" size="md">Browse Products</Button>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
