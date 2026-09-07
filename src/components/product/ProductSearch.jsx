import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

export default function ProductSearch({ value, onChange }) {
  const [manualOpen, setManualOpen] = useState(false)
  const inputRef = useRef(null)
  const isOpen = manualOpen || Boolean(value)

  const openSearch = useCallback(() => {
    setManualOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    if (!value) setManualOpen(false)
  }, [value])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (value) {
        onChange('')
      } else {
        setManualOpen(false)
        e.currentTarget.blur()
      }
    }
  }

  return (
    <div className="w-full sm:w-auto sm:shrink-0">
      <AnimatePresence initial={false} mode="wait">
        {!isOpen ? (
          <motion.button
            key="toggle"
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease }}
            onClick={openSearch}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-charcoal/70 border border-cream-dark bg-white hover:border-brown/30 hover:text-brown hover:shadow-sm transition-all w-full sm:w-auto"
            aria-label="Search products"
            aria-expanded={false}
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>Search</span>
          </motion.button>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0, width: '8rem' }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0, width: '8rem' }}
            transition={{ duration: 0.25, ease }}
            className="relative w-full sm:min-w-[16rem] sm:max-w-xs"
          >
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              id="product-search"
              type="text"
              role="searchbox"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={closeSearch}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              autoComplete="off"
              enterKeyHint="search"
              className="w-full pl-10 pr-10 py-2.5 rounded-full text-sm bg-white border border-cream-dark text-charcoal placeholder:text-warm-gray-light shadow-sm transition-all focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/10 focus:shadow-md"
              aria-label="Search products"
            />
            {value && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-warm-gray hover:text-brown hover:bg-brown/5 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
