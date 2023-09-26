<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    export let value
    export let group

    function select(val){
        value=val
        dispatch('select',value)
        
    }

    function handleKeyDown() {}
</script>

<div class="toggle-grp">
    {#each group as item}
        <div role="button" class="item" class:selected={item.value==value} on:click={()=>select(item.value)} on:keydown={handleKeyDown} tabindex='0'>
            {item.label}
        </div>
    {/each}
</div>

<style src="./toggle-button-grp.scss"></style>