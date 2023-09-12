<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
    export let placeholder="Search Address"
    export let optionType = "address" // or "(cities)"
    export let value = ""

    let inputNode
    let search_data = {}

    function initMapSearch() {
        
        let options = {
            types: [optionType],
            componentRestrictions: {country: "us"},
        }

        let autocomplete = new google.maps.places.Autocomplete(inputNode, options);
        autocomplete.addListener('place_changed', fillIn);
    }

    function fillIn() {
        let place = this.getPlace();
        let addr = place.formatted_address
        search_data = {
            street_address: '',
            state: '',
            city: '',
            zip_code: ''
        }
        search_data['street_address'] = place.formatted_address
        if(place.address_components){
            for(let address_comp of place.address_components) {
                if (address_comp.types[0] === "administrative_area_level_1") {
                    search_data['state'] = address_comp.short_name
                }
                if (address_comp.types[0] === 'locality') {
                    search_data['city'] = address_comp.short_name
                }
                if (address_comp.types[0] === 'postal_code') {
                    search_data['zip_code'] = address_comp.short_name
                }
            }
        }


        dispatch('select', search_data)
    }

    $: if(optionType && inputNode){
        if(inputNode){
            initMapSearch()
            if(optionType == '(cities)'){
                placeholder = "Search City"
            }
            if(optionType == 'address'){
                placeholder = "Search Address"
            }
        }
    }

</script>

<div class="autocomplete-address">
    <input type="search" class="input" {value} {placeholder} bind:this={inputNode} />
</div>

<style src="./auto-complete-address.scss"></style>