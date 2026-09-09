import { Link } from 'react-router-dom'
import { businessConfig } from '../../data/businessConfig'
import { useHashNavigation } from '../../hooks/useHashNavigation'

const sizeClasses = {
  nav: 'h-10 w-10 sm:h-11 sm:w-11',
  footer: 'h-14 w-14 sm:h-16 sm:w-16',
  hero: 'w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[320px] h-auto',
  contact: 'h-20 w-20 sm:h-24 sm:w-24',
}

export default function BrandLogo({ size = 'nav', link = false, showName = false, className = '' }) {
  const { scrollToTop } = useHashNavigation()

  const image = (
    <img
      src={businessConfig.logo.src}
      alt={businessConfig.logo.alt}
      className={`object-contain ${sizeClasses[size]} ${className}`}
      decoding="async"
    />
  )

  const content = showName ? (
    <span className="flex items-center gap-2.5 sm:gap-3 min-w-0">
      {image}
      <span className="hidden sm:flex flex-col min-w-0 text-left leading-tight">
        <span className="font-display text-base sm:text-lg font-semibold text-brown truncate">
          {businessConfig.name}
        </span>
        <span className="text-[10px] sm:text-xs text-warm-gray font-medium truncate">
          {businessConfig.tagline}
        </span>
      </span>
    </span>
  ) : (
    image
  )

  if (link) {
    return (
      <Link
        to="/"
        onClick={scrollToTop}
        className="shrink-0 rounded-xl hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
        aria-label={`${businessConfig.name} home`}
      >
        {content}
      </Link>
    )
  }

  return content
}
