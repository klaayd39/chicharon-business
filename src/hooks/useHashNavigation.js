import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useHashNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToSection = useCallback(
    (href) => {
      if (!href.startsWith('/#')) return false

      const id = href.slice(2)

      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }

      return true
    },
    [location.pathname, navigate]
  )

  const handleHashLinkClick = useCallback(
    (e, href) => {
      if (!href.startsWith('/#')) return

      const id = href.slice(2)

      if (location.pathname === '/') {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [location.pathname]
  )

  return { scrollToSection, handleHashLinkClick }
}
