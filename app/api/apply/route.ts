import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { JWT } from 'google-auth-library'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

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
  'Submitted At', 'First Name', 'Last Name', 'Email', 'Phone',
  'Address', 'City', 'State', 'ZIP',
  'School Name', 'Grade Level', 'Major', 'GPA', 'Graduation Year',
  'Essay 1', 'Essay 2',
  'Transcript URL', 'Resume URL', 'Writing Sample URL',
  'Extracurriculars', 'Volunteer Work',
  'Ref 1 Name', 'Ref 1 Title', 'Ref 1 Email', 'Ref 1 Phone',
  'Ref 2 Name', 'Ref 2 Title', 'Ref 2 Email', 'Ref 2 Phone',
  'Lives With Both Parents', 'Number of Siblings', 'Currently Works', 'Parent Occupations',
  'Eligibility Confirmed', 'Certified Accurate', 'Status',
]

async function formatSheet(sheets: ReturnType<typeof google.sheets>, spreadsheetId: string) {
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        // Freeze header row
        {
          updateSheetProperties: {
            properties: { sheetId: 0, gridProperties: { frozenRowCount: 1 } },
            fields: 'gridProperties.frozenRowCount',
          },
        },
        // Header: dark green bg, white bold text, centered
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
                wrapStrategy: 'WRAP',
              },
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,wrapStrategy)',
          },
        },
        // Set header row height to 48px for readability
        {
          updateDimensionProperties: {
            range: { sheetId: 0, dimension: 'ROWS', startIndex: 0, endIndex: 1 },
            properties: { pixelSize: 48 },
            fields: 'pixelSize',
          },
        },
        // Auto-resize all columns
        {
          autoResizeDimensions: {
            dimensions: { sheetId: 0, dimension: 'COLUMNS', startIndex: 0, endIndex: HEADERS.length },
          },
        },
      ],
    },
  })
}

async function ensureHeaders(sheets: ReturnType<typeof google.sheets>, spreadsheetId: string) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A1',
  })
  if (res.data.values?.length) return
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Sheet1!A1',
    valueInputOption: 'RAW',
    requestBody: { values: [HEADERS] },
  })
  await formatSheet(sheets, spreadsheetId)
}

export async function POST(request: NextRequest) {
  try {
    const fd = await request.formData()
    const get = (k: string) => (fd.get(k) as string | null) ?? ''

    const firstName         = get('firstName')
    const lastName          = get('lastName')
    const email             = get('email')
    const phone             = get('phone')
    const address           = get('address')
    const city              = get('city')
    const state             = get('state')
    const zip               = get('zip')
    const schoolName        = get('schoolName')
    const gradeLevel        = get('gradeLevel')
    const major             = get('major')
    const gpa               = get('gpa')
    const graduationYear    = get('graduationYear')
    const essay1            = get('essay1')
    const essay2            = get('essay2')
    const extracurriculars  = get('extracurriculars')
    const volunteerWork     = get('volunteerWork')
    const ref1Name   = get('ref1Name');  const ref1Title = get('ref1Title')
    const ref1Email  = get('ref1Email'); const ref1Phone = get('ref1Phone')
    const ref2Name   = get('ref2Name');  const ref2Title = get('ref2Title')
    const ref2Email  = get('ref2Email'); const ref2Phone = get('ref2Phone')
    const householdParents  = get('householdParents')
    const siblings          = get('siblings')
    const currentlyWorks    = get('currentlyWorks')
    const parentOccupations = get('parentOccupations')

    const transcriptFile    = fd.get('transcript')    as File | null
    const resumeFile        = fd.get('resume')        as File | null
    const writingSampleFile = fd.get('writingSample') as File | null

    if (!transcriptFile || !resumeFile || !writingSampleFile) {
      return NextResponse.json({ error: 'Missing required files.' }, { status: 400 })
    }

    // Convert files to buffers once — reused for Drive upload and email attachment
    const [transcriptBuf, resumeBuf, writingSampleBuf] = await Promise.all([
      transcriptFile.arrayBuffer().then(Buffer.from),
      resumeFile.arrayBuffer().then(Buffer.from),
      writingSampleFile.arrayBuffer().then(Buffer.from),
    ])

    const auth    = getAuth()
    const sheets  = google.sheets({ version: 'v4', auth })
    const sheetId = process.env.GOOGLE_SHEET_ID!

    await ensureHeaders(sheets, sheetId)
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          firstName, lastName, email, phone,
          address, city, state, zip,
          schoolName, gradeLevel, major, gpa, graduationYear,
          essay1, essay2,
          transcriptFile.name, resumeFile.name, writingSampleFile.name,
          extracurriculars, volunteerWork,
          ref1Name, ref1Title, ref1Email, ref1Phone,
          ref2Name, ref2Title, ref2Email, ref2Phone,
          householdParents, siblings, currentlyWorks, parentOccupations,
          'Yes', 'Yes', 'Submitted',
        ]],
      },
    })

    // Send emails — admin gets Drive links + PDF attachments, applicant gets confirmation
    const resend = new Resend(process.env.RESEND_API_KEY)
    const from   = process.env.RESEND_FROM_EMAIL ?? 'LESF Applications <onboarding@resend.dev>'

    await Promise.all([
      resend.emails.send({
        from,
        to: 'idriss.ae000@gmail.com',
        subject: `New Application — ${firstName} ${lastName}`,
        html: `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#1c1c1c;max-width:680px;margin:0 auto;padding:24px">
<h1 style="color:#1a3328;border-bottom:2px solid #c9973a;padding-bottom:8px">New Scholarship Application</h1>

<h2 style="color:#1a3328;margin-top:28px">Personal</h2>
<table style="width:100%;border-collapse:collapse">
  <tr><td style="padding:6px 0;color:#6b6b6b;width:180px">Full Name</td><td style="padding:6px 0"><strong>${firstName} ${lastName}</strong></td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Email</td><td style="padding:6px 0">${email}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Phone</td><td style="padding:6px 0">${phone}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Address</td><td style="padding:6px 0">${address}, ${city}, ${state} ${zip}</td></tr>
</table>

<h2 style="color:#1a3328;margin-top:28px">Education</h2>
<table style="width:100%;border-collapse:collapse">
  <tr><td style="padding:6px 0;color:#6b6b6b;width:180px">School</td><td style="padding:6px 0">${schoolName}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Grade Level</td><td style="padding:6px 0">${gradeLevel}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Major</td><td style="padding:6px 0">${major}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">GPA</td><td style="padding:6px 0">${gpa}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Graduation Year</td><td style="padding:6px 0">${graduationYear}</td></tr>
</table>

<h2 style="color:#1a3328;margin-top:28px">Essays</h2>
<p style="color:#6b6b6b;margin-bottom:4px"><strong>Question 1 — Leadership</strong></p>
<p style="background:#f0ebe1;padding:12px;border-left:3px solid #c9973a;line-height:1.7;white-space:pre-wrap">${essay1}</p>
<p style="color:#6b6b6b;margin-bottom:4px;margin-top:20px"><strong>Question 2 — Eritrean Identity &amp; Community</strong></p>
<p style="background:#f0ebe1;padding:12px;border-left:3px solid #c9973a;line-height:1.7;white-space:pre-wrap">${essay2}</p>

<h2 style="color:#1a3328;margin-top:28px">Uploads</h2>
<table style="width:100%;border-collapse:collapse">
  <tr><td style="padding:6px 0;color:#6b6b6b;width:180px">Transcript</td><td style="padding:6px 0">${transcriptFile.name}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Resume</td><td style="padding:6px 0">${resumeFile.name}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Writing Sample</td><td style="padding:6px 0">${writingSampleFile.name}</td></tr>
</table>
<p style="color:#6b6b6b;font-size:13px">All three PDFs are attached to this email.</p>

<h2 style="color:#1a3328;margin-top:28px">Optional</h2>
<table style="width:100%;border-collapse:collapse">
  <tr><td style="padding:6px 0;color:#6b6b6b;width:180px">Extracurriculars</td><td style="padding:6px 0">${extracurriculars || '—'}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Volunteer Work</td><td style="padding:6px 0">${volunteerWork || '—'}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Ref 1</td><td style="padding:6px 0">${ref1Name ? `${ref1Name}, ${ref1Title} — ${ref1Email} / ${ref1Phone}` : '—'}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Ref 2</td><td style="padding:6px 0">${ref2Name ? `${ref2Name}, ${ref2Title} — ${ref2Email} / ${ref2Phone}` : '—'}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Lives With Both Parents</td><td style="padding:6px 0">${householdParents || '—'}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Siblings</td><td style="padding:6px 0">${siblings || '—'}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Currently Works</td><td style="padding:6px 0">${currentlyWorks || '—'}</td></tr>
  <tr><td style="padding:6px 0;color:#6b6b6b">Parent Occupations</td><td style="padding:6px 0">${parentOccupations || '—'}</td></tr>
</table>
</body></html>`,
        attachments: [
          { filename: transcriptFile.name,    content: transcriptBuf },
          { filename: resumeFile.name,        content: resumeBuf },
          { filename: writingSampleFile.name, content: writingSampleBuf },
        ],
      }),
      resend.emails.send({
        from,
        to: email,
        subject: 'Application Received — Lonestar Eritrean Scholars Fund',
        html: `
          <h2>Thank you for applying, ${firstName}!</h2>
          <p>We have received your application for the Lonestar Eritrean Scholars Fund scholarship.</p>
          <p>Winners will be announced on <strong>August 2, 2025</strong>.</p>
          <p>Questions? Email <a href="mailto:idriss.ae000@gmail.com">idriss.ae000@gmail.com</a>.</p>
        `,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Apply API error:', err)
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
