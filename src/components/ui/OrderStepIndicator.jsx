import { Check } from 'lucide-react'

const steps = [
  { id: 'details', label: 'Your Info' },
  { id: 'review', label: 'Review & Confirm' },
]

export default function OrderStepIndicator({ currentStep }) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <nav aria-label="Order progress" className="mb-8 sm:mb-10">
      <ol className="flex items-center justify-center gap-0 max-w-md mx-auto">
        {steps.map((step, i) => {
          const isComplete = i < currentIndex
          const isCurrent = i === currentIndex

          return (
            <li key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
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
                <span
                  className={`text-[10px] sm:text-xs font-medium whitespace-nowrap ${
                    isCurrent ? 'text-brown' : isComplete ? 'text-brown/70' : 'text-warm-gray-light'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-1 sm:mx-2 mb-5 rounded-full transition-colors duration-300 ${
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
