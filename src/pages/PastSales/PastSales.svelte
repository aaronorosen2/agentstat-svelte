<script>
    import {NavDashboard , PastSalesTable, ActiveSalesTable, Loader, FooterDashboard} from '../../components'    
    import {salesTransactions, activeTransactions} from '../../lib/api/sales'
    import {onMount} from 'svelte'
    import {showOnboarding} from '../../stores/modal'

    export let segment = ''
    let selected = 'past sales'
    let loading = false

    function selectTab(e){
        selected = e.currentTarget.innerText.toLowerCase()
    }

    let transaction = {}
    let activeSales = []
    async function getTransactions(){
        loading = true
        transaction = await salesTransactions()
        loading = false
        activeSales = await activeTransactions()
    }

    function handleKeyDown() {}
    
    getTransactions()
    onMount(() => showOnboarding('past-sales'))
</script>

<Loader show={loading} text="Loading Sales ... " />
<NavDashboard {segment} />

<section>
    <div class="tabs">
        <div class="tab" class:selected={selected == 'past sales'} on:click={selectTab} on:keydown={handleKeyDown}
        >Past Sales</div> 
        <div class="tab" class:selected={selected == 'active sales'} on:click={selectTab} on:keydown={handleKeyDown}
        >Active Sales</div> 
    </div>
</section>

<section class="container">
    {#if selected == 'past sales'}
        <PastSalesTable {transaction} />
    {:else if selected == 'active sales'}
        <ActiveSalesTable {activeSales} />
    {/if}
</section>

<FooterDashboard />

<style src="./past-sales.scss"></style>