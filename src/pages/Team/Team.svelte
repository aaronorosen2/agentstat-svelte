<script>
    import {NavDashboard, FooterDashboard} from '../../components'
    export let segment = ''
</script>

<NavDashboard {segment} />
<div class="team">
    <h1>Coming Soon</h1>
</div>

<FooterDashboard />

<style>
    .team{
        min-height: 75vh;
    }
    h1{
        text-align: center;
    }
</style>
