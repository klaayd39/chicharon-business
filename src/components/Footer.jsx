import { Link } from 'react-router-dom'
import { MapPin, Clock, Truck, Store } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'
import { navLinks, productLinks } from '../constants/navigation'
import { useHashNavigation } from '../hooks/useHashNavigation'
import BrandLogo from './ui/BrandLogo'

export default function Footer() {
  const { handleHashLinkClick } = useHashNavigation()

  return (
    <footer className="bg-brown text-cream">
      <div className="section-padding container-max py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <BrandLogo size="footer" link className="mb-3" />
            <p className="text-cream/55 text-sm leading-relaxed mt-3 max-w-xs">
              {businessConfig.footerDescription}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cream/35 mb-3">Navigation</h4>
            <ul className="space-y-2">
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

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cream/35 mb-3">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-cream/65 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cream/35 mb-3">Contact</h4>
            <ul className="space-y-2.5 text-sm text-cream/65">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{businessConfig.location.full}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{businessConfig.businessHours.display}</span>
              </li>
              {businessConfig.deliveryAvailable && (
                <li className="flex items-start gap-2">
                  <Truck className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Delivery Available</span>
                </li>
              )}
              {businessConfig.pickupAvailable && (
                <li className="flex items-start gap-2">
                  <Store className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Pickup Available</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/10 text-center">
          <p className="text-xs sm:text-sm text-cream/35">{businessConfig.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
