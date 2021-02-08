<script>
    export let show = false
</script>
<div class="tooltip">
    <i class="fas fa-info-circle" on:mouseenter={() => show=true} on:mouseleave={() => show=false}></i>
    {#if show}
    <div class="text">
        <slot></slot>
    </div>
    {/if}
</div>

<style src="./tooltip.scss"></style>