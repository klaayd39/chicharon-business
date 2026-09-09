import { businessConfig } from '../data/businessConfig'
import {
  postToGoogleSheet,
  buildBulkOrderSheetPayload,
  isGoogleSheetsConfigured,
} from './googleSheets'

/**
 * Bulk order submission.
 *
 * When VITE_GOOGLE_SHEETS_URL is set, orders are saved to Google Sheets.
 * Otherwise runs in frontend-only demo mode (console log).
 *
 * ── Future: Supabase schema (optional upgrade) ─────────────────────────────
 * See comments in git history / bulkOrderService for table definitions.
 * ────────────────────────────────────────────────────────────────────────────
 */

function generateReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `${businessConfig.bulkOrder.referencePrefix}-${code}`
}

export function toBulkOrderRecords(request, reference) {
  const now = new Date().toISOString()

  const order = {
    reference,
    customer_name: request.customer.fullName,
    business_name: request.customer.businessName || null,
    contact_number: request.customer.contactNumber,
    email: request.customer.email || null,
    order_type: request.orderType,
    address: request.orderType === 'delivery' ? request.customer.address : null,
    preferred_date: request.customer.preferredDate,
    preferred_time: request.customer.preferredTime || null,
    notes: request.customer.notes || null,
    status: businessConfig.bulkOrder.defaultStatus,
    created_at: now,
    updated_at: now,
  }

  const items = request.items.map((item) => ({
    product_id: item.id,
    product_name: item.name,
    quantity: item.quantity,
    price: null,
    subtotal: null,
    created_at: now,
  }))

  return { order, items }
}

export async function submitBulkOrder(request) {
  const reference = generateReference()
  const records = toBulkOrderRecords(request, reference)

  if (isGoogleSheetsConfigured()) {
    const payload = buildBulkOrderSheetPayload(records, reference)
    const { ok } = await postToGoogleSheet(payload)

    if (!ok) {
      return { success: false }
    }

    return {
      success: true,
      reference,
      status: businessConfig.bulkOrder.defaultStatus,
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 900))
  console.info(`[${businessConfig.name}] Bulk order request (frontend only):`, records)

  return {
    success: true,
    reference,
    status: businessConfig.bulkOrder.defaultStatus,
  }
}
