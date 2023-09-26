<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let current = 1;
  export let numItems;
  export let perPage;
  let arr_pages = [];

  $: num_pages = Math.ceil(numItems / perPage);

  function buildArr(c, n) {
    if (n <= 7) {
      return [...Array(n)].map((_, i) => i + 1);
    } else {
      if (c < 3 || c > n - 2) {
        return [1, 2, 3, '...', n - 2, n - 1, n];
      } else {
        return [1, '...', c - 1, c, c + 1, '...', n];
      }
    }
  }

  function setArrPages() {
    arr_pages = buildArr(current, num_pages);
  }

  $: if (current) {
    setArrPages();
  }

  $: if (perPage) {
    setArrPages();
    current = 1;
  }

  $: if (numItems) {
    num_pages = Math.ceil(numItems / perPage);
    setArrPages();
    current = current || 1;
  }

  function setCurrent(i) {
    if (isNaN(i)) return;
    current = i;
    dispatch('navigate', current);
  }
  
  function handleKeyDown() {}
</script>

{#if numItems}
    <div class="pagination">
    <div
        class="pagination--control {current > 1 ? 'pagination--pointer' : 'pagination--fade'}"
        on:click={() => current > 1 && setCurrent(current - 1)} on:keydown={handleKeyDown}>
        <i class="fas fa-chevron-left" />
    </div>
    <div class="pagination--numbers">
        {#each arr_pages as i}
        <div
            class="pagination--number {i == current ? 'pagination--current' : ''}"
            on:click={() => setCurrent(i)} on:keydown={handleKeyDown}>
            {i}
        </div>
        {/each}
    </div>
    <div
        class="pagination--control {current < num_pages ? 'pagination--pointer' : 'pagination--fade'}"
        on:click={() => current < num_pages && setCurrent(current + 1)} on:keydown={handleKeyDown}>
        <i class="fas fa-chevron-right" />
    </div>
    </div>
{/if}
<style src="./pagination.scss">
</style>
