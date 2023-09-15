<script>
    export let msg = ""
    export let name = 'alert'
    export let remember = false
    let dismissing = localStorage.getItem('alert/'+name) && remember
    export let show= dismissing ? false : true;
    export {klass as class}
    let klass = "warning"

    function close(){
        show=false
        if(remember){
            localStorage.setItem('alert/'+name,true)
        }
    }

    function handleKeyDown() {}

</script>

{#if show}
    <div class="alert {klass}">
        <i class="fas fa-times" on:click={close} on:keydown={handleKeyDown}></i>
        <span>Note:</span> {msg}
    </div>
{/if}

<style src="./alert.scss"></style>