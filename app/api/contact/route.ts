import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactLimiter, checkRateLimit } from '@/lib/ratelimit'
import { checkOrigin } from '@/lib/csrf'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const badOrigin = checkOrigin(request)
  if (badOrigin) return badOrigin

  const limited = await checkRateLimit(contactLimiter, request)
  if (limited) return limited

  try {
    const body = await request.json()
    const san = (v: unknown) => (typeof v === 'string' ? v.replace(/<[^>]*>/g, '').trim() : '')

    if (san(body.website)) {
      return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 400 })
    }

    const name    = san(body.name)
    const email   = san(body.email)
    const subject = san(body.subject)
    const message = san(body.message)

    const resend = new Resend(process.env.RESEND_API_KEY)
    const from   = process.env.RESEND_FROM_EMAIL ?? 'LESF <onboarding@resend.dev>'

    await resend.emails.send({
      from,
      to: 'ob.alkhaffaf@gmail.com',
      subject: `Contact Form — ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
