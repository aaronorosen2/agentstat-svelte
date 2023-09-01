<script>
    export let agent = {}
    import page from 'page'

    function round(n){
        return (Math.round(n*100)/100).toFixed(2)
    }

    function xSold(str, prop){
        if(!str) return 0
        let arr = JSON.parse(str)
        let n  = 0
        for(let elm of arr){
            if(elm.includes(prop)){
                n = Number(elm.split(':')[1])
                break;
            }
        }
        return n
    }

    function info(str){
        if(!str) return ""
        return str.split('\n')[0]
    }

    function linkProfile(name){
        return `/profile/${name}`
    }

</script>

<div class="agent">
    <div class="agent-img">
        <img alt={agent.agent_full_name} src={agent.agent_image == null ? "/images/blank-profile-pic.webp" : `https://app.realtorstat.com/api/agent/pic/${agent.state}/${agent.agent_image}`}/>
    </div>
    
    <div class="agent-body">
        <a href={linkProfile(agent.agent_slug)} class="agent-name">
            {agent.agent_full_name}
            {#if agent.agent_brokerage_info}
                <span class="info">{info(agent.agent_brokerage_info)}</span>
            {/if}
        </a>
        <div class="agent-stat">
            <div class="span-1 label">
                Overall        
            </div>
            <div class="label">
                Clovis
            </div>

            <div class="label">
                Sold Listings
            </div>
            <div>
                {agent.overall_sold_listings}
            </div>
            <div>
                {agent.sold_listings}
            </div>

            <div class="label">
                Avg Days On Market
            </div>
            <div>
                {round(agent.overall_avg_dom)}
            </div>
            <div>
                {round(agent.avg_dom)}
            </div>

            <div class="label">
                Avg List to Sold Price
            </div>
            <div>
                {round(agent.overall_s2l_price)}
            </div>
            <div>
                {round(agent.s2l_price)}
            </div>

            <div class="label">
                Single Family Sold
            </div>
            <div>
                {xSold(agent.overall_listings_breakdown_json, "Single Family Houses sold")}
            </div>
            <div>
                {xSold(agent.listings_breakdown_json, "Single Family Houses sold")}
            </div>

            <div class="label">
                Condos Sold
            </div>
            <div>
                {xSold(agent.overall_listings_breakdown_json, "Condos sold")}
            </div>
            <div>
                {xSold(agent.listings_breakdown_json, "Condos sold")}
            </div>

        </div>
    </div>

    <div class="agent-control">
        <div class="connect">
            <div role="button" class="button">Connect with {agent.agent_full_name}</div>
        </div>
    </div>
</div>


<style src="./agent-item.scss"></style>