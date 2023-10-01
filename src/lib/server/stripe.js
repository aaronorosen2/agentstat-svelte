import Stripe from 'stripe';
PUBLIC_STRIPE_KEY = 'pk_live_6nE4LbMc80WJmAD3PoVohLvM00KdBRzc1N'
SECRET_STRIPE_KEY = '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'
SECRET_STRIPE_WEBHOOK_KEY='whsec_cef8885af62421d37b006dd4f37a3e754f3935af5cca50b0976a40093b9e8f44'
DOMAIN='http://localhost:5000'

// Export the Stripe instance
export const stripe = new Stripe(SECRET_STRIPE_KEY, {
  apiVersion: '2022-11-15',
});