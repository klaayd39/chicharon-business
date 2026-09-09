import { useCallback, useEffect, useMemo, useRef } from 'react'
import Lenis from 'lenis'
import { SmoothScrollContext } from './smooth-scroll-store'

const NAV_OFFSET = -88

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const listenersRef = useRef(new Set())
  const positionRef = useRef({ scroll: 0, progress: 0 })

  const notify = useCallback((scroll, progress) => {
    positionRef.current = { scroll, progress }
    listenersRef.current.forEach((listener) => listener(scroll, progress))
  }, [])

  const subscribeScroll = useCallback((listener) => {
    listenersRef.current.add(listener)
    listener(positionRef.current.scroll, positionRef.current.progress)
    return () => listenersRef.current.delete(listener)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onNativeScroll = () => {
      const limit = document.documentElement.scrollHeight - window.innerHeight
      const scroll = window.scrollY
      notify(scroll, limit > 0 ? scroll / limit : 0)
    }

    if (prefersReducedMotion) {
      window.addEventListener('scroll', onNativeScroll, { passive: true })
      onNativeScroll()
      return () => window.removeEventListener('scroll', onNativeScroll)
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      anchors: false,
    })

    lenisRef.current = lenis
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    const unsubscribe = lenis.on('scroll', (instance) => {
      notify(instance.scroll, instance.progress)
    })

    notify(0, 0)

    return () => {
      unsubscribe()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      lenis.destroy()
      lenisRef.current = null
    }
  }, [notify])

  const scrollTo = useCallback((target, options = {}) => {
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
      duration: 1.1,
      ...options,
    })
  }, [])

  const scrollToTop = useCallback(() => {
    scrollTo(0, { offset: 0, duration: 0.9 })
  }, [scrollTo])

  const resize = useCallback(() => {
    lenisRef.current?.resize()
  }, [])

  const stop = useCallback(() => {
    lenisRef.current?.stop()
  }, [])

  const start = useCallback(() => {
    lenisRef.current?.start()
  }, [])

  const value = useMemo(
    () => ({ scrollTo, scrollToTop, resize, stop, start, subscribeScroll }),
    [scrollTo, scrollToTop, resize, stop, start, subscribeScroll]
  )

  return (
    <SmoothScrollContext.Provider
      value={value}
    >
      {children}
    </SmoothScrollContext.Provider>
  )
}
