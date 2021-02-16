<script>
    import states from '../../data/states'
    export let complete = null
    let agent = {}
    function requestProfile(){
        complete && complete(agent)
    }
</script>

<div class="profile-form">
    <div class="head">
        Personal Information
    </div>
    <div class="personal">
        <input class="input" placeholder="Full Name">
        <input class="input" placeholder="License">
        <input class="input" placeholder="Email">
        <input class="input" placeholder="Phone">
    </div>
    <div class="head">
        Brokerage Information
    </div>
    
    <input class="input" placeholder="Brokerage Name">
    <input class="input" placeholder="Street Address">
    <div class="flex">
        <input class="input" placeholder="City">
        <select>
            {#each states as state}
                <option value={state} selected={state=='WA'}>{state}</option>
            {/each}
        </select>
        <input class="input" placeholder="Zipcode">
    </div>

    <button class="btn" on:click={requestProfile}>Request</button>
</div>

<style src="./new-profile-form.scss"></style>