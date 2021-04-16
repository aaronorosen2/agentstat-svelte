<script>
    import States from '../../data/states-footer'
    
</script>

<div class="states-links">
    <div class="container">
        <div class="title">Search for agents by state</div>
        <div class="states">
            {#each new Array(5) as x,i}
                <div class="links">
                    {#each new Array(9) as y,j}
                        <a href="/agents?filter_by=address&state={States[i*9+j].value}">{States[i*9+j].label}</a>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<style src="./states-links.scss"></style>