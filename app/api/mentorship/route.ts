import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { JWT } from 'google-auth-library'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

function getAuth() {
  const sa = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!, 'base64').toString('utf-8')
  )
  return new JWT({
    email: sa.client_email,
    key: (sa.private_key as string).replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

const HEADERS = [
  'Submitted At', 'First Name', 'Last Name', 'City', 'State',
  'Profession', 'Employer', 'Degree', 'University/Institution',
  'Best Method of Contact', 'Email Address', 'LinkedIn',
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
                backgroundColor: { red: 0.102, green: 0.200, blue: 0.157 },
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
  try {
    const body = await request.json()
    const {
      firstName, lastName, city, state,
      profession, employer, degree, university,
      contactMethod, email, linkedin,
    } = body

    if (!firstName || !lastName || !city || !state || !profession ||
        !employer || !degree || !university || !contactMethod || !email) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const auth   = getAuth()
    const sheets = google.sheets({ version: 'v4', auth })
    const sheetId = process.env.GOOGLE_MENTOR_SHEET_ID!

    await ensureHeaders(sheets, sheetId)
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          firstName, lastName, city, state,
          profession, employer, degree, university,
          contactMethod, email, linkedin || '',
        ]],
      },
    })

    const resend = new Resend(process.env.RESEND_API_KEY)
    const from   = process.env.RESEND_FROM_EMAIL ?? 'LESF <onboarding@resend.dev>'

    await Promise.all([
      resend.emails.send({
        from,
        to: 'ob.alkhaffaf@gmail.com',
        subject: `New Mentor Application — ${firstName} ${lastName}`,
        html: `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#1c1c1c;max-width:640px;margin:0 auto;padding:24px">
<h1 style="color:#1a3328;border-bottom:2px solid #c9973a;padding-bottom:8px">New Mentor Application</h1>
<table style="width:100%;border-collapse:collapse;margin-top:16px">
  <tr><td style="padding:7px 0;color:#6b6b6b;width:200px">Full Name</td><td style="padding:7px 0"><strong>${firstName} ${lastName}</strong></td></tr>
  <tr><td style="padding:7px 0;color:#6b6b6b">Location</td><td style="padding:7px 0">${city}, ${state}</td></tr>
  <tr><td style="padding:7px 0;color:#6b6b6b">Profession</td><td style="padding:7px 0">${profession}</td></tr>
  <tr><td style="padding:7px 0;color:#6b6b6b">Employer</td><td style="padding:7px 0">${employer}</td></tr>
  <tr><td style="padding:7px 0;color:#6b6b6b">Degree</td><td style="padding:7px 0">${degree}</td></tr>
  <tr><td style="padding:7px 0;color:#6b6b6b">University / Institution</td><td style="padding:7px 0">${university}</td></tr>
  <tr><td style="padding:7px 0;color:#6b6b6b">Best Contact Method</td><td style="padding:7px 0">${contactMethod}</td></tr>
  <tr><td style="padding:7px 0;color:#6b6b6b">Email</td><td style="padding:7px 0">${email}</td></tr>
  <tr><td style="padding:7px 0;color:#6b6b6b">LinkedIn</td><td style="padding:7px 0">${linkedin || '—'}</td></tr>
</table>
</body></html>`,
      }),
      resend.emails.send({
        from,
        to: email,
        subject: 'Mentor Application Received — Lonestar Eritrean Scholars Fund',
        html: `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#1c1c1c;max-width:640px;margin:0 auto;padding:24px">
<h1 style="color:#1a3328;border-bottom:2px solid #c9973a;padding-bottom:8px">Application Received</h1>
<p>Hi ${firstName},</p>
<p>Thank you for applying to be a mentor with the Lonestar Eritrean Scholars Fund. We'll review your application and be in touch soon.</p>
<p>We're grateful for your willingness to give back and invest in the next generation of our community.</p>
<p style="color:#6b6b6b;font-size:13px;margin-top:32px">Questions? Reply to this email or contact us at <a href="mailto:ob.alkhaffaf@gmail.com">ob.alkhaffaf@gmail.com</a>.</p>
</body></html>`,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Mentorship API error:', err)
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
