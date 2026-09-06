import SectionReveal from './SectionReveal'
import { businessConfig } from '../data/businessConfig'

export default function About() {
  return (
    <section id="about" className="section-padding section-spacing bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <SectionReveal>
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-800/15 via-cream-dark to-brown/8 flex items-center justify-center border border-cream-dark/60">
                <div className="text-center px-6">
                  <span className="text-5xl sm:text-6xl mb-3 block" role="img" aria-label="Filipino food">🍽️</span>
                  <p className="font-display text-brown/35 text-base sm:text-lg tracking-[0.15em] uppercase">
                    {businessConfig.name}
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <p className="text-red text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mb-2.5">
              About Us
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-brown mb-5 leading-tight">
              {businessConfig.about.title}
            </h2>
            <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-6">
              {businessConfig.about.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 px-4 py-3 bg-cream rounded-xl border border-cream-dark/60">
                <p className="text-[10px] sm:text-xs text-warm-gray uppercase tracking-wider">Location</p>
                <p className="font-medium text-brown text-sm mt-0.5 leading-snug">
                  {businessConfig.location.full}
                </p>
              </div>
              <div className="flex-1 px-4 py-3 bg-cream rounded-xl border border-cream-dark/60">
                <p className="text-[10px] sm:text-xs text-warm-gray uppercase tracking-wider">Hours</p>
                <p className="font-medium text-brown text-sm mt-0.5">
                  {businessConfig.businessHours.display}
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
