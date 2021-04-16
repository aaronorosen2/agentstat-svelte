<script>
    import {AgentList, NavBar, Pagination, FooterDashboard} from '../../components'
 
    let searchAgents 
    let updateParams
    let filter
    let numItems = 0;
    let current = 1;
    async function reloadAgents(evt){
        filter = evt.detail
        let list = searchAgents && await searchAgents(filter)
        numItems = list.total
        current = filter.page ? parseInt(filter.page) : 1
    }

    function paginate(evt){
        filter.page = evt.detail
        updateParams && updateParams({detail: filter})
    }
</script>

<NavBar on:load={reloadAgents} bind:updateParams />
<section class="list-agents">
    <AgentList bind:searchAgents />
    <Pagination {numItems} on:navigate={paginate} perPage={10} {current} />
</section>

<FooterDashboard></FooterDashboard>

<style src="./agents.scss"></style>