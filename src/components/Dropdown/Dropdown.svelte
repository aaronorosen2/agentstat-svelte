<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    export let radius = 'center' // left, right, none, center
    export let border = 'both' // left, right, none, both
    export let options = []
    export let selected = options[0]
    export let error = false
    let open = false

    function label(opt){
        return opt.label || val(opt)
    }

    function val(opt){
        return opt.value || opt
    }

    function toggle(){
        open = !open
    }

    function selectOption(opt){
        selected = opt
        dispatch('select', opt)
        open = false
    }

    function close(){
        open = false
    }

    $: if(!selected || !options.find(o => label(o)==label(selected)||val(o)==val(selected))){
        selected = options[0]
    }

    $: errorClass = error ? 'selected--error':''

    function handleKeyDown() {}
</script>

<svelte:window on:click={close} />
<div class="dropdown">
    <div class="selected {errorClass} radius--{radius} border--{border}" on:click|stopPropagation={toggle} on:keydown={handleKeyDown}>
        {label(selected)}
        <i class="fas fa-chevron-{open ? 'up':'down'}">
    </div>
    {#if open}
        <div class="options">
            {#each options as opt}
                <div class="options--item {label(opt) == label(selected) ? 'selected':''}" on:click={() => selectOption(opt)} on:keydown={handleKeyDown}>
                    {label(opt)}
                </div>
            {/each}
        </div>
    {/if}
</div>


<style src="./dropdown.scss"></style>