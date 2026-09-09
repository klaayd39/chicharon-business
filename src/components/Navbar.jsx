import { useState, useEffect, useCallback } from 'react'
import { useSmoothScroll } from '../context/useSmoothScroll'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { navLinks } from '../constants/navigation'
import { useCart } from '../context/useCart'
import { useHashNavigation } from '../hooks/useHashNavigation'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import Button from './ui/Button'
import BrandLogo from './ui/BrandLogo'

const ease = [0.22, 1, 0.36, 1]

function isLinkActive(href, pathname) {
  if (href === '/') return pathname === '/'
  if (href.startsWith('/#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scroll } = useSmoothScroll()
  const scrolled = scroll > 24
  const { itemCount, openCart } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollToSection, scrollToTop } = useHashNavigation()

  useBodyScrollLock(mobileOpen)

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

  const showSolidNav = scrolled || mobileOpen || location.pathname !== '/'

  const renderNavItem = (link, mobile = false) => {
    const active = isLinkActive(link.href, location.pathname)
    const baseClass = mobile
      ? `flex items-center w-full px-4 py-3.5 text-base font-medium transition-colors border-b border-cream-dark/40 last:border-0 ${
          active ? 'text-brown bg-brown/5' : 'text-charcoal hover:text-brown'
        }`
      : `nav-link-v2 ${active ? 'nav-link-v2-active' : ''}`

    if (link.href.startsWith('/#')) {
      return (
        <button type="button" onClick={() => handleNavClick(link.href)} className={baseClass}>
          {link.label}
        </button>
      )
    }

    return (
      <Link
        to={link.href}
        onClick={link.href === '/' ? scrollToTop : undefined}
        className={baseClass}
        aria-current={active ? 'page' : undefined}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          showSolidNav
            ? 'bg-cream/95 backdrop-blur-xl border-b border-cream-dark/60 shadow-sm shadow-brown/5'
            : 'bg-cream/70 backdrop-blur-md'
        }`}
      >
        <nav
          className={`section-padding container-wide grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-3 transition-all duration-500 ${
            scrolled ? 'py-2.5' : 'py-3.5'
          }`}
          aria-label="Main navigation"
        >
          <BrandLogo size="nav" link showName className="min-w-0" />

          {/* Desktop center nav */}
          <div className="hidden lg:flex items-center justify-center gap-0.5">
            {navLinks.map((link) => (
              <span key={link.href}>{renderNavItem(link)}</span>
            ))}
          </div>

          <div className="flex items-center justify-end gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={openCart}
              className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                itemCount > 0
                  ? 'bg-brown text-cream hover:bg-brown-light'
                  : 'text-brown hover:bg-brown/5'
              }`}
              aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              <span>Cart{itemCount > 0 ? ` (${itemCount})` : ''}</span>
            </button>

            <button
              type="button"
              onClick={openCart}
              className="sm:hidden relative p-2.5 rounded-full hover:bg-brown/5 transition-colors"
              aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
            >
              <ShoppingBag className="w-5 h-5 text-brown" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-red text-[9px] font-bold text-cream">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            <Button onClick={handleOrderNow} size="sm" className="hidden sm:inline-flex">
              Order Now
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 rounded-full hover:bg-brown/5 transition-colors"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="w-5 h-5 text-brown" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />

            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[min(100%,20rem)] bg-cream shadow-2xl lg:hidden flex flex-col safe-bottom"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-cream-dark/70">
                <BrandLogo size="nav" link showName />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-brown/5 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-2 py-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, ease }}
                  >
                    {renderNavItem(link, true)}
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-cream-dark/70 space-y-2 bg-white/60">
                <Button onClick={handleOrderNow} size="lg" className="w-full">
                  Order Now
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    openCart()
                  }}
                  className="w-full py-3 text-sm font-medium text-brown"
                >
                  Cart{itemCount > 0 ? ` (${itemCount})` : ''}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
