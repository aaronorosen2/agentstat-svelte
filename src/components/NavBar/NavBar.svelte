<script>
    import {getAgentUrlParams} from '../../lib/api'
    import SearchBar from '../SearchBar/SearchBar.svelte'
    import DropdownMenu from '../DropdownMenu/DropdownMenu.svelte'

    

    function updateParams(evt){
        window.location = "/?" + getAgentUrlParams(evt.detail);
    }

    let navOpen = false
    function toggleNav(){
        navOpen = !navOpen
    }
</script>

<nav class="nav-bar">
    <div class="nav-bar--head">
        <a href="/" class="logo">
            <img alt="agentstat-logo" src="/images/logo-beta.png"> 
        </a>
        <div class="nav-icon" on:click={toggleNav}>
            <i class="fas fa-bars"></i>
        </div>
    </div>

    <div class="filter" class:open={navOpen}>
        <SearchBar on:load on:search={updateParams} />
    </div>
    <div class="links" class:open={navOpen}>
        <DropdownMenu />
    </div>
</nav>

<style src="./navbar.scss"></style>