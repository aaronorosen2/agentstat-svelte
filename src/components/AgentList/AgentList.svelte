<script>
  import AgentItem from "../AgentItem/AgentItem.svelte";
  import Loader from "../Loader/Loader.svelte";
  import { fetchAgents } from "../../lib/api";

  let agents = [];
  let loading = false;
  let error = false;
  let formSubmitted = false;

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

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[name="name"]').value;
    const phoneNumber = form.querySelector('input[name="phone"]').value;
    const address = form.querySelector('input[name="address"]').value;

    if (!name || !phoneNumber || !address) {
      alert("All fields are required.");
      return;
    }
    
    console.log("Name:", name);
    console.log("Phone Number:", phoneNumber);
    console.log("Address:", address);

    form.reset();

    formSubmitted = true;
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
    <form on:submit={handleSubmit}>
      <div class="formBlog1">
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="phone" placeholder="Phone Number" />
      </div>
      <div class="formBlog2">
        <input type="text" name="address" placeholder="Address" />
        <input type="submit" value={formSubmitted ? "Sent \u2713" : "Send Now!"} />
      </div>
    </form>
  </div>
</div>
<div class="SortByContainer">
  <p>Sort By:</p>
  <select id="">
    <option value="Best-Overall">Best Overall</option>
    <option value="Most-Fails">Most Fails</option>
    <option value="Lower-Days-on-Market">Lower Days on Market</option>
    <option value="Higher-List-To-Sale-Price">Higher List To Sale Price</option>
  </select>
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
