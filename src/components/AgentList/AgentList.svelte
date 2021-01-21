<script>
    import AgentItem from '../AgentItem/AgentItem.svelte'
    import Loader from '../Loader/Loader.svelte'
    import {fetchAgents} from '../../lib/api'
    let agents = []
    // const URL = "https://app.agentstat.com/api/reports/CA/?city=Clovis&lat=36.8037082&lng=-119.6550051&home_type=House&page=1&address=Locan"
    let loading = false
    export async function searchAgents(filter={}){
        loading = true
        agents = []
        agents = await fetchAgents(filter)        
        loading = false
    }

    searchAgents()
    

</script>

<div class="list">
    <Loader show={loading} text="Loading agents..." />
    {#each agents as agent}
        <AgentItem {agent} />
    {/each}
</div>

<style src="./agent-list.scss"></style>