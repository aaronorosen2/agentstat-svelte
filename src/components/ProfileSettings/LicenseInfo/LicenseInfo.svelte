<script>
    import states from '../../../data/states'
    import Chips from '../../Chips/Chips.svelte'
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    
    function save() {
        dispatch("save");
    }

    export let agent
    export let saving
    let newLicense = {}
    let licenseError = false
    agent.licenses = agent.licenses || []
    function addLicense(){
        if (!(newLicense.number && newLicense.state && newLicense.exp)){
            licenseError = true
            return
        }
        licenseError = false
        agent.licenses.push(`${newLicense.number} ${newLicense.state} - ${newLicense.exp}`)
        agent.licenses = agent.licenses
        newLicense = {state: newLicense.state}
    }
</script>

<div class="license-info">
    <label class="label-checkbox">
        <input type="checkbox" bind:checked={agent.show_brokerage_info}>
        Allow to display Brokerage info on agent profile.
    </label>
    <div>
        <label class="label-input" for="License Number">
            License Number
        </label>
        <div class="flex">
            <input class="input" class:inp-error={licenseError && !newLicense.number} bind:value={newLicense.number} placeholder="Licence #" />
            <select class="input" bind:value={newLicense.state}>
                {#each states as state}
                    <option value={state} selected={state=='WA'}>{state}</option>
                {/each}
            </select>
            <input class="input" class:inp-error={licenseError && !newLicense.exp} type="date" bind:value={newLicense.exp} />
            <button class="btn btn-info" on:click={addLicense}>Add</button>
        </div>
    </div>

    <Chips bind:items={agent.licenses} />

    <div>
        <label class="label-input" for="Brokerage Name">
            Brokerage Name
        </label>
        <input class="input" placeholder="Brokerage Name" bind:value={agent.brokerage_name} />
    </div>

    <div>
        <label class="label-input" for="Brokerage Address">
            Brokerage Address
        </label>
        <input class="input" placeholder="Brokerage Address" bind:value={agent.brokerage_address} />
    </div>

    <div>
        <label class="label-input" for="City">
            City, State, ZIP
        </label>
        <div class="flex">
            <input class="input" placeholder="City" bind:value={agent.city} />
            <select class="input" bind:value={agent.state}>
                <option >State</option>
                {#each states as state}
                    <option value={state} selected={state=='WA'}>{state}</option>
                {/each}
            </select>
            <input name="zip_code" class="input" placeholder="XXXXX" bind:value={agent.zipcode} />
        </div>
    </div>

    <div class="reverse">
        <button class="btn" class:disabled={saving} on:click={save}>{saving ? 'Saving...':'Save'}</button>
    </div>
</div>


<style src="./license-info.scss"></style>