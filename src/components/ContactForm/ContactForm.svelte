<script>
    import states from '../../data/states'
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    export let data
    let error = false
    let submitting = false
    function submit(){
        if(submitting) return
        error = false
        if(data.name && data.phone && data.email && data.address && data.city && data.state && data.zip_code && data.message){
            submitting = true
            dispatch('submit')
        }else{
            error = true
        }
    }
</script>

<div class="contact-form">
    <h2 class="title">What is the best way for Marketplace Homes to reach you?</h2>
    <label>
        <span>Name:</span>
        <input class="input" placeholder="Name" bind:value={data.name} />
    </label>
    <label>
        <span>Phone:</span>
        <input class="input" placeholder="Phone Number" bind:value={data.phone} />
    </label>
    <label>
        <span>Email:</span>
        <input class="input" placeholder="Email" bind:value={data.email} />
    </label>
    <label>
        <span>Address:</span>
        <div>
            <input class="input input--full" placeholder="Street Address" bind:value={data.address} />
            <input class="input input--full" placeholder="City" bind:value={data.city} />
            <div class="flex">
                <select bind:value={data.state}>
                    {#each states as state}
                        <option value={state} selected={state=='WA'}>{state}</option>
                    {/each}
                </select>
                <input class="input input--full" placeholder="Zip Code" bind:value={data.zip_code} />
            </div>
        </div>
    </label>
    <label>
        <span>Notes:</span>
        <textarea class="input" placeholder="Message" rows="3" bind:value={data.message} />
    </label>
    {#if error}
        <div class="error">
            All fields are required
        </div>
    {/if}
    <button class="btn {submitting ? 'submitting':''}" on:click={submit}>{submitting ? 'Sending...':'Submit'}</button>
</div>

<style src="./contact-form.scss"></style>