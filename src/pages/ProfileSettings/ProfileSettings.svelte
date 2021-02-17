<script>
    import {
        BasicInfo,
        LicenseInfo,
        Highlights,
        Commission,
        SocialMedia,
        About,
        NavBar,
        AgentReview,
        ReviewForm,
        ImportFromZillow,
        Loader
    } from '../../components'

    import { show as showNotif } from '../../stores/notif'
    import { modal } from '../../stores/modal'
    import { setCurrentUserPic } from '../../lib/api/auth'
    import { agentProfile, saveProfileSettings, agentReview, syncZillowReview } from '../../lib/api/profile'
    

    let agent
    let agent_review
    let saving = false
    let loading = true
    let selected_tab = 'basic_info'
    const tabs = [
        {name: 'Basic Information', key: 'basic_info', img: '/images/info-icon.png', cmp: BasicInfo},
        {name: 'Licence Information', key: 'license_info', img: '/images/license-icon.png', cmp: LicenseInfo},
        {name: 'Highlights', key: 'highlights', img: '/images/Highlight-icon.png', cmp: Highlights},
        {name: 'Commission', key: 'commission', img: '/images/Commision-icon.png', cmp: Commission},
        {name: 'Reviews', key: 'reviews', img: '/images/review-icon.png', cmp: AgentReview},
        {name: 'Social Media', key: 'social_media', img: '/images/social-media-icon.png', cmp: SocialMedia},
        {name: 'About Me', key: 'about_me', img: '/images/about-me-icon.png', cmp: About}
    ]

    function selectTab(key){
        selected_tab = key
    }
    async function initProfile(){
        
        try{
            agent = await agentProfile()
            agent.picture && setCurrentUserPic(agent.picture)
            agent_review = await agentReview()
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

    async function fetchReviews(){
        $modal = {show: false}
        agent_review = await agentReview()
    }

    function addReview(){
        $modal = {
            show: true,
            cmp: ReviewForm,
            complete: fetchReviews,
            title: 'Add Review'
        } 
    }

    let review_success = ''
    async function processZillowImport(link){
        $modal = {show: false}
        await syncZillowReview(link)
        review_success = 'SUCCESS! Please allow 24 hours for reviews to import.'
        agent_review.allow_sync = false
    }

    function importFromZillow(){
        $modal = {
            show: true,
            cmp: ImportFromZillow,
            complete: processZillowImport,
            title: 'Import From Zillow',
            props: {link: agent && agent.connector && agent.connector.zillow_profile_link}

        }
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
                            {#if tab.key == 'reviews'}
                                <div class="control">
                                    <button class="btn" on:click={addReview}>Add review</button>
                                    {#if agent_review && agent_review.allow_sync}
                                        <button class="btn btn-blue" on:click={importFromZillow}>Import From Zillow</button>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        <div class="body">
                            {#if tab.key == 'reviews' && review_success}
                                <div class="success">{review_success}</div>
                            {/if}    
                            <svelte:component this={tab.cmp} agent={tab.key != 'reviews' ? agent: agent_review} on:save={saveProfile} saving={saving} />
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