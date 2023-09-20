<script>
    import PasswordReset from "../../components/PasswordReset/PasswordReset.svelte";
    import {onMount} from 'svelte';
    let tab = "reset-password"
    export let id
    export let token
    let urlParams
    let msg
    onMount(() => {
        urlParams = new URLSearchParams(location.search);
        msg = urlParams.get('success')||urlParams.get('error')
    })

    async function tokenVerification() {
        if(id && token) {
            localStorage.setItem('token-up',token)
            localStorage.setItem('id-up',id)
            window.location = "/reset-password/"+id
        }
    }

    if(token){
        tokenVerification()
    }
</script>

<div>
    <div class="login">
        {#if msg}
            <h1 class:success={urlParams.get('success')} class:error={urlParams.get('error')}>{msg}</h1>
        {/if}
        <div class="login--box">
            <div class="tabs">
                <div class="tab" class:selected={tab=='reset-password'}>Reset Password</div>
            </div>
            <div class="forms">
                <PasswordReset />
            </div>
            <div class="terms">
                <a href="/static/terms.pdf" target="_blank">
                    By continuing, you agree to AgentStat’s "Terms of Use & Privacy Policy"
                </a>
            </div>
        </div>
    </div>
</div>

<style src="../Login/login.scss"></style>
