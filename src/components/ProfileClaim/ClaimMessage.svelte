<script>
    export let complete = null
    function cancel(){
        complete && complete('cancel')
    }
    function claim(){
        complete && complete('claim')
    }
</script>

<div class="claim-msg">
    <h1>Profile already claimed!</h1>
    <p>
        Do you want to dispute the claim and provide proof of identity?
    </p>
    <div class="control">
        <button class="btn btn-cancel" on:click={cancel}>Cancel</button>
        <button class="btn" on:click={claim}>Claim</button>
    </div>
</div>

<style src="./claim-msg.scss"></style>