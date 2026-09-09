/**
 * Kingdams Foods — Google Sheets Order Receiver
 *
 * SETUP (one-time, ~10 minutes):
 *
 * 1. Create a new Google Sheet (e.g. "Kingdams Foods Orders")
 *
 * 2. Extensions → Apps Script → delete default code → paste this entire file → Save
 *
 * 3. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    → Deploy → copy the Web App URL
 *
 * 4. In your project root, create a file named `.env`:
 *      VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ID/exec
 *
 * 5. Restart the dev server (npm run dev)
 *
 * Orders will appear in two tabs: "Orders" and "Bulk Orders"
 */

const ORDER_HEADERS = [
  'Timestamp',
  'Order ID',
  'Order Type',
  'Customer Name',
  'Contact Number',
  'Address',
  'Items',
  'Item Count',
  'Notes',
  'Status',
]

const BULK_HEADERS = [
  'Timestamp',
  'Reference',
  'Order Type',
  'Customer Name',
  'Business Name',
  'Contact Number',
  'Email',
  'Address',
  'Preferred Date',
  'Preferred Time',
  'Items',
  'Notes',
  'Status',
]

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name)
  if (!sheet) {
    sheet = ss.insertSheet(name)
    sheet.appendRow(headers)
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers)
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  return sheet
}

function handleOrder(ss, data) {
  const sheet = getOrCreateSheet(ss, 'Orders', ORDER_HEADERS)
  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.orderId || '',
    data.orderType || '',
    data.customerName || '',
    data.contactNumber || '',
    data.address || '',
    data.items || '',
    data.itemCount || '',
    data.notes || '',
    data.status || 'pending',
  ])
}

function handleBulkOrder(ss, data) {
  const sheet = getOrCreateSheet(ss, 'Bulk Orders', BULK_HEADERS)
  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.reference || '',
    data.orderType || '',
    data.customerName || '',
    data.businessName || '',
    data.contactNumber || '',
    data.email || '',
    data.address || '',
    data.preferredDate || '',
    data.preferredTime || '',
    data.items || '',
    data.notes || '',
    data.status || 'pending',
  ])
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const ss = SpreadsheetApp.getActiveSpreadsheet()

    if (data.type === 'order') {
      handleOrder(ss, data)
    } else if (data.type === 'bulk_order') {
      handleBulkOrder(ss, data)
    } else {
      throw new Error('Unknown order type: ' + data.type)
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.message })
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ success: true, message: 'Kingdams Foods order endpoint is running.' })
  ).setMimeType(ContentService.MimeType.JSON)
}
