import { stripe } from '$lib/server/stripe';
PUBLIC_STRIPE_KEY = 'pk_live_6nE4LbMc80WJmAD3PoVohLvM00KdBRzc1N'
SECRET_STRIPE_KEY = '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'
SECRET_STRIPE_WEBHOOK_KEY='whsec_cef8885af62421d37b006dd4f37a3e754f3935af5cca50b0976a40093b9e8f44'
DOMAIN='http://localhost:5000'

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
    returnUrl: new URL('/checkout/complete', DOMAIN).toString(),
  };
}