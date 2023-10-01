<script>
  PUBLIC_STRIPE_KEY = 'pk_live_6nE4LbMc80WJmAD3PoVohLvM00KdBRzc1N'
SECRET_STRIPE_KEY = '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'
SECRET_STRIPE_WEBHOOK_KEY='whsec_cef8885af62421d37b006dd4f37a3e754f3935af5cca50b0976a40093b9e8f44'
DOMAIN='http://localhost:5000'

    import { onMount } from 'svelte'
    import { loadStripe } from '@stripe/stripe-js'
    import { Elements, PaymentElement } from 'svelte-stripe'
  
    // data from server
    export let data
  
    // destructure server data
    $: ({ returnUrl } = data)
  
    // Stripe instance
    let stripe
  
    // Stripe Elements instance
    let elements
  
    // when component mounts
    onMount(async () => {
      // load the Stripe client
      stripe = await loadStripe(PUBLIC_STRIPE_KEY)
    })
  
    // handle form submission
    async function submit() {
      // ask Stripe to confirm the payment
      const { error } = await stripe.confirmPayment({
        // pass instance that was used to create the Payment Element
        elements,
  
        // specify where to send the user when payment succeeeds
        confirmParams: {
          return_url: returnUrl
        }
      })
  
      if (error) {
        // handle error
        console.error(error)
      }
    }
  </script>
  
  <h1>Payment</h1>
  
  {#if stripe}
    <form on:submit|preventDefault={submit}>
      <!-- container for Stripe components -->
      <Elements {stripe} bind:elements>
  
        <!-- display payment related fields -->
        <PaymentElement />
      </Elements>
  
      <button>Pay</button>
    </form>
  {:else}
    Loading Stripe...
  {/if}