<script>
     let inputValue = '';
 let outputValue = '';
 let error = null;

 async function generateDescription() {
   try {
     const response = await fetch("https://app.realtorstat.com/ai/generate-description/", {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ input_content: inputValue }),
     });

     if (response.ok) {
       const responseData = await response.json();
       outputValue = JSON.stringify(responseData);
       error = null;
     } else {
       error = new Error(`HTTP Error: ${response.status}`);
       outputValue = '';
     }
   } catch (err) {
     console.error("Error fetching data:", err);
     error = err;
     outputValue = '';
   }
 }
 </script>
<svelte:head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300&display=swap" rel="stylesheet">

</svelte:head>
<div class="main">
    <div class="left">
        <a href="index.html">
            <div class="back"> <i class="ri-arrow-left-s-line"></i></div>
        </a>
        <h1>LinkedIn Post</h1>
        <h4>Create a professional LinkdIn Post.</h4>
<div class="typearea">
<h1>Insert topic</h1>
<textarea type="textarea" maxlength="1000" data-required="no" data-id="1" bind:value={inputValue}></textarea>
<button on:click={generateDescription}><i class="ri-bard-fill"></i> Start Task</button>
</div>
    </div>
    <div class="right">
        {#if outputValue}
        <p id="OutputOfData">{outputValue}</p>
        {:else if error}
        <p id="OutputOfData">Error: {error.message}</p>
        {/if}
        </div>
</div>
<style src="../Scss/social-style.scss"></style>
