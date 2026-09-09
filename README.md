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

### Google Sheets (recommended)

You can save orders to a Google Sheet — no server required.

1. Create a Google Sheet (e.g. “Kingdams Foods Orders”)
2. **Extensions → Apps Script** → paste `google-apps-script/Code.gs` → Save
3. **Deploy → New deployment → Web app** → Execute as **Me**, access **Anyone** → copy the URL
4. Create `.env` in the project root:

```bash
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

5. Restart the dev server

Orders appear in **Orders** and **Bulk Orders** tabs. Without this URL, the site runs in demo mode (orders logged to the browser console only).
