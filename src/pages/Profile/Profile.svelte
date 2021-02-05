<script>
  import {
    ProfileDetails,
    AgentReport,
    NavBar,
    TransactionMap,
    TransactionTable,
    ContactLead,
    Loader
  } from "../../components";
  import { agentDetails } from "../../lib/api";
  
  export let name;
  let agent;
  let error;

  let loading = false;

  async function fetchAgentDetails() {
    loading = true;
    error = false
    try{
        agent = await agentDetails(name);
    }catch{
        error = true
    }
    loading = false;
  }


  $: if (name){
      fetchAgentDetails()
  }


</script>

<style src="./profile.scss">

</style>

<NavBar />

{#if error}
    <div class="error">
        Error: Cannot fetch agent details
    </div>
{/if}
<section class="profile">
  <Loader show={loading} text="Loading details..." />
  {#if agent}
    <div class="details">
      <ProfileDetails {agent} />
      <ContactLead {agent} />
    </div>
    <AgentReport {name} />
    <TransactionMap {agent} />
    <TransactionTable list={agent.agent_lists} />
  {/if}
</section>
