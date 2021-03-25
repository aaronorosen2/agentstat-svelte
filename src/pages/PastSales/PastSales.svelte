<script>
    import {NavDashboard , PastSalesTable, ActiveSalesTable, Loader} from '../../components'
    
    import {agentProfile} from '../../lib/api/profile'
    import {salesTransactions} from '../../lib/api/sales'
    
    import {onMount} from 'svelte'
    import {showOnboarding} from '../../stores/modal'

    let selected = 'past sales'
    let loading = false

    function selectTab(e){
        selected = e.currentTarget.innerText.toLowerCase()
    }

    let transaction = {}
    async function getTransactions(){
        transaction = await salesTransactions()
    }

    let data = {}
    let agent = {} 
    
    async function getAgentDetails(){
        agent = await agentProfile()
    }

    getTransactions()
    getAgentDetails()
    onMount(() => showOnboarding('sales'))
</script>

<Loader show={loading} text="Loading Information ... " />
<NavDashboard />

<section>
    <div class="tabs">
        <div class="tab" class:selected={selected == 'past sales'} on:click={selectTab}>Past Sales</div> 
        <div class="tab" class:selected={selected == 'active sales'} on:click={selectTab}>Active Sales</div> 
    </div>
</section>

<section class="container">
    {#if selected == 'past sales'}
        <PastSalesTable {transaction} />
    {:else if selected == 'active sales'}
        <ActiveSalesTable />
    {/if}
</section>



<style src="./past-sales.scss"></style>