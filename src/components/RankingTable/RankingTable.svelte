<script>
    import Pagination from '../Pagination/Pagination.svelte'
    export let agentScores
    export let update= true

    let limit = 10
    let current = 1
    
    $: offset = (current-1)*limit

    let groups = []
    
    $: if(agentScores && update){
        groups = []
        update = false
        let items = agentScores.filter(i => i.city&&i.agent_rank)
                .sort((a,b) => a.city>b.city || (a.city == b.city && String(a.home_type)<String(b.home_type)) ? 1 : -1)
                
        let i =-1;
        for(let item of items){
            if(!item.home_type){
                groups.push([item])
                i++
            }else{
                if(groups[i])
                    groups[i].push(item)
                else {
                    groups.push([item])
                    i++
                }
            }
        }
        groups = groups
    }

    $: list_groups = groups.slice(offset, offset+limit)

    function successRate(item){
        let percantege =  (100 - ((item.failed_listings / item.sold_listings) * 100));
        return Math.round(percantege);
    }

    function toggleGrp(grp){
        grp.open = !grp.open
        list_groups = list_groups
    }

    function handleKeyDown() {}
</script>


<div class="ranking">
    <div class="container">    
        <table>
            <thead>
                <tr>
                    <th>
                        City
                    </th>
                    <th>
                        Property Type
                    </th>
                    <th>
                        Rank
                    </th>
                    <th>
                        Success Rate
                    </th>
                    <th>
                        List of Sell Price
                    </th>
                    <th>
                        Days on Market
                    </th>
                    <th>
                        # Sold
                    </th>
                    <th>
                        # Failed
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each list_groups as grp}
                    {#each grp as item,i}
                        {#if i == 0 || grp.open}
                            <tr>
                                <td >
                                    {#if i == 0 }
                                    <div on:click={()=>toggleGrp(grp)} on:keydown={handleKeyDown}>
                                        {item.city}
                                        {#if grp.length>1}
                                            <i class="fas fa-chevron-{grp.open ? 'down':'right'}"  />
                                        {/if}
                                    </div>
                                    {/if}
                                </td>
                                <td>{item.home_type ? item.home_type : 'Overall'}</td>
                                <td><div>{item.agent_rank} / {item.rank_count}</div></td>
                                <td>{successRate(item)}</td>
                                <td>{isNaN(Math.round(item.s2l_price)) ? 0 : Math.round(item.s2l_price)}%</td>
                                <td>{item.avg_dom ? Math.round(item.avg_dom): 0}</td>
                                <td>{item.sold_listings}</td>
                                <td>{item.failed_listings}</td>
                            </tr>
                        {/if}
                    {/each}
                {/each}
            </tbody>
        </table>
    </div>
    <div class="paginate">
        {#if groups.length>limit}
            <Pagination perPage={limit} numItems={groups.length} bind:current />
        {/if}
    </div>
</div>

<style src="./ranking-table.scss"></style>