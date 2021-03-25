<script>
    import {updateTransaction} from '../../lib/api/sales'
    import states from '../../data/states-full'
    export let tr = {}
    export let complete = null
    let errors = {}
    let saving= false
    async function saveTransaction(){
        if(saving) return
        errors = {
            address: !tr.address_text,
            city: !tr.city,
            zipcode: !tr.zipcode,
            list_date: !tr.list_date,
            sold_date: !tr.sold_date,
            list_price_int: !tr.list_price_int,
            sold_price_int: !tr.sold_price_int
        }

        const isNotValid = Object.values(errors).reduce((a,b) => a||b, false)
        
        if(isNotValid) return
        let trans = {...tr}
        let ld = new Date(trans.list_date)
        let sd = new Date(trans.sold_date)
        if(!trans.id){
            trans.record_status = "new"
            trans.id = null
            trans.latitude = null
            trans.longitude = null
            trans.old_list_data = null
        }
        const opts = {month: "2-digit",day: "2-digit", year: "2-digit"}
        trans.list_date = ld.toLocaleDateString("en-US", opts)
        trans.sold_date = sd.toLocaleDateString("en-US", opts)
        saving = true
        await updateTransaction(trans)
        saving = false

        complete && complete({new: !trans.id})
    }

</script>

<div class="transaction-form">
    <div class="title">1. Required Information</div>
    <input bind:value={tr.address_text} placeholder="Street Address" type="text" class:err={errors.address}>
    <div class="grid-3">
        <input bind:value={tr.city} placeholder="City" type="text" class:err={errors.city}>
        <select bind:value={tr.state}>
            {#each states as state}
                <option value={state.value}>{state.label}</option>
            {/each}
        </select>
        <input bind:value={tr.zipcode} placeholder="Zipcode" type="text" class:err={errors.zipcode}>
    </div>
    <div class="grid-2">
        <select bind:value={tr.home_type}>
            <option value="SINGLE_FAMILY" selected="">Single Family</option>
            <option value="CONDOMINIUM">Condominium</option>
            <option value="TOWNHOUSE">Townhouse</option>
            <option value="LAND">Land</option>
            <option value="MANUFACTURED">Manufactured</option>
            <option value="MULTI_FAMILY">Multi-family</option>
        </select>
        <select bind:value={tr.represented}>
            <option>Seller</option>
            <option>Buyer</option>
            <option>Both</option>
        </select>

        <div class="label">Listing Date</div>
        <div class="label">Sold Date</div>

        <input bind:value={tr.list_date} type="date" max={new Date().toISOString().split("T")[0]} class:err={errors.list_date}>
        <input bind:value={tr.sold_date} type="date" max={new Date().toISOString().split("T")[0]} class:err={errors.sold_date}>

        <div class="label">Listing Price (int)</div>
        <div class="label">Sold Price (int)</div>

        <input bind:value={tr.list_price_int} type="number" placeholder="Listing Price" class:err={errors.list_price_int}>
        <input bind:value={tr.sold_price_int} type="number" placeholder="Sold Price" class:err={errors.sold_price_int}>
    </div>

    <div class="title">2. Optional Details</div>
    <div class="grid-2">
        <div>
            <select bind:value={tr.beds}>
                <option value="">Select Bedrooms</option>
                {#each new Array(14) as b,i}
                    <option value={String(i+1)}>{i+1}</option>
                {/each}
            </select>
            <select bind:value={tr.baths}>
                <option value="">Select Bathrooms</option>
                {#each new Array(14) as b,i}
                    <option value={String((i+1)/2)}>{(i+1)/2}</option>
                {/each}
            </select>
            <input type="text" placeholder="Other Agent Name">
        </div>
        <div>
            <div class="subtitle">
                Transaction Details
            </div>
            <label>
                <input type="checkbox"> REO
            </label>
            <label>
                <input type="checkbox"> Foreclosure
            </label>
            <label>
                <input type="checkbox"> Short Sale
            </label>
            <input type="text" placeholder="Other Agent Licence #">
        </div>
    </div>
    <div class="control">
        <button class="btn" class:disabled={saving} on:click={saveTransaction}>Save Transaction {saving ? '...':''}</button>
    </div> 
</div>

<style src="./transaction-form.scss"></style>