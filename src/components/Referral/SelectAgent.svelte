<script>
        
    import states from "../../data/states";
    import {fetchAgents} from '../../lib/api';
    import Loader from "../Loader/Loader.svelte";
    import {modal} from '../../stores/modal'
    import RecapInfo from './RecapInfo.svelte'

    export let ref
    export let complete 
    let hasErr = false

    let agents = []
    let loading = false
    let error = false
    let filter = {state: ref.state}
    let agent_id

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

    function next(){
        hasErr = !agent_id
        if(!hasErr)
        $modal = {
            show: true,
            cmp: RecapInfo,
            complete,
            title: 'Send New Referral',
            props: {
                ref,
                agent: agents.find(a => a.agent_id == agent_id)
            }
        }
    }

    function selectAgent(id){
        agent_id = id
    }
    
    function handleKeyDown() {}
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
                <div><input type="radio" value={agent.agent_id} bind:group={agent_id} /></div>
                <div class="pointer" on:click={() => selectAgent(agent.agent_id)} on:keydown={handleKeyDown}>
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
                    <a href="/profile/{agent.agent_screen_name}" target="_blank">
                        View Profile
                    </a>
                </div>
            {/each}
        </div>
    </div>

    {#if hasErr}
        <div class="error">
            Please select an agent
        </div>
    {/if}

    <div class="control">
        <button class="btn" on:click={next}>Next</button>
    </div>
</div>


<style src="./select-agent.scss"></style>