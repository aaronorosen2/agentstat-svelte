<script>
    import {ProfileDetails, AgentReport} from '../../components'
    import {agentDetails} from '../../lib/api'
    export let name
    let agent 

    async function fetchAgentDetails(){
        agent = await agentDetails(name)
        console.log("AGENT --> ", agent)
    }

    $: if (name){
        fetchAgentDetails()
    }
</script>

<section class="profile">
    <h1>PROFILE</h1>
    {#if agent}
        <div class="details">
            <ProfileDetails {agent} />
        </div>
        <AgentReport {agent} />
    {/if}
</section>

<style src="./profile.scss"></style>