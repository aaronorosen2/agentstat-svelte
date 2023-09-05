<script>
    import Stars from '../Stars/Stars.svelte'
    export let reviews
</script>

<div class="review-details">
    {#if reviews.length > 0}
        {#each reviews as review}
        {review.category}
        <Stars rating={review.summary} small />
        {/each}
    {:else}
        <h1>Review Details Data Not coming</h1>
    {/if}
</div>

<style>
    .review-details{
        padding: 1rem;
        display: grid;
        grid-template-columns: auto auto;
        gap: 0.5rem;
    }
</style>