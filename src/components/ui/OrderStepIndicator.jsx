import { Check } from 'lucide-react'

const steps = [
  { id: 'details', label: 'Your Info', shortLabel: 'Info' },
  { id: 'review', label: 'Review & Confirm', shortLabel: 'Review' },
]

export default function OrderStepIndicator({ currentStep }) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <nav aria-label="Order progress" className="mb-6 sm:mb-8">
      <ol className="flex items-center gap-2 sm:gap-3 max-w-md mx-auto">
        {steps.map((step, i) => {
          const isComplete = i < currentIndex
          const isCurrent = i === currentIndex

          return (
            <li key={step.id} className="flex items-center flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-semibold shrink-0 transition-all duration-300 ${
                    isComplete
                      ? 'bg-brown text-cream'
                      : isCurrent
                        ? 'bg-brown text-cream ring-4 ring-brown/15'
                        : 'bg-cream-dark text-warm-gray'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isComplete ? <Check className="w-4 h-4" aria-hidden="true" /> : i + 1}
                </div>
                <div className="min-w-0">
                  <span
                    className={`block text-xs sm:text-sm font-semibold truncate ${
                      isCurrent ? 'text-brown' : isComplete ? 'text-brown/80' : 'text-warm-gray-light'
                    }`}
                  >
                    <span className="sm:hidden">{step.shortLabel}</span>
                    <span className="hidden sm:inline">{step.label}</span>
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] text-warm-gray sm:text-xs">Step {i + 1} of {steps.length}</span>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 w-6 sm:w-10 shrink-0 rounded-full transition-colors duration-300 ${
                    i < currentIndex ? 'bg-brown/40' : 'bg-cream-dark'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
