<script>
    import {NavBar, ProfileClaim, NewProfileForm} from '../../components'
    import {modal} from '../../stores/modal'
    import {newAgentProfile} from '../../lib/api'

    let profile_requested = false

    async function addNewProfile(agent){

        await newAgentProfile(agent)
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
</script>

<NavBar />
<div class="connect-profile">
    <div class="body">
        <div class="head">
            <h1>Claim Your Profile</h1>
            <div class="link" role="button" on:click={addProfile}>Can't find yourself in our system?</div>
        </div>
        <div class="search">
            {#if profile_requested}
                <div class="success">Thank you, we will reach out to you shortly</div>
            {:else}
                <ProfileClaim />
            {/if}
        </div>
    </div>
</div>

<style src="./connect-profile.scss"></style>