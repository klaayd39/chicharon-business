export function validateOrderForm({ fullName, contactNumber, address, orderType }, itemCount) {
  const errors = {}

  if (itemCount === 0) {
    errors.items = 'Please add at least one product to your order'
  }

  if (!fullName?.trim()) {
    errors.fullName = 'Full name is required'
  }

  if (!contactNumber?.trim()) {
    errors.contactNumber = 'Contact number is required'
  } else if (!/^[\d\s\-+()]{7,15}$/.test(contactNumber.trim())) {
    errors.contactNumber = 'Please enter a valid contact number'
  }

  if (orderType === 'delivery' && !address?.trim()) {
    errors.address = 'Delivery address is required'
  }

  return errors
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0
}
