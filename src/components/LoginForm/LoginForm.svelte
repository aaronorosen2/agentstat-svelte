<script>
    export let state = 'login'
    import {login, signup} from '../../lib/api/auth'
    let user = {}
    $: btnLabel = state == 'login' ? 'Login' : 'Sign up'
    let submitting = false
    let error = {}
    let info = {}

    async function submit(){
        submitting = true
        error= info ={}
        let res
        if(state == 'login'){
            res = await login(user)
        }else{
            user.password1 = user.password
            res = await signup(user)
        }
        console.log(res)
        if(res.msg)
            error = res
        else if(!res.detail && state == 'signup'){
            // show first error
            error = {msg: res[Object.keys(res)[0]][0]}
        }else if(res.detail){
            info = res
        }else{
            // redirect to home/profile page maybe
            window.location = '/'
        }
        submitting = false
    }


</script>

<div class="login-form">
    <input class="input" bind:value={user.email} type="email" placeholder="Email address"  />
    <input class="input" bind:value={user.password} type="password" placeholder="Password"  />
    {#if state=='signup'}
        <input class="input" bind:value={user.password2} type="password" placeholder="Repeat Password"  />
    {/if}
    {#if error.msg}
        <div class="error">{error.msg}</div>
    {/if}
    {#if info.detail}
        <div class="info">{info.detail}</div>
    {/if}
    <button class="btn" class:submitting on:click={submit}>{submitting ? 'Signing...': btnLabel}</button>
</div>

<style src="login-form.scss"></style>