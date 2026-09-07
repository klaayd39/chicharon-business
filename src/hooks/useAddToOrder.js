import { useState, useCallback, useRef } from 'react'
import { useCart } from '../context/useCart'

export function useAddToOrder() {
  const { addItem } = useCart()
  const [addedId, setAddedId] = useState(null)
  const timerRef = useRef(null)

  const addToOrder = useCallback(
    (product, quantity = 1) => {
      addItem(product, quantity)
      setAddedId(product.id)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setAddedId(null), 1800)
    },
    [addItem]
  )

  const isAdded = useCallback((productId) => addedId === productId, [addedId])

  return { addToOrder, isAdded, addedId }
}
