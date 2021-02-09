<script>
    export let items = []

    function removeItem(i){
        items.splice(i,1)
        items = items
    }
</script>

<div class="chips">
    {#each items as item,i}
        <div class="chip">
            {item}
            <div class="close" on:click={()=>removeItem(i)}>
                <i class="fas fa-times"/>
            </div>
        </div>
    {/each}
</div>

<style src="./chips.scss"></style>
