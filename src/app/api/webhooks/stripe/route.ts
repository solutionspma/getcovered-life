import { NextRequest, NextResponse } from 'next/server'
import { stripe, verifyWebhookSignature } from '@/lib/stripe'
import { supabase, BookOrderInsert } from '@/lib/supabase'

// Force dynamic - don't try to build this route statically
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    )
  }

  let event

  try {
    event = verifyWebhookSignature(Buffer.from(payload), signature)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      
      if (session.metadata?.product === 'insurogram-book') {
        // Create download record
        const order: BookOrderInsert = {
          email: session.customer_email || '',
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent as string || null,
          amount: session.amount_total || 0,
          currency: session.currency || 'usd',
          status: 'completed',
          download_count: 0,
          download_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        }

        const { error } = await supabase
          .from('book_orders')
          .insert(order)

        if (error) {
          console.error('Error creating book order:', error)
        }

        // TODO: Send download email to customer
      }
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object
      console.log('Payment failed:', paymentIntent.id)
      // TODO: Handle failed payment
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
