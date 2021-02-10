<script>
    import Chips from '../../Chips/Chips.svelte'
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function save() {
        agent.other_speciality_note = JSON.stringify(otherSp)
        dispatch("save");
    }
    // ids are copied from old ui!
    const specialties = [[7,"Listing Agent"],[1,"Buyer's Agent"],[2,"Relocation"],[3,"Short Sale"],[4,"Commercial R.E."],[5,"Property Manager"], [6,"Other"]]
    const langs = [[1,"Spanish"],[2,"French"],[3,"Mandarin"],[6,"Russian"],[7,"Cantonese"],[8,"Hindi"],[9,"Arabic"],[10,"Japanese"],[11,"German"],[12, "Vietnamese"],[13, "Korean"],[14, "Italian"],[15, "Thai"],[16,"Farsi"],[17,"Turkish"],[18,"Portuguese"],[19,"Bengali"],[20,"Greek"],[21,"Hebrew"],[22,"Hungarian"],[23, "Tagalog (Filipino)"],[24,"Polish"],[25,"Punjabi"],[26, "Urdu"]]

    const cy = (new Date()).getFullYear()
    export let agent
    export let saving
    
    agent.specialties = agent.specialties || []
    let otherSp = JSON.parse(agent.other_speciality_note||false) || []
    let hasOtherSp = Object.values(agent.specialties).includes(6)
    let newSpecialty = ''

    function spIds(){
        return specialties.map(s => s[0])
    }

    function toggleSpecialty(id){
        let index = agent.specialties.indexOf(id)
        if(~index){
            agent.specialties.splice(index,1)
        }else{
            agent.specialties.push(id)
        }
        if(id == 6){
            hasOtherSp = !hasOtherSp
        }
    }

    function addOtherSp(){
        if(newSpecialty){
            otherSp = otherSp.concat([newSpecialty])
        }
        newSpecialty = ''
    }

    function keyAddOtherSp(e){
        if(e.keyCode == 13){
            addOtherSp()
        }
    }

</script>

<div class="highlights">
    <label class="label-input">
        In Business Since
    </label>
    <select class="input" bind:value={agent.years_in_bussiness}>
        {#each [...Array(21).keys()] as n}
            <option value={cy-n} selected={agent.years_in_bussiness==cy-n}>{cy-n}</option>
        {/each}
        <option value="before {cy-20}">Before {cy-20}</option>
    </select>

    <label class="label-input">Specialties</label>
    <div class="grid">
        {#each specialties as [id,sp],i}
            <label >
                <input type="checkbox" checked={Object.values(agent.specialties).includes(id)}  on:click={() => toggleSpecialty(id)} />
                {sp}
            </label>
        {/each}
    </div>

    {#if hasOtherSp}
        <div class="other-sp">
            <div class="flex">
                <input class="input" placeholder="Other Specialty" bind:value={newSpecialty} on:keyup={keyAddOtherSp}/>
                <button class="btn btn-info" on:click={addOtherSp}>Add</button>
            </div>
            <Chips bind:items={otherSp} />
        </div>
    {/if}

    <label class="label-input">Language Fluency</label>
    <div class="grid">
        {#each langs as [id,lang]}
            <label>
                <input type="checkbox" value={id} bind:group={agent.language_fluencies} />
                {lang}
            </label>
        {/each}
    </div>
    <div class="reverse">
        <button class="btn" class:disabled={saving} on:click={save}>{saving ? 'Saving...':'Save'}</button>
    </div>
</div>

<style src="./highlights.scss"></style>