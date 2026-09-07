import { Link } from 'react-router-dom'
import { businessConfig } from '../../data/businessConfig'

const sizeClasses = {
  nav: 'h-10 w-10 sm:h-11 sm:w-11',
  footer: 'h-14 w-14',
  hero: 'w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] h-auto',
  contact: 'h-20 w-20',
}

export default function BrandLogo({ size = 'nav', link = false, className = '' }) {
  const image = (
    <img
      src={businessConfig.logo.src}
      alt={businessConfig.logo.alt}
      className={`object-contain ${sizeClasses[size]} ${className}`}
      decoding="async"
    />
  )

  if (link) {
    return (
      <Link
        to="/"
        className="shrink-0 rounded-full hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
        aria-label={`${businessConfig.name} home`}
      >
        {image}
      </Link>
    )
  }

  return image
}
