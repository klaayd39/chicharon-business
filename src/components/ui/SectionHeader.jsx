import SectionReveal from '../SectionReveal'

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  delay = 0,
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <SectionReveal delay={delay} blur className={className}>
      <div className={`max-w-2xl mb-10 sm:mb-12 lg:mb-14 ${alignClass}`}>
        {eyebrow && (
          <p className="eyebrow mb-2.5 sm:mb-3 inline-flex items-center gap-2">
            <span className="w-6 h-px bg-red/40" aria-hidden="true" />
            {eyebrow}
            {align === 'center' && <span className="w-6 h-px bg-red/40" aria-hidden="true" />}
          </p>
        )}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-brown leading-tight tracking-tight text-balance">
          {title}
        </h2>
        {description && (
          <p className="text-warm-gray text-sm sm:text-base leading-relaxed mt-3 sm:mt-4 text-balance">
            {description}
          </p>
        )}
      </div>
    </SectionReveal>
  )
}
