import { Link } from 'react-router-dom'
import { useSmoothScroll } from '../../context/useSmoothScroll'

const variants = {
  primary:
    'bg-brown text-cream hover:bg-brown-light hover:shadow-lg hover:shadow-brown/20 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0',
  secondary:
    'border-2 border-brown/20 text-brown hover:border-brown/40 hover:bg-brown/5 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0',
  ghost: 'text-brown hover:bg-brown/5 active:scale-[0.98]',
  cream:
    'bg-cream text-brown border border-cream-dark hover:bg-white hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-sm sm:text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  onClick,
  ...props
}) {
  const { scrollTo } = useSmoothScroll()
  const classes = `inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    const isHashLink = href.startsWith('#')

    const handleClick = (e) => {
      if (isHashLink) {
        e.preventDefault()
        scrollTo(href)
      }
      onClick?.(e)
    }

    return (
      <a href={href} className={classes} onClick={handleClick} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
