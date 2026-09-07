import SectionHeader from './ui/SectionHeader'
import SectionReveal from './SectionReveal'

const steps = [
  { number: '01', title: 'Choose Your Favorites', description: 'Browse chicharon and frozen products.' },
  { number: '02', title: 'Place Your Order', description: 'Select your products and quantities.' },
  { number: '03', title: 'Choose Delivery or Pickup', description: 'Choose whichever is more convenient.' },
  { number: '04', title: 'Enjoy Your Order', description: 'Receive or pick up your order.' },
]

export default function HowToOrder() {
  return (
    <section id="how-to-order" className="section-padding section-spacing">
      <div className="container-max">
        <SectionHeader eyebrow="Simple & Easy" title="How to Order" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((step, i) => (
            <SectionReveal key={step.number} delay={i * 0.08}>
              <div className="card card-hover p-5 sm:p-6 h-full relative overflow-hidden group">
                <span className="font-display text-3xl sm:text-4xl font-bold text-red/15 mb-3 block leading-none group-hover:text-red/25 transition-colors">
                  {step.number}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-brown mb-1.5">
                  {step.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">{step.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
