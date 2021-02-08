<script>
    import {
        BasicInfo,
        LicenseInfo,
        NavBar
    } from '../../components'

    let selected_tab = 'basic_info'
    const tabs = [
        {name: 'Basic Information', key: 'basic_info', img: '/images/info-icon.png', cmp: BasicInfo},
        {name: 'Licence Information', key: 'license_info', img: '/images/license-icon.png', cmp: LicenseInfo},
        {name: 'Highlights', key: 'highlights', img: '/images/Highlight-icon.png'},
        {name: 'Commission', key: 'commission', img: '/images/Commision-icon.png'},
        {name: 'Reviews', key: 'reviews', img: '/images/review-icon.png'},
        {name: 'Social Media', key: 'social_media', img: '/images/social-media-icon.png'},
        {name: 'About Me', key: 'about_me', img: '/images/about-me-icon.png'}
    ]

    function selectTab(key){
        selected_tab = key
    }
</script>

<NavBar />
<section class="profile-settings">
    <div class="tabs">
        <h1 class="tabs--head">Profile Settings</h1>
        {#each tabs as tab}
            <div class="tab" class:selected={tab.key==selected_tab} on:click={() => selectTab(tab.key)}>
                <img src={tab.img} alt={tab.name} />
                {tab.name}
            </div>
        {/each}
    </div>
    <div class="details">

        {#each tabs as tab}
            <div class="p-section" class:selected={tab.key==selected_tab}>
                <div class="head">
                    <img src={tab.img} alt={tab.name} />
                    {tab.name}
                </div>
                <div class="body">
                    {#if tab.cmp}
                        <svelte:component this={tab.cmp} />
                    {:else}
                        -- TODO CMP --
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</section>

<style src="./profile-settings.scss"></style>