import { AlertCircle, WifiOff } from 'lucide-react'

export default function OrderAlert({ variant = 'error', title, children }) {
  const isError = variant === 'error'
  const isWarning = variant === 'warning'

  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={`flex gap-3 p-4 rounded-xl border ${
        isError
          ? 'bg-red/5 border-red/15 text-charcoal'
          : 'bg-amber-50 border-amber-200/80 text-amber-950'
      }`}
    >
      {isError ? (
        <WifiOff className="w-5 h-5 text-red shrink-0 mt-0.5" aria-hidden="true" />
      ) : (
        <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isWarning ? 'text-amber-700' : 'text-amber-700'}`} aria-hidden="true" />
      )}
      <div className="min-w-0 text-left">
        {title && <p className="text-sm font-semibold text-brown mb-1">{title}</p>}
        <p className="text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}
