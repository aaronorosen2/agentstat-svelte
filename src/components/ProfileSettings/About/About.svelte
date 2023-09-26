<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    function save(){
        dispatch('save')
    }
    export let agent
    export let saving
</script>

<div class="about">
    <textarea placeholder="Type here ..." rows="20" bind:value={agent.about_me} ></textarea>
    <div class="reverse">
        <button class="btn" class:disabled={saving} on:click={save}>{saving? 'Saving...':'Save'}</button>
    </div>
</div>

<style src="./about.scss"></style>