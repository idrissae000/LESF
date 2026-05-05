/**
 * Run once to create the mentor applications Google Sheet and share it
 * with the service account.
 *
 * Usage:
 *   GOOGLE_SERVICE_ACCOUNT_JSON=<base64> node scripts/create-mentor-sheet.mjs
 *
 * Outputs the sheet ID — paste it into Vercel as GOOGLE_MENTOR_SHEET_ID.
 */

import { google } from 'googleapis'
import { JWT } from 'google-auth-library'

const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
if (!saJson) {
  console.error('ERROR: GOOGLE_SERVICE_ACCOUNT_JSON env var is not set.')
  process.exit(1)
}

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
  'Submitted At', 'First Name', 'Last Name', 'City', 'State',
  'Profession', 'Employer', 'Degree', 'University/Institution',
  'Best Method of Contact', 'Email Address', 'LinkedIn',
]

console.log('Creating Google Sheet: LESF Mentor Applications…')

const createRes = await sheets.spreadsheets.create({
  requestBody: {
    properties: { title: 'LESF Mentor Applications' },
    sheets: [{ properties: { title: 'Sheet1' } }],
  },
})

const spreadsheetId = createRes.data.spreadsheetId
console.log(`Sheet created: ${spreadsheetId}`)
console.log(`URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`)

// Write header row
await sheets.spreadsheets.values.update({
  spreadsheetId,
  range: 'Sheet1!A1',
  valueInputOption: 'RAW',
  requestBody: { values: [HEADERS] },
})

// Format: freeze + style header row
await sheets.spreadsheets.batchUpdate({
  spreadsheetId,
  requestBody: {
    requests: [
      {
        updateSheetProperties: {
          properties: { sheetId: 0, gridProperties: { frozenRowCount: 1 } },
          fields: 'gridProperties.frozenRowCount',
        },
      },
      {
        repeatCell: {
          range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.102, green: 0.200, blue: 0.157 },
              textFormat: {
                bold: true,
                fontSize: 10,
                foregroundColor: { red: 1, green: 1, blue: 1 },
              },
              horizontalAlignment: 'CENTER',
              verticalAlignment: 'MIDDLE',
            },
          },
          fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)',
        },
      },
      {
        updateDimensionProperties: {
          range: { sheetId: 0, dimension: 'ROWS', startIndex: 0, endIndex: 1 },
          properties: { pixelSize: 48 },
          fields: 'pixelSize',
        },
      },
      {
        autoResizeDimensions: {
          dimensions: {
            sheetId: 0, dimension: 'COLUMNS',
            startIndex: 0, endIndex: HEADERS.length,
          },
        },
      },
    ],
  },
})

// Share with the service account itself (owner) — makes it accessible via API
// Also make it readable by anyone with the link for easy sharing with the team
await drive.permissions.create({
  fileId: spreadsheetId,
  requestBody: { role: 'reader', type: 'anyone' },
})

console.log('\n✓ Sheet created and formatted.')
console.log('\nAdd this to Vercel environment variables:')
console.log(`  GOOGLE_MENTOR_SHEET_ID=${spreadsheetId}`)
console.log('\nThe sheet is already shared with the service account (it created it).')
console.log('Open the URL above to verify, then deploy on Vercel.')
