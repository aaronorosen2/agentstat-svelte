<script>
    import util from "../../lib/util";
    import Pagination from '../Pagination/Pagination.svelte'
    export let agent = {
        onboarded_agents: []            
    }

    let limit = 10
    let current = 1
    let textNode
    $: offset = (current-1)*limit

    function agName(ag){
        if(ag.first_name || ag.last_name){
            return ag.first_name+' '+ag.last_name
        }
        return ag.brokerage_name||ag.screen_name
    }
    
    let copyLabel = "Copy"

    function copyText(){
        textNode.select();
        textNode.setSelectionRange(0, 99999);
        document.execCommand("copy");
        copyLabel = "Copied!"
        setTimeout(() => {
            copyLabel = "Copy"
        },3000)
    }

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
        <div class="copy-area">
            <input class="link" bind:this={textNode} value="https://agentstat.com/?ambassador={agent.screen_name||agent.zillow_agent_id}" readonly>
            <button class="btn sm" on:click={copyText}>{copyLabel}</button>
        </div>
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
                            <td><a target="_blank" href="/profile/{ag.screen_name||ag.zillow_agent_id}">{agName(ag)}</a></td>
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