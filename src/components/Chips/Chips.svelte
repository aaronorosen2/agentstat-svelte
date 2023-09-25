<script>
    export let items = []

    function removeItem(i){
        items.splice(i,1)
        items = items
    }

    function handleKeyDown() {}
</script>

{#if items}
    <div class="chips">
        {#each items as item,i}
            <div class="chip">
                {item}
                <div class="close" on:click={()=>removeItem(i)} on:keydown={handleKeyDown}>
                    <i class="fas fa-times"/>
                </div>
            </div>
        {/each}
    </div>
{/if}

<style src="./chips.scss"></style>
