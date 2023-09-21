<script>
    import States from '../../data/states-footer'
</script>

<div class="states-links">
    <div class="container">
        <div class="title">Search for agents by state</div>
        <div class="states">
            {#each new Array(Math.ceil(States.length / 11)) as row, rowIndex}
                <div class="links">
                    {#each States.slice(rowIndex * 11, rowIndex * 11 + (rowIndex === (Math.ceil(States.length / 11) - 1) ? 8 : 11)) as state, stateIndex}
                        <a href="/agents?filter_by=address&state={state.value}">{state.label}</a>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<style src="./states-links.scss"></style>
