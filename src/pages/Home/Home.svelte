<script>
    import {AgentList, SearchBar} from '../../components'
    let filter = {}
    let searchAgents 
    function reloadAgents(){
        searchAgents && searchAgents(filter)
    }
</script>

<section class="filter">
    <SearchBar bind:filter on:search={reloadAgents} />
</section>

<section class="list-agents">
    <AgentList bind:searchAgents />
</section>

<style src="./home.scss"></style>