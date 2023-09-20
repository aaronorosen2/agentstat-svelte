<script>
    import Rate from '../../Rate/Rate.svelte'
    import {addAgentReview} from '../../../lib/api/profile'

    export let complete
    let error = false

    let submitting = false
    let new_review = {
        source: 'zillow',
        categories: [
            { slug: "local-knowledge", rate: 5, name: "Local knowledge" },
            { slug: "process-expertise", rate: 5, name: "Process expertise" },
            { slug: "responsiveness", rate: 5, name: "Responsiveness" },
            { slug: "negotiation-skills", rate: 5, name: "Negotiation skills" },
        ],
        manual_create: true
    }

    async function createReview(){
        error = false
        new_review.rating = String((new_review.categories.reduce((a,b) => ({rate: a.rate+b.rate})).rate/4).toFixed(1))
        submitting = true
        try{
            let res = await addAgentReview(new_review)
            if(!res.agent)
                error = true
            else
                complete && complete()
        }catch(e){
            console.error(e)
        }
        submitting = false
    }
</script>

<div class="review-form">
    <div class="grid">
        <div>
            <label>Source</label>
            <select class="input" bind:value={new_review.source}>
                <option value="zillow">Zillow</option>
                <option value="yelp">Yelp</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div>
            <label>Full Name</label>
            <input class="input" placeholder="Enter Full Name" bind:value={new_review.full_name} />
        </div>
        <div>
            <label>Date</label>
            <input type="date" max={new Date().toISOString().split("T")[0]} class="input" bind:value={new_review.date} />
        </div>
        <div>
            <label>Overall Rating</label>
            <input class="input" placeholder="E.g. Highly likely to recommend" bind:value={new_review.overall_rating_desc} />
        </div>
    </div>
    
    <div class="mt">
        <label>Work Done</label>
        <input class="input" placeholder="E.g. Sold a Single Family home in 2017 in Pueblo, CO." bind:value={new_review.work_done} />
    </div>

    <div class="mt">
        <label>Review Description</label>
        <textarea rows="3" class="input" placeholder="Add review description ..." bind:value={new_review.review} />
    </div>


    <div class="grid-rates"> 
        {#each new_review.categories as cat,i}
            <span>{cat.name}</span> 
            <Rate value={cat.rate} afterRate={(r) => new_review.categories[i].rate=r} />
        {/each}
    </div>

    {#if error}
        <div class="error">All fields are required</div>
    {/if}

    <div class="control">
        <button class="btn" class:disabled={submitting} on:click={createReview}>{submitting ? 'Creating...':'Create'}</button>
    </div>

</div>


<style src="./review-form.scss"></style>