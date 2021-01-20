<script>
    import AgentItem from '../AgentItem/AgentItem.svelte'
    // request agents!
    let agents = []

    async function fetchAgents(){
        let res = await fetch('https://app.agentstat.com/api/reports/TN/?home_type=House&page=1&address=null').then(res => res.json())
        agents = res.results
    }

    fetchAgents()
    

</script>

<div class="list">
    {#each agents as agent}
        <AgentItem {agent} />
    {/each}
</div>