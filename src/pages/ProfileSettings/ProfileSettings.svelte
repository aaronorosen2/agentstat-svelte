<script>
    import {
        BasicInfo,
        LicenseInfo,
        Highlights,
        Commission,
        SocialMedia,
        About,
        NavBar,
        Loader
    } from '../../components'

    import { show as showNotif } from '../../stores/notif'

    import { agentProfile, saveProfileSettings } from '../../lib/api/profile'

    let agent
    let saving = false
    let loading = true
    let selected_tab = 'basic_info'
    const tabs = [
        {name: 'Basic Information', key: 'basic_info', img: '/images/info-icon.png', cmp: BasicInfo},
        {name: 'Licence Information', key: 'license_info', img: '/images/license-icon.png', cmp: LicenseInfo},
        {name: 'Highlights', key: 'highlights', img: '/images/Highlight-icon.png', cmp: Highlights},
        {name: 'Commission', key: 'commission', img: '/images/Commision-icon.png', cmp: Commission},
        {name: 'Reviews', key: 'reviews', img: '/images/review-icon.png'},
        {name: 'Social Media', key: 'social_media', img: '/images/social-media-icon.png', cmp: SocialMedia},
        {name: 'About Me', key: 'about_me', img: '/images/about-me-icon.png', cmp: About}
    ]

    function selectTab(key){
        selected_tab = key
    }
    async function initProfile(){
        
        try{
            agent = await agentProfile()
        }catch(e){
            console.error(e.message)
        }
        loading = false
    }

    async function saveProfile(){
        saving = true
        if(!agent.picture || agent.picture.startsWith('http'))
            delete agent.picture
        await saveProfileSettings(agent)
        saving = false
        showNotif('Profile Saved Successfully !')
    }

    initProfile()
</script>

<section class="profile">
    <NavBar />
    <Loader show={loading} text="Load Profile..."/>
    {#if agent}
        <div class="profile-settings">
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
                                <svelte:component this={tab.cmp} {agent} on:save={saveProfile} saving={saving} />
                            {:else}
                                -- TODO CMP --
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {:else if !loading}
        <div class="error">Can't load profile details</div>
    {/if}
</section>

<style src="./profile-settings.scss"></style>