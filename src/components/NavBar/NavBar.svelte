<script>
    import SearchBar from '../SearchBar/SearchBar.svelte'
</script>

<nav class="nav-bar">
    <a href="/" class="logo">
        <img alt="agentstat-logo" src="/images/logo-beta.png"> 
    </a>
    <div class="filter">
        <SearchBar on:load on:search />
    </div>
</nav>

<style src="./navbar.scss"></style>