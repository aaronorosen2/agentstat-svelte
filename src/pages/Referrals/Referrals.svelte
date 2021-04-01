<script>
    import {NavDashboard ,ReferralTable, Loader, ReferralForm} from '../../components'
    import {fetchReferrals} from '../../lib/api/referral'
    import { modal } from '../../stores/modal';

    export let segment = ''
    let selected = 'received'
    let loading = false

    function selectTab(e){
        selected = e.currentTarget.innerText.toLowerCase()
    }

    let rRefferal = {results: []}
    let sRefferal = {results: []}

    async function getRefferals(){
        $modal = {show: false}
        loading = true
        rRefferal = await fetchReferrals({page: 1})
        loading = false
        sRefferal = await fetchReferrals({page: 1, type: 'sent'})
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
    <div class="right">
        <div role="button" class="link" on:click={addReferral}>+ Send New Referral</div>
    </div>
    {#if selected == 'received'}
        <ReferralTable referrals={rRefferal.results} />
    {:else if selected == 'sent'}
        <ReferralTable referrals={sRefferal.results} />
    {/if}
</section>

<style src="./referrals.scss"></style>