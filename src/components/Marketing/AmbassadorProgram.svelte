<script>
    import util from "../../lib/util";
    import Pagination from '../Pagination/Pagination.svelte'
    export let agent = {
        onboarded_agents: []            
    }

    let limit = 2
    let current = 1
    $: offset = (current-1)*limit

    $: agents = agent?.onboarded_agents?.slice(offset, offset+limit)
</script>

<div class="ambassador">
    <div class="info">
        <div class="title">Ambassador Program</div>
        <p>
        Share your ambassador link with your colleagues, and when they sign up, YOU get credits for free Facebook advertising, free referrals, and morel Become the Ambassador of your market
        </p>
        <div class="title">
            Your Ambassador Link:
        </div>
        <p class="link">
            https://agentstat.com/?ambassador={agent.screen_name||agent.zillow_agent_id}
        </p>
    </div>
    <div>
        <div class="title">Your Circle</div>
        <table>
            <thead>
                <tr>
                    <th>Agent Name</th>
                    <th>Date Signed Up</th>
                </tr>
            </thead>
            <tbody>
                {#if agents}
                    {#each agents as ag}
                        <tr>
                            <td><a target="_blank" href="/profile/{ag.screen_name||ag.zillow_agent_id}">{ag.first_name} {ag.last_name}</a></td>
                            <td>{util.niceDate(ag.created_at, false)}</td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
        <div class="paginate">
            {#if agent?.onboarded_agents?.length>limit}
                <Pagination perPage={limit} numItems={agent.onboarded_agents.length} bind:current />
            {/if}
        </div>
    </div>
</div>

<style src="./ambassador-program.scss"></style>