import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import SectionReveal from '../SectionReveal'

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  className = '',
}) {
  return (
    <div className={`page-hero-band ${className}`}>
      <div className="relative section-padding container-max pt-28 pb-10 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-warm-gray">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-warm-gray-light" aria-hidden="true" />}
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-brown transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-brown font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <SectionReveal>
          <div className="max-w-2xl">
            {eyebrow && <p className="eyebrow mb-2.5 sm:mb-3">{eyebrow}</p>}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-brown leading-tight tracking-tight text-balance">
              {title}
            </h1>
            {description && (
              <p className="text-warm-gray text-sm sm:text-base leading-relaxed mt-3 sm:mt-4 max-w-xl">
                {description}
              </p>
            )}
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}
