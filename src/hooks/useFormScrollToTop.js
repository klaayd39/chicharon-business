import { useCallback } from 'react'
import { useSmoothScroll } from '../context/useSmoothScroll'

export function useFormScrollToTop() {
  const { scrollToTop } = useSmoothScroll()

  return useCallback(() => {
    scrollToTop()
  }, [scrollToTop])
}
