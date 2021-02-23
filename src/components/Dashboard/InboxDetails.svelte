<script>
    export let lead
    import Util from '../../lib/util'
</script>

<div class="inbox-details">
    <div class="flex">
        <h1>{lead.name}</h1>
        <span class="date">{Util.niceDateTime(lead.created_at)}</span>
    </div>
    <div class="info">
        {lead.phone}
    </div>
    <div class="info">
        {lead.email}
    </div>
    <div class="info">
        {lead.address}, {lead.city}, {lead.state}, {lead.zip_code}
    </div>

    <div class="attrs">
        <h3>Buyer, seller, or both?</h3>
        {lead.looking_for}
        
        {#if lead.home_type}
            <h3>Home Type (selling)</h3>
            {lead.home_type}
        {/if}
        
        {#if lead.how_much}
            <h3>Approximate sales price</h3>
            {lead.how_much}
        {/if}
        
        {#if lead.how_soon}
            <h3>How soon (selling)?</h3>
            {lead.how_soon}
        {/if}

        {#if lead.home_type_buyer}
            <h3>Home Type (buying)</h3>
            {lead.home_type_buyer}
        {/if}

        {#if lead.home_type_buyer}
            <h3>Approximate purchase price</h3>
            {lead.how_much_buyer}
        {/if}
        
        {#if lead.how_soon_buyer}
            <h3>How soon (buying)?</h3>
            {lead.how_soon_buyer}
        {/if}
       
        {#if lead.interest_reason}
            <h3>Why are they interested in you?</h3>
            {lead.interest_reason}
        {/if}
        
        {#if lead.message}
            <h3>Notes</h3>
            {lead.message}
        {/if}

    </div>

</div>

<style src="./inbox-details.scss"></style>