<script>
    import {NavBar, ProfileClaim, NewProfileForm} from '../../components'
    import {modal} from '../../stores/modal'

    function addProfile(){
        $modal = {
            show: true,
            cmp: NewProfileForm,
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
            <ProfileClaim />
        </div>
    </div>
</div>

<style src="./connect-profile.scss"></style>