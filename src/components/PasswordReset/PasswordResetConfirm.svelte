<script>
    import { resetPasswordConfirm } from "../../lib/api/auth";
    import page from 'page';

    
    let user = {new_password1:"", new_password2:"", token:localStorage.getItem('token-up'), uid: localStorage.getItem('id-up')};
    $: btnLabel = "Submit";
    let submitting = false;
    let error = {};
    let info = {};
    let btnDisable=false;

    

    async function submit() {
        
        submitting = true;
        error = info = {};
        let res;
        res = await resetPasswordConfirm(user);
        if(res && res.status) {
            info = { detail: "We sent an email to this ID. Check and Proceed Furthur" }
            btnDisable = true;
        }else if(res && !res.status && res.uid) {
            let tempMsg = "Unique Identification Number : "
            res.uid.forEach(msg => 
            {
                tempMsg+=msg   
            });
            error = {msg: tempMsg}
        }else if(res && !res.status && res.new_password2) {
            let tempMsg = "Password : "
            res.new_password2.forEach(msg => 
            {
                tempMsg+=msg   
            });
            error = {msg: tempMsg}
        }else if(res && !res.status && res.new_password1) {
            let tempMsg = "Password : "
            res.new_password1.forEach(msg => 
            {
                tempMsg+=msg   
            });
            error = {msg: tempMsg}
        }else if(res && !res.status && res.token) {
            let tempMsg = "Authentication Token : "
            res.token.forEach(msg => 
            {
                tempMsg+=msg   
            });
            error = {msg: tempMsg}
        }else {
            error = {msg: "Something went wrong when trying to attempt Password Reset Verification. Try after some time"}
        }
        submitting = false;
    }

    function downLogin(e) {
        if (e.keyCode == 13) {
            submit();
        }
    }
</script>

<div class="login-form">
    <input
        class="input"
        bind:value={user.new_password1}
        type="password"
        placeholder="Enter New Password"
    />
    <input
        class="input"
        bind:value={user.new_password2}
        type="password"
        placeholder="Confirm New Password"
    />
    {#if error.msg}
        <div class="error">{error.msg}</div>
    {/if}
    {#if info.detail}
        <div class="info">{info.detail}</div>
    {/if}
    <button class="btn" class:submitting on:click={submit} disabled={btnDisable} hidden={btnDisable}
        >{submitting ? "Processing..." : btnLabel}</button
    >
</div>

<style src="../LoginForm/login-form.scss"></style>
