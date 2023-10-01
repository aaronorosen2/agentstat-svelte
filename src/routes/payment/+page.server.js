import { stripe } from '$lib/stripe'
import { env } from '$env/dynamic/private'

export async function load({ url, cookies }) {
  // pull customerId from cookie
  const customerId = cookies.get('customerId')
  // pull priceId from URL
  const priceId = url.searchParams.get('priceId')

  // create the subscription
  // status is `incomplete` until payment succeeds
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId
      }
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
  })

  return {
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    returnUrl: new URL('/checkout/complete', env.DOMAIN).toString()
  }
}