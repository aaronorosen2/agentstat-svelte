<script>
    import {NavDashboard ,ReferralTable, Loader} from '../../components'
    import {fetchReferrals} from '../../lib/api/referral'

    export let segment = ''
    let selected = 'received'
    let loading = false
    function selectTab(e){
        selected = e.currentTarget.innerText.toLowerCase()
    }

    let rRefferal = {results: []}
    let sRefferal = {results: []}

    async function getRefferals(){
        loading = true
        rRefferal = await fetchReferrals({page: 1})
        loading = false
        sRefferal = await fetchReferrals({page: 1, type: 'sent'})
    }

    getRefferals()

</script>

<Loader show={loading} text="Loading Referrals ... " />
<NavDashboard {segment} />

<section>
    <div class="tabs">
        <div class="tab" class:selected={selected == 'received'} on:click={selectTab}>Received</div> 
        <div class="tab" class:selected={selected == 'sent'} on:click={selectTab}>Sent</div> 
    </div>
</section>

<section class="container">
    {#if selected == 'received'}
        <ReferralTable referrals={rRefferal.results} />
    {:else if selected == 'sent'}
        <ReferralTable referrals={sRefferal.results} />
    {/if}
</section>

<style src="./referrals.scss"></style>