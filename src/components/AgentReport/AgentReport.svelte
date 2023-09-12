<script>
    import RankingTable from "../RankingTable/RankingTable.svelte";
    import ToggleButtonGrp from "../ToggleButtonGrp/ToggleButtonGrp.svelte";
    import Badge from "../Badge/Badge.svelte";
    import Loader from "../Loader/Loader.svelte";

    import { agentScores } from "../../lib/api";
    export let name;
    let agent;
    let filterDuration = 36;
    let updateAgent;
    let loading = false;
    let badges = [];
    let error;

    $: overallScores = agent && agent.overall_scores_es;
    $: overallScore =
        overallScores &&
        (overallScores.find((i) => i.time_duration == filterDuration) ||
            overallScores[0]);

    function successRate(item) {
        let percantege =
            100 - (item.failed_listings / item.sold_listings) * 100;
        return Math.round(percantege);
    }

    function agentTopPercentage(item) {
        if (!item.agent_rank || !item.rank_count) return null;
        let agent_percentage = (item.agent_rank / item.rank_count) * 100;
        agent_percentage = Math.round(agent_percentage);
        agent_percentage = agent_percentage == 0 ? 1 : agent_percentage;
        return agent_percentage;
    }

    async function fetchScores() {
        loading = true;
        error = false;
        try {
            agent = await agentScores(name, filterDuration);
        } catch (e) {
            error = true;
        }
        loading = false;
        updateAgent = +new Date();
        setBadges(agent.agent_scores_es);
    }

    function setBadges(agent_scores) {
        badges = [];
        for (let as of agent_scores) {
            if (!as.home_type) {
                let agent_percentage = agentTopPercentage(as);
                if (agent_percentage) {
                    badges.push({
                        agent_percentage,
                        city: as.city,
                    });
                }
            }
        }
        badges = badges
            .sort((a, b) => a.agent_percentage - b.agent_percentage)
            .slice(0, 5);
    }

    function updateFilter() {
        fetchScores();
    }

    let toggleGrp = [
        { label: "Last 12 months", value: 12 },
        { label: "Last 24 months", value: 24 },
        { label: "Last 36 months", value: 36 },
    ];

    fetchScores();
</script>

{#if error}
    <div class="error">Error: Cannot fetch agent scores!</div>
{/if}

<div class="ranking">
    <Loader show={loading} text="Load ranking ..." />
    {#if agent}
        {#if badges.length}
            <div class="list">
                <div class="badges">
                    {#each badges as badge}
                        <Badge {badge} />
                    {/each}
                </div>
            </div>
        {/if}
        <div class={badges.length <= 0 ? "agent-report-card-without-badge" : "agent-report-card-with-badge"}>
            <h1>Agent Report</h1>
            <div class="filter">
                <ToggleButtonGrp
                    group={toggleGrp}
                    bind:value={filterDuration}
                    on:select={updateFilter}
                />
            </div>
            <div class="stat">
                {#if overallScore}
                    <div class="stat--box">
                        <img
                            src="https://realtorstat.com/img/badges-rectangle.png"
                            alt=""
                        />
                        <strong>{successRate(overallScore)}%</strong>
                        <div>Success Rate</div>
                    </div>

                    <div class="stat--box">
                        <img
                            src="https://realtorstat.com/img/badges-rectangle.png"
                            alt=""
                        />
                        <strong>{Math.round(overallScore.avg_dom)}</strong>
                        <div>Avg Days On Market</div>
                    </div>

                    <div class="stat--box">
                        <img
                            src="https://realtorstat.com/img/badges-rectangle.png"
                            alt=""
                        />
                        <strong
                            >{isNaN(Math.round(overallScore.s2l_price))
                                ? 0
                                : Math.round(overallScore.s2l_price)}%</strong
                        >
                        <div>List To Sell Price</div>
                    </div>

                    <div class="stat--box">
                        <img
                            src="https://realtorstat.com/img/badges-rectangle.png"
                            alt=""
                        />
                        <strong>{overallScore.sold_listings}</strong>
                        <div>Sold Listings</div>
                    </div>
                {/if}
            </div>

            <div class="city-ranking">
                <h3>City Ranking</h3>
                <RankingTable
                    agentScores={agent.agent_scores_es}
                    update={updateAgent}
                />
            </div>
        </div>
    {/if}
</div>

<style src="./agent-report.scss"></style>
