<script>
    import {onMount} from 'svelte'
    import {NavBar, LoginForm} from '../../components'
    let tab = "login"
    let urlParams
    let msg
    onMount(() => {
        urlParams = new URLSearchParams(location.search);
        msg = urlParams.get('success')||urlParams.get('error')
    })


</script>


<NavBar />


<div class="login">
    {#if msg}
        <h1 class:success={urlParams.get('success')} class:error={urlParams.get('error')}>{msg}</h1>
    {/if}
    <div class="login--box">
        <div class="tabs">
            <div class="tab" class:selected={tab=='login'} on:click={() => tab='login'}>Login</div>
            <div class="tab" class:selected={tab=='signup'} on:click={() => tab= 'signup'}>Sign Up</div>
        </div>
        <div class="forms">
            <LoginForm state={tab} />
        </div>
        <div class="terms">
            <a href="/static/terms.pdf" target="_blank">
                By continuing, you agree to AgentStat’s "Terms of Use & Privacy Policy"
            </a>
        </div>
    </div>
</div>

<style src="./login.scss"></style>