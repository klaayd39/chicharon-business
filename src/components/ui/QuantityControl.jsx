import { Minus, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function QuantityControl({
  value,
  onDecrease,
  onIncrease,
  label,
  size = 'md',
}) {
  const btnSize = size === 'sm' ? 'p-1.5' : 'p-2.5'
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  const width = size === 'sm' ? 'w-7' : 'w-10'

  return (
    <div
      className="inline-flex items-center gap-0.5 bg-white border border-cream-dark rounded-full p-0.5"
      role="group"
      aria-label={`${label} quantity`}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={value <= 1}
        className={`${btnSize} rounded-full hover:bg-cream-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label={`Decrease ${label} quantity`}
      >
        <Minus className={iconSize} aria-hidden="true" />
      </button>
      <motion.span
        key={value}
        initial={{ scale: 1.2, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
        className={`${width} text-center text-sm font-semibold text-brown tabular-nums`}
        aria-live="polite"
      >
        {value}
      </motion.span>
      <button
        type="button"
        onClick={onIncrease}
        className={`${btnSize} rounded-full hover:bg-cream-dark transition-colors`}
        aria-label={`Increase ${label} quantity`}
      >
        <Plus className={iconSize} aria-hidden="true" />
      </button>
    </div>
  )
}
