import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(_request: NextRequest) {
  return NextResponse.json({ error: 'Donations are currently unavailable.' }, { status: 503 })
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return NextResponse.json({ error: 'Donation processing is not configured.' }, { status: 500 })
  }

  try {
    const { amount } = await request.json()
    const cents = Math.round(Number(amount))
    if (!cents || cents < 100 || cents > 100_000_00) {
      return NextResponse.json({ error: 'Invalid donation amount.' }, { status: 400 })
    }

    const stripe = new Stripe(key)
    const origin = request.headers.get('origin') ?? 'https://lonestareritreanscholars.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Eritrean Scholars Fund Donation',
              description: '501(c)(3) tax-deductible charitable donation',
            },
            unit_amount: cents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/donate?success=true`,
      cancel_url: `${origin}/donate`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: 'Could not initiate checkout. Please try again.' }, { status: 500 })
  }
}
