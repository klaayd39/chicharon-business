import { useEffect } from 'react'
import { useSmoothScroll } from '../context/useSmoothScroll'

export function useBodyScrollLock(locked) {
  const { stop, start } = useSmoothScroll()

  useEffect(() => {
    if (!locked) return

    stop()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      start()
    }
  }, [locked, stop, start])
}
