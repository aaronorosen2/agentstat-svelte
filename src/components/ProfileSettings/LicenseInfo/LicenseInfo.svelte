<script>
    import states from '../../../data/states'

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
            <input class="input" placeholder="Licence #" />
            <select class="input">
                <option >State</option>
                {#each states as state}
                    <option value={state} selected={state=='WA'}>{state}</option>
                {/each}
            </select>
            <input class="input" type="date" />
            <button class="btn btn-info">Add</button>
        </div>
    </div>

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