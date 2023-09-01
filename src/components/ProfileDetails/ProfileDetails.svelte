<script>
    import Stars from '../Stars/Stars.svelte'
    import ReviewDetails from './ReviewDetails.svelte'
    import {agentReview} from '../../lib/api/profile'
    import {modal} from '../../stores/modal'
    import {currentUser, setUser} from '../../lib/api/auth'
    import {show as showNotif} from '../../stores/notif'
    import page from 'page'
    import ClaimMessage from '../ProfileClaim/ClaimMessage.svelte'
    import DisputeForm from '../ProfileClaim/DisputeForm.svelte'
    import {claimAgent, reClaimAgent} from '../../lib/api'

    export let agent

    let loading = true
    let agent_review
    
    async function getReviews(){
        agent_review = await agentReview(agent.id)
        loading = false
    }
    getReviews()

    function showReviewDetails(){
        $modal = {
            show: true,
            cmp: ReviewDetails,
            title: 'Agent Reviews',
            props: {
                reviews: agent_review.average_review_categories
            }
        }
    }

    async function reClaim(agent, data){
        let reclaimed_profile_error = false
        let user = currentUser()
        data.agent_profile_connector = agent.id
        data.dispute_web_agent = user.web_agent_id
        try {
            let res = await reClaimAgent(data)
            if(res.status == "pending"){
                // set pending dispute
                user.pending_dispute = true
                setUser(user)
            }else{
                reclaimed_profile_error = true 
            }
        }catch{
            reclaimed_profile_error = true
        }
        let msg = reclaimed_profile_error ? 
                        'Error occured while submitting your data, Please try again later!':
                        'We will review your dispute and get back to you within 48 hours'
        showNotif(msg, reclaimed_profile_error)
        $modal = {show: false}
    }

    function processClaimDispute(agent, action){
        if(action == 'claim'){
            $modal = {
                show: true,
                cmp: DisputeForm,
                complete: (data) => reClaim(agent, data),
                title: 'Dispute claim and provide proof of identity'
            }
        }else{
            $modal = {show: false}
        }
    }

    
    async function claimProfile(){
        if(currentUser().agent_id){
            showNotif('You can only claim one profile!', true)
            return
        }
        if(agent.claimed){
            $modal = {
                show: true,
                cmp: ClaimMessage,
                complete: (action) => processClaimDispute(agent, action),
                title: ''
            } 
            return
        }
        if(confirm('Are you sure you want to claim this Profile ?')){
            let claimed = await claimAgent(agent.id)
            if(claimed)
                page.redirect('/profile-settings')
            else
                showNotif('Cannot claim this profile!', true)
        }
        
    }



</script>

<div class="profile-details">
    
    <img src={agent.picture == null && agent.s3_image == null ? "/images/blank-profile-pic.webp" : `https://app.realtorstat.com/api/agent/pic/${agent.state}/${agent.picture || agent.s3_image}`} alt="not found" >
    
    <div class="info">
        <h2>{agent.full_name}</h2>
        {#if currentUser()}
            <div class="edit">
                {#if currentUser().agent_id == agent.id}
                    <a href="/profile-settings" target="_blank">(Edit Profile)</a>
                {:else}
                    <span class="link" on:click={claimProfile}>Claim Profile</span>    
                {/if}
            </div>
        {/if}
        <p>{agent.brokerage_info}</p>
        <div class="review">
            {#if agent_review && agent_review.reviews.length}
                <Stars rating={agent_review.average_review_rate} small />
                {agent_review.reviews.length} Reviews 
                <span class="link" on:click={showReviewDetails}>Details?</span>
            {:else}
                {loading ? '':'No reviews yet'}
            {/if}
        </div>

    </div>
</div>

<style src="./profile-details.scss">
</style>