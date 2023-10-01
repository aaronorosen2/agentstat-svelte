<script>
    import { onMount } from 'svelte';
    import { Stripe, Elements, CardElement, useElements, useStripe } from '@stripe/svelte';
  
    // Initialize Stripe with your publishable key
    const stripePromise = Stripe('YOUR_PUBLISHABLE_KEY');
  
    let selectedPlan = 'basic'; // Initialize with your default plan
    let paymentMethod = null;
    let subscriptionStatus = '';
  
    const elements = useElements();
    const stripe = useStripe();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
  
      if (result.error) {
        subscriptionStatus = result.error.message;
      } else {
        paymentMethod = result.paymentMethod.id;
        // Send paymentMethod and selectedPlan to your server to create a subscription
        // Implement this server-side logic separately
      }
    };
  
    onMount(() => {
      stripePromise.then((stripe) => {
        // Use Stripe.js with Elements
      });
    });
  </script>
  
  <Elements stripe={stripePromise}>
    <form on:submit={handleSubmit}>
      <label for="subscription-plan">Choose a Subscription Plan:</label>
      <select bind:value={selectedPlan} id="subscription-plan">
        <option value="basic">Basic Plan ($10/month)</option>
        <option value="premium">Premium Plan ($20/month)</option>
      </select>
  
      <div id="card-element">
        <CardElement />
      </div>
  
      <button type="submit">Subscribe</button>
    </form>
  
    {#if subscriptionStatus}
      <p>{subscriptionStatus}</p>
    {/if}
  </Elements>
  
  <style>
    /* Add your CSS styles here */
  </style>
  