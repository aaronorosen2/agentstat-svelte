<script>
    import {AgentList, NavBar, Pagination} from '../../components'
 
    let searchAgents 
    let setUrlParams
    let filter
    let numItems = 0;
    let current = 1;
    async function reloadAgents(evt){
        filter = evt.detail
        let list = searchAgents && await searchAgents(filter)
        numItems = list.total
        current = filter.page ? parseInt(filter.page) : 1
    }

    function setParams(evt){
        filter = evt.detail
        setUrlParams && setUrlParams(filter)
    }

    function paginate(evt){
        filter.page=evt.detail
        setUrlParams && setUrlParams(filter)
    }
</script>

<NavBar on:search={setParams} on:load={reloadAgents} />

<section class="list-agents">
    <AgentList bind:searchAgents bind:setUrlParams />
    <Pagination {numItems} on:navigate={paginate} perPage={10} {current} />
</section>

<style src="./home.scss"></style>