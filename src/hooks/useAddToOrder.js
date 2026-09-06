import { useState, useCallback } from 'react'
import { useCart } from '../context/CartContext'

export function useAddToOrder() {
  const { addItem } = useCart()
  const [addedId, setAddedId] = useState(null)

  const addToOrder = useCallback(
    (product, quantity = 1) => {
      addItem(product, quantity)
      setAddedId(product.id)
      const timer = setTimeout(() => setAddedId(null), 1800)
      return () => clearTimeout(timer)
    },
    [addItem]
  )

  const isAdded = useCallback((productId) => addedId === productId, [addedId])

  return { addToOrder, isAdded, addedId }
}
