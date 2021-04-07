<script>
    import { createEventDispatcher } from "svelte";
    import { setReferralStatus } from "../../lib/api/referral";
    import util from "../../lib/util";
    import { modal } from "../../stores/modal";
    import Agreement from "./Agreement.svelte";
    import DeclineMsg from "./DeclineMsg.svelte";

    const dispatch = createEventDispatcher()
    export let referrals = []

    function timeLeft(distance){
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";        
    }

    function setRefInterval(ref){
        let tout = setInterval(async () => {
            let now = new Date().getTime();
            let expTime = new Date(ref.created_at)
            expTime.setTime(expTime.getTime() + (ref.acceptance_deadline*60*60*1000))
            let countDownDate = expTime.getTime();
            let tleft = countDownDate - now;
            if(tleft<0){
                ref.time_left = 'Expired'
                clearInterval(tout)
                await setReferralStatus(ref.id, {status: 'expired'})
                dispatch('finish')
            }else{
                ref.time_left = timeLeft(tleft)
                referrals = referrals
            }
        },1000)
    }

    function setTimeLeft(){
        for(let ref of referrals){
            ref.time_left = 'Calculating...'
            setRefInterval(ref)            
        }
    }

    function declineComplete(){
        $modal = {show: false}
        dispatch('finish')
    }

    function msgDecline(ref){
        $modal = {
            show: true,
            cmp: DeclineMsg,
            title: 'Decline Referral',
            complete: declineComplete,
            props: {
                ref
            }
        }
    }

    async function complete(ref){
        await setReferralStatus(ref.id, {
            status: 'accept',
            receiver_sign_img: ref.receiver_sign_img
        })
        dispatch('finish')
    }

    function showAgreement(ref){
        let agent = ref.sender_agent_obj
        $modal = {
            show: true,
            cmp: Agreement,
            complete,
            title: 'REFERRAL AGREEMENT',
            props: {
                ref,
                agent,
                receiver: true
            }
        }
    }

    let llength = 0
    $: if(referrals && referrals.length != llength){
        llength = referrals.length
        setTimeLeft()
    }
</script>

<div class="referrals">
    {#each referrals as ref}
        <div class="referral">
            <div class="grid-2 img">
                <img src="/images/blank-profile-pic.webp" alt="profile pic">
                <div> 
                    <div class="label">
                        Referral Agent
                    </div>
                    <a class="value link" href={ref.sender_agent_obj.screen_name} target="_blank">{ref.sender_agent_obj.name}</a>
                </div>
            </div>
            <div class="body">
                <div>
                    <div class="title">GENERAL INFO</div>
                    <div class="label">Referral Location</div>
                    <div class="value">{ref.sender_agent_obj.address}</div>
            
                    <div class="grid-2">
                        <div class="label">Referral Fee</div>
                        <div class="label">Price Range</div>
                        <div class="value">%{ref.referral_fee_percentage}</div>
                        <div class="value">{util.currencyFormat(ref.price_min)} - {util.currencyFormat(ref.price_max)}</div>
                    </div>
                    <div class="flex">
                        <div class="label">Sent: </div>
                        <div class="value">{util.niceDateTime(ref.created_at)}</div>
                    </div>            
                    <div class="label mt">
                        Expires
                    </div>
                    <div class="flex">
                        <div class="time-wrapper">
                            {ref.time_left}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="title">CLIENT INFO</div>
                    <div class="label">Name</div>
                    <div class="value">{ref.first_name} {ref.last_name}</div>
                    <div class="label mt">Address</div>
                    <div class="value">{ref.address}</div>
                    <div class="label mt">Notes</div>
                    <div class="label">{ref.notes}</div>
                </div>
            </div>

            <div class="control">
                <button class="btn green" on:click={() => showAgreement(ref)}>Accept</button>
                <button class="btn red" on:click={() => msgDecline(ref)}>Decline</button>
            </div>
        </div>

    {/each}
</div>

<style src="./pending-referrals.scss"></style>