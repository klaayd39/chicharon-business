import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../constants/navigation'
import { useCart } from '../context/useCart'
import { useHashNavigation } from '../hooks/useHashNavigation'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import Button from './ui/Button'
import CartBadge from './cart/CartBadge'
import BrandLogo from './ui/BrandLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollToSection, scrollToTop } = useHashNavigation()

  useBodyScrollLock(mobileOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleNavClick = useCallback(
    (href) => {
      setMobileOpen(false)
      scrollToSection(href)
    },
    [scrollToSection]
  )

  const handleOrderNow = () => {
    setMobileOpen(false)
    navigate(itemCount > 0 ? '/order' : '/products')
  }

  const isHome = location.pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-dark/60'
          : 'bg-cream/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none'
      }`}
    >
      <nav
        className={`section-padding container-max flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4 lg:py-5'
        }`}
        aria-label="Main navigation"
      >
        <BrandLogo size="nav" link />

        <ul className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith('/#') ? (
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-[13px] xl:text-sm font-medium text-charcoal/65 hover:text-brown transition-colors whitespace-nowrap"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={link.href}
                  onClick={link.href === '/' ? scrollToTop : undefined}
                  className={`text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                    location.pathname === link.href
                      ? 'text-brown'
                      : 'text-charcoal/65 hover:text-brown'
                  }`}
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <CartBadge />

          <Button
            onClick={handleOrderNow}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Order Now
          </Button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-full hover:bg-brown/5 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-cream/98 backdrop-blur-md border-t border-cream-dark/60"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className="section-padding py-4 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {link.href.startsWith('/#') ? (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="block w-full text-left py-3 text-base font-medium text-charcoal hover:text-brown transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={link.href === '/' ? scrollToTop : undefined}
                      className={`block py-3 text-base font-medium transition-colors ${
                        location.pathname === link.href ? 'text-brown' : 'text-charcoal hover:text-brown'
                      }`}
                      aria-current={location.pathname === link.href ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
              <li className="pt-3 pb-1">
                <Button onClick={handleOrderNow} size="lg" className="w-full">
                  Order Now
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle home indicator when at top */}
      {!scrolled && isHome && (
        <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-brown/10 rounded-full" aria-hidden="true" />
      )}
    </header>
  )
}
