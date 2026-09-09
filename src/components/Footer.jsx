import { Link } from 'react-router-dom'
import { MapPin, Clock, Truck, Store } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'
import { navLinks, productLinks } from '../constants/navigation'
import { useHashNavigation } from '../hooks/useHashNavigation'
import BrandLogo from './ui/BrandLogo'

export default function Footer() {
  const { handleHashLinkClick } = useHashNavigation()

  return (
    <footer className="bg-brown text-cream mt-auto pb-16 lg:pb-0">
      <div className="section-padding container-max py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4">
            <BrandLogo size="footer" link className="mb-4" />
            {businessConfig.tagline && (
              <p className="font-display italic text-cream/70 text-sm mb-3">{businessConfig.tagline}</p>
            )}
            <p className="text-cream/55 text-sm leading-relaxed max-w-xs">
              {businessConfig.footerDescription}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cream/40 mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={(e) => handleHashLinkClick(e, link.href)}
                    className="text-sm text-cream/65 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cream/40 mb-4">Products</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-cream/65 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cream/40 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-cream/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-cream/40" aria-hidden="true" />
                <span>{businessConfig.location.full}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-cream/40" aria-hidden="true" />
                <span>{businessConfig.businessHours.display}</span>
              </li>
              {businessConfig.deliveryAvailable && (
                <li className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 shrink-0 mt-0.5 text-cream/40" aria-hidden="true" />
                  <span>Delivery Available</span>
                </li>
              )}
              {businessConfig.pickupAvailable && (
                <li className="flex items-start gap-2.5">
                  <Store className="w-4 h-4 shrink-0 mt-0.5 text-cream/40" aria-hidden="true" />
                  <span>Pickup Available</span>
                </li>
              )}
              {businessConfig.facebook.url ? (
                <li>
                  <a href={businessConfig.facebook.url} className="hover:text-cream transition-colors">
                    Facebook
                  </a>
                </li>
              ) : (
                <li className="text-cream/40">Facebook — {businessConfig.facebook.display}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-cream/35">{businessConfig.copyright}</p>
          <p className="text-xs text-cream/30">{businessConfig.location.city}, {businessConfig.location.province}</p>
        </div>
      </div>
    </footer>
  )
}
