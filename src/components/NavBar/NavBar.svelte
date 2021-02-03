<script>
    import SearchBar from '../SearchBar/SearchBar.svelte'
    import {isAuthenticated, logout} from '../../lib/api/auth'

    let is_authenticated = isAuthenticated()
    function logoutUser(){
        logout()
        is_authenticated = false
    }
</script>

<nav class="nav-bar">
    <a href="/" class="logo">
        <img alt="agentstat-logo" src="/images/logo-beta.png"> 
    </a>
    <div class="filter">
        <SearchBar on:load on:search />
    </div>
    <div class="links">
        {#if !is_authenticated}
            <a class="link" href="/login">Login</a>
        {:else}
            <div class="link" on:click={logoutUser}>Logout</div>
        {/if}
    </div>
</nav>

<style src="./navbar.scss"></style>