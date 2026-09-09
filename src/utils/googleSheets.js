/**
 * Send order data to a Google Apps Script web app that writes to Google Sheets.
 *
 * Set VITE_GOOGLE_SHEETS_URL in .env to your deployed Apps Script URL.
 * See google-apps-script/Code.gs for setup instructions.
 */

const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL

export function isGoogleSheetsConfigured() {
  return Boolean(SHEETS_URL?.trim())
}

export async function postToGoogleSheet(payload) {
  if (!isGoogleSheetsConfigured()) {
    return { ok: false, skipped: true }
  }

  try {
    const response = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })

    const text = await response.text()
    const result = JSON.parse(text)
    return { ok: result.success === true, result }
  } catch (error) {
    console.error('[Google Sheets] Failed to submit:', error)
    return { ok: false, error }
  }
}

function formatItems(items) {
  return items
    .map((item) => `${item.name} × ${item.quantity}${item.unit ? ` (${item.unit})` : ''}`)
    .join('; ')
}

export function buildOrderSheetPayload(orderData, orderId) {
  return {
    type: 'order',
    orderId,
    submittedAt: orderData.submittedAt || new Date().toISOString(),
    orderType: orderData.orderType,
    customerName: orderData.customer.fullName,
    contactNumber: orderData.customer.contactNumber,
    address: orderData.customer.address || '',
    notes: orderData.customer.notes || '',
    items: formatItems(orderData.items),
    itemCount: orderData.items.reduce((sum, i) => sum + i.quantity, 0),
    status: 'pending',
  }
}

export function buildBulkOrderSheetPayload(records, reference) {
  const { order, items } = records

  return {
    type: 'bulk_order',
    reference,
    submittedAt: order.created_at,
    orderType: order.order_type,
    customerName: order.customer_name,
    businessName: order.business_name || '',
    contactNumber: order.contact_number,
    email: order.email || '',
    address: order.address || '',
    preferredDate: order.preferred_date,
    preferredTime: order.preferred_time || '',
    notes: order.notes || '',
    items: items.map((i) => `${i.product_name} × ${i.quantity}`).join('; '),
    status: order.status,
  }
}
