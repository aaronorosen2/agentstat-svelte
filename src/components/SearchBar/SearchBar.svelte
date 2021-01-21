<script>
    import Dropdown from '../Dropdown/Dropdown.svelte'
    import AutoCompleteAddress from '../AutoCompleteAddress/AutoCompleteAddress.svelte'
    import SearchInput from '../SearchInput/SearchInput.svelte'
    import {createEventDispatcher} from 'svelte'
    import {fetchStates} from '../../lib/api'

    const dispatch = createEventDispatcher()
    export let filter = {agent_name: "", filter_by: 'address'}
    let errorState = false

    const SearchBy = [
        {
            label: 'Address', value: 'address'
        },
        {
            label: 'Agent Name', value: 'agent_name'
        },
        {
            label: 'City', value: 'city'
        }
    ]

    const HomeTypes = [
        { 
            label: 'Houses', value: 'SINGLE_FAMILY'
        },
        { 
            label: 'Manufactured', value: 'MANUFACTURED'
        },
        { 
            label: 'Condos/co-ops', value: 'CONDO'
        },
        { 
            label: 'Multi-family', value: 'MULTI_FAMILY'
        },
        { 
            label: 'Lots/Land', value: 'LOT'
        },
        { 
            label: 'Townhomes', value: 'TOWNHOUSE'
        }
    ]

    let optionTypes = {
        address: "address",
        city: "(cities)"
    }

    let listStates = ['States']

    function val(opt){
        return opt.value || opt
    }

    async function selectFilter(evt){
        filter.filter_by = val(evt.detail)
        errorState = false
        if(filter.filter_by == 'agent_name' && listStates.length<2){
            listStates = ['States'].concat(await fetchStates())
            filter.home_type = ""
            filter.city = ""
            filter.address = ""
        }else{
            filter.agent_name = ""
        }
    }

    function selectState(evt){
        filter.state = val(evt.detail)
        errorState = false
        // show other dropdowns
    }

    function selectAddress(evt){
        errorState= false
        filter = {...filter,...evt.detail}
        search()
    }

    function selectHomeType(evt){
        filter = {...filter, home_type: val(evt.detail)}
        
    }

    function search(){
        if(!filter.state || filter.state == "States"){
            errorState = true
            return
        }
        dispatch('search', filter)
    }
</script>

<div class="search-bar">
    <Dropdown  options={SearchBy} on:select={selectFilter} radius="left" border={filter.filter_by == 'agent_name' ? "left":"both"} ></Dropdown>
    {#if filter.filter_by == 'agent_name'}
        <Dropdown options={listStates} error={errorState} selected={filter.state} on:select={selectState} radius="none" ></Dropdown>
        <SearchInput bind:value={filter.agent_name} on:search={search} />
    {:else}
        <AutoCompleteAddress on:select={selectAddress} optionType={optionTypes[filter.filter_by]}  />
        <Dropdown options={HomeTypes} on:select={selectHomeType} radius="none" border="left" ></Dropdown>
    {/if}
    <div role="button" class="search-bar--btn" on:click={search}>
        <i class="fas fa-search"></i>
    </div>
</div>

<style src="./search-bar.scss"></style>