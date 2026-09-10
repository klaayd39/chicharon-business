import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCart } from '../context/useCart'
import { useFormScrollToTop } from '../hooks/useFormScrollToTop'
import { submitOrder } from '../utils/orderService'
import { validateOrderForm, hasValidationErrors } from '../utils/orderValidation'
import OrderDetailsForm from './order/OrderDetailsForm'
import OrderReview from './order/OrderReview'
import OrderSuccess from './order/OrderSuccess'
import OrderCartSummary from './order/OrderCartSummary'
import OrderStickyActions from './order/OrderStickyActions'
import OrderEmptyState from './order/OrderEmptyState'
import OrderAlert from './order/OrderAlert'
import OrderStepIndicator from './ui/OrderStepIndicator'
import Button from './ui/Button'

const errorFieldIds = {
  fullName: 'fullName',
  contactNumber: 'contactNumber',
  address: 'address',
}

function focusFirstError(errors) {
  const firstKey = Object.keys(errors).find((key) => errorFieldIds[key])
  if (!firstKey) return
  requestAnimationFrame(() => {
    document.getElementById(errorFieldIds[firstKey])?.focus()
  })
}

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

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const handleOrderTypeChange = useCallback((type) => {
    setOrderType(type)
    setErrors((prev) => {
      if (type !== 'pickup' || !prev.address) return prev
      const next = { ...prev }
      delete next.address
      return next
    })
  }, [])

  const handleReview = (e) => {
    e.preventDefault()
    const validationErrors = validateOrderForm({ ...form, orderType }, items.length)
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors)
      focusFirstError(validationErrors)
      scrollToTop()
      return
    }
    setErrors({})
    setStep('review')
    scrollToTop()
  }

  const handleConfirm = async () => {
    const validationErrors = validateOrderForm({ ...form, orderType }, items.length)
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors)
      setStep('details')
      scrollToTop()
      focusFirstError(validationErrors)
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
      <OrderEmptyState
        onBrowse={() => navigate('/products')}
        onHome={() => navigate('/')}
      />
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
      <div className="order-form-shell">
        <OrderStepIndicator currentStep="review" />

        <OrderReview items={items} form={form} orderType={orderType} />

        {status === 'error' && (
          <div className="mt-4">
            <OrderAlert title="Couldn't place your order">
              Check your internet connection and try again. If the problem continues, contact us
              directly and we&apos;ll help you complete your order.
            </OrderAlert>
          </div>
        )}

        <OrderStickyActions hint="Tap below to submit — we'll confirm pricing and availability by phone.">
          <Button
            onClick={handleConfirm}
            disabled={status === 'loading'}
            size="lg"
            className="w-full"
            aria-busy={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" aria-hidden="true" />
                Placing Order...
              </>
            ) : (
              'Place Order'
            )}
          </Button>
          <Button onClick={openCart} variant="secondary" size="lg" className="w-full">
            Back to Cart
          </Button>
          <button
            type="button"
            onClick={() => {
              setStep('details')
              setStatus('idle')
              scrollToTop()
            }}
            className="order-link-button text-sm text-warm-gray hover:text-brown transition-colors py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red rounded-lg"
          >
            Edit order details
          </button>
        </OrderStickyActions>
      </div>
    )
  }

  return (
    <form onSubmit={handleReview} className="order-form-shell" noValidate>
      <OrderStepIndicator currentStep="details" />

      <OrderCartSummary items={items} onEdit={openCart} />

      <OrderDetailsForm
        form={form}
        errors={errors}
        orderType={orderType}
        onFieldChange={updateField}
        onOrderTypeChange={handleOrderTypeChange}
      />

      <OrderStickyActions hint="Next, you'll review your order before submitting.">
        <Button type="submit" size="lg" className="w-full">
          Review Order
        </Button>
        <Button type="button" onClick={openCart} variant="secondary" size="lg" className="w-full">
          Back to Cart
        </Button>
      </OrderStickyActions>
    </form>
  )
}
