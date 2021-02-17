<script>
    import {modal} from '../../stores/modal'

    function close(){
        $modal = {show: false}
    }
</script>

{#if $modal.show}
    <div class="modal" on:click={close}>
        <div class="container" on:click|stopPropagation>
            {#if $modal.title}
                <div class="head">
                    {$modal.title}
                    <i class="fas fa-times" on:click={close}></i>
                </div>
            {/if}
            <div class="body">
                <svelte:component this={$modal.cmp} {...$modal.props} complete={$modal.complete} />
            </div>
        </div>
    </div>
{/if}


<style src="./modal.scss"></style>