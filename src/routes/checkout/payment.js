import { stripe } from '$lib/server/stripe';
import { env } from '$env/dynamic/private';

export async function load({ url, cookies }) {
  const customerId = cookies.get('customerId');
  const priceId = url.searchParams.get('priceId');
  
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });

  return {
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    returnUrl: new URL('/checkout/complete', env.DOMAIN).toString(),
  };
}