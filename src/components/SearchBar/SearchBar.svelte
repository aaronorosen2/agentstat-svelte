<script>
    import Dropdown from '../Dropdown/Dropdown.svelte'
    import AutoCompleteAddress from '../AutoCompleteAddress/AutoCompleteAddress.svelte'
    import SearchInput from '../SearchInput/SearchInput.svelte'
    import { createEventDispatcher } from 'svelte'
    import { fetchStates } from '../../lib/api'
  
    const dispatch = createEventDispatcher()
    let filter = { agent_name: "", filter_by: 'address', state: 'States', minPrice: '', maxPrice: '' } // Set default values for min and max prices
    let errorState = false
    let priceDropdownOpen = false; // Track whether the price dropdown is open
  
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
  
    function filterLabel(val) {
      if (!val) return
      return SearchBy.find(s => s.value == val).label
    }
  
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
    
   
    function homeTypeLabel(val) {
      if (!val) return
      let ht = HomeTypes.find(s => s.value == val)
      if (!ht) return
      return ht.label
    }
  
    let optionTypes = {
      address: "address",
      city: "(cities)"
    }
  
    let listStates = ['States']
  
    function val(opt) {
      return opt.value || opt
    }
  
    async function selectFilter(evt) {
      filter.filter_by = val(evt.detail)
      errorState = false
      if (filter.filter_by == 'agent_name' && listStates.length < 2) {
        listStates = ['States'].concat(await fetchStates())
        filter.home_type = ""
        filter.city = ""
        filter.address = ""
      } else {
        filter.agent_name = ""
      }
    }
  
    function selectState(evt) {
      filter.state = val(evt.detail)
      errorState = false
      // show other dropdowns
    }
  
    function selectAddress(evt) {
      errorState = false
      filter = { ...filter, ...evt.detail }
      search()
    }
  
    function selectHomeType(evt) {
      filter = { ...filter, home_type: val(evt.detail) }
    }
  
    function search() {
      if (!filter.state || filter.state == "States") {
        errorState = true
        return
      }
      delete filter.page
      dispatch('search', filter)
    }
  
    // init from url params
    async function initFilter() {
      const urlParams = new URLSearchParams(window.location.search);
      const filterBy = urlParams.get('filter_by');
      if (filterBy) {
        filter.filter_by = filterBy;
      }
      const entries = urlParams.entries();
      for (let entry of entries) {
        filter[entry[0]] = entry[1];
      }
      if (filter.filter_by === 'agent_name' && listStates.length < 2) {
        listStates = ['States'].concat(await fetchStates());
      }
      filter = filter;
      setTimeout(() => {
        dispatch('load', filter);
      });
    }
  
    let input1Value = '';
    let input2Value = '';
    let showDoneButton = false;
  
    const newValues = [
        
        '$200K',
        '$300K',
        '$400K',
        '$500K',
        '$600K',
        '$700K',
        '$800K',
        '$900K',
        '$1M',
        'Any price'
    ];

    function handleItemClick(event) {
        const clickedValue = event.target.textContent;
        if (clickedValue >= 0 && clickedValue <= 10) {
            input1Value = clickedValue;
            showDoneButton = true;

            // Set the content of the <li> elements using the new values
            const lis = document.querySelectorAll('.right-align');
            lis.forEach((li, index) => {
                li.textContent = newValues[index];
           
            });

        } else {
            input2Value = clickedValue;
        }

        // Check if both input values are greater than 1
        // if (input1Value > 1 && input2Value > 1) {
        //     showDoneButton = true;
        // } else {
        //     showDoneButton = false;
        // }
    }
    function handleDoneClick() {
      alert('Done button clicked');
    }
    let priceItemVisible = false;

function handlePriceButtonClick() {
  priceItemVisible = !priceItemVisible;
}
  
    initFilter();
</script>

<div class="search-bar">
  <Dropdown 
    selected={filterLabel(filter.filter_by)}
    options={SearchBy}
    on:select={selectFilter}
    radius="left"
    border={filter.filter_by == "agent_name" ? "left" : "both"}
   />
  {#if filter.filter_by == "agent_name"}
    <Dropdown
    options={listStates}
    error={errorState}
    selected={filter.state}
    on:select={selectState}
    radius="none"
    />
    <SearchInput bind:value={filter.agent_name} on:search={search} />
  {:else}
    {#if filter.filter_by == "city"}
      <AutoCompleteAddress
        bind:value={filter.city}
        on:select={selectAddress}
        optionType={optionTypes[filter.filter_by]}
      />
    {:else}
      <AutoCompleteAddress
        bind:value={filter.address}
        on:select={selectAddress}
        optionType={optionTypes[filter.filter_by]}
      />
    {/if}
    <Dropdown
      options={HomeTypes}
      selected={homeTypeLabel(filter.home_type)}
      on:select={selectHomeType}
      radius="none"
      border="left"
      class="custom-dropdown"
    />
  {/if}

  <div class="btnContainer">
    <button on:click={handlePriceButtonClick}>Price</button>
  </div>

  <div role="button" class="search-bar--btn" on:click={search}>
    <span class="mobile">Search</span>
    <i class="fas fa-search" />
  </div>
</div>

{#if priceItemVisible}
  <div class="MainContainerofPriceItem">
    <div class="MinMaxContainer">
      <input type="number" class="input1" placeholder="Min" bind:value={input1Value} />
      <input type="text" class="input2" placeholder="Max" bind:value={input2Value} />
    </div>
    <div class="DataContainer">
      <ul>
        {#each Array.from({ length: 10 }, (_, i) => i + 1) as number}
          <li on:click={handleItemClick} class="right-align">{number}</li>
        {/each}
      </ul> 
      {#if showDoneButton}
        <button on:click={handleDoneClick}>Done</button>
      {/if}
    </div>
  </div>
{/if}

<style src="./search-bar.scss"></style>
