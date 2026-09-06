import { businessConfig } from '../data/businessConfig'

export async function submitOrder(orderData) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  console.info(`[${businessConfig.name}] Order recorded (frontend only):`, orderData)

  return {
    success: true,
    orderId: `REQ-${Date.now()}`,
  }
}
