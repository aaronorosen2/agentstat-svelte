import { stripe } from '$lib/server/stripe';
import { redirect } from '@sveltejs/kit';

export const actions = {
  async post({ request, cookies }) {
    const form = await request.formData();
    const customer = await stripe.customers.create({
      email: "aaronorosen@gmail.com",
      name: "Aaron",
    });
       alert(customer.id)

    // set a cookie
    localStorage.setItem("customerId",customer.id )
   // cookies.set('customerId', customer.id)


   const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: "prod_Ok10uU1u9O9g1k",
      }
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
   })
    console.log(subscription)
      throw redirect(303, '/checkout/payment');
  },
};