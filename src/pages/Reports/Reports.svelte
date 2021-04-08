<script>
    import {NavDashboard , ReportDetails, Loader, FooterDashboard} from '../../components'
    import {trackReport} from '../../lib/api/reports'
    import ReportUtil from '../../lib/report'
    import {onMount} from 'svelte'
    import {showOnboarding} from '../../stores/modal'
    export let segment = ''
    let selected = 'traffic'
    function selectReport(e){
        selected = e.currentTarget.innerText.toLowerCase()
    }

   
    let report = {}
    let traffics = []
    let leads = []
    let loading = false
    


    async function fetchReport(evt){
        loading = true
        let days = evt ? evt.detail : ReportUtil.getFilter()
        ReportUtil.setFilter(days)
        let filter = {
            days,
            ...ReportUtil.getStartEndDate(days)
        }
        let res = await trackReport(filter)
        report = res
        traffics = [
            {name: 'Impressions',...res.traffic_impression},
            {name: 'Profile Views',...res.traffic_profile}
        ]
        leads = [
            {name: 'Seller Leads',...res.lead_seller},
            {name: 'Buyer Leads',...res.lead_buyer}
        ]
        loading = false
    }


    fetchReport()
    onMount(() => showOnboarding('reports'))
</script>

<Loader show={loading} text="Loading Reports ... " />
<NavDashboard {segment} />

<section class="reports">
    <div class="tabs">
        <div class="tab" class:selected={selected == 'traffic'} on:click={selectReport}>Traffic</div> 
        <div class="tab" class:selected={selected == 'leads'} on:click={selectReport}>Leads</div> 
        <div class="tab" class:selected={selected == 'referrals'} on:click={selectReport}>Referrals</div> 
    </div>
</section>

<section class="container">
    {#if selected == 'traffic'}
        <ReportDetails reports={traffics} on:filter={fetchReport} />
    {:else if selected == 'leads'}
        <ReportDetails reports={leads} on:filter={fetchReport} />
    {:else if selected == 'referrals'}
        <h1>Coming Soon</h1>
    {/if}
</section>

<FooterDashboard />

<style src="./reports.scss"></style>