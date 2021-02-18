<script>
    import {NavDashboard, ProfileClaim, NewProfileForm, Loader} from '../../components'
    import {modal} from '../../stores/modal'
    import {newAgentProfile} from '../../lib/api'
    import {checkAgentConnect} from '../../lib/api/profile'
    import {currentUser, setUser} from '../../lib/api/auth'

    let profile_requested = false
    let new_profile_error = false

    async function addNewProfile(agent){
        new_profile_error = false
        try {
            let res = await newAgentProfile(agent)
            if(res && !res.id){
                new_profile_error = true
            }
        }catch{
            new_profile_error = true
        }
        $modal = {show: false}
        profile_requested = true
    }

    function addProfile(){
        $modal = {
            show: true,
            cmp: NewProfileForm,
            complete: addNewProfile,
            title: 'Request Your Agent Profile'
        }
    }

    let loading = false
    let pending_dispute = false
    async function checkCurrentDispute(){
        let user = currentUser()
        pending_dispute = user.pending_dispute
        if(pending_dispute === undefined) {
            loading = true
            try {
                let res = await checkAgentConnect()
                pending_dispute = res.sent_dispute
            }catch(e){
                console.error(e)
                pending_dispute = true
            }
            loading = false
            user.pending_dispute = pending_dispute
            setUser(user)
        }
    }

    checkCurrentDispute()
</script>

<NavDashboard empty />
<div class="connect-profile">
    <div class="body">
        {#if pending_dispute}
                <div class="error">Disputed profile is under review by admin. We'll take decision within 48 hours.</div>
        {:else}
            <div class="head">
                <h1>Claim Your Profile</h1>
                <div class="link" role="button" on:click={addProfile}>Can't find yourself in our system?</div>
            </div>
            <div class="search">
                <Loader show={loading} text="Loading..." />
                {#if new_profile_error}
                    <div class="error">Error occured while creating your profile, Please try again later.</div>
                {:else if profile_requested}
                    <div class="success">Thank you, we will reach out to you shortly</div>
                {:else}
                    <ProfileClaim />
                {/if}
            </div>
        {/if}
    </div>
</div>

<style src="./connect-profile.scss"></style>