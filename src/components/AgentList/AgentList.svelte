<script>
    import AgentItem from '../AgentItem/AgentItem.svelte'
    import Loader from '../Loader/Loader.svelte'
    import {fetchAgents, getAgentUrlParams} from '../../lib/api'
    let agents = []
    let loading = false
    let error = false

    export async function searchAgents(filter={}){
        error = false
        loading = true
        let list = {results: []}
        try {
            list = await fetchAgents(filter)  
            agents = list.results
        }catch(err){
            console.error(err.message)
            error = true
        }
        loading = false
        return list
    }

    export function setUrlParams(filter){
        window.location = "?"+getAgentUrlParams(filter)
    }


</script>

<div class="list">
    <Loader show={loading} text="Loading agents..." />
    {#if error}
        <div class="error">
            Error occured while fetching agents list, please try again later
        </div>
    {:else if agents.length}
        {#each agents as agent}
            <AgentItem {agent} />
        {/each}
    {:else if !loading}
        <div class="info">
            No Agent was found with your search parameters!
        </div>
    {/if}
</div>

<style src="./agent-list.scss"></style>