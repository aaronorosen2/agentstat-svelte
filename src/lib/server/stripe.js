import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

// Export the Stripe instance
export const stripe = new Stripe(env.SECRET_STRIPE_KEY, {
  apiVersion: '2022-11-15',
});