<script>
    import {NavDashboard , PartnerLeads, LandingPages, AmbassadorProgram, Loader} from '../../components'
    import {marketingPartner, marketingCustomLinks} from '../../lib/api/marketing'
    import {currentAgentDetails, agentProfile} from '../../lib/api/profile'
    
    import {onMount} from 'svelte'
    import {showOnboarding} from '../../stores/modal'
    export let segment = ''
    let selected = 'partner'
    let loading = false

    function selectTab(e){
        selected = e.currentTarget.innerText.toLowerCase()
    }

    let data = {}
    let agent = {}
    let agentPf = {}
    async function getMPartner(){
        loading = true
        data = await marketingPartner()
        loading = false
    }

    let customLinks = []
    async function getCustomLinks(){
        customLinks = await marketingCustomLinks()
    }

    async function getAgentDetails(){
        agent = await currentAgentDetails()
        agentPf = await agentProfile()
    }


    getMPartner()
    getCustomLinks()
    getAgentDetails()
    onMount(() => showOnboarding('marketing'))
</script>

<Loader show={loading} text="Loading Information ... " />
<NavDashboard {segment} />

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
        <LandingPages {customLinks} cities={agent.cities} />
    {:else if selected == 'facebook ads'}
        <h1 class="center">Coming Soon</h1>
    {:else if selected == 'ambassador program'}
        <AmbassadorProgram agent={agentPf} />
    {/if}
</section>



<style src="./marketing.scss"></style>