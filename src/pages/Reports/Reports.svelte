<script>
    import {NavDashboard , TrafficReport, LeadsReport, ReferralsReport} from '../../components'
    let selected = 'traffic'

    function selectReport(e){
        selected = e.currentTarget.innerText.toLowerCase()
    }
</script>

<NavDashboard />

<section class="reports">
    <div class="tabs">
        <div class="tab" class:selected={selected == 'traffic'} on:click={selectReport}>Traffic</div> 
        <div class="tab" class:selected={selected == 'leads'} on:click={selectReport}>Leads</div> 
        <div class="tab" class:selected={selected == 'referrals'} on:click={selectReport}>Referrals</div> 
    </div>
</section>

<section class="container">
    {#if selected == 'traffic'}
        <TrafficReport />
    {:else if selected == 'leads'}
        <LeadsReport />
    {:else if selected == 'referrals'}
        <ReferralsReport />
    {/if}
</section>

<style src="./reports.scss"></style>