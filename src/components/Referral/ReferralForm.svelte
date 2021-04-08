<script>
    import SelectAgent from './SelectAgent.svelte'
    import states from "../../data/states"
    import Slider from 'svelte-slider'
    import { modal } from "../../stores/modal";

    export let complete 

    let ref = {
        referral_fee_percentage: 1,
        acceptance_deadline: 1,
        acceptance_deadline_nice: "1 hour",
        type: 'buyer',
        notes: ''
    }

    let err = {}
    let hasErr = false

    let deadline_index = 0

    function setFee(evt){
        let val = evt.detail[1]
        ref.referral_fee_percentage = Math.floor(val*100)
    }

    const deadlines = [1,3,6,12,24,48,3*24,7*24]
    const deadline_texts = ['1 hour', '3 hours','6 hours','12 hours', '24 hours', '48 hours', '3 days', '7 days']

    function setDeadLine(evt){
        let val = evt.detail[1]
        deadline_index = Math.floor(val*7)
        ref.acceptance_deadline = deadlines[deadline_index]
        ref.acceptance_deadline_nice = deadline_texts[deadline_index]
    }

    function next(){
        ref.price_min = getPrice(ref.price_min)
        ref.price_max = getPrice(ref.price_max)
        err = {
            first_name: !ref.first_name,
            last_name: !ref.last_name,
            email: !ref.email,
            phone: !ref.phone,
            street_address: !ref.street_address,
            city: !ref.city,
            zipcode: !ref.zipcode,
            price_min: !ref.price_min || isNaN(ref.price_min),
            price_max: !ref.price_max || isNaN(ref.price_max)
        }
        hasErr = Object.keys(err).map( k => err[k]).reduce((a,b) => a||b, false)
        if(!hasErr)
        $modal = {
                show: true,
                cmp: SelectAgent,
                complete,
                title: 'Send New Referral',
                props: {ref}
        }
    }

    function getPrice(val){
        return val && parseInt(val.replace(/[$\,]/g,''))
    }

    function setPriceFormat(e){
        let p = e.currentTarget.value.replace(/[$\,]/g,'')
        e.currentTarget.value = '$'+p.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    function normalizePhone(e) {
        let value = e.currentTarget.value
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        e.currentTarget.value = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 9)}`;
    }
</script>

<div class="ref-form">
    <div class="toggle">
        <div role="button" class="t-btn" class:selected={ref.type == 'seller'} on:click={()=> ref.type = 'seller'}>Seller</div>
        <div role="button" class="t-btn" class:selected={ref.type == 'buyer'} on:click={()=> ref.type = 'buyer'}>Buyer</div>
    </div>

    <div class="label">Client Contact Information</div>
    <div class="grid-2">
        <input type="text" class:err={err.first_name} placeholder="First Name" bind:value={ref.first_name}>
        <input type="text" class:err={err.last_name} placeholder="Last Name" bind:value={ref.last_name}>
    </div>
    <input type="text" class:err={err.email} placeholder="Email" bind:value={ref.email}>
    <input type="text" class:err={err.phone} on:input={normalizePhone} placeholder="Phone Number" bind:value={ref.phone}>

    <div class="label">Address</div>
    <input type="text" class:err={err.street_address} placeholder="Street Address" bind:value={ref.street_address}>
    <div class="grid-3">
        <input type="text" class:err={err.city} placeholder="City" bind:value={ref.city}>
        <select bind:value={ref.state}>
            {#each states as state}
                <option value={state}>{state}</option>
            {/each}
        </select>
        <input type="text" class:err={err.zipcode} placeholder="Zipcode" bind:value={ref.zipcode}>
    </div>

    <div class="grid-2">
        <div class="label">Price Min</div>
        <div class="label">Price Max</div>
        <input type="text" class:err={err.price_min} placeholder="Min" on:input={setPriceFormat} bind:value={ref.price_min}>
        <input type="text" class:err={err.price_max} placeholder="Max" on:input={setPriceFormat} bind:value={ref.price_max}>
    </div>

    <div class="label">Referral fee</div>
    <div class="flex">
        <div class="slider">
            <Slider on:change={setFee} value={[0, 0.01]} single />
        </div>
        <div class="label">
            {ref.referral_fee_percentage} %
        </div>
    </div>

    <div class="label">Acceptance Deadline</div>
    <div class="flex">
        <div class="slider">
            <Slider on:change={setDeadLine} value={[0, 0.01]} single />
        </div>
        <div class="label">
            {deadline_texts[deadline_index]} 
        </div>
    </div>

    <div class="label">Notes</div>
    <textarea rows="3" placeholder="Write a message" bind:value={ref.notes}></textarea>

    {#if hasErr}
        <div class="error">
            Please fill missing inputs
        </div>
    {/if}

    <div class="control">
        <button class="btn" on:click={next}>Next</button>
    </div>
</div>

<style src="./referral-form.scss"></style>