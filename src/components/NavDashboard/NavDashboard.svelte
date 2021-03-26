<script>
    import DropdownMenu from '../DropdownMenu/DropdownMenu.svelte'
    import {currentUser} from '../../lib/api/auth'
    import { fetchNotifs } from '../../lib/api/profile'
    import { profileNotif } from '../../stores/notif'

    export let segment = ''
    export let empty = false
    let navOpen = false
    function toggleNav(){
        navOpen = !navOpen
    }

    async function getNotifs(){
        $profileNotif = await fetchNotifs()
    }

    getNotifs()
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
            <a class:selected={segment == 'inbox'} href="/inbox">Inbox
                {#if $profileNotif.inbox}
                    <span class="notif-badge">{$profileNotif.inbox}</span>
                {/if}
            </a>
            <a class:selected={segment == 'reports'} href="/reports">Reporting</a>
            <a class:selected={segment == 'marketing'} href="/marketing">Marketing</a>
            <a class:selected={segment == 'past-sales'} href="/past-sales">Sales</a>
            <a class:selected={segment == 'referrals'} href="/referrals">Referrals
                {#if $profileNotif.referral}
                    <span class="notif-badge">{$profileNotif.referral}</span>
                {/if}
            </a>
            <a href="/team">Team</a>
        {/if}
    </div>

    <div class="links" class:open={navOpen}>
        {#if currentUser().agent_slug}
            <a href="/profile/{currentUser().agent_slug}" target="_blank">My Profile</a>
        {/if}
        <DropdownMenu />
    </div>
</nav>

<style src="./nav-dashboard.scss"></style>