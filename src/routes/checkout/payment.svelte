<!-- src/routes/checkout/payment.svelte -->
<script>
  import { PUBLIC_STRIPE_KEY } from '$env/static/public';
  import { onMount } from 'svelte';
  import { loadStripe } from '@stripe/stripe-js';
  import { Elements, PaymentElement } from 'svelte-stripe';

  export let data;

  let stripe;
  let elements;

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY);
  });

  async function submit() {
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error) {
      console.error(error);
    }
  }
</script>

<h1>Payment</h1>

{#if stripe}
  <form on:submit|preventDefault={submit}>
    <Elements {stripe} {clientSecret} bind:elements>
      <PaymentElement />
    </Elements>
    <button>Pay</button>
  </form>
{:else}
  Loading Stripe...
{/if}
