import { createContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

export const SmoothScrollContext = createContext(null)

const NAV_OFFSET = -88

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [scroll, setScroll] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const updateNativeScroll = () => {
      const limit = document.documentElement.scrollHeight - window.innerHeight
      setScroll(window.scrollY)
      setProgress(limit > 0 ? window.scrollY / limit : 0)
    }

    if (prefersReducedMotion) {
      window.addEventListener('scroll', updateNativeScroll, { passive: true })
      updateNativeScroll()
      return () => window.removeEventListener('scroll', updateNativeScroll)
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    lenis.on('scroll', ({ scroll: y, limit }) => {
      setScroll(y)
      setProgress(limit > 0 ? y / limit : 0)
    })

    setReady(true)

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      lenis.destroy()
      lenisRef.current = null
      setReady(false)
      setScroll(0)
      setProgress(0)
    }
  }, [])

  const scrollTo = (target, options = {}) => {
    const lenis = lenisRef.current
    if (!lenis) {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    lenis.scrollTo(target, {
      offset: NAV_OFFSET,
      duration: 1.15,
      ...options,
    })
  }

  const scrollToTop = () => {
    scrollTo(0, { offset: 0, duration: 1 })
  }

  return (
    <SmoothScrollContext.Provider
      value={{ scrollTo, scrollToTop, ready, scroll, progress }}
    >
      {children}
    </SmoothScrollContext.Provider>
  )
}
