<script>

    import TransactionTable from '../TransactionTable/TransactionTable.svelte'
    export let activeSales = []
</script>


<TransactionTable noDetails noNote active list={activeSales} />

