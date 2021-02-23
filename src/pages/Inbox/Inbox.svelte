<script>
    import {
        NavDashboard,
        InboxDetails,
        Loader
    } from '../../components'
    import Util from '../../lib/util'
    import {fetchInbox, readMessage} from '../../lib/api/profile'
    let leads = []
    let selected_lead 
    let loading = false
    let error = false
    async function fetchInboxLeads(){
        loading = true
        try {
            leads = await fetchInbox()
            selected_lead = leads && leads[0]
        }catch{
            error = true
        }
        loading = false
    }

    async function selectLead(lead){
        selected_lead = lead
        if(!lead.is_read){
            lead.is_read = 1
            leads = leads
            let res = await readMessage(lead.id)
            console.log("READ MESSAGE! ", res)
        }
    }

    fetchInboxLeads()
</script>

<NavDashboard />
<section class="inbox">
    <Loader text="Loading Inbox ..." show={loading} />
    {#if error}
        <div class="error">Error occured while fetching inbox, please try again later</div>
    {:else}
        <div class="container">
            <div class="tabs">
                {#each leads as lead}
                    <div class="tab" class:read={lead.is_read} class:selected={lead == selected_lead} on:click={() => selectLead(lead)}>
                        <div class="flex">
                            <h4>{lead.name}</h4>
                            {Util.niceDate(lead.created_at, false)}
                        </div>
                        <div class="phone">
                            {lead.phone}
                        </div>
                        {lead.email}
                    </div>
                    <div class="mobile-details" class:selected={selected_lead == lead}>
                        <InboxDetails {lead} />
                    </div>
                {/each}
            </div>
            <div class="details">
                {#if selected_lead}
                    <InboxDetails lead={selected_lead} />
                {/if}
            </div>
        </div>
    {/if}
</section>

<style src="./inbox.scss"></style>