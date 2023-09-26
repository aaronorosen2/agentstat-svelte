<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    export let label
    export let options 

    function next(opt){
        dispatch('next',opt)
    }

    function handleKeyDown() {}
</script>

<div class="button-select">
    <h2 class="label">{label}</h2>
    <div class="grp">
        {#each options as opt}
            <div role="button" class="btn" on:click={()=>next(opt)} on:keydown={handleKeyDown} tabindex='0'>{opt}</div>
        {/each}
    </div>
</div>

<style src="./button-select.scss"></style>