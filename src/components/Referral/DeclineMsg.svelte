<script>
    import { setReferralStatus } from "../../lib/api/referral";

    export let complete
    export let ref

    let submitting = false
    let msg = ''

    async function decline(){
        submitting = true
        await setReferralStatus(ref.id, {status: 'decline', decline_reason: msg})
        submitting = false
        complete && complete()
    }

</script>

<div class="decline-msg">
    <div class="label">Reason for declining (will be sent to referring agent):</div>
    <textarea bind:value={msg} placeholder="Decline Reason" rows="15"></textarea>
    <div class="control">
        <button class="btn red" class:disabled={submitting} on:click={decline}>{submitting ? 'Declining...':'Decline'}</button>
    </div>
</div>

<style src="./decline-msg.scss"></style>