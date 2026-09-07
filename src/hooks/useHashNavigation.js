import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useHashNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToTop = useCallback(
    (e) => {
      if (location.pathname !== '/') return

      e?.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (location.hash) {
        navigate('/', { replace: true })
      }
    },
    [location.pathname, location.hash, navigate]
  )

  const scrollToSection = useCallback(
    (href) => {
      if (!href.startsWith('/#')) return false

      const id = href.slice(2)
      const hash = `#${id}`

      if (location.pathname === '/' && location.hash === hash) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate({ pathname: '/', hash: id })
      }

      return true
    },
    [location.pathname, location.hash, navigate]
  )

  const handleHashLinkClick = useCallback(
    (e, href) => {
      if (href === '/') {
        scrollToTop(e)
        return
      }

      if (!href.startsWith('/#')) return

      const id = href.slice(2)
      const hash = `#${id}`

      if (location.pathname === '/') {
        e.preventDefault()
        if (location.hash === hash) {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        } else {
          navigate({ pathname: '/', hash: id })
        }
      }
    },
    [location.pathname, location.hash, navigate, scrollToTop]
  )

  return { scrollToSection, handleHashLinkClick, scrollToTop }
}
