import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCart } from '../context/useCart'
import { useFormScrollToTop } from '../hooks/useFormScrollToTop'
import { submitOrder } from '../utils/orderService'
import { validateOrderForm, hasValidationErrors } from '../utils/orderValidation'
import OrderDetailsForm from './order/OrderDetailsForm'
import OrderReview from './order/OrderReview'
import OrderSuccess from './order/OrderSuccess'
import OrderStepIndicator from './ui/OrderStepIndicator'
import Button from './ui/Button'

export default function OrderForm() {
  const { items, clearCart, openCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState('details')
  const [orderType, setOrderType] = useState('delivery')
  const [form, setForm] = useState({
    fullName: '',
    contactNumber: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [orderId, setOrderId] = useState(null)
  const [isDemoOrder, setIsDemoOrder] = useState(false)
  const scrollToTop = useFormScrollToTop()

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleOrderTypeChange = (type) => {
    setOrderType(type)
    if (type === 'pickup' && errors.address) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next.address
        return next
      })
    }
  }

  const handleReview = (e) => {
    e.preventDefault()
    const validationErrors = validateOrderForm(
      { ...form, orderType },
      items.length
    )
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setStep('review')
    scrollToTop()
  }

  const handleConfirm = async () => {
    const validationErrors = validateOrderForm(
      { ...form, orderType },
      items.length
    )
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors)
      setStep('details')
      return
    }

    setStatus('loading')
    try {
      const result = await submitOrder({
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          unit: i.unit,
          priceDisplay: i.priceDisplay,
        })),
        customer: {
          fullName: form.fullName.trim(),
          contactNumber: form.contactNumber.trim(),
          address: orderType === 'delivery' ? form.address.trim() : null,
          notes: form.notes.trim() || null,
        },
        orderType,
        submittedAt: new Date().toISOString(),
      })

      if (result.success) {
        setOrderId(result.orderId ?? null)
        setIsDemoOrder(Boolean(result.demo))
        setStatus('success')
        clearCart()
        scrollToTop()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (items.length === 0 && status !== 'success') {
    return (
      <div className="text-center py-16 sm:py-20 card max-w-md mx-auto px-6">
        <div className="w-14 h-14 rounded-2xl bg-cream-dark/60 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl" aria-hidden="true">🛒</span>
        </div>
        <p className="font-display text-2xl text-brown mb-2">No items in your order</p>
        <p className="text-warm-gray text-sm sm:text-base mb-8">Add some products before placing an order.</p>
        <Button onClick={() => navigate('/products')} size="lg">
          Browse Products
        </Button>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <OrderSuccess
        form={form}
        orderType={orderType}
        orderId={orderId}
        demo={isDemoOrder}
      />
    )
  }

  if (step === 'review') {
    return (
      <div className="max-w-xl mx-auto">
        <OrderStepIndicator currentStep="review" />

        <OrderReview items={items} form={form} orderType={orderType} />

        {status === 'error' && (
          <p className="text-red text-sm mt-4 p-3 bg-red/5 rounded-xl border border-red/10" role="alert">
            We couldn&apos;t submit your order. Check your connection and try again, or contact us
            directly.
          </p>
        )}

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={handleConfirm}
            disabled={status === 'loading'}
            size="lg"
            className="w-full"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Placing Order...
              </>
            ) : (
              'Place Order'
            )}
          </Button>
          <Button
            onClick={() => {
              openCart()
            }}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Back to Cart
          </Button>
          <button
            type="button"
            onClick={() => {
              setStep('details')
              scrollToTop()
            }}
            className="text-sm text-warm-gray hover:text-brown transition-colors py-2"
          >
            Edit order details
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleReview} className="max-w-xl mx-auto" noValidate>
      <OrderStepIndicator currentStep="details" />

      <OrderDetailsForm
        form={form}
        errors={errors}
        orderType={orderType}
        onFieldChange={updateField}
        onOrderTypeChange={handleOrderTypeChange}
      />

      <div className="flex flex-col gap-3 mt-6 sticky bottom-0 bg-cream/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:static sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:-mx-0 border-t border-cream-dark/50 sm:border-0">
        <Button type="submit" size="lg" className="w-full">
          Review Order
        </Button>
        <Button
          type="button"
          onClick={() => openCart()}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          Back to Cart
        </Button>
      </div>
    </form>
  )
}
