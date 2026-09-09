import { useContext, useEffect, useState } from 'react'
import { SmoothScrollContext } from './SmoothScrollContext'

const fallback = {
  scrollTo: (target) => {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' })
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }
  },
  scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  resize: () => {},
  stop: () => {},
  start: () => {},
  subscribeScroll: () => () => {},
}

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext)
  return ctx ?? fallback
}

/** Subscribe to scroll position without re-rendering the whole app each frame. */
export function useScrollPosition() {
  const { subscribeScroll } = useSmoothScroll()
  const [scroll, setScroll] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return subscribeScroll((y, p) => {
      setScroll(y)
      setProgress(p)
    })
  }, [subscribeScroll])

  return { scroll, progress }
}

/** Only re-renders when crossing a scroll threshold (e.g. navbar solid state). */
export function useScrolled(threshold = 24) {
  const { subscribeScroll } = useSmoothScroll()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    return subscribeScroll((y) => {
      const next = y > threshold
      setScrolled((prev) => (prev === next ? prev : next))
    })
  }, [subscribeScroll, threshold])

  return scrolled
}
