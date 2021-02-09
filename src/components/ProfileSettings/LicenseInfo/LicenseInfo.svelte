<script>
    import states from '../../../data/states'
    import Chips from '../../Chips/Chips.svelte'
    let licenses = []
    let newLicense = {}
    let licenseError = false
    function addLicense(){
        if (!(newLicense.number && newLicense.state && newLicense.exp)){
            licenseError = true
            return
        }
        licenseError = false
        licenses.push(`${newLicense.number} ${newLicense.state} - ${newLicense.exp}`)
        licenses = licenses
        newLicense = {state: newLicense.state}
    }
</script>

<div class="license-info">
    <label class="label-checkbox">
        <input type="checkbox">
        Allow to display Brokerage info on agent profile.
    </label>
    <div>
        <label class="label-input">
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

    <Chips bind:items={licenses} />

    <div>
        <label class="label-input">
            Brokerage Name
        </label>
        <input class="input" placeholder="Brokerage Name" />
    </div>

    <div>
        <label class="label-input">
            Brokerage Address
        </label>
        <input class="input" placeholder="Brokerage Address" />
    </div>

    <div>
        <label class="label-input">
            City, State, ZIP
        </label>
        <div class="flex">
            <input class="input" placeholder="City" />
            <select class="input">
                <option >State</option>
                {#each states as state}
                    <option value={state} selected={state=='WA'}>{state}</option>
                {/each}
            </select>
            <input class="input" placeholder="XXXXX" />
        </div>
    </div>

    <div class="reverse">
        <button class="btn">Save</button>
    </div>
</div>


<style src="./license-info.scss"></style>