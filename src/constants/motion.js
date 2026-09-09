/** Premium easing — similar to agency sites using Lenis + scroll reveals */
export const easeOutExpo = [0.16, 1, 0.3, 1]

export const revealTransition = {
  duration: 0.9,
  ease: easeOutExpo,
}

export const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

export const heroItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOutExpo },
  },
}

export const heroVisual = {
  hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)', scale: 1.06 },
  show: {
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    scale: 1,
    transition: { duration: 1.15, delay: 0.25, ease: easeOutExpo },
  },
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOutExpo },
  },
}

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.01, transition: { duration: 0.35, ease: easeOutExpo } },
}

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.55, ease: easeOutExpo },
}
