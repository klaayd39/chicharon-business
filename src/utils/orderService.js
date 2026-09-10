import { businessConfig } from '../data/businessConfig'
import {
  postToGoogleSheet,
  buildOrderSheetPayload,
  isGoogleSheetsConfigured,
} from './googleSheets'

export async function submitOrder(orderData) {
  const orderId = `REQ-${Date.now()}`

  if (isGoogleSheetsConfigured()) {
    const payload = buildOrderSheetPayload(orderData, orderId)
    const { ok } = await postToGoogleSheet(payload)

    if (!ok) {
      return { success: false }
    }

    return { success: true, orderId }
  }

  await new Promise((resolve) => setTimeout(resolve, 800))
  console.info(`[${businessConfig.name}] Order recorded (frontend only):`, orderData)

  return {
    success: true,
    orderId,
    demo: true,
  }
}
