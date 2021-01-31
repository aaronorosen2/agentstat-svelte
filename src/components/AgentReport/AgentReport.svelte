<script>
    import RankingTable from '../RankingTable/RankingTable.svelte'
    import {agentScores} from '../../lib/api'
    export let name
    let agent

    $: overallScores = agent && agent.overall_scores_es
    $: overallScore = overallScores && (overallScores.find(i => i.time_duration == 36) || overallScores[0])

    function successRate(item){
        let percantege =  (100 - ((item.failed_listings / item.sold_listings) * 100));
        return Math.round(percantege);
    }

    async function fetchScores(){        
        agent = await agentScores(name)
    }

    fetchScores()
</script>

<h1>Agent Report</h1>

<div class="ranking">
    {#if agent}
        <div class="stat">
                {#if overallScore}
                    
                    <div class="stat--box">
                        {successRate(overallScore)}%
                        <div>Success Rate</div>
                    </div>
                    
                    <div class="stat--box">
                        {Math.round(overallScore.avg_dom)}
                        <div>Avg Days On Market</div>
                    </div>
                    
                    <div class="stat--box">
                        {Math.round(overallScore.s2l_price)}%
                        <div>List To Sell Price</div>
                    </div>
                    
                    <div class="stat--box">
                        {overallScore.sold_listings}
                        <div>Sold Listings</div>
                    </div>        
                {/if}
        </div>
        
        <h3>City Ranking</h3>
        <RankingTable agentScores={agent.agent_scores_es} />
    {/if}
</div>


<style src="./agent-report.scss"></style>