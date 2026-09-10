import { useEffect } from 'react'
import { useSmoothScroll } from '../context/useSmoothScroll'

let lockCount = 0

function applyLock(stop) {
  stop()
  document.body.style.overflow = 'hidden'
}

function releaseLock(start) {
  document.body.style.overflow = ''
  start()
}

export function useBodyScrollLock(locked) {
  const { stop, start } = useSmoothScroll()

  useEffect(() => {
    if (!locked) return

    lockCount += 1
    if (lockCount === 1) {
      applyLock(stop)
    }

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        releaseLock(start)
      }
    }
  }, [locked, stop, start])
}
