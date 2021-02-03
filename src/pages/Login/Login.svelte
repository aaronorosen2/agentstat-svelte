<script>
  
    import {NavBar, LoginForm} from '../../components'

    let tab = "login"

    function setParams(evt) {
        let filter = evt.detail;
        window.location = "/?" + getAgentUrlParams(filter);
    }


</script>


<NavBar on:search={setParams} />


<div class="login">
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