<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function save() {
        dispatch("save");
    }
    export let agent
    export let saving
</script>

<div class="social-media">
    <label for="Website">Website</label>
    <input class="input" placeholder="Company website URL" bind:value={agent.website} />
    
    <label for="Blog">Blog</label>
    <input class="input" placeholder="Blog URL" bind:value={agent.blog} />
    
    <label for="Facebook">Facebook</label>
    <input class="input" placeholder="Facebook Profile URL" bind:value={agent.facebook} />
    
    <label for="Twitter">Twitter</label>
    <input class="input" placeholder="Twitter Profile URL" bind:value={agent.twitter} />
    
    <label for="Linkedin">Linkedin</label>
    <input class="input" placeholder="Linkedin Profile URL" bind:value={agent.linkedin} />

    <div class="reverse">
        <button class="btn" class:disabled={saving} on:click={save}>{saving ? 'Saving...':'Save'}</button>
    </div>
</div>

<style src="./social-media.scss"></style>