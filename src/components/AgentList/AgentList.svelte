<script>
    import AgentItem from '../AgentItem/AgentItem.svelte'
    import Loader from '../Loader/Loader.svelte'
    import {fetchAgents} from '../../lib/api'
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
            let urlParamSelectedUsernames = new URLSearchParams(window.location.search).get('selected_usernames') == undefined ? '' : new URLSearchParams(window.location.search).get('selected_usernames')
            let usernames = urlParamSelectedUsernames == '' ? [] :urlParamSelectedUsernames.split(',')
            agents.forEach((agent,index)=>{
                if(usernames.includes(agent.agent_slug)){
                    
                    agents.splice(index,1)
                    agents.unshift(agent)

                }
            })
        }catch(err){
            console.error(err.message)
            error = true
        }
        loading = false
        return list
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