import { businessConfig } from '../data/businessConfig'

/**
 * Bulk order submission — FRONTEND ONLY for now.
 *
 * This does NOT send data to a server yet. It is structured so it can be
 * connected to Supabase (or another backend) later without changing the UI.
 *
 * ── Supabase schema (create when Supabase is connected) ─────────────────────
 *
 * create table bulk_orders (
 *   id uuid primary key default gen_random_uuid(),
 *   reference text unique not null,
 *   customer_name text not null,
 *   business_name text,
 *   contact_number text not null,
 *   email text,
 *   order_type text not null,            -- 'delivery' | 'pickup'
 *   address text,                        -- required only for delivery
 *   preferred_date date not null,
 *   preferred_time text,
 *   notes text,
 *   status text not null default 'pending',
 *   created_at timestamptz not null default now(),
 *   updated_at timestamptz not null default now()
 * );
 *
 * create table bulk_order_items (
 *   id uuid primary key default gen_random_uuid(),
 *   bulk_order_id uuid not null references bulk_orders(id) on delete cascade,
 *   product_id text not null,
 *   product_name text not null,
 *   quantity integer not null check (quantity > 0),
 *   price numeric,                       -- null until business confirms pricing
 *   subtotal numeric,                    -- null until priced
 *   created_at timestamptz not null default now()
 * );
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

/**
 * Shape the request into records ready for Supabase insertion.
 * When Supabase is connected, insert `order` into `bulk_orders`, then insert
 * `items` (with the returned bulk_order id) into `bulk_order_items`.
 */
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
    price: null, // null until business confirms pricing — never store fake prices
    subtotal: null,
    created_at: now,
  }))

  return { order, items }
}

export async function submitBulkOrder(request) {
  // Simulate async work; keeps UI ready for a real backend call.
  await new Promise((resolve) => setTimeout(resolve, 900))

  const reference = generateReference()
  const records = toBulkOrderRecords(request, reference)

  // TODO: When Supabase is connected, replace the log below with:
  //   const { data: order } = await supabase.from('bulk_orders').insert(records.order).select().single()
  //   await supabase.from('bulk_order_items').insert(records.items.map(i => ({ ...i, bulk_order_id: order.id })))
  console.info(`[${businessConfig.name}] Bulk order request (frontend only):`, records)

  return {
    success: true,
    reference,
    status: businessConfig.bulkOrder.defaultStatus,
  }
}
