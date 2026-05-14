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

    await Promise.all([
      resend.emails.send({
        from,
        to: 'ob.alkhaffaf@gmail.com',
        subject: `New Contact Message — ${subject}`,
        html: `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#1c1c1c;max-width:640px;margin:0 auto;padding:24px">
<h1 style="color:#1a3328;border-bottom:2px solid #c9973a;padding-bottom:8px">New Contact Message</h1>
<table style="width:100%;border-collapse:collapse;margin-top:16px">
  <tr><td style="padding:7px 0;color:#6b6b6b;width:120px">Name</td><td style="padding:7px 0"><strong>${name}</strong></td></tr>
  <tr><td style="padding:7px 0;color:#6b6b6b">Email</td><td style="padding:7px 0">${email}</td></tr>
  <tr><td style="padding:7px 0;color:#6b6b6b">Subject</td><td style="padding:7px 0">${subject}</td></tr>
</table>
<p style="margin-top:20px;color:#6b6b6b;font-weight:600">Message:</p>
<p style="background:#f0ebe1;padding:12px;border-left:3px solid #c9973a;line-height:1.75;white-space:pre-wrap">${message}</p>
</body></html>`,
      }),
      resend.emails.send({
        from,
        to: email,
        subject: `We received your message — Lonestar Eritrean Scholars Fund`,
        html: `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#1c1c1c;max-width:640px;margin:0 auto;padding:24px">
<h1 style="color:#1a3328;border-bottom:2px solid #c9973a;padding-bottom:8px">Message Received</h1>
<p>Hi ${name},</p>
<p>Thanks for reaching out. We received your message and will get back to you as soon as possible.</p>
<p style="color:#6b6b6b;font-size:13px;margin-top:32px">Questions? Reply to this email or contact us at <a href="mailto:ob.alkhaffaf@gmail.com">ob.alkhaffaf@gmail.com</a>.</p>
</body></html>`,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
