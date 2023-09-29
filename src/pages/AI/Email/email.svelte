<script>
  import { isAuthenticated } from "../../../lib/api/auth";
  let is_authenticated = isAuthenticated();

  let inputValue = "";
  let error = null;
  let paragraph = null; // Use a single paragraph instead of an array
  let editedText = "";
  let isLoading = false; // Add loading state

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
  <div class="left">
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
        <button id="ContinueBtn">Continue</button>
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
