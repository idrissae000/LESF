/**
 * Run once to create the LESF Sponsorship Inquiries Google Sheet.
 *
 * Usage:
 *   GOOGLE_SERVICE_ACCOUNT_JSON=<base64> node scripts/create-sponsors-sheet.mjs
 *
 * Copy the printed sheet ID and add it to Vercel as GOOGLE_SPONSORS_SHEET_ID.
 */

import { google } from 'googleapis'
import { JWT } from 'google-auth-library'

const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
if (!saJson) { console.error('ERROR: GOOGLE_SERVICE_ACCOUNT_JSON not set.'); process.exit(1) }

const sa = JSON.parse(Buffer.from(saJson, 'base64').toString('utf-8'))
const auth = new JWT({
  email: sa.client_email,
  key: sa.private_key.replace(/\\n/g, '\n'),
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
  ],
})

const sheets = google.sheets({ version: 'v4', auth })
const drive  = google.drive({ version: 'v3', auth })

const HEADERS = [
  'Submitted At', 'Business Name', 'Contact Name', 'Email', 'Phone',
  'Tier Interested In', 'Message',
]

console.log('Creating Google Sheet: LESF Sponsorship Inquiries…')

const { data } = await sheets.spreadsheets.create({
  requestBody: { properties: { title: 'LESF Sponsorship Inquiries' } },
})
const spreadsheetId = data.spreadsheetId

await sheets.spreadsheets.values.update({
  spreadsheetId, range: 'Sheet1!A1', valueInputOption: 'RAW',
  requestBody: { values: [HEADERS] },
})
await sheets.spreadsheets.batchUpdate({
  spreadsheetId,
  requestBody: { requests: [
    { updateSheetProperties: { properties: { sheetId: 0, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } },
    { repeatCell: { range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 }, cell: { userEnteredFormat: { backgroundColor: { red: 0.102, green: 0.200, blue: 0.157 }, textFormat: { bold: true, fontSize: 10, foregroundColor: { red: 1, green: 1, blue: 1 } }, horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' } }, fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)' } },
    { updateDimensionProperties: { range: { sheetId: 0, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 48 }, fields: 'pixelSize' } },
    { autoResizeDimensions: { dimensions: { sheetId: 0, dimension: 'COLUMNS', startIndex: 0, endIndex: HEADERS.length } } },
  ]},
})
await drive.permissions.create({ fileId: spreadsheetId, requestBody: { role: 'reader', type: 'anyone' } })

console.log('\n✓ Sheet created and formatted.')
console.log(`  URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`)
console.log('\nAdd to Vercel (Production + Preview + Development):')
console.log(`  GOOGLE_SPONSORS_SHEET_ID=${spreadsheetId}`)
