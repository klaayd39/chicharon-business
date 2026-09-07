# Kingdams Foods

Website for **Kingdams Foods**, a Filipino food business in Malaybalay City, Bukidnon offering chicharon and frozen longganisa.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Update business details

Edit `src/data/businessConfig.js` for:

- Business name, tagline, location, hours
- Phone and Facebook (currently “Coming Soon”)
- Logo path (`public/images/logo.png`)
- Bulk order settings (`bulkOrder.minQuantity`, reference prefix)

Edit `src/data/products.js` for products and prices. Leave `price: null` until real prices are available.

Replace product images in `public/images/` (`chicharon.svg`, `longganisa.svg`) with actual photos when ready.

## Ordering

- Regular orders: add to cart → `/order`
- Bulk orders: `/bulk-order` (separate flow, no account required)

Both are frontend-only until a backend such as Supabase is connected. See comments in `src/utils/orderService.js` and `src/utils/bulkOrderService.js`.
