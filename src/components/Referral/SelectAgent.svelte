<script>
        
    import states from "../../data/states";
    import {fetchAgents} from '../../lib/api'
import Loader from "../Loader/Loader.svelte";

    export let ref
    export let complete 

    let agents = []
    let loading = false
    let error = false
    let filter = {state: ref.state}

    function filterAgents(e){
        filter.agent_name = e.currentTarget.value
        searchAgents()
    }

    function info(str){
        if(!str) return ""
        return str.split('\n')[0]
    }

    async function searchAgents(){
        error = false
        loading = true
        let list = {results: []}
        try {
            list = await fetchAgents(filter, false)  
            agents = list.results
        }catch(err){
            console.error(err.message)
            error = true
        }
        loading = false
        return list
    }

    searchAgents()
</script>

<div class="select-agent">
    <div class="label">Select Your Agent</div>
    <div class="grid-2">
        <select bind:value={filter.state}>
            {#each states as state }
                <option value={state}>{state}</option>
            {/each}
        </select>
        <input type="text" placeholder="Search by agent name or referral location" on:input={filterAgents}>
    </div>
    
    <div class="grid-5 header">
        <div></div>
        <div>Success Rate:</div>
        <div>Overall</div>
        <div>Seattle</div>
        <div></div>
    </div>
    <div class="relative">
        <Loader show={loading} />
        <div class="grid-5">
            {#each agents as agent}
                <div><input type="checkbox" /></div>
                <div>
                    <div class="title">
                        {agent.agent_full_name}
                    </div>
                    <div>
                        {info(agent.agent_brokerage_info)}
                    </div>
                </div>
                <div>
                    100%
                </div>
                <div>
                    100%
                </div>
                <div>
                    View Profile
                </div>
            {/each}
        </div>
    </div>
</div>


<style src="./select-agent.scss"></style>