import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSmoothScroll } from '../context/useSmoothScroll'

export function useHashNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollTo, scrollToTop: smoothScrollToTop } = useSmoothScroll()

  const scrollToTop = useCallback(
    (e) => {
      if (location.pathname !== '/') return

      e?.preventDefault()
      smoothScrollToTop()
      if (location.hash) {
        navigate('/', { replace: true })
      }
    },
    [location.pathname, location.hash, navigate, smoothScrollToTop]
  )

  const scrollToSection = useCallback(
    (href) => {
      if (!href.startsWith('/#')) return false

      const id = href.slice(2)
      const hash = `#${id}`

      if (location.pathname === '/' && location.hash === hash) {
        scrollTo(`#${id}`)
      } else {
        navigate({ pathname: '/', hash: id })
      }

      return true
    },
    [location.pathname, location.hash, navigate, scrollTo]
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
          scrollTo(`#${id}`)
        } else {
          navigate({ pathname: '/', hash: id })
        }
      }
    },
    [location.pathname, location.hash, navigate, scrollTo, scrollToTop]
  )

  return { scrollToSection, handleHashLinkClick, scrollToTop }
}
