import SectionReveal from '../SectionReveal'

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  delay = 0,
}) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <SectionReveal delay={delay} className={className}>
      <div className={`max-w-2xl mb-10 sm:mb-12 lg:mb-14 ${alignClass}`}>
        {eyebrow && (
          <p className="text-red text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mb-2.5 sm:mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-brown leading-tight tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-warm-gray text-sm sm:text-base leading-relaxed mt-3 sm:mt-4">
            {description}
          </p>
        )}
      </div>
    </SectionReveal>
  )
}
