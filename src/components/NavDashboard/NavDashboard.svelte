<script>
    import DropdownMenu from '../DropdownMenu/DropdownMenu.svelte'
    import {currentUser} from '../../lib/api/auth'
    export let empty = false
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
        {#if !empty}
            <a href="/inbox">Inbox</a>
            <a href="/reports">Reporting</a>
            <a href="/marketing">Marketing</a>
            <a href="/past-sales">Sales</a>
            <a href="/referals">Referals</a>
            <a href="/team">Team</a>
        {/if}
    </div>

    <div class="links" class:open={navOpen}>
        <a href="/profile/{currentUser().agent_slug}" target="_blank">My Profile</a>
        <DropdownMenu />
    </div>
</nav>

<style src="./nav-dashboard.scss"></style>