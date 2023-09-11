<script>
    import {getAgentUrlParams} from '../../lib/api'
    import SearchBar from '../SearchBar/SearchBar.svelte'
    import DropdownMenu from '../DropdownMenu/DropdownMenu.svelte'

    export function updateParams(evt){
        window.location = "/agents/?" + getAgentUrlParams(evt.detail);
    }
    export let flat = false
    let navOpen = false
    function toggleNav(){
        navOpen = !navOpen
    }
</script>

<nav class="nav-bar" class:flat>
    <div class="nav-bar--head">
        <a href="/" class="logo">
            <img alt="agentstat-logo" src="/images/logo-beta.png"> 
        </a>
        <div class="nav-icon" on:click={toggleNav}>
            <i class="fas fa-bars"></i>
        </div>
    </div>
    {#if !flat}
    <div class="filter" class:open={navOpen}>
        <SearchBar on:load/>
    </div>
    {/if}
    <div class="links" class:open={navOpen}>
        <DropdownMenu/>
    </div>
</nav>

<style src="./navbar.scss"></style>