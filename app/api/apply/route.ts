import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { JWT } from 'google-auth-library'
import { Resend } from 'resend'
import { Readable } from 'stream'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

function getAuth() {
  const sa = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!, 'base64').toString('utf-8')
  )
  return new JWT({
    email: sa.client_email,
    key: (sa.private_key as string).replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })
}

function bufferToStream(buf: Buffer): Readable {
  const stream = new Readable()
  stream.push(buf)
  stream.push(null)
  return stream
}

async function uploadToDrive(
  drive: ReturnType<typeof google.drive>,
  folderId: string,
  buf: Buffer,
  name: string,
): Promise<string> {
  const res = await drive.files.create({
    requestBody: { name, parents: [folderId] },
    media: { mimeType: 'application/pdf', body: bufferToStream(buf) },
    fields: 'id',
  })
  const fileId = res.data.id!
  await drive.permissions.create({
    fileId,
    requestBody: { role: 'reader', type: 'anyone' },
  })
  return `https://drive.google.com/file/d/${fileId}/view`
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

    const auth     = getAuth()
    const drive    = google.drive({ version: 'v3', auth })
    const sheets   = google.sheets({ version: 'v4', auth })
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID!
    const sheetId  = process.env.GOOGLE_SHEET_ID!
    const safeName = `${firstName}_${lastName}`.replace(/\s+/g, '_')

    // Upload to Drive — get shareable links for the sheet
    const [transcriptUrl, resumeUrl, writingSampleUrl] = await Promise.all([
      uploadToDrive(drive, folderId, transcriptBuf,    `${safeName}_transcript.pdf`),
      uploadToDrive(drive, folderId, resumeBuf,        `${safeName}_resume.pdf`),
      uploadToDrive(drive, folderId, writingSampleBuf, `${safeName}_writing_sample.pdf`),
    ])

    // Append row to Sheet with Drive links
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
          transcriptUrl, resumeUrl, writingSampleUrl,
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
        html: `
          <h2>New Scholarship Application</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>School:</strong> ${schoolName}</p>
          <p><strong>GPA:</strong> ${gpa}</p>
          <hr />
          <p><strong>Transcript:</strong> <a href="${transcriptUrl}">${transcriptUrl}</a></p>
          <p><strong>Resume:</strong> <a href="${resumeUrl}">${resumeUrl}</a></p>
          <p><strong>Writing Sample:</strong> <a href="${writingSampleUrl}">${writingSampleUrl}</a></p>
        `,
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
