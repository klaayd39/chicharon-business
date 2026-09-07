import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { products } from '../../data/products'
import { submitBulkOrder } from '../../utils/bulkOrderService'
import { validateBulkOrder, hasValidationErrors } from '../../utils/bulkOrderValidation'
import BulkProductSelector from './BulkProductSelector'
import BulkDetailsForm from './BulkDetailsForm'
import BulkOrderReview from './BulkOrderReview'
import BulkOrderSuccess from './BulkOrderSuccess'
import Button from '../ui/Button'

const initialForm = {
  fullName: '',
  businessName: '',
  contactNumber: '',
  email: '',
  address: '',
  preferredDate: '',
  preferredTime: '',
  notes: '',
}

export default function BulkOrderForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState('form')
  const [orderType, setOrderType] = useState('delivery')
  const [items, setItems] = useState([])
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [reference, setReference] = useState(null)

  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    clearError(field)
  }

  const handleOrderTypeChange = (type) => {
    setOrderType(type)
    clearError('orderType')
    if (type === 'pickup') clearError('address')
  }

  const handleAdd = (product, quantity) => {
    setItems((prev) => [
      ...prev,
      {
        id: product.id,
        name: product.name,
        unit: product.unit,
        image: product.image,
        imageAlt: product.imageAlt,
        quantity,
      },
    ])
    clearError('items')
  }

  const handleQuantityChange = (id, quantity) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
    clearError('items')
  }

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const runValidation = () => {
    const validationErrors = validateBulkOrder(form, orderType, items)
    setErrors(validationErrors)
    return !hasValidationErrors(validationErrors)
  }

  const handleReview = (e) => {
    e.preventDefault()
    if (!runValidation()) return
    setStep('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (!runValidation()) {
      setStep('form')
      return
    }

    setStatus('loading')
    try {
      const result = await submitBulkOrder({
        items: items.map((i) => ({ id: i.id, name: i.name, unit: i.unit, quantity: i.quantity })),
        customer: {
          fullName: form.fullName.trim(),
          businessName: form.businessName.trim(),
          contactNumber: form.contactNumber.trim(),
          email: form.email.trim(),
          address: orderType === 'delivery' ? form.address.trim() : null,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          notes: form.notes.trim(),
        },
        orderType,
      })

      if (result.success) {
        setReference(result.reference)
        setStatus('success')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <BulkOrderSuccess reference={reference} />
  }

  if (step === 'review') {
    return (
      <div className="max-w-2xl mx-auto">
        <BulkOrderReview items={items} form={form} orderType={orderType} />

        {status === 'error' && (
          <p className="text-red text-sm mt-4 p-3 bg-red/5 rounded-xl" role="alert">
            Something went wrong. Please try again.
          </p>
        )}

        <div className="flex flex-col gap-3 mt-6">
          <Button onClick={handleSubmit} disabled={status === 'loading'} size="lg" className="w-full">
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Submit Bulk Order Request'
            )}
          </Button>
          <Button onClick={() => setStep('form')} variant="secondary" size="lg" className="w-full">
            Edit Request
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleReview} className="max-w-2xl mx-auto space-y-8" noValidate>
      <BulkProductSelector
        products={products}
        selectedItems={items}
        onAdd={handleAdd}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        error={errors.items}
      />

      <div className="border-t border-cream-dark/60 pt-8">
        <BulkDetailsForm
          form={form}
          errors={errors}
          orderType={orderType}
          onFieldChange={updateField}
          onOrderTypeChange={handleOrderTypeChange}
        />
      </div>

      <div className="flex flex-col gap-3 sticky bottom-0 bg-cream/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:static sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:mx-0 border-t border-cream-dark/50 sm:border-0">
        <Button type="submit" size="lg" className="w-full">
          Review Bulk Order
        </Button>
        <Button type="button" onClick={() => navigate('/products')} variant="secondary" size="lg" className="w-full">
          Browse Products
        </Button>
      </div>
    </form>
  )
}
