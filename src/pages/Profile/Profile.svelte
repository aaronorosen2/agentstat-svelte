<script>
  import {
    ProfileDetails,
    AgentReport,
    NavBar,
    TransactionMap,
    TransactionTable,
    ContactLead,
    Loader,
    FooterDashboard
  } from "../../components";
  import { agentDetails, agentCustomLink } from "../../lib/api";
  
  export let name;
  export let custom = null;
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

  async function fetchCustomLink(){
    await agentCustomLink(name,custom)
  }

  if(custom){
    fetchCustomLink()
  }

  $: if (name){
      fetchAgentDetails()
  }

</script>

<NavBar />

{#if error}
    <div class="error">
        Error: Cannot fetch agent details
    </div>
{/if}
<div class="mainContainerOfProfile">
  <section class="profile">
  <Loader show={loading} text="Loading details..." />
  {#if agent}
    <div class="details">
      <ProfileDetails {agent} />
      <ContactLead {agent} />
    </div>
    <AgentReport {name} />
    <TransactionMap {agent} />
    <!-- <TransactionTable list={agent.agent_lists} /> -->
  {/if}
</section>

</div>
<FooterDashboard></FooterDashboard>

<style src="./profile.scss">
</style>