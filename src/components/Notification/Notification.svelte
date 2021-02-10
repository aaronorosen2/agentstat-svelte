<script>
    import {fly} from 'svelte/transition'
    export let msg = ''
    export let show = false
</script>

{#if show}
    <div transition:fly={{duration: 300}} class="notif">
        {msg}
        <i class="fas fa-times" on:click={()=> show=false}></i>
    </div>
{/if}

<style src="./notification.scss"></style>