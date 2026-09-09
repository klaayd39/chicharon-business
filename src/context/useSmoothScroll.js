import { useContext } from 'react'
import { SmoothScrollContext } from './SmoothScrollContext'

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) {
    return {
      scrollTo: (target) => {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' })
        } else {
          document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
        }
      },
      scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      ready: false,
      scroll: 0,
      progress: 0,
    }
  }
  return ctx
}
