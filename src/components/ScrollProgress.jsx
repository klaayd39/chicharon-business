import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useSmoothScroll } from '../context/useSmoothScroll'

export default function ScrollProgress() {
  const barRef = useRef(null)
  const { subscribeScroll } = useSmoothScroll()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    return subscribeScroll((_scroll, progress) => {
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    })
  }, [subscribeScroll, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-red/80 via-brown to-gold/80"
      />
    </div>
  )
}
