<script>
    import {modal} from '../../stores/modal'

    function close(){
        $modal.close && $modal.close()
        $modal = {show: false}
    }
    
    function handleKeyDown() {}
</script>

{#if $modal.show}
    <div class="modal" on:click={close} on:keydown={handleKeyDown}>
        <div class="container" on:click|stopPropagation on:keydown={handleKeyDown}>
            {#if $modal.title}
                <div class="head">
                    {$modal.title}
                    <i class="fas fa-times" on:click={close} on:keydown={handleKeyDown}></i>
                </div>
            {/if}
            <div class="body">
                <svelte:component this={$modal.cmp} {...$modal.props} complete={$modal.complete} />
            </div>
        </div>
    </div>
{/if}


<style src="./modal.scss"></style>