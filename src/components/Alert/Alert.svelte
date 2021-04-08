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


</script>

{#if show}
    <div class="alert {klass}">
        <i class="fas fa-times" on:click={close}></i>
        <span>Note:</span> {msg}
    </div>
{/if}

<style src="./alert.scss"></style>