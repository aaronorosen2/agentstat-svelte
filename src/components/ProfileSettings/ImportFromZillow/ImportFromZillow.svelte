<script>
    import Loader from '../../Loader/Loader.svelte'
    export let link
    export let complete

    let loading = true
    let insert_link = false
    let zillowLink = ''
    let error = false
    let confirm = false

    function insertLink() {
        insert_link = true
    }

    function submitLink(){
        complete && complete(zillowLink||link)
    }

    function submitNewLink(){
        if(!zillowLink){
            error = true
            return
        }
        confirmSubmit()
    }

    function confirmSubmit(){
        confirm = true
    }

    function cancelConfirm(){
        confirm = false
    }

    setTimeout(()=> loading = false, 3000)
</script>

<div class="from-zillow">
    {#if loading}
        <Loader show={loading} text="Loading from zillow ..." />
    {:else if confirm}
        <div class="info">
            I authorize agentstat.com to screenshot and sync my reviews from my public zillow profile to be displayed on my agentstat.com profile.
        </div>
        <div class="control">
            <button class="btn btn-dark" on:click={cancelConfirm}>Cancel</button>
            <button class="btn btn-success" on:click={submitLink}>Accept</button>
        </div>
    {:else if insert_link}
        <div class="insert-link">
            <input class="input" class:input--error={error} placeholder="E.g. https://www.zillow.com/profile/mercedrealtor/" bind:value={zillowLink} />
            <span class="help">Provide your zillow profile link. It must be a zillow agent profile.</span>
            <button class="btn" on:click={submitNewLink}>Import Reviews</button>
        </div>
    {:else}
        <i class="fas fa-check icon"></i>
        <a href={link} target="_blank">
            {link}
        </a>
        <div class="info">
            Is this you ?
        </div>
        <div class="control">
            <button class="btn" on:click={confirmSubmit}>Yes</button>
            <button class="btn btn-dark" on:click={insertLink}>No</button>
        </div>
    {/if}
</div>

<style src="./import-from-zillow.scss"></style>