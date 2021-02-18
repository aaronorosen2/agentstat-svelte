<script>
    import states from '../../data/states'
    export let complete = null
    let error = false
    let submitting = false
    let agent = {
        name: '',
        license: '',
        email: '',
        phone: '',
        brokerage_name: '',
        street_address: '',
        city: '',
        state: 'WA',
        zip_code: ''
    }

    function requestProfile(){
        error = false
        for(let k in agent){
            if(!agent[k]){
                error = true
                return
            }
        }
        submitting = true
        complete && complete(agent)
    }
</script>

<div class="profile-form">
    <div class="head">
        Personal Information
    </div>
    <div class="personal">
        <input class="input" placeholder="Full Name" bind:value={agent.name}>
        <input class="input" placeholder="License" bind:value={agent.license}>
        <input class="input" placeholder="Email" bind:value={agent.email}>
        <input class="input" placeholder="Phone" bind:value={agent.phone}>
    </div>
    <div class="head">
        Brokerage Information
    </div>
    
    <input class="input" placeholder="Brokerage Name" bind:value={agent.brokerage_name}>
    <input class="input" placeholder="Street Address" bind:value={agent.street_address}>
    <div class="flex">
        <input class="input" placeholder="City" bind:value={agent.city}>
        <select bind:value={agent.state}>
            {#each states as state}
                <option value={state} selected={state=='WA'}>{state}</option>
            {/each}
        </select>
        <input class="input" placeholder="Zipcode" bind:value={agent.zip_code}>
    </div>
    {#if error}
        <div class="error">All fields are required!</div>
    {/if}
    <div class="center">
        <button class="btn" class:disabled={submitting} on:click={requestProfile}>{submitting ? 'Requesting...':'Request'}</button>
    </div>
</div>

<style src="./new-profile-form.scss"></style>