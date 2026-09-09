import { useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { pageTransition } from '../constants/motion'

export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div key={pathname}>{children}</div>
  }

  return (
    <motion.div
      key={pathname}
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  )
}
