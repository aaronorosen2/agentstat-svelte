<script>
    import { onMount } from 'svelte';
    import {NavDashboard ,ReferralTable, Loader, ReferralForm, PendingReferrals, FooterDashboard} from '../../components'
    import {fetchReferrals, pendingReferrals} from '../../lib/api/referral'
    import { modal, showOnboarding } from '../../stores/modal';

    export let segment = ''
    let selected = 'received'
    let loading = false

    function selectTab(e){
        selected = e.currentTarget.innerText.toLowerCase()
    }

    let rRefferal = {results: []}
    let sRefferal = {results: []}
    let pReferrals = []

    async function getRefferals(){
        $modal = {show: false}
        loading = true
        rRefferal = await fetchReferrals({page: 1})
        loading = false
        sRefferal = await fetchReferrals({page: 1, type: 'sent'})
        pReferrals = await pendingReferrals()

    }

    function addReferral(){
        $modal = {
                show: true,
                cmp: ReferralForm,
                complete: () => getRefferals(),
                title: 'Send New Referral'
        }
    }

    getRefferals()
    onMount(() => {
        showOnboarding('referrals')
    })

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
    {#if pReferrals?.length && selected == 'received'}
        <PendingReferrals referrals={pReferrals} on:finish={getRefferals} />
    {/if}
    <div class="right">
        <div role="button" class="link" on:click={addReferral}>+ Send New Referral</div>
    </div>
    {#if selected == 'received'}
        <ReferralTable referrals={rRefferal.results} />
    {:else if selected == 'sent'}
        <ReferralTable referrals={sRefferal.results} />
    {/if}
</section>

<FooterDashboard />

<style src="./referrals.scss"></style>