<script>
    import Loader from '../Loader/Loader.svelte'
    import ClaimMessage from './ClaimMessage.svelte'
    import DisputeForm from './DisputeForm.svelte'
    import {fetchStates, fetchAgents, claimAgent, reClaimAgent} from '../../lib/api'
    import {modal} from '../../stores/modal'
    import {currentUser, setUser} from '../../lib/api/auth'

    import page from 'page'
    let filter = {check_claimed: 'True', agent_name: '', state: 'AK'}
    let states = []
    let agents = null
    let loading = false
    let error = false
    let selected_agent = ""

    async function initStates(){
        states = await fetchStates()
    }

    async function findAgents(){
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

    function handleKeyDown(e){
        if(e.keyCode == 13){
            findAgents()
        }
    }

    function info(str){
        if(!str) return ''
       return '- '+ str.split('\n')[0]
    }

    let reclaimed_profile = false
    let reclaimed_profile_error = false
    async function reClaim(agent, data){
        reclaimed_profile_error = false
        let user = currentUser()
        data.agent_profile_connector = agent.agent_id
        data.dispute_web_agent = user.web_agent_id
        try {
            let res = await reClaimAgent(data)
            if(res.status == "pending"){
                // set pending dispute
                user.pending_dispute = true
                setUser(user)
            }else{
                reclaimed_profile_error = true
            }
        }catch{
            reclaimed_profile_error = true
        }
        reclaimed_profile = true
        $modal = {show: false}
    }

    function processClaimDispute(agent, action){
        if(action == 'claim'){
            $modal = {
                show: true,
                cmp: DisputeForm,
                complete: (data) => reClaim(agent, data),
                title: 'Dispute claim and provide proof of identity'
            }
        }else{
            $modal = {show: false}
        }
    }

    
    async function claimProfile(){
        let agent = agents.find(a => a.agent_id == selected_agent)
        if(agent.claimed){
            $modal = {
                show: true,
                cmp: ClaimMessage,
                complete: (action) => processClaimDispute(agent, action),
                title: ''
            } 
            return
        }
        let claimed = await claimAgent(selected_agent)
        if(claimed)
            page.redirect('/profile-settings')
        
    }

    initStates()
</script>

<div class="profile-claim">
    {#if reclaimed_profile}
        {#if reclaimed_profile_error}
            <div class="error">Error occured while submitting your data, Please try again later!</div>
        {:else}
            <div class="success">We will review your dispute and get back to you within 48 hours</div>
        {/if}
    {:else}
        <div class="search">
            <input class="input" type="search" placeholder="Full Name" bind:value={filter.agent_name} on:keydown={handleKeyDown} />
            <select class="input" bind:value={filter.state}>
                {#each states as state}
                    <option value={state.value}>{state.label}</option>
                {/each}
            </select>
            <button class="btn" on:click={findAgents}>Search</button>
        </div>

        <div class="result">
            <Loader show={loading} text="Loading agents..." />
            {#if agents}
                {#if agents.length}
                    {#each agents as agent}
                        <div class="agent">
                            <input type="radio" bind:group={selected_agent} value={agent.agent_id} />
                            <a href="/profile/{agent.agent_screen_name}" target="_blank">
                                {agent.agent_full_name} {info(agent.agent_brokerage_info)}
                            </a>
                            {#if agent.claimed}
                                <span class="tag">Claimed</span>
                            {/if}
                        </div>
                    {/each}
                {:else}
                    <div class="info">
                        No agent found
                    </div>
                {/if}
            {/if}
        </div>

        {#if selected_agent}
            <div class="claim">
                <button class="btn btn-claim" on:click={claimProfile}>This is me</button>
            </div>
        {/if}
    {/if}
</div>

<style src="./profile-claim.scss"></style>