<script>
    import Stars from '../../Stars/Stars.svelte'
    import Pagination from '../../Pagination/Pagination.svelte'
    export let agent

    let limit = 3
    let current = 1
    $: offset = (current-1)*limit

    $: list_reviews = agent && agent.reviews && agent.reviews.slice(offset, offset+limit)
</script>

{#if agent && agent.reviews}
    <div class="reviews">
        {#each list_reviews as review}
            <div class="review">
                <div class="rating">
                    <Stars rating={review.rating} />
                </div>
                <h2>
                    {review.overall_rating_desc}
                </h2>
                <div class="date">
                    {review.date} - {review.full_name}
                </div>
                <div class="work">
                    {review.work_done}
                </div>

                <div class="details">
                    {#each review.detail.sort((a,b) => a.category-b.categoy) as detail}
                        <span>{detail.category_name}</span><Stars rating={detail.rating} small />
                    {/each}
                </div>

                <p class="body">
                    {review.review}
                </p>
            </div>
        {/each}
    </div>
    {#if agent.reviews.length>limit}
            <Pagination perPage={limit} numItems={agent.reviews.length+1} bind:current />
    {/if}
{/if}

<style src="./agent-review.scss"></style>