import { businessConfig } from '../data/businessConfig'

/**
 * Validate a bulk order request.
 * @param {object} form - { fullName, contactNumber, address, preferredDate }
 * @param {string} orderType - 'delivery' | 'pickup'
 * @param {Array} items - selected products [{ id, quantity }]
 */
export function validateBulkOrder(form, orderType, items) {
  const errors = {}
  const minQty = businessConfig.bulkOrder.minQuantity

  if (!form.fullName?.trim()) {
    errors.fullName = 'Full name is required'
  }

  if (!form.contactNumber?.trim()) {
    errors.contactNumber = 'Contact number is required'
  } else if (!/^[\d\s\-+()]{7,15}$/.test(form.contactNumber.trim())) {
    errors.contactNumber = 'Please enter a valid contact number'
  }

  if (form.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address'
  }

  if (!orderType) {
    errors.orderType = 'Please choose delivery or pickup'
  }

  if (orderType === 'delivery' && !form.address?.trim()) {
    errors.address = 'Delivery address is required'
  }

  if (!form.preferredDate?.trim()) {
    errors.preferredDate = 'Preferred date is required'
  }

  if (!items || items.length === 0) {
    errors.items = 'Please add at least one product'
  } else if (items.some((i) => !Number.isFinite(i.quantity) || i.quantity <= 0)) {
    errors.items = 'Product quantities must be greater than zero'
  } else if (minQty != null && items.some((i) => i.quantity < minQty)) {
    errors.items = `Each product must have a quantity of at least ${minQty}`
  }

  return errors
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0
}
