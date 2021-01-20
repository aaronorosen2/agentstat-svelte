<script>
    import AgentItem from '../AgentItem/AgentItem.svelte'
    // request agents!
    let agents = []
    const URL = "https://app.agentstat.com/api/reports/CA/?city=Clovis&lat=36.8037082&lng=-119.6550051&home_type=House&page=1&address=Locan"

    async function fetchAgents(){
        let res = await fetch(URL).then(res => res.json())
        agents = res.results
    }

    fetchAgents()
    

</script>

<div class="list">
    {#each agents as agent}
        <AgentItem {agent} />
    {/each}
</div>