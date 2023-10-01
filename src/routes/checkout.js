import { stripe } from '$lib/server/stripe';
import { redirect } from '@sveltejs/kit';

export const actions = {
  async post({ request, cookies }) {
    const form = await request.formData();
    const customer = await stripe.customers.create({
      email: form.get('email'),
      name: form.get('name'),
    });
    cookies.set('customerId', customer.id);
    throw redirect(303, '/checkout/payment');
  },
};