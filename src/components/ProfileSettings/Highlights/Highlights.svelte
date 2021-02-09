<script>
    import Chips from '../../Chips/Chips.svelte'
    const specialties = ["Listing Agent","Buyer's Agent","Relocation","Short Sale","Commercial R.E.","Property Manager", "Other"]
    const langs = ["Spanish","French","Mandarin","Russian","Cantonese","Hindi","Arabic","Japanese","German","Vietnamese","Korean","Italian","Thai","Farsi","Turkish","Portuguese","Bengali","Greek","Hebrew","Hungarian","Tagalog (Filipino)","Polish","Punjabi","Urdu"]

    const cy = (new Date()).getFullYear()

    let selectedSp = []
    let hasOtherSp = false
    let otherSp = []
    let newSpecialty = ''

    function toggleSpecialty(i){
        let index = selectedSp.indexOf(specialties[i])
        console.log("TOGGLE SPECIALTY --> ", specialties[i])
        console.log("HAS OTHER SP --> ", hasOtherSp)
        if(~index){
            selectedSp.splice(index,1)
        }else{
            selectedSp.push(specialties[i])
        }
        if(specialties[i] == 'Other'){
            hasOtherSp = !hasOtherSp
        }
        // selectedSp = selectedSp
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
    <select class="input">
        {#each [...Array(21).keys()] as n}
            <option value={cy-n}>{cy-n}</option>
        {/each}
        <option value="before {cy-20}">Before {cy-20}</option>
    </select>

    <label class="label-input">Specialties</label>
    <div class="grid">
        {#each specialties as sp,i}
            <label >
                <input type="checkbox" on:click={() => toggleSpecialty(i)} />
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
        {#each langs as sp}
            <label>
                <input type="checkbox" />
                {sp}
            </label>
        {/each}
    </div>
    <div class="reverse">
        <button class="btn">Save</button>
    </div>
</div>

<style src="./highlights.scss"></style>