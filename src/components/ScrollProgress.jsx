import { motion, useReducedMotion } from 'framer-motion'
import { useSmoothScroll } from '../context/useSmoothScroll'

export default function ScrollProgress() {
  const { progress } = useSmoothScroll()
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-red/80 via-brown to-gold/80"
        style={{ scaleX: progress }}
      />
    </div>
  )
}
