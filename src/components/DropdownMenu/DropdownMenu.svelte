<script>
    import { isAuthenticated, logout } from "../../lib/api/auth";
    import { onMount } from "svelte";
    import page from "page";
    import { user as currentUser } from "../../stores/user";
    let currentPage;

    let is_authenticated = isAuthenticated();
    function logoutUser() {
        logout();
        is_authenticated = false;
        page.redirect("/");
    }

    let open = false;

    function toggle() {
        open = !open;
    }

    function close() {
        open = false;
    }

    onMount(() => {
        currentPage = location.pathname;
    });
</script>

<svelte:window on:click={close} />
{#if !is_authenticated}
    <div class="unauth-menu">
        {#if currentPage != "/about-us"}
            <a class="nav-link" href="/about-us">About Us</a>
        {/if}
        {#if currentPage != "/login"}
            <a class="nav-link" href="/login">Login</a>
        {/if}
    </div>
{:else}
    <div class="dropdown">
        <div class="dropdown--head" on:click|stopPropagation={toggle}>
            <img
                src={$currentUser.picture || "/images/blank-profile-pic.webp"}
                alt="user"
            />
            <i class="fas fa-chevron-down" />
        </div>
        <div class="links" class:open>
            <a class="link" href="/inbox">
                <div class="l-name">Dashboard</div>
                <div class="l-desc">View your stats and backend</div>
            </a>

            <a class="link" href="/profile-settings">
                <div class="l-name">Profile Settings</div>
                <div class="l-desc">
                    Edit your profile info and account settings
                </div>
            </a>

            <div class="link" on:click={logoutUser}>
                <div class="l-name">Logout</div>
            </div>
        </div>
    </div>
{/if}

<style src="./dropdown-menu.scss"></style>
