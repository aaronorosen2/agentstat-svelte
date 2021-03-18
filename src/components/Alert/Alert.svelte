<script>
    export let msg = ""
    export let show= true;
    export {klass as class}
    let klass = "warning"

    function close(){
        show=false
    }

</script>

{#if show}
    <div class="alert {klass}">
        <i class="fas fa-times" on:click={close}></i>
        <span>Note:</span> {msg}
    </div>
{/if}

<style src="./alert.scss"></style>