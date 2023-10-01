// src/routes/stripe/webhooks.js
import { stripe } from '$lib/server/stripe';
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function post({ request }) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, env.SECRET_STRIPE_WEBHOOK_KEY);
  } catch (err) {
    console.warn('⚠️  Webhook signature verification failed.', err.message);
    throw error(400, 'Invalid request');
  }

  switch (event.type) {
    // Handle various webhook events (e.g., customer.subscription.created, invoice.paid, etc.)
  }

  return json();
}