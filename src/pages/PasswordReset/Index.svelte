<script>
    import {NavBar, FooterDashboard} from '../../components';
    import PasswordReset from './PasswordReset.svelte';

    export let id
    export let token


</script>

<div>

    <NavBar />

        <div>
            <PasswordReset id={id} token={token} />
        </div>

    <FooterDashboard />

</div>