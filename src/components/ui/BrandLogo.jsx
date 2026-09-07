import { Link } from 'react-router-dom'
import { businessConfig } from '../../data/businessConfig'

const sizeClasses = {
  nav: 'h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14',
  footer: 'h-16 w-16',
  hero: 'w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[340px] h-auto',
  contact: 'h-24 w-24',
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
