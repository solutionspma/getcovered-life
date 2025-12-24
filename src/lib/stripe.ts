import Stripe from 'stripe'

// Lazy initialization for build compatibility
let _stripe: Stripe | null = null

function getStripe(): Stripe {
  if (_stripe) return _stripe
  
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_live_your_key') {
    throw new Error('STRIPE_SECRET_KEY environment variable not configured')
  }
  
  _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    typescript: true,
  })
  return _stripe
}

// Export as getter for lazy initialization
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    const client = getStripe()
    const value = (client as unknown as Record<string, unknown>)[prop as string]
    return typeof value === 'function' ? value.bind(client) : value
  }
})

// Product IDs (set these in your Stripe dashboard)
export const PRODUCTS = {
  INSUROGRAM_BOOK: process.env.STRIPE_BOOK_PRICE_ID || 'price_xxx',
}

// Helper to create checkout session for book purchase
export async function createBookCheckoutSession(email: string, successUrl: string, cancelUrl: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price: PRODUCTS.INSUROGRAM_BOOK,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      product: 'insurogram-book',
    },
  })

  return session
}

// Verify webhook signature
export function verifyWebhookSignature(payload: Buffer, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}
