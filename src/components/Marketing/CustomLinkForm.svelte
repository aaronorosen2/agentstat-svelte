<script>
    import {createCustomLink} from '../../lib/api/marketing'
    export let cities = []
    export let data = {}
    export let complete 
    export let prefix

    let opt = 1
    let custom_link = ''

    function cleanSlug(str) {
        str = str.replace(/\s+/g,' ').trim();
        return str.replace(/ /g,"-");
    }

    let saving = false,
    error_city, error_address, error_zipcode, error_property

    function validInput(){
        error_address = error_city = error_zipcode = error_property = false
        if(!data.address_city){
            error_city = true
        }
        if(opt == 1){
            if(!data.street_address){
                error_address = true
            }
            if(!data.address_zipcode){
                error_zipcode = true
            }
        }
        if(!data.property_type){
            error_property = true
        }
        return !(error_zipcode||error_address||error_city||error_property)
    }

    async function save(){
        if(saving) return
        if(!validInput()) return
        saving = true
        data.slug = `${data.street_address}-${data.address_city}-${data.address_zipcode}`
        if(opt == 2){
            data.slug = data.address_city
        }
        data.slug = cleanSlug(data.slug)
        let res = await createCustomLink(data)
        if(res.slug){
            custom_link = prefix+'/'+res.slug
        }
        saving = false
        complete(data)
    }

</script>

{#if custom_link}
    <div class="custom-link--created">
        <i class="fas fa-check icon"></i>
        <h1>Custom link created Successfully</h1>
        <div class="text">{custom_link}</div>
    </div>
{:else}
    <div class="custom-link-form">
        <div class="subtitle">Create a unique landing page</div>
        <div class="steps">
            <div class="step">
                <div class="title">1. Select your search parameters</div>
                <div class="options">
                    <label class="option">
                        <input type="radio" value={1} bind:group={opt} >
                        Search Using address
                    </label>
                    <div class="inputs">
                        <input class="full" placeholder="Street address" class:err={error_address} bind:value={data.street_address}>
                        <div class="grp">
                            <select class:err={error_city&&opt==1} bind:value={data.address_city}>
                                <option value=''>Select City</option>
                                {#each cities as city}
                                    <option>{city}</option>
                                {/each}
                            </select>
                            <input placeholder="Zipcode" bind:value={data.address_zipcode} class:err={error_zipcode}>
                        </div>
                    </div>
                    <label class="option">
                        <input type="radio" value={2} bind:group={opt} >
                        Search Using city
                    </label>
                    <div class="inputs">
                        <select class:err={error_city&&opt==2} class="full" bind:value={data.address_city}>
                            <option>Select City</option>
                            {#each cities as city}
                                <option>{city}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
            <div class="step">
                <div class="title">2. Select your filters</div>
                <label class="label">Property Type</label>
                <select class="full" bind:value={data.property_type} class:err={error_property}>
                    <option value=''>Select Type</option>
                    <option>Single Family</option>
                    <option>Condo</option>
                    <option>Townhouse</option>
                    <option>Manufactured</option>
                    <option>Multi Family</option>
                    <option>Land</option>
                    <option>Apartment</option>
                    <option>Lot</option>
                </select>
            </div>
        </div>
        <div class="action">
            <button class="btn" class:disabled={saving} on:click={save}>Create Link</button>
        </div>
    </div>
{/if}
<style src="./custom-link-form.scss"></style>