<script>
    import {createEventDispatcher} from 'svelte'
    export let value = ""
    export let placeholder = "Search By Agent Name"
    const dispatch = createEventDispatcher()

    function handleKeyDown(e){
        if(e.keyCode == 13){
            dispatch('search', value)
        }
    }
</script>

<div class="search-input">
    <input type="search" {placeholder} class="input" bind:value on:keydown={handleKeyDown}>
</div>

<style src="./search-input.scss"></style>