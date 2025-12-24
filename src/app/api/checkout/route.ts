import { NextRequest, NextResponse } from 'next/server'
import { createBookCheckoutSession } from '@/lib/stripe'

// Force dynamic - don't try to build this route statically
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const successUrl = `${baseUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/book?canceled=true`

    const session = await createBookCheckoutSession(
      data.email,
      successUrl,
      cancelUrl
    )

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
