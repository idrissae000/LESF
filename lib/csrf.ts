import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_ORIGINS = [
  'https://lonestareritreanscholars.com',
  'https://www.lonestareritreanscholars.com',
]

export function checkOrigin(request: NextRequest): NextResponse | null {
  // Allow in development
  if (process.env.NODE_ENV === 'development') return null

  const origin  = request.headers.get('origin')  ?? ''
  const referer = request.headers.get('referer') ?? ''

  const allowed = ALLOWED_ORIGINS.some(
    o => origin.startsWith(o) || referer.startsWith(o),
  )

  if (!allowed) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }
  return null
}
