<script>
  import AgentItem from "../AgentItem/AgentItem.svelte";
  import Loader from "../Loader/Loader.svelte";
  import { fetchAgents } from "../../lib/api";

  let agents = [];
  let loading = false;
  let error = false;
  export async function searchAgents(filter = {}) {
    error = false;
    loading = true;
    let list = { results: [] };
    try {
      list = await fetchAgents(filter);
      agents = list.results;
      let urlParamSelectedUsernames =
        new URLSearchParams(window.location.search).get("selected_usernames") ==
        undefined
          ? ""
          : new URLSearchParams(window.location.search).get(
              "selected_usernames"
            );
      let usernames =
        urlParamSelectedUsernames == ""
          ? []
          : urlParamSelectedUsernames.split(",");
      agents.forEach((agent, index) => {
        if (usernames.includes(agent.agent_slug)) {
          agents.splice(index, 1);
          agents.unshift(agent);
        }
      });
    } catch (err) {
      console.error(err.message);
      error = true;
    }
    loading = false;
    return list;
  }
</script>

<div class="mainContainer">
  <div class="container1">
    <img src="/images/free_concierge.jpg" alt="top-banner" />
  </div>
  <div class="container2">
    <div class="blog1">
      <h4>Ranked Top 1% On Agentstat: Nationwide Statistics</h4>
    </div>
    <div class="blog2">
      <p><span>Sold Listings</span><span>00</span></p>
      <p><span>Failed Listings</span><span>00</span></p>
      <p><span>Avg List to Sold Price</span><span>00</span></p>
      <p><span>Single Family Sold</span><span>00</span></p>
      <p><span>Condos Sold</span><span>00</span></p>
    </div>
  </div>

  <div class="container3">
    <div class="form-heading">
      <h4>For my address, text me two hand-selected Top 1% Agents</h4>
    </div>
    <form action="">
      <div class="formBlog1">
        <input type="text" name="" id="" placeholder="Name" />
        <input type="text" name="" id="" placeholder="Phone Number" />
      </div>
      <div class="formBlog2">
        <input type="text" name="" id="" placeholder="Address" />
        <input type="submit" value="Send Now!" />
      </div>
    </form>
  </div>
</div>

<div class="list">
  <Loader show={loading} text="Loading agents..." />
  {#if error}
    <div class="error">
      Error occurred while fetching agents list, please try again later
    </div>
  {:else if agents.length}
    {#each agents as agent}
      <AgentItem {agent} />
    {/each}
  {:else if !loading}
    <div class="info">No Agent was found with your search parameters!</div>
  {/if}
</div>

<style src="./agent-list.scss"></style>
