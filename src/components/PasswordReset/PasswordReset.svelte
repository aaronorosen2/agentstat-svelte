<script>
    import { resetPassword } from "../../lib/api/auth";
    import page from 'page';

    
    let user = {email:""};
    $: btnLabel = "Reset Password";
    let submitting = false;
    let error = {};
    let info = {};
    let btnDisable=false;

    

    async function submit() {
        
        submitting = true;
        error = info = {};
        let res;
        res = await resetPassword(user);
        if(res && res.status) {
            info = { detail: "We sent an email to this ID. Check and Proceed Furthur" }
            btnDisable = true;
        }else if(res && !res.status) {
            error = {msg: res}
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
        bind:value={user.email}
        type="email"
        placeholder="Email address"
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
