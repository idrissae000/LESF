import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { JWT } from 'google-auth-library'
import { Resend } from 'resend'
import { sponsorLimiter, checkRateLimit } from '@/lib/ratelimit'
import { checkOrigin } from '@/lib/csrf'

export const dynamic = 'force-dynamic'

function getAuth(): JWT | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) return null
  try {
    const sa = JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'))
    return new JWT({
      email: sa.client_email,
      key: (sa.private_key as string).replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
  } catch {
    return null
  }
}

const HEADERS = [
  'Submitted At', 'Business Name', 'Contact Name', 'Email', 'Phone',
  'Tier Interested In', 'Message',
]

async function ensureHeaders(sheets: ReturnType<typeof google.sheets>, spreadsheetId: string) {
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'Sheet1!A1' })
  if (res.data.values?.length) return
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Sheet1!A1',
    valueInputOption: 'RAW',
    requestBody: { values: [HEADERS] },
  })
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
                backgroundColor: { red: 0.039, green: 0.122, blue: 0.267 },
                textFormat: { bold: true, fontSize: 10, foregroundColor: { red: 1, green: 1, blue: 1 } },
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
            dimensions: { sheetId: 0, dimension: 'COLUMNS', startIndex: 0, endIndex: HEADERS.length },
          },
        },
      ],
    },
  })
}

export async function POST(request: NextRequest) {
  const badOrigin = checkOrigin(request)
  if (badOrigin) return badOrigin

  const limited = await checkRateLimit(sponsorLimiter, request)
  if (limited) return limited

  try {
    const body = await request.json()
    const san = (v: unknown) => (typeof v === 'string' ? v.replace(/<[^>]*>/g, '').trim() : '')

    if (san(body.website)) {
      return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 400 })
    }

    const businessName = san(body.businessName)
    const contactName  = san(body.contactName)
    const email        = san(body.email)
    const phone        = san(body.phone)
    const tier         = san(body.tier)
    const message      = san(body.message)

    const auth = getAuth()
    if (!auth) return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
    const sheets  = google.sheets({ version: 'v4', auth })
    const sheetId = process.env.GOOGLE_SPONSORS_SHEET_ID!

    await ensureHeaders(sheets, sheetId)
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          businessName, contactName, email, phone || '',
          tier, message || '',
        ]],
      },
    })

    // Existing email notification — unchanged
    const resend = new Resend(process.env.RESEND_API_KEY)
    const from   = process.env.RESEND_FROM_EMAIL ?? 'LESF <applications@lonestareritreanscholars.org>'

    const adminSend = await resend.emails.send({
      from,
      to: 'ob.alkhaffaf@gmail.com',
      subject: `Sponsorship Inquiry — ${businessName} — ${tier}`,
      html: `
        <h2>New Sponsorship Inquiry</h2>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Contact:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Tier Interested:</strong> ${tier}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message || '—'}</p>
      `,
    })
    if (adminSend.error) console.error('Sponsor admin notification failed:', adminSend.error)

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Sponsor API error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
