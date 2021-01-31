<script>
  import {
    ProfileDetails,
    AgentReport,
    NavBar,
    TransactionMap,
    TransactionTable,
    Loader
  } from "../../components";
  import { agentDetails, getAgentUrlParams } from "../../lib/api";
  export let name;
  let agent;
  let loading = false;

  async function fetchAgentDetails() {
    loading = true;
    agent = await agentDetails(name);
    loading = false;
  }


  $: if (name){
      fetchAgentDetails()
  }

  function setParams(evt) {
    let filter = evt.detail;
    // redirect home with params!
    window.location = "/?" + getAgentUrlParams(filter);
  }

</script>

<style src="./profile.scss">

</style>

<NavBar on:search={setParams} />

<section class="profile">
  <Loader show={loading} text="Loading details..." />
  {#if agent}
    <div class="details">
      <ProfileDetails {agent} />
    </div>
    <AgentReport {name} />
    <TransactionMap {agent} />
    <TransactionTable list={agent.agent_lists} />
  {/if}
</section>
