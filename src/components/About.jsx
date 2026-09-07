import SectionReveal from './SectionReveal'
import BrandLogo from './ui/BrandLogo'
import { businessConfig } from '../data/businessConfig'

const highlights = [
  { label: 'Location', value: businessConfig.location.full },
  { label: 'Hours', value: businessConfig.businessHours.display },
]

export default function About() {
  return (
    <section id="about" className="section-padding section-spacing bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <SectionReveal>
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-800/10 via-cream to-brown/5 flex items-center justify-center border border-cream-dark/60 p-8 shadow-sm">
                <BrandLogo size="hero" className="max-w-[220px] sm:max-w-[260px]" />
              </div>
              <p className="text-center font-display italic text-brown/60 text-sm mt-4">
                {businessConfig.tagline}
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <p className="text-red text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mb-2.5">
              About Us
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-brown mb-5 leading-tight text-balance">
              {businessConfig.about.title}
            </h2>
            <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-8">
              {businessConfig.about.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex-1 px-4 py-3.5 bg-cream rounded-xl border border-cream-dark/60 hover:shadow-sm transition-shadow"
                >
                  <p className="text-[10px] sm:text-xs text-warm-gray uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="font-medium text-brown text-sm mt-0.5 leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
