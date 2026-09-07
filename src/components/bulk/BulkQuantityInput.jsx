import { useState, useEffect } from 'react'
import { Minus, Plus } from 'lucide-react'

/**
 * Quantity input for bulk orders — supports direct typing plus +/- buttons.
 * Prevents zero/negative values. Allows temporary empty state while editing.
 */
export default function BulkQuantityInput({ value, onChange, min = 1, label }) {
  const [local, setLocal] = useState(String(value))

  useEffect(() => {
    setLocal(String(value))
  }, [value])

  const commit = (next) => {
    const clamped = Math.max(min, next)
    onChange(clamped)
    setLocal(String(clamped))
  }

  const handleInput = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '')
    setLocal(raw)
    if (raw !== '') {
      const parsed = parseInt(raw, 10)
      if (Number.isFinite(parsed) && parsed >= min) {
        onChange(parsed)
      }
    }
  }

  const handleBlur = () => {
    const parsed = parseInt(local, 10)
    commit(Number.isFinite(parsed) ? parsed : min)
  }

  return (
    <div
      className="inline-flex items-center gap-1 bg-white border border-cream-dark rounded-full p-0.5"
      role="group"
      aria-label={`${label} quantity`}
    >
      <button
        type="button"
        onClick={() => commit(value - 1)}
        disabled={value <= min}
        className="p-2 rounded-full hover:bg-cream-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label={`Decrease ${label} quantity`}
      >
        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={local}
        onChange={handleInput}
        onBlur={handleBlur}
        className="w-12 text-center text-sm font-semibold text-brown tabular-nums bg-transparent focus:outline-none"
        aria-label={`${label} quantity`}
      />
      <button
        type="button"
        onClick={() => commit(value + 1)}
        className="p-2 rounded-full hover:bg-cream-dark transition-colors"
        aria-label={`Increase ${label} quantity`}
      >
        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}
