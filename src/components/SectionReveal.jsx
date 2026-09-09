import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { revealTransition } from '../constants/motion'

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  blur = false,
  scale = false,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const hidden = {
    opacity: 0,
    y,
    scale: scale ? 0.96 : 1,
    filter: blur ? 'blur(8px)' : 'blur(0px)',
  }

  const visible = {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  }

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{ ...revealTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
