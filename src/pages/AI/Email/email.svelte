
<script>
  let PUBLIC_STRIPE_KEY = "pk_live_6nE4LbMc80WJmAD3PoVohLvM00KdBRzc1N";
  let STRIPE_SECRET_KEY ="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";
  import { isAuthenticated } from "../../../lib/api/auth";
  let is_authenticated = isAuthenticated();
  let inputValue = "";
  
  export let data

  // destructure server data
  $: ({ clientSecret, returnUrl } = data)

  let stripe;


  let error = null;
  let paragraph = null; // Use a single paragraph instead of an array
  let editedText = "";
  let isLoading = false; // Add loading state
  import { loadStripe } from "@stripe/stripe-js";
  import { onMount } from "svelte";
  import { redirect } from '@sveltejs/kit'
  import { Elements, PaymentElement } from 'svelte-stripe'

  import Stripe from 'stripe'

  onMount(async () => {
    // load the Stripe client
    stripe = await loadStripe(PUBLIC_STRIPE_KEY)
  })

let elements;

  onMount(async () => {
    const customer = await stripe.customers.create({
      email: "aaronorosen@gmail.com",
      name: "Aaron",
    })
  //  alert(customer.id)

    // set a cookie
    localStorage.setItem("customerId",customer.id )
   // cookies.set('customerId', customer.id)


   const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: "prod_OiZNxlpPgWuJnz"
      }
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
   })
    console.log(subscription)

    // redirect to collect payment
    ///throw redirect(303, '/checkout/payment')
  });
  async function generateDescription() {
    isLoading = true; // Show loading animation
    try {
      const response = await fetch(
        "https://app.realtorstat.com/ai/generate-description/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input_content: inputValue }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        paragraph = { text: JSON.stringify(responseData) }; // Assign the response to the single paragraph
        error = null;
      } else {
        error = new Error(`HTTP Error: ${response.status}`);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      error = err;
    } finally {
      isLoading = false; // Hide loading animation
    }
  }
  let showPopup = false;
  function togglePopup() {
    showPopup = !showPopup;
  }
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

<svelte:head>
  <meta charset="UTF-8" />
  <link
    href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
    rel="stylesheet"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="main">  
<h1>Payment</h1>

{#if stripe}
<form on:submit|preventDefault={submit}>
  <!-- container for Stripe components -->
  <Elements {stripe} {clientSecret} bind:elements>

    <!-- display payment related fields -->
    <PaymentElement />
  </Elements>

  <button>Pay</button>
</form>
{:else}
Loading Stripe...
{/if}
  <div class="left">koo
    <a href="/Ai">
      <div class="back"><i class="ri-arrow-left-s-line" /></div>
    </a>
    <h1>Email Generator</h1>
    <h4>Create persuasive emails to re-engage inactive buyers.</h4>
    <div class="typearea">
      <h3>Insert key points*</h3>
      <textarea
        type="textarea"
        maxlength="1000"
        data-required="no"
        data-id="1"
        bind:value={inputValue}
      />
      {#if is_authenticated}
        <button on:click={togglePopup}
          ><i class="ri-bard-fill" /> Start Task</button
        >
      {/if}
      {#if !is_authenticated}
        <button on:click={generateDescription}
          ><i class="ri-bard-fill" /> Start Task</button
        >
      {/if}
    </div>
  </div>
  <div class="right">
    {#if isLoading}
      <div class="animationContainer">
        <img
          src="https://cdn-images-1.medium.com/max/1200/1*bXQlVcrRxVkXnzgcVBGkOA.gif"
          alt=""
          class="LoadAnim"
        />
        <div class="loading-animation">Loading... Please wait</div>
      </div>
    {:else}
      {#if paragraph}
        <textarea id="OutputOfData">{paragraph.text}</textarea>
      {/if}
      {#if error}
        <textarea id="OutputOfData">Error: {error.message}</textarea>
      {/if}
    {/if}

    {#if showPopup}
      <div class="popup active">
        <button on:click={togglePopup} id="outBtn">x</button>
        <h1>$39/mo</h1>
        <p id="popupTittle">Get instant access</p>
        <a href="/checkout/payment"><button id="ContinueBtn">Continue</button></a>
        <div class="Gifts">
          <p>Unlimited usage</p>
          <p>Over 50 tools</p>
          <p>Image & text AI</p>
          <p>Cancel anytime</p>
        </div>
      </div>
    {/if}
  </div>
</div>

<style src="../Scss/social-style.scss"></style>
