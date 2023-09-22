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
    <a href="index.html">
      <div class="back"><i class="ri-arrow-left-s-line" /></div>
    </a>
    <h1>Modern Home Redesign</h1>
    <h4>Transform any home interior image into a modern, clean design.</h4>
    <div class="typearea">
      <h4>Insert an image*</h4>
      <h6>Upload an image of an interior room</h6>
      <div class="upload">
        <div class="things">
          <i class="ri-upload-2-line" />
          <h4>Drop the file</h4>
          <h4>or click to upload</h4>
        </div>
      </div>
      <button><i class="ri-bard-fill" /> Start Task</button>
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
<style src="../Scss/photo.scss"></style>
