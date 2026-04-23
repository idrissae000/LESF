import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { businessName, contactName, email, phone, tier, message } = await request.json()

    const resend = new Resend(process.env.RESEND_API_KEY)
    const from   = process.env.RESEND_FROM_EMAIL ?? 'LESF <onboarding@resend.dev>'

    await resend.emails.send({
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

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Sponsor API error:', err)
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
