<script>
    import {NavDashboard , PartnerLeads, Loader} from '../../components'
    import {marketingPartner} from '../../lib/api/marketing'
    
    import {onMount} from 'svelte'
    import {showOnboarding} from '../../stores/modal'

    let selected = 'partner'
    let loading = false

    function selectTab(e){
        selected = e.currentTarget.innerText.toLowerCase()
    }

    let data = {}
    async function getMPartner(){
        loading = true
        data = await marketingPartner()
        loading = false
    }

    getMPartner()
</script>

<Loader show={loading} text="Loading Information ... " />
<NavDashboard />

<section>
    <div class="tabs">
        <div class="tab" class:selected={selected == 'partner'} on:click={selectTab}>Partner</div> 
        <div class="tab" class:selected={selected == 'landing pages'} on:click={selectTab}>Landing Pages</div> 
        <div class="tab" class:selected={selected == 'facebook ads'} on:click={selectTab}>Facebook Ads</div> 
        <div class="tab" class:selected={selected == 'ambassador program'} on:click={selectTab}>Ambassador Program</div> 
    </div>
</section>

<section class="container">
    {#if selected == 'partner'}
        <PartnerLeads bind:data />
    {:else if selected == 'landing pages'}
        <h1>Landing Pages</h1>
    {:else if selected == 'facebook ads'}
        <h1>Coming Soon</h1>
    {:else if selected == 'ambassador program'}
        <h1>Ambassador</h1>
    {/if}
</section>

<style src="./marketing.scss"></style>