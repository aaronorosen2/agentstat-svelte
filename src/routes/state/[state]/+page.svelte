<script>
  import { goto } from "$app/navigation";
  import { city, state } from "../../../stores/homes";
  import { page } from "$app/stores";

  export let data;
  const gotoResult = (tempCity) => {
    $city = tempCity;
    $state = $page.params.state;
    goto("/allhomes");
  };
</script>

<div
  class="bg-blue-100 py-16 flex justify-center items-center min-h-screen h-full"
>
  <div>
    <div class="flex justify-between items-center">
      <p class="text-lg font-bold text-blue-700 mb-4">
        Search for homes by Cities
      </p>
      <p
        on:click={() => goto(`/allhomes`)}
        class="text-lg font-bold text-blue-700 mb-4 cursor-pointer"
      >
        Go To Home
      </p>
    </div>
    <div class="grid grid-cols-5 gap-2">
      {#each data?.allCities as city}
        <p
          on:click={() => gotoResult(city)}
          class="text-sm text-blue-700 pr-20 cursor-pointer"
        >
          {city}
        </p>
      {/each}
    </div>
  </div>
</div>
