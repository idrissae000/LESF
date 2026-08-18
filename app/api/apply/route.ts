import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { JWT } from 'google-auth-library'
import { applyLimiter, checkRateLimit } from '@/lib/ratelimit'
import { checkOrigin } from '@/lib/csrf'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const APPLICATIONS_OPEN = false

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
  'Submitted At', 'First Name', 'Last Name', 'Email', 'Phone',
  'Address', 'Country', 'City', 'State/Province', 'ZIP',
  'School Name', 'Grade Level', 'Major', 'GPA', 'Graduation Year',
  'Essay File',
  'Transcript URL', 'Resume URL',
  'Extracurriculars',
  'Lives With Both Parents', 'Number of Siblings', 'Currently Works', 'Parent Occupations',
  'Attendance Confirmed',
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
                backgroundColor: { red: 0.039, green: 0.122, blue: 0.267 },
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

const MAX_PAYLOAD_BYTES = 35 * 1024 * 1024

export async function POST(request: NextRequest) {
  if (!APPLICATIONS_OPEN) {
    return NextResponse.json({ error: 'Applications are currently closed.' }, { status: 403 })
  }

  const badOrigin = checkOrigin(request)
  if (badOrigin) return badOrigin

  const limited = await checkRateLimit(applyLimiter, request)
  if (limited) return limited

  // Hard cap on total payload before buffering
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 413 })
  }

  try {
    const fd = await request.formData()
    const get = (k: string) => ((fd.get(k) as string | null) ?? '').replace(/<[^>]*>/g, '').trim()

    if (get('website')) {
      return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 400 })
    }

    const firstName        = get('firstName')
    const lastName         = get('lastName')
    const email            = get('email')
    const phone            = get('phone')
    const address          = get('address')
    const country          = get('country')
    const city             = get('city')
    const state            = get('state')
    const zip              = get('zip')
    const schoolName       = get('schoolName')
    const gradeLevel       = get('gradeLevel')
    const major            = get('major')
    const gpa              = get('gpa')
    const graduationYear   = get('graduationYear')
    const extracurriculars = get('extracurriculars')
    const householdParents = get('householdParents')
    const siblings         = get('siblings')
    const currentlyWorks   = get('currentlyWorks')
    const parentOccupations = get('parentOccupations')

    const essay2File     = fd.get('essay2')     as File | null
    const transcriptFile = fd.get('transcript') as File | null
    const resumeFile     = fd.get('resume')     as File | null

    if (!essay2File || !transcriptFile || !resumeFile) {
      return NextResponse.json({ error: 'Missing required files.' }, { status: 400 })
    }

    // Validate each file: PDF magic bytes, .pdf extension, 10 MB max
    const MAX_BYTES = 10 * 1024 * 1024
    const PDF_MAGIC = Buffer.from('%PDF')

    async function validatePDF(file: File): Promise<boolean> {
      if (!file.name.toLowerCase().endsWith('.pdf')) return false
      if (file.size > MAX_BYTES) return false
      const header = Buffer.from(await file.slice(0, 4).arrayBuffer())
      return header.equals(PDF_MAGIC)
    }

    const [e2Ok, tOk, rOk] = await Promise.all([
      validatePDF(essay2File),
      validatePDF(transcriptFile),
      validatePDF(resumeFile),
    ])

    if (!e2Ok || !tOk || !rOk) {
      return NextResponse.json({ error: 'Invalid file. Each upload must be a PDF under 10 MB.' }, { status: 400 })
    }

    const auth = getAuth()
    if (!auth) return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
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
          address, country, city, state, zip,
          schoolName, gradeLevel, major, gpa, graduationYear,
          essay2File.name,
          transcriptFile.name, resumeFile.name,
          extracurriculars,
          householdParents, siblings, currentlyWorks, parentOccupations,
          'Yes',
          'Yes', 'Yes', 'Submitted',
        ]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Apply API error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
